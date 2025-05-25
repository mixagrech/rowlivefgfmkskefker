const express = require('express');
const { Pool } = require('pg');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// Настройка безопасности
app.use(helmet()); // Защита заголовков
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'https://yourdomain.com',
    credentials: true
}));

// Ограничение запросов
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100 // максимум 100 запросов с одного IP
});
app.use(limiter);

// Настройка PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware для проверки JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Инициализация таблиц
async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(255) UNIQUE NOT NULL,
                telegram_id VARCHAR(255) UNIQUE,
                referral_code VARCHAR(255) UNIQUE NOT NULL,
                row_score INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS referrals (
                id SERIAL PRIMARY KEY,
                referrer_id VARCHAR(255) REFERENCES users(user_id),
                referred_id VARCHAR(255) REFERENCES users(user_id),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                reward_claimed BOOLEAN DEFAULT FALSE,
                UNIQUE(referrer_id, referred_id)
            );

            CREATE INDEX IF NOT EXISTS idx_user_id ON users(user_id);
            CREATE INDEX IF NOT EXISTS idx_referral_code ON users(referral_code);
            CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
        `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

initDatabase();

// Генерация уникального реферального кода
async function generateUniqueReferralCode() {
    while (true) {
        const code = uuidv4().substring(0, 8);
        const exists = await pool.query('SELECT referral_code FROM users WHERE referral_code = $1', [code]);
        if (exists.rows.length === 0) return code;
    }
}

// API endpoints

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    try {
        const { user_id, telegram_id } = req.body;
        const referral_code = await generateUniqueReferralCode();

        const result = await pool.query(
            'INSERT INTO users (user_id, telegram_id, referral_code) VALUES ($1, $2, $3) RETURNING *',
            [user_id, telegram_id, referral_code]
        );

        const token = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ user: result.rows[0], token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение реферального кода пользователя
app.get('/get-referral-code/:userId', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT referral_code FROM users WHERE user_id = $1',
            [req.params.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ code: result.rows[0].referral_code });
    } catch (error) {
        console.error('Get referral code error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Активация реферального кода
app.post('/activate-referral', authenticateToken, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { code, userId } = req.body;

        // Проверка существования кода
        const referrerResult = await client.query(
            'SELECT user_id FROM users WHERE referral_code = $1',
            [code]
        );

        if (referrerResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Invalid referral code' });
        }

        const referrerId = referrerResult.rows[0].user_id;

        // Проверка на самореферал
        if (referrerId === userId) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Cannot refer yourself' });
        }

        // Проверка существующего реферала
        const existingReferral = await client.query(
            'SELECT * FROM referrals WHERE referrer_id = $1 AND referred_id = $2',
            [referrerId, userId]
        );

        if (existingReferral.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Referral already exists' });
        }

        // Создание новой записи реферала
        await client.query(
            'INSERT INTO referrals (referrer_id, referred_id) VALUES ($1, $2)',
            [referrerId, userId]
        );

        // Начисление наград
        await client.query(
            'UPDATE users SET row_score = row_score + $1 WHERE user_id IN ($2, $3)',
            [300, referrerId, userId]
        );

        await client.query('COMMIT');
        res.json({ success: true, reward: 300 });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Activate referral error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
});

// Получение списка рефералов
app.get('/get-referrals/:userId', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, u.telegram_id, u.row_score
            FROM referrals r
            JOIN users u ON r.referred_id = u.user_id
            WHERE r.referrer_id = $1
            ORDER BY r.created_at DESC
        `, [req.params.userId]);

        res.json({ referrals: result.rows });
    } catch (error) {
        console.error('Get referrals error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Обновление счета ROW
app.post('/update-score', authenticateToken, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { userId, score } = req.body;

        // Проверка валидности счета
        if (score < 0 || score > 1000000) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'Invalid score value' });
        }

        await client.query(
            'UPDATE users SET row_score = $1 WHERE user_id = $2',
            [score, userId]
        );

        await client.query('COMMIT');
        res.json({ success: true });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Update score error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


































const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Проверка таблицы users
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
        if (err || !row) {
            console.error('Таблица users не существует или ошибка доступа');
            process.exit(1);
        }
        
        // Проверка таблицы referrals
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='referrals'", (err, row) => {
            if (err || !row) {
                console.error('Таблица referrals не существует или ошибка доступа');
                process.exit(1);
            }
            
            console.log('Проверка базы данных успешна');
            db.close();
        });
    });
});
