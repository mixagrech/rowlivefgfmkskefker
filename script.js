document.ondragstart = noselect;
document.onselectstart = noselect;
function noselect() {return false;}

let tg = window.Telegram.WebApp;

let champrangt = document.getElementById('heder_acc_age');
let accountage = document.getElementById('account_age').style.display = 'none';
let buttonbackage = document.querySelector('.buttonbackage');

champrangt.addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('account_age').style.display = 'block';
    document.getElementById("user-avatar").style.display = "flex"; // Показываем аватар

    const animation = document.getElementById('lottie-animation');
    animation.style.display = 'block'; 
    setTimeout(() => {
        animation.style.display = 'none';
    }, 2000);
})

buttonbackage.addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('account_age').style.display = 'none';
    document.getElementById("user-avatar").style.display = "none"; // Скрываем аватар
})

// ===== СИСТЕМА НАГРАД С СОХРАНЕНИЕМ ===== //

const DAILY_REWARDS = [400, 520, 640, 760, 880, 1100];
const STORAGE_KEY = 'gameRewardsData';
const REWARD_COOLDOWN_HOURS = 24; // Через сколько часов доступна новая награда
const RESET_HOURS = 48; // Через сколько часов сбрасывается streak

// Состояние игры
let gameState = {
    rowscore: 0,
    lastDailyClaim: null,
    dailyStreak: 0
};

// DOM элементы
const rowscoreElement = document.getElementById('rowscore');
const dailyRewardScreen = document.getElementById('daily_reward');
const mainScreen = document.getElementById('main');
const dayNumberElement = document.getElementById('day_number');
const rewardAmountElement = document.getElementById('rowdayly_text_id');
const claimButton = document.getElementById('daily_claim_btn_img');

// Инициализация игры
function initGame() {
    loadGameState();
    updateUI();
    
    if (shouldShowDailyReward()) {
        showDailyReward();
    } else {
        showMainScreen();
    }
}

// Загрузка состояния из localStorage
function loadGameState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameState = {
                rowscore: parseInt(parsed.rowscore) || 0,
                lastDailyClaim: parsed.lastDailyClaim || null,
                dailyStreak: parseInt(parsed.dailyStreak) || 0
            };
        } catch (e) {
            console.error('Ошибка загрузки:', e);
            resetGameState();
        }
    }
}

// Сохранение состояния в localStorage
function saveGameState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

// Сброс состояния
function resetGameState() {
    gameState = {
        rowscore: 0,
        lastDailyClaim: null,
        dailyStreak: 0
    };
    saveGameState();
}

// Проверка, нужно ли показать награду
function shouldShowDailyReward() {
    if (!gameState.lastDailyClaim) return true;
    
    const lastClaim = new Date(gameState.lastDailyClaim);
    const now = new Date();
    const hoursPassed = (now - lastClaim) / (1000 * 60 * 60);
    
    // Прошло более 48 часов - сбрасываем стрик и показываем награду
    if (hoursPassed >= RESET_HOURS) {
        gameState.dailyStreak = 0;
        saveGameState();
        return true;
    }
    
    // Прошло более 24 часов - показываем награду
    if (hoursPassed >= REWARD_COOLDOWN_HOURS) {
        return true;
    }
    
    return false;
}

// Получение текущей награды
function getDailyReward() {
    return DAILY_REWARDS[Math.min(gameState.dailyStreak, DAILY_REWARDS.length - 1)];
}

// Добавление ROW к счету
function addRow(amount) {
    gameState.rowscore += amount;
    updateUI();
    saveGameState();
}

// Обновление интерфейса
function updateUI() {
    // Обновляем основной элемент отображения ROW-монет
    if (rowscoreElement) {
        rowscoreElement.textContent = gameState.rowscore;
    }
    
    // Обновляем элемент rowscore (если он отличается от rowscoreElement)
    const rowscoreDisplay = document.getElementById('rowscore');
    if (rowscoreDisplay) {
        rowscoreDisplay.textContent = gameState.rowscore;
    }
    
    // Обновляем все элементы с классом rowScoreDisplay
    const rowScoreDisplays = document.querySelectorAll('.rowScoreDisplay');
    rowScoreDisplays.forEach(element => {
        element.textContent = gameState.rowscore;
    });
}

// Показать экран награды
function showDailyReward() {
    if (!dailyRewardScreen) return; // ← Исправлено здесь
    
    if (dayNumberElement) {
        dayNumberElement.textContent = gameState.dailyStreak + 1;
    }
    
    if (rewardAmountElement) {
        rewardAmountElement.innerHTML = 
            `+${getDailyReward()} <span style="font-size:1.1rem; margin-left:-6px; font-weight:400;">ROW</span>`;
    }
    
    dailyRewardScreen.style.display = 'block';
    if (mainScreen) mainScreen.style.display = 'none';
}

// Показать основной экран
function showMainScreen() {
    if (dailyRewardScreen) dailyRewardScreen.style.display = 'none';
    if (mainScreen) mainScreen.style.display = 'block';
}

// Забрать награду
function claimDailyReward() {
    const now = new Date();
    const lastClaim = gameState.lastDailyClaim ? new Date(gameState.lastDailyClaim) : null;
    
    // Проверяем сброс стрика (более 48 часов)
    if (lastClaim) {
        const hoursPassed = (now - lastClaim) / (1000 * 60 * 60);
        if (hoursPassed >= RESET_HOURS) {
            gameState.dailyStreak = 0;
        }
    }
    
    // Выдаем награду
    addRow(getDailyReward());
    gameState.lastDailyClaim = now.toISOString();
    
    // Увеличиваем стрик ТОЛЬКО если это новый день
    // (прошло более 24 часов с последнего клейма)
    if (!lastClaim || (now - new Date(lastClaim)) / (1000 * 60 * 60) >= REWARD_COOLDOWN_HOURS) {
        gameState.dailyStreak = Math.min(gameState.dailyStreak + 1, DAILY_REWARDS.length);
    }
    
    saveGameState();
    showMainScreen();
}

// Назначение обработчиков событий
if (claimButton) {
    claimButton.addEventListener('click', claimDailyReward);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);

// task



let TaskBtnMain = document.getElementById('TaskBtnMain');
document.getElementById('HomeBtnGray').style.display = 'none';
document.getElementById('taskMain').style.display = 'none';
document.getElementById('TaskBtnTask').style.display = 'none';
document.getElementById('mainmenu').style.display = 'block';

document.getElementById('topTaskText').style.display = 'none';    //top text on task

document.getElementById('HomeBtnID');


TaskBtnMain.addEventListener('click', () => {
    document.getElementById('mainmenu').style.display = 'none';
    document.getElementById('topTaskText').style.display = 'block';
    document.getElementById('HomeBtnID').style.display = 'none';
    document.getElementById('HomeBtnGray').style.display = 'block';
    document.getElementById('taskMain').style.display = 'block';
    document.getElementById('TaskBtnTask').style.display = 'block';
    document.getElementById('TaskBtnMain').style.display = 'none';
    document.querySelector('.buttontaskimg').style.bottom = '3.5%';
    document.querySelector('.buttonhomeimg').style.bottom = '3.5%';
    FriendGrayBtn.style.display = 'block';
    document.querySelector('.buttonfriendsimg').style.bottom = '3.5%';
    document.getElementById('FriendBlueBtn').style.display = 'none';
    document.getElementById('FriendsMain').style.display = 'none'; 
    document.getElementById('YourRank').style.display = 'none';
    document.getElementById('AirdropMain').style.display = 'none';
    document.getElementById('AirdropBtnGolg').style.display = 'none';
    document.getElementById('AirdropBtnGray').style.display = 'block';
    document.querySelector('.buttonairdropimg').style.bottom = '3.5%';
});

document.addEventListener('DOMContentLoaded', function() {
    const HomeBtnGray = document.getElementById('HomeBtnGray');
    const FriendGrayBtn = document.getElementById('FriendGrayBtn'); // Добавлено

    if (HomeBtnGray && FriendGrayBtn) {
        HomeBtnGray.addEventListener('click', () => {
            document.getElementById('mainmenu').style.display = 'block';
            document.getElementById('taskMain').style.display = 'none';
            HomeBtnGray.style.display = 'none';
            document.getElementById('HomeBtnID').style.display = 'block';
            document.getElementById('TaskBtnTask').style.display = 'none';
            document.getElementById('TaskBtnMain').style.display = 'block';
            FriendGrayBtn.style.display = 'block';
            document.querySelector('.buttonfriendsimg').style.bottom = '3.5%';
            document.getElementById('FriendBlueBtn').style.display = 'none';
            document.getElementById('FriendsMain').style.display = 'none';

            document.getElementById('AirdropMain').style.display = 'none';
            document.getElementById('AirdropBtnGolg').style.display = 'none';
            document.getElementById('AirdropBtnGray').style.display = 'block';
            document.querySelector('.buttonairdropimg').style.bottom = '3.5%';
        });
    } else {
        console.error('Элемент HomeBtnGray или FriendGrayBtn не найден на странице.');
    }
});



//loading


let loader_hide = document.getElementById('loader_hide');

window.addEventListener('load', () => {
  loader_hide.style.display = 'none';
});


//age reward disribution

// ===== Аватарка пользователя ===== //

// Функция создания аватарки
function setupUserAvatar() {
    const avatarContainer = document.getElementById("user-avatar");
    if (!avatarContainer || !window.Telegram?.WebApp) return;

    const user = Telegram.WebApp.initDataUnsafe?.user;

    // Если есть фото — вставляем изображение
    if (user?.photo_url) {
        const img = document.createElement("img");
        img.src = user.photo_url;
        img.onerror = () => showFallbackAvatar(user); // Если фото не загрузилось
        avatarContainer.appendChild(img);
    } else {
        showFallbackAvatar(user); // Показываем заглушку
    }
}

// Заглушка: буква или цветной круг
function showFallbackAvatar() {
    const avatarContainer = document.getElementById("user-avatar");
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <svg width="39" height="42" viewBox="0 0 39 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 0C16.9976 0 14.5976 1.00695 12.8281 2.79932C11.0586 4.59169 10.0645 7.02267 10.0645 9.55747C10.0645 12.0923 11.0586 14.5233 12.8281 16.3156C14.5976 18.108 16.9976 19.1149 19.5 19.1149C22.0024 19.1149 24.4024 18.108 26.1719 16.3156C27.9414 14.5233 28.9355 12.0923 28.9355 9.55747C28.9355 7.02267 27.9414 4.59169 26.1719 2.79932C24.4024 1.00695 22.0024 0 19.5 0ZM9.43548 24.2123C6.93304 24.2123 4.53309 25.2192 2.76359 27.0116C0.994093 28.804 0 31.2349 0 33.7697V36.7975C0 38.7192 1.37381 40.3555 3.24581 40.6639C14.0098 42.4454 24.9902 42.4454 35.7542 40.6639C36.6595 40.513 37.4827 40.0416 38.077 39.3336C38.6714 38.6256 38.9985 37.7269 39 36.7975V33.7697C39 31.2349 38.0059 28.804 36.2364 27.0116C34.4669 25.2192 32.067 24.2123 29.5645 24.2123H28.709C28.2394 24.214 27.7831 24.287 27.3403 24.4315L25.1613 25.1527C21.4826 26.3692 17.5174 26.3692 13.8387 25.1527L11.6597 24.4315C11.2181 24.288 10.7573 24.214 10.2935 24.2123H9.43548Z" fill="white"/>
        </svg>
    `;
}

// Инициализация аватарки при загрузке страницы
document.addEventListener("DOMContentLoaded", setupUserAvatar);


// ===== ФУНКЦИЯ ДЛЯ РАСЧЕТА ВОЗРАСТА ИЗ ID ===== //
function calculateAgeFromId(userId) {
    // Если ID не передан, используем случайный для демонстрации
    const id = userId || Math.floor(Math.random() * 10000000000);
    
    // Новая формула: (ID / 1,000,000,000) + 2013 → затем (2025 - результат) * 100
    const rawValue = (id / 1000000000) + 2013;
    const rawAge = (2025 - rawValue) * 100;
    
    // Округляем до одного знака после запятой
    return Math.round(rawAge * 10) / 10;
}

// ===== СИСТЕМА НАГРАД ЗА ВОЗРАСТ ===== //
const AGE_REWARD_KEY = 'ageRewardData';
let ageRewardState = {
    claimed: false,
    amount: 0
};

// Получаем элементы DOM
const usernameonAgeID = document.getElementById('usernameonAgeID');
const usernameonAgeRewardID = document.getElementById('usernameonAgeRewardID');

// Рассчитываем награду на основе возраста
function calculateAgeReward() {
    let userId = 0;
    if (tg?.initDataUnsafe?.user?.id) {
        userId = tg.initDataUnsafe.user.id;
    }
    
    const userAge = calculateAgeFromId(userId);
    // Награда = возраст (без умножения, т.к. возраст уже увеличен в формуле)
    const reward = Math.floor(userAge);
    
    // Ограничиваем разумными пределами (100-10,000 монет)
    return Math.min(Math.max(reward, 100), 10000);
}

const ageBasedReward = calculateAgeReward();

// Загрузка состояния из localStorage
function loadAgeRewardState() {
    try {
        const saved = localStorage.getItem(AGE_REWARD_KEY);
        if (saved) ageRewardState = JSON.parse(saved);
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
}

// Сохранение состояния в localStorage
function saveAgeRewardState() {
    localStorage.setItem(AGE_REWARD_KEY, JSON.stringify(ageRewardState));
}

// Асинхронная функция для выдачи награды
async function ageReward() {
    if (ageRewardState.claimed) {
        if (window.Telegram?.WebApp?.showAlert) {
            console.log('Вы уже получали награду за возраст!');
        } else {
            console.log('Вы уже получали награду за возраст!');
        }
        return;
    }

    try {
        await addRow(ageBasedReward);
        ageRewardState = {
            claimed: true,
            amount: ageBasedReward
        };
        saveAgeRewardState();
        
        usernameonAgeRewardID.textContent = ageBasedReward;
        
        if (window.Telegram?.WebApp?.showAlert) {
            console.log(`🎉 Вы получили ${ageBasedReward} монет!`);
        } else {
            console.log(`🎉 Вы получили ${ageBasedReward} монет!`);
        }
    } catch (e) {
        console.error('Ошибка:', e);
        if (window.Telegram?.WebApp?.showAlert) {
            console.log('⚠️ Ошибка при получении награды');
        }
    }
}

// Инициализация системы
function initAgeReward() {
    loadAgeRewardState();
    usernameonAgeRewardID.textContent = ageRewardState.claimed 
        ? ageRewardState.amount 
        : ageBasedReward;

    if (buttonbackage) {
        buttonbackage.addEventListener('click', ageReward);
    }
}

if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    usernameonAgeID.innerHTML = `${user.first_name} ${user.last_name || ''}`;
    console.log(`Возраст: ${calculateAgeFromId(user.id)}`);
}

document.addEventListener('DOMContentLoaded', initAgeReward);


//hat web app

tg.setHeaderColor("#0d0d0d");

//Friends main

document.getElementById('FriendsMain').style.display = 'none';
document.getElementById('FriendBlueBtn').style.display = 'none';
var FriendGrayBtn = document.getElementById('FriendGrayBtn');

FriendGrayBtn.addEventListener('click', () => {
    FriendGrayBtn.style.display = 'none';
    document.getElementById('FriendBlueBtn').style.display = 'block';
    document.querySelector('.buttonfriendsimg').style.bottom = '3.5%';
    document.getElementById('FriendsMain').style.display = 'block';
    document.getElementById('mainmenu').style.display = 'none';
    document.getElementById('taskMain').style.display = 'none';

    document.getElementById('TaskBtnTask').style.display = 'none';
    TaskBtnMain.style.display = 'block';
    document.querySelector('.buttontaskimg').style.bottom = '3.5%';
    
    document.getElementById('HomeBtnGray').style.display = 'block';
    document.getElementById('HomeBtnID').style.display = 'none';
    document.querySelector('.buttonhomeimg').style.bottom = '3.5%';

    document.getElementById('AirdropMain').style.display = 'none';
    document.getElementById('AirdropBtnGolg').style.display = 'none';
    document.getElementById('AirdropBtnGray').style.display = 'block';
    document.querySelector('.buttonairdropimg').style.bottom = '3.5%';

    document.querySelector('.MainByFriendsClass').style.display = 'block';
});

//Friend invite

var InvieButtonFriendID = document.getElementById('InvieButtonFriendID');
let InviteMenuFriend = document.getElementById('InviteMenuFriend').style.display = 'none';

InvieButtonFriendID.addEventListener('click', () => {
    document.getElementById('InviteMenuFriend').style.display = 'block';
});

let CrossFriendBtnID =document.getElementById('CrossFriendBtnID');

CrossFriendBtnID.addEventListener('click', () => {
    document.getElementById('InviteMenuFriend').style.display = 'none';
});

let BlackDisblayFriend = document.querySelector('.BlackDisblayFriend');

BlackDisblayFriend.addEventListener('click', () => {
    document.getElementById('InviteMenuFriend').style.display = 'none';
});



//Friend Share mesage


document.querySelector('.SecsessCopyOrSentMessage').style.display = 'none';

var counter = 0;

function CopySecsessFunc() {
    counter++;

    if(counter == 1) {
        clearInterval(counter);
        document.querySelector('.SecsessCopyOrSentMessage').style.display = 'none';
    }
}

document.querySelector(".AddFriendCopyLinkBtn").addEventListener("click", () => {
    document.querySelector('.SecsessCopyOrSentMessage').style.display = 'block';
    setInterval(CopySecsessFunc, 1000);
    counter = 0;
});

//Airdrop main

const AirdropBtnGray = document.getElementById('AirdropBtnGray');
const AirdropBtnGolg = document.getElementById('AirdropBtnGolg').style.display = 'none';
let AirdropMain = document.getElementById('AirdropMain').style.display='none';

AirdropBtnGray.addEventListener('click', () => {
    AirdropBtnGray.style.display = 'none';
    document.getElementById('AirdropMain').style.display='block';
    document.getElementById('AirdropBtnGolg').style.display = 'block';
    document.getElementById('mainmenu').style.display = 'none';
    document.getElementById('taskMain').style.display = 'none';
    document.querySelector('.buttonairdropimg').style.bottom = '3.5%';

    document.getElementById('HomeBtnGray').style.display = 'block';
    document.getElementById('HomeBtnID').style.display = 'none';
    document.querySelector('.buttonhomeimg').style.bottom = '3.5%';

    document.querySelector('.buttonfriendsimg').style.bottom = '3.5%';
    document.getElementById('FriendsMain').style.display = 'none';
    document.getElementById('FriendBlueBtn').style.display = 'none';
    document.getElementById('FriendGrayBtn').style.display = 'block';
    
    document.getElementById('TaskBtnTask').style.display = 'none';
    TaskBtnMain.style.display = 'block';
    document.querySelector('.buttontaskimg').style.bottom = '3.5%';
});

//Profile main

const ProfileMain = document.getElementById('ProfileMain').style.display = 'none';
const buttonprofile = document.querySelector('.buttonprofile');

buttonprofile.addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('ProfileMain').style.display = 'block';
});

let BackBtnProfile = document.querySelector('.BackBtnProfile');

BackBtnProfile.addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('ProfileMain').style.display = 'none';
});



// input animation

const inputField = document.querySelector('.ReferalcodeInput');

inputField.addEventListener('input', function() {
    if (this.value.length > 0) {
        this.classList.add('enlarged');
    } else {
        this.classList.remove('enlarged');
    }
});

// send btn animation 

const button = document.querySelector('.SendReferalCode');

button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.9)'; // Уменьшаем кнопку
    let timeoutNumber = 0;
    timeoutNumber ++;
    if (timeoutNumber == 1) {
        setTimeout (() => {
            button.style.transform = 'scale(1)'
            timeoutNumber = 0;
        }, 100);
    };
});

const buttonInvite = document.querySelector('.InvieButtonFriend');

buttonInvite.addEventListener('mousedown', () => {
    buttonInvite.style.transform = 'scale(0.9)'; // Уменьшаем кнопку
    let timeoutNumber = 0;
    timeoutNumber ++;
    if (timeoutNumber == 1) {
        setTimeout (() => {
            buttonInvite.style.transform = 'scale(1)'
            timeoutNumber = 0;
        }, 100);
    };
});

const AddFriendSentMessageBtn = document.querySelector('.AddFriendSentMessageBtn');

AddFriendSentMessageBtn.addEventListener('mousedown', () => {
    AddFriendSentMessageBtn.style.transform = 'scale(0.9)'; // Уменьшаем кнопку
    let timeoutNumber = 0;
    timeoutNumber ++;
    if (timeoutNumber == 1) {
        setTimeout (() => {
            AddFriendSentMessageBtn.style.transform = 'scale(1)'
            timeoutNumber = 0;
        }, 100);
    };
});
const AddFriendCopyLinkBtn = document.querySelector('.AddFriendCopyLinkBtn');

AddFriendCopyLinkBtn.addEventListener('mousedown', () => {
    AddFriendCopyLinkBtn.style.transform = 'scale(0.9)'; // Уменьшаем кнопку
    let timeoutNumber = 0;
    timeoutNumber ++;
    if (timeoutNumber == 1) {
        setTimeout (() => {
            AddFriendCopyLinkBtn.style.transform = 'scale(1)'
            timeoutNumber = 0;
        }, 100);
    };
});

//Rank paje

const YourRank = document.getElementById('YourRank').style.display = 'none';
const champrangtitle = document.getElementById('champrangtitle');

champrangtitle.addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('YourRank').style.display = 'block';
});

const BackBtnOnTonRank = document.querySelector('.BackBtnOnTonRank');

BackBtnOnTonRank.addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('YourRank').style.display = 'none';
});

// ===== ОБНОВЛЕННАЯ СИСТЕМА РАНГОВ ===== //
const RANKS = [
    { name: 'NOOB 🐤 RANK', min: 0, max: 1000, bonus: 100 },
    { name: 'AVERAGE 😐 RANK', min: 1000, max: 5000, bonus: 500 },
    { name: 'NORMAL 👍 RANK', min: 5000, max: 15000, bonus: 1500 },
    { name: 'BETTER 💪 RANK', min: 15000, max: 50000, bonus: 5000 },
    { name: 'CHAMP 🏆 RANK', min: 50000, max: Infinity, bonus: 0 }
];

// Функция для получения текущего ранга
function getCurrentRank(score) {
    // Ищем ранг, где score находится в диапазоне [min, max)
    // Для CHAMP ранга используем отдельную проверку
    for (let i = 0; i < RANKS.length; i++) {
        const rank = RANKS[i];
        
        // Для последнего ранга (CHAMP) проверяем только нижнюю границу
        if (i === RANKS.length - 1) {
            if (score >= rank.min) return rank;
        } 
        // Для всех остальных рангов проверяем диапазон
        else if (score >= rank.min && score < rank.max) {
            return rank;
        }
    }
    
    // Возвращаем первый ранг по умолчанию
    return RANKS[0];
}

// Проверка и обновление ранга
function updateRankSystem() {
    // Используем актуальное значение из gameState
    currentRowScore = gameState.rowscore || 0;

    // Получаем текущий ранг
    const currentRank = getCurrentRank(currentRowScore);
    
    // Обновляем отображение
    if (currentRank) {
        document.getElementById('champrangtitle').textContent = currentRank.name;
        document.getElementById('RankOnPath').textContent = currentRank.name;
        updateRankColors(currentRowScore);
    }
}

// Функция обновления цветов ранга (добавлены недостающие элементы)
function updateRankColors(score) {
    // Базовые цвета
    const activeColors = {
        fill: '#358344',
        stroke: '#57E873'
    };
    const inactiveColors = {
        fill: '#BFBFBF',
        stroke: '#818181'
    };
    const defaultColors = {
        fill: '#97DBFF',
        stroke: '#0087CF'
    };

    // Сброс всех элементов к начальному состоянию
    const elements = [
        '.PathLine1', '.PathLine2', '.PathLine3', '.PathLine4',
        '.PathCircle1', '.PathCircle2', '.PathCircle3', '.PathCircle4', '.PathCircle5'
    ];
    
    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            if (selector.includes('Line')) {
                element.setAttribute('stroke', '#004C75');
            } else if (selector.includes('Circle')) {
                element.setAttribute('fill', defaultColors.fill);
                element.setAttribute('stroke', defaultColors.stroke);
            }
        }
    });

    // Активируем элементы в зависимости от счета
    if (score >= 1000) {
        document.querySelector('.PathCircle2').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle2').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine1').setAttribute('stroke', '#404040');
    }
    
    if (score >= 5000) {
        document.querySelector('.PathCircle3').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle3').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine2').setAttribute('stroke', '#404040');
    }
    
    if (score >= 15000) {
        const circle4 = document.querySelector('.PathCircle4');
        const line3 = document.querySelector('.PathLine3');
        if (circle4) circle4.setAttribute('fill', activeColors.fill);
        if (circle4) circle4.setAttribute('stroke', activeColors.stroke);
        if (line3) line3.setAttribute('stroke', '#404040');
    }
    
    if (score >= 50000) {
        const circle5 = document.querySelector('.PathCircle5');
        const line4 = document.querySelector('.PathLine4');
        if (circle5) circle5.setAttribute('fill', activeColors.fill);
        if (circle5) circle5.setAttribute('stroke', activeColors.stroke);
        if (line4) line4.setAttribute('stroke', '#404040');
    }
    
    // Первый круг всегда активен (базовый уровень)
    document.querySelector('.PathCircle1').setAttribute('fill', activeColors.fill);
    document.querySelector('.PathCircle1').setAttribute('stroke', activeColors.stroke);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initRankColors();
    updateRankSystem();
});

// Проверка каждые 500мс
setInterval(updateRankSystem, 500);


//Referal prgogram





document.addEventListener('DOMContentLoaded', async () => {
    // 1. Инициализация пользователя
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('userId', userId);
    }

    // 2. Обработка реферального кода из URL
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('code');
    if (referralCode) {
        await handleReferralCode(referralCode, userId);
    }

    // 3. Основная настройка системы
    await setupReferralSystem(userId);

    // 4. Первоначальная проверка видимости
    checkFriendsVisibility();

    // 5. Проверка награды за 5 друзей при загрузке
    checkFiveFriendsReward();
});

// Проверка и выдача награды за 5 друзей
async function checkFiveFriendsReward() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`/get-referral-code/${userId}`);
        if (!response.ok) return;
        
        const data = await response.json();
        if (!data.code) return;

        const referralsResponse = await fetch(`/get-referrals/${data.code}`);
        if (!referralsResponse.ok) return;
        
        const referralsData = await referralsResponse.json();
        const friendsCount = referralsData.referrals?.length || 0;

        // Проверяем, достигнуто ли 5 друзей и еще не выдана награда
        const rewardGiven = localStorage.getItem('fiveFriendsRewardGiven');
        if (friendsCount >= 5 && !rewardGiven) {
            awardFiveFriendsNFT();
        }
    } catch (error) {
        console.error('Ошибка проверки награды за 5 друзей:', error);
    }
}

// Выдача NFT за 5 друзей
function awardFiveFriendsNFT() {
    addSkin(
        "Friend NFT", 
        "Skins/ChampSkin1.svg",
        null,
        {
            bonusPercent: 0,
            gradient: 'linear-gradient(205deg, rgba(51, 0, 31, 1) 0%, rgba(0, 82, 130, 1) 100%)',
            stars: "★★★★★"
        }
    );
    
    // Помечаем награду как выданную
    localStorage.setItem('fiveFriendsRewardGiven', 'true');
    
}



// Обработка реферального кода
async function handleReferralCode(code, userId) {
    try {
        const response = await fetch(`/track-referral?code=${code}&currentUserId=${userId}`);
        if (response.ok) {
            window.history.replaceState({}, document.title, window.location.pathname);
            let RowFriendReward = 600;
            addRow(RowFriendReward);
            showNotification('', 'success');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Основная настройка реферальной системы
async function setupReferralSystem(userId) {
    try {
        const response = await fetch(`/get-referral-code/${userId}`);
        if (!response.ok) return;
        
        const data = await response.json();
        if (!data.code) return;

        // Настройка кнопок
        setupReferralButtons(data.code);

        // Загрузка друзей (но не показываем сразу)
        await loadReferrals(data.code, false);
    } catch (error) {
        console.error('Ошибка настройки системы:', error);
    }
}

// Настройка кнопок реферальной системы
function setupReferralButtons(code) {
    const referralLink = `${window.location.origin}/?code=${code}`;

    // Кнопка копирования
    const copyBtn = document.getElementById('AddFriendCopyLinkBtnID');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => copyToClipboard(referralLink));
    }

    // Кнопка Telegram
    const telegramBtn = document.getElementById('SentMesageInvFriendBtn');
    if (telegramBtn) {
        telegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся!')}`;
    }
}

// Загрузка списка рефералов
async function loadReferrals(code, shouldShow = false) {
    try {
        const response = await fetch(`/get-referrals/${code}`);
        if (!response.ok) return;
        
        const data = await response.json();
        const rowContainer = document.querySelector('.RowTotalFriendOver');
        if (!rowContainer) return;

        // Очищаем контейнер и добавляем базовую структуру
        rowContainer.innerHTML = `
            <div id="referralsList"></div>
            <p class="TextonDontHaveFriend" style="display: none">You don't have any friends yet</p>
        `;

        const referralsList = document.getElementById('referralsList');
        const noFriendsText = rowContainer.querySelector('.TextonDontHaveFriend');

        // Получаем текущее количество друзей
        const friendsCount = data.referrals?.length || 0;
        
        // Обновляем счетчик
        updateFriendsCounter(friendsCount);

        // Проверяем награду за 5 друзей
        const rewardGiven = localStorage.getItem('fiveFriendsRewardGiven');
        if (friendsCount >= 5 && !rewardGiven) {
            awardFiveFriendsNFT();
        }

        if (data.referrals?.length) {
            noFriendsText.style.display = 'none';
            data.referrals.slice(0, 15).forEach(ref => {
                referralsList.appendChild(createFriendForm(ref));
            });
        } else {
            noFriendsText.style.display = 'block';
        }

        // Управляем видимостью контейнера
        if (shouldShow || isFriendsPageVisible()) {
            rowContainer.style.display = 'block';
        } else {
            rowContainer.style.display = 'none';
        }

    } catch (error) {
        console.error('Ошибка загрузки друзей:', error);
    }
}

// Создание формы друга
function createFriendForm(ref) {
    const form = document.createElement('div');
    form.className = 'friend-form-item';
    form.innerHTML = `
        <div class="friend-form-content">
            <div class="EllipseWidthIconBro">
                <svg class="IconBroOnEllipse" width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.75 15.4286V18H8.75V15.4286C8.75 15.4286 8.75 10.2857 16.25 10.2857C23.75 10.2857 23.75 15.4286 23.75 15.4286ZM20 3.85714C20 3.09427 19.7801 2.34853 19.368 1.71423C18.956 1.07993 18.3703 0.585547 17.6851 0.293609C16.9998 0.00167125 16.2458 -0.0747131 15.5184 0.0741156C14.791 0.222944 14.1228 0.590301 13.5983 1.12973C13.0739 1.66916 12.7167 2.35644 12.5721 3.10465C12.4274 3.85287 12.5016 4.62841 12.7855 5.33321C13.0693 6.03801 13.5499 6.64041 14.1666 7.06424C14.7833 7.48807 15.5083 7.71429 16.25 7.71429C17.2446 7.71429 18.1984 7.30791 18.9017 6.58456C19.6049 5.8612 20 4.88012 20 3.85714ZM24 10.3629C24.6833 11.0112 25.2342 11.7931 25.6205 12.6629C26.0068 13.5326 26.2208 14.4728 26.25 15.4286V18H30V15.4286C30 15.4286 30 10.9929 24 10.3629ZM22.5 1.46765e-06C22.1223 2.40446e-05 21.747 0.0607566 21.3875 0.180001C22.1188 1.25868 22.5109 2.54209 22.5109 3.85714C22.5109 5.17219 22.1188 6.45561 21.3875 7.53429C21.747 7.65353 22.1223 7.71426 22.5 7.71429C23.4946 7.71429 24.4484 7.30791 25.1517 6.58456C25.8549 5.8612 26.25 4.88012 26.25 3.85714C26.25 2.83417 25.8549 1.85309 25.1517 1.12973C24.4484 0.406378 23.4946 1.46765e-06 22.5 1.46765e-06ZM10 6.42857H6.25V2.57143H3.75V6.42857H0V9H3.75V12.8571H6.25V9H10V6.42857Z" fill="white"/>
                </svg>
            </div>
            <p class="BroName">Друг: ${ref.friend_id?.substring(0, 8) || 'Unknown'}...</p>
            <p class="RewordForFriend"><b>+120</b>ROW</p>
            <p class="SecsessReceivedFriend">Received</p>
            <div class="bottomFormPanel"></div>
        </div>
    `;
    return form;
}

// Проверка видимости страницы друзей
function isFriendsPageVisible() {
    const mainByFriends = document.getElementById('MainByFriends');
    return mainByFriends && mainByFriends.style.display === 'block';
}

function updateFriendsCounter(count) {
    const counter = document.getElementById('TotalNumberFriendsSpanID');
    if (counter) {
        // Получаем количество уже выданных наград из localStorage
        const lastRewardedCount = parseInt(localStorage.getItem('lastRewardedFriendsCount')) || 0;
        
        // Обновляем счетчик
        counter.textContent = `${count}/15 friends`;
        
        // Выдаем награду только за новых друзей
        if (count > lastRewardedCount) {
            const newFriends = count - lastRewardedCount;
            const reward = newFriends * 120;
            addRow(reward);
            
            // Сохраняем новое количество выданных наград
            localStorage.setItem('lastRewardedFriendsCount', count);
        }
    }
}

// Проверка видимости и загрузка друзей
function checkFriendsVisibility() {
    const observer = new MutationObserver(() => {
        const mainVisible = isFriendsPageVisible();
        const rowContainer = document.querySelector('.RowTotalFriendOver');
        
        if (!rowContainer) return;
        
        if (mainVisible) {
            rowContainer.style.display = 'block';
            const userId = localStorage.getItem('userId');
            if (userId) {
                fetch(`/get-referral-code/${userId}`)
                    .then(res => res.json())
                    .then(data => data.code && loadReferrals(data.code, true))
                    .catch(console.error);
            }
        } else {
            rowContainer.style.display = 'none';
        }
    });

    observer.observe(document.body, { attributes: true, subtree: true });
}

// Вспомогательные функции
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showNotification('','success'))
        .catch(err => console.error('Ошибка копирования:', err));
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = type;
        setTimeout(() => notification.textContent = '', 5000);
    }
}

// marketplase

const NftMarketMainBtn = document.querySelector('.NftMarketMainBtn');

NftMarketMainBtn.addEventListener('click', () => {
    document.getElementById('main').style.display = 'none';
    document.getElementById('MarketplaseNFT').style.display = 'block';
});

document.getElementById('MarketplaseNFT').style.display = 'none';

document.querySelector('.BackBTNNFTMarket').addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('MarketplaseNFT').style.display = 'none';
});

//price up or down

const buttonPriseUp = document.querySelector('.ButtonPriseUp');
let isPriceMarketUp = true;

const upPriceSVG = `
<svg width="45" height="27" viewBox="0 0 45 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43 2L27.4991 17.2174C26.9499 17.7564 26.2051 18.0591 25.4286 18.0591C24.652 18.0591 23.9073 17.7564 23.3581 17.2174L18.7134 12.6576C18.1642 12.1186 17.4194 11.8159 16.6429 11.8159C15.8663 11.8159 15.1215 12.1186 14.5724 12.6576L2 25M43 2V11.8159M43 2H32.75" 
          stroke="#ADADAD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const downPriceSVG = `
<svg width="45" height="27" viewBox="0 0 45 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43 25L27.4991 9.78262C26.9499 9.24364 26.2051 8.94086 25.4286 8.94086C24.652 8.94086 23.9073 9.24364 23.3581 9.78262L18.7134 14.3424C18.1642 14.8814 17.4194 15.1841 16.6429 15.1841C15.8663 15.1841 15.1215 14.8814 14.5724 14.3424L2 2M43 25V15.1841M43 25H32.75" 
          stroke="#ADADAD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

buttonPriseUp.addEventListener('click', () => {
    isPriceMarketUp = !isPriceMarketUp;
    buttonPriseUp.innerHTML = '$' + (isPriceMarketUp ? upPriceSVG : downPriceSVG);
});

//attention sign in marketplace

const AttentionButtonNFTMark = document.querySelector('.AttentionButtonNFTMark');
let AttentionTextOnClick = document.querySelector('.AttentionTextOnClick').style.display = 'none';

AttentionButtonNFTMark.addEventListener('click', () => {
    document.querySelector('.AttentionTextOnClick').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Запретить прокрутку
});
document.querySelector('.PanelOnBackAttention').addEventListener('click', () => {
    document.querySelector('.AttentionTextOnClick').style.display = 'none';
    document.body.style.overflow = ''; // Разрешить прокрутку
});

//Buying a skin for TON and equeped 


const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://mixagrech.github.io/rowlivefgfmkskefker/tonconnect-manifest.json',
    buttonRootId: 'ton-connect',
    bridgeUrl: 'https://bridge.tonapi.io/bridge',
});

tonConnectUI.uiOptions = {
    twaReturnUrl: 'https://t.me/rowlivebot'
};

let connectedWallet = null;
let isProcessingTransaction = false;
let skinCounter = 0; // Начинаем с 0, так как все скины будут добавляться динамически
let selectedSkin = 1;

// DOM utilities
function getElement(selector) {
    const el = document.querySelector(selector);
    if (!el) console.error(`Element not found: ${selector}`);
    return el;
}

function createElement(tag, className, styles = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.assign(el.style, styles);
    return el;
}

// Skin functions
function loadSkinImages() {
    try {
        const skinContainer = getElement('.BackBlockProfileSkin');
        if (!skinContainer) return;

        // Скрываем все скины
        skinContainer.querySelectorAll('[class^="dynamicSkin"]').forEach(skin => {
            skin.style.display = 'none';
        });

        // Показываем выбранный скин
        let skinImg = skinContainer.querySelector(`.dynamicSkin${selectedSkin}`);
        
        if (!skinImg) {
            skinImg = createElement('img', `dynamicSkin${selectedSkin}`, {
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: '5',
                left: '0px'
            });
            skinContainer.appendChild(skinImg);
        } else {
            skinImg.style.left = '0px';
        }
        
        const skinPath = getSkinPath(selectedSkin);
        skinImg.src = skinPath + '?' + Date.now();
        skinImg.style.display = 'block';
        
        skinImg.onerror = () => {
            console.error(`Error loading skin ${selectedSkin}`);
            skinImg.src = 'Skins/DefaultSkin.svg?' + Date.now();
        };

        const skinNameElement = skinContainer.querySelector('.SkinLabelName1 p');
        if (skinNameElement) {
            skinNameElement.textContent = getSkinName(selectedSkin);
            skinNameElement.style.display = 'block';
        }

    } catch (e) {
        console.error('Error loading skin images:', e);
    }
}

function getSkinPath(skinNumber) {
    const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`));
    return skinData?.imagePath || `Skins/Skin${skinNumber}.svg`;
}

function getSkinName(skinNumber) {
    const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`));
    return skinData?.name || `Skin ${skinNumber}`;
}

function updateSkinDisplay() {
    const skinContainer = document.querySelector('.BackBlockProfileSkin');
    if (!skinContainer) return;
    
    // Скрываем все динамические скины
    skinContainer.querySelectorAll('[class^="dynamicSkin"]').forEach(skin => {
        skin.style.display = 'none';
    });
    
    // Показываем выбранный скин
    const selectedSkinElement = skinContainer.querySelector(`.dynamicSkin${selectedSkin}`);
    if (selectedSkinElement) {
        selectedSkinElement.style.display = 'block';
        
        const skinNameElement = skinContainer.querySelector('.SkinLabelName1 p');
        if (skinNameElement) {
            skinNameElement.textContent = getSkinName(selectedSkin);
            skinNameElement.style.display = 'block';
        }
    }
}

function updateSkinButtons() {
    const buttons = document.querySelectorAll('[class^="dynamicSkinBtn"]');
    buttons.forEach(btn => {
        const btnNum = parseInt(btn.className.match(/\d+/)?.[0]);
        if (isNaN(btnNum)) return;
        const skinData = JSON.parse(localStorage.getItem(`skin_${btnNum}_data`)) || {};
        const isPurchased = localStorage.getItem(`skin_${btnNum}_purchased`) === getSkinHash(skinData);
        const isSelected = btnNum === selectedSkin;
        
        const textEl = btn.querySelector('p') || createElement('p');
        
        if (isSelected) {
            textEl.textContent = 'Selected';
            btn.style.background = 'linear-gradient(to right, #A40000, #272727)';
        } else if (!isPurchased && (skinData.priceTON || skinData.priceROW)) {
            if (skinData.priceROW) {
                textEl.innerHTML = `<span>${skinData.priceROW} <b>ROW</b></span>`;
            } else {
                textEl.innerHTML = `<span>${skinData.priceTON} <b>TON</b></span>`;
            }
            btn.style.background = 'linear-gradient(90deg, #0088CC 0%, #272727 100%)';
        } else {
            textEl.textContent = 'Select';
            btn.style.background = 'linear-gradient(90deg, #494949 0.01%, #151515 171.13%)';
        }
        
        btn.innerHTML = '';
        btn.appendChild(textEl);
    });
}

// Payment functions
async function purchaseSkin(skinNumber) {
    const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`)) || {};
    const skinHash = getSkinHash(skinData);
    
    console.log('=== ПОКУПКА СКИНА ===');
    console.log('Номер скина:', skinNumber);
    console.log('Данные скина:', skinData);
    console.log('Текущий баланс:', gameState.rowscore);
    
    if (skinData.priceROW) {
        // Покупка за ROW
        console.log('Попытка покупки за ROW:', skinData.priceROW);
        
        if (gameState.rowscore >= skinData.priceROW) {
            console.log('Достаточно монет, списываем...');
            gameState.rowscore -= skinData.priceROW;
            localStorage.setItem(`skin_${skinNumber}_purchased`, skinHash);
            selectSkin(skinNumber);
            
            console.log('Новый баланс:', gameState.rowscore);
            saveGameState();
            updateUI();
            
            // Показываем уведомление
            if (typeof tg !== 'undefined' && tg.showAlert) {
                tg.showAlert(`✅ Skin purchased for ${skinData.priceROW} ROW!`);
            } else {
                alert(`✅ Skin purchased for ${skinData.priceROW} ROW!`);
            }
            renderMyLotsMenu(); // <--- добавлено
        } else {
            console.log('Недостаточно монет!');
            const needed = skinData.priceROW - gameState.rowscore;
            
            if (typeof tg !== 'undefined' && tg.showAlert) {
                tg.showAlert(`Not enough ROW. You need ${needed} more.`);
            } else {
                alert(`Not enough ROW. You need ${needed} more.`);
            }
        }
    } else if (skinData.priceTON) {
        // Покупка за TON
        if (!connectedWallet) {
            if (typeof tg !== 'undefined' && tg.showAlert) {
                tg.showAlert('Please connect your TON wallet first');
            } else {
                alert('Please connect your TON wallet first');
            }
            return;
        }
        
        if (isProcessingTransaction) return;
        
        isProcessingTransaction = true;
        updateSkinButtons();

        try {
            const amountInNanoTON = Math.floor(skinData.priceTON * 1e9).toString();

            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 300,
                messages: [
                    {
                        address: 'UQDDEEbNMPfVwpL2q1zi5oAbChXADLuZp4gCOdFoHDmHo4Nn',
                        amount: amountInNanoTON,
                        message: `Purchase skin ${skinData.name}`
                    }
                ]
            };

            const result = await tonConnectUI.sendTransaction(transaction);
            
            if (result?.boc) {
                localStorage.setItem(`skin_${skinNumber}_purchased`, skinHash);
                selectSkin(skinNumber);
                if (typeof tg !== 'undefined' && tg.showAlert) {
                    tg.showAlert("✅ Payment successful! Skin unlocked.");
                } else {
                    alert("✅ Payment successful! Skin unlocked.");
                }
                renderMyLotsMenu(); // <--- добавлено
            }
        } catch (error) {
            console.error("Transaction error:", error);
            if (typeof tg !== 'undefined' && tg.showAlert) {
                tg.showAlert("❌ Payment failed. Please try again.");
            } else {
                alert("❌ Payment failed. Please try again.");
            }
        } finally {
            isProcessingTransaction = false;
            updateSkinButtons();
        }
    }
}

function selectSkin(skinNumber) {
    selectedSkin = skinNumber;
    
    // Обновляем фон профиля
    const backBlock = getElement('.BackBlockProfileSkin');
    if (backBlock) {
        const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`)) || {};
        backBlock.style.background = skinData.gradient || 
            'linear-gradient(205.61deg, rgba(25, 25, 25, 0.75) 0%, rgba(73, 73, 73, 1) 100%)';
    }
    
    // Обновляем изображение в профиле
    const profileSkins = document.querySelectorAll('.BackBlockProfileSkin img');
    profileSkins.forEach(skin => {
        skin.style.display = 'none';
    });
    
    const selectedSkinImg = document.getElementById(`dynamicSkin${skinNumber}`);
    if (selectedSkinImg) {
        selectedSkinImg.style.display = 'block';
    }
    
    // Обновляем изображение в мини-игре (с fallback на стандартный скин)
    const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`)) || {};
    const centerImage = document.getElementById('centerImageOnCenterColomnFiled');
    if (centerImage) {
        centerImage.setAttribute('xlink:href', skinData.miniGameImagePath || "MiniGameImage/StandardSkinOnMiniGame2.png");
    }
    
    
    updateSkinDisplay();
    updateSkinButtons();
    localStorage.setItem('lastSelectedSkin', skinNumber);
    loadSkinImages();
}



// ===== Skin management =====





// Глобальный объект для хранения таймеров скинов
const skinTimers = {};

function startSkinTimer(skinNumber, endTime) {
    // Останавливаем предыдущий таймер, если был
    if (skinTimers[skinNumber]) {
        clearInterval(skinTimers[skinNumber]);
        delete skinTimers[skinNumber];
    }

    function updateTimer() {
        const now = Date.now();
        const timeLeft = endTime - now;
        const skinElement = document.querySelector(`.dynamicSkinContent${skinNumber}`);
        const isPurchased = localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`)) || {});

        // Если скин куплен - останавливаем таймер
        if (isPurchased) {
            clearInterval(skinTimers[skinNumber]);
            delete skinTimers[skinNumber];
            
            // Скрываем таймер
            const timerContainer = skinElement?.querySelector(`.dynamicSkinTimerContainer${skinNumber}`);
            if (timerContainer) timerContainer.style.display = 'none';
            return;
        }

        if (timeLeft <= 0) {
            // Обновляем данные скина
            const skinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`) || {});
            skinData.relevance = "NoActively";
            localStorage.setItem(`skin_${skinNumber}_data`, JSON.stringify(skinData));

            // Скрываем скин, если он не куплен
            if (skinElement && !isPurchased) {
                skinElement.style.display = 'none';
                updateSkinButtons();
            }

            clearInterval(skinTimers[skinNumber]);
            delete skinTimers[skinNumber];
            return;
        }

        // Рассчитываем оставшееся время
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Обновляем отображение таймера
        const daysElement = document.querySelector(`.dynamicSkinTimerDays${skinNumber} p`);
        const timeElement = document.querySelector(`.dynamicSkinTimerTime${skinNumber} p`);

        if (daysElement && timeElement) {
            if (days > 0) {
                daysElement.textContent = `${days} DAY${days !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${Math.floor(hours)} HOUR${Math.floor(hours) !== 1 ? 'S' : ''}`;
            } else if (hours > 0) {
                daysElement.textContent = `${Math.floor(hours)} HOUR${Math.floor(hours) !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${Math.floor(minutes)} MIN${Math.floor(minutes) !== 1 ? 'S' : ''}`;
            } else {
                daysElement.textContent = `${Math.floor(minutes)} MIN${Math.floor(minutes) !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${seconds} SEC${seconds !== 1 ? 'S' : ''}`;
            }
        }
    }

    // Обновляем сразу и затем каждую секунду
    updateTimer();
    skinTimers[skinNumber] = setInterval(updateTimer, 1000);
}

// Инициализация таймеров при загрузке страницы
function initializeSkinTimers() {
    const skinKeys = Object.keys(localStorage).filter(key => key.startsWith('skin_') && key.endsWith('_data'));

    for (const key of skinKeys) {
        try {
            const skinNumber = key.match(/skin_(\d+)_data/)[1];
            const savedData = localStorage.getItem(key);
            
            if (!savedData) continue;
            
            const skinData = JSON.parse(savedData);
            
            if (skinData.isLimited && skinData.endTime && !localStorage.getItem(`skin_${skinNumber}_purchased`)) {
                if (skinData.endTime > Date.now()) {
                    startSkinTimer(skinNumber, skinData.endTime);
                } else {
                    // Время вышло - обновляем данные скина
                    skinData.relevance = "NoActively";
                    localStorage.setItem(`skin_${skinNumber}_data`, JSON.stringify(skinData));
                    
                    // Скрываем скин
                    const skinElement = document.querySelector(`.dynamicSkinContent${skinNumber}`);
                    if (skinElement) {
                        skinElement.style.display = 'none';
                        updateSkinButtons();
                    }
                }
            }
        } catch (e) {
            console.error('Ошибка инициализации таймера для скина:', key, e);
        }
    }
}

// Вызываем инициализацию при загрузке
window.addEventListener('DOMContentLoaded', initializeSkinTimers);

// Функция addSkin

function addSkin(name, imagePath, miniGameImagePath, options = {}, limitedOptions = {}) {
    const panel = document.querySelector('.SkinSelectionPanel');
    
    skinCounter++;
    const skinNumber = skinCounter;

    // Определяем, является ли скин NFT (по наличию bonusPercent в options)
    const isNFT = options.bonusPercent !== undefined;
    const bonusPercent = isNFT ? options.bonusPercent : 0;

    // Проверяем, куплен ли скин
    let isPurchased = localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash({name, imagePath, miniGameImagePath, ...options});
    
    // Для NFT скинов автоматически помечаем как купленные
    if (isNFT && !isPurchased) {
        const hash = getSkinHash({name, imagePath, miniGameImagePath, ...options});
        localStorage.setItem(`skin_${skinNumber}_purchased`, hash);
        isPurchased = true;
    }

    // Проверяем, истек ли срок для лимитированного скина
    let endTime = limitedOptions.endTime || 0;
    let isExpired = false;
    
    if (limitedOptions.isLimited && endTime) {
        try {
            const savedData = localStorage.getItem(`skin_${skinNumber}_data`);
            const existingData = savedData ? JSON.parse(savedData) : {};
            
            endTime = existingData.endTime || endTime;
            isExpired = endTime <= Date.now() && !isPurchased;
            
        } catch (e) {
            console.error('Ошибка обработки данных скина:', e);
            isExpired = endTime <= Date.now() && !isPurchased;
        }
    }

    const skinData = {
        name,
        imagePath,
        miniGameImagePath: miniGameImagePath || "MiniGameImage/StandardSkinOnMiniGame2.png",
        priceTON: options.priceTON || null,
        priceROW: options.priceROW || null,
        gradient: options.gradient || 'linear-gradient(205deg, #1E0033 0%, #4B0082 100%)',
        borderColor: options.borderColor || '#9400D3',
        stars: options.stars || '☆☆☆☆☆',
        // Для NFT скинов всегда ставим NoActively, для остальных как указано
        relevance: isNFT ? 'NoActively' : (isExpired ? 'NoActively' : (options.relevance || 'Actively')),
        isLimited: limitedOptions.isLimited || false,
        endTime: endTime || null,
        isNFT: isNFT,
        bonusPercent: bonusPercent
    };

    localStorage.setItem(`skin_${skinNumber}_data`, JSON.stringify(skinData));

    // Если скин NoActively и не куплен - не отображаем
    if (skinData.relevance === "NoActively" && !isPurchased) {
        return;
    }

    // Для NFT скинов не добавляем в панель выбора
    if (isNFT) {
        // Но добавляем изображение для профиля (для использования в инвентаре и т.д.)
        const skinImg = document.createElement('img');
        skinImg.className = `dynamicSkin${skinNumber}`;
        skinImg.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: contain;
            z-index: 5;
            display: none;
        `;
        skinImg.src = imagePath;
        skinImg.onerror = function() {
            this.onerror = null;
            this.src = "MiniGameImage/StandardSkinOnMiniGame2.png";
        };
        
        document.querySelector('.BackBlockProfileSkin')?.appendChild(skinImg);
        return; // Прерываем выполнение, не добавляя в панель выбора
    }

    // Обычные скины добавляем в панель выбора
    if (!panel) return;

    // Получаем ВИДИМЫЕ скины (исключая скрытые)
    const visibleSkins = Array.from(panel.querySelectorAll('[class^="dynamicSkinContent"]'))
        .filter(skin => window.getComputedStyle(skin).display !== 'none');

    // Правильное позиционирование:
    const leftPosition = 6.4 + (visibleSkins.length * 42.5);

    // Создаем контейнер скина
    const skinContent = document.createElement('div');
    skinContent.className = `dynamicSkinContent${skinNumber}`;
    skinContent.dataset.skinNumber = skinNumber;
    skinContent.style.cssText = `
        position: absolute;
        width: 36.8%;
        height: 250px;
        left: ${leftPosition}%;
        top: 0;
    `;

    // HTML структура скина
    skinContent.innerHTML = `
        <div class="dynamicSkinPanel${skinNumber}">
            <div class="dynamicSkinName${skinNumber}"><p>${name}</p></div>
            <img src="${imagePath}" class="dynamicSkinImg${skinNumber}" 
                 onerror="this.onerror=null;this.src='MiniGameImage/StandardSkinOnMiniGame2.png'">
            ${skinData.isLimited && !isPurchased ? `
            <div class="dynamicSkinTimerContainer${skinNumber}">
                <div class="dynamicSkinTimerDays${skinNumber}"><p>0 DAYS</p></div>
                <div class="dynamicSkinTimerTime${skinNumber}"><p>0 HOURS</p></div>
            </div>
            ` : ''}
        </div>
        <div class="dynamicSkinBtn${skinNumber}">
            <p>${isPurchased ? 'EQUIP' : (options.priceROW ? `${options.priceROW} ROW` : (options.priceTON ? `${options.priceTON} TON` : 'Free'))}</p>
        </div>
    `;

    // Стили скина
    const style = document.createElement('style');
    style.textContent = `
        .dynamicSkinPanel${skinNumber} {
            position: absolute;
            width: 100%;
            height: 190px;
            background: ${skinData.gradient};
            border-radius: 10px;
            left: 0;
            top: 24.5%;
            z-index: 3;
            display: flex;
            justify-content: center;
        }
        .dynamicSkinName${skinNumber} {
            position: absolute;
            width: 73%;
            height: 21px;
            top: 6px;
            background: rgba(30, 30, 30, 0.5);
            border: 1px solid ${skinData.borderColor};
            border-radius: 100px;
            z-index: 4;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .dynamicSkinName${skinNumber} p {
            color: #FFF;
            font-size: 0.8rem;
            margin: 0;
        }
        .dynamicSkinImg${skinNumber} {
            position: absolute;
            left: 0;
            width: 93%;
            height: 122px;
            bottom: 10%;
            z-index: 5;
            object-fit: contain;
        }
        .dynamicSkinBtn${skinNumber} {
            position: absolute;
            width: 100%;
            height: 30px;
            bottom: -16%;
            left: 0;
            border-radius: 10px;
            cursor: pointer;
            user-select: none;
            z-index: 4;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            background: ${isPurchased ? '#4CAF50' : '#9400D3'};
        }
        .dynamicSkinBtn${skinNumber} p {
            color: #FFF;
            font-size: 0.8rem;
            margin: 0;
            text-align: center;
        }
        .dynamicSkinBtn${skinNumber}:active {
            transform: scale(0.95);
        }
        .dynamicSkinTimerContainer${skinNumber} {
            position: absolute;
            display: flex;
            gap: 5px;
            left: 10px;
            bottom: 7px;
            z-index: 6;
        }
        .dynamicSkinTimerDays${skinNumber}, 
        .dynamicSkinTimerTime${skinNumber} {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            padding: 2px 5px;

        }
        .dynamicSkinTimerDays${skinNumber} p, 
        .dynamicSkinTimerTime${skinNumber} p {
            color: #FFF;
            font-size: 0.6rem;
            margin: 0;
        }
    `;
    document.head.appendChild(style);

    // Обработчик клика на кнопку
    skinContent.querySelector(`.dynamicSkinBtn${skinNumber}`).addEventListener('click', () => {
        const currentSkinData = JSON.parse(localStorage.getItem(`skin_${skinNumber}_data`)) || {};
        const isPurchasedNow = localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(currentSkinData);
        
        if (currentSkinData.relevance === "NoActively" && !isPurchasedNow) {
            console.log("Этот скин временно недоступен");
            return;
        }

        if (!isPurchasedNow && (currentSkinData.priceTON || currentSkinData.priceROW)) {
            purchaseSkin(skinNumber);
        } else {
            selectSkin(skinNumber);
        }
    });

    // Добавляем скин на панель
    panel.appendChild(skinContent);
    updateSkinButtons();

    // Добавляем изображение для профиля
    const skinImg = document.createElement('img');
    skinImg.className = `dynamicSkin${skinNumber}`;
    skinImg.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 5;
        display: none;
    `;
    skinImg.src = imagePath;
    skinImg.onerror = function() {
        this.onerror = null;
        this.src = "MiniGameImage/StandardSkinOnMiniGame2.png";
    };
    
    document.querySelector('.BackBlockProfileSkin')?.appendChild(skinImg);

    // Запускаем таймер только если скин лимитированный, не куплен и время не истекло
    if (skinData.isLimited && skinData.endTime && !isPurchased && skinData.endTime > Date.now()) {
        startSkinTimer(skinNumber, skinData.endTime);
    }
}
 


// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Восстанавливаем последний выбранный скин
    selectedSkin = parseInt(localStorage.getItem('lastSelectedSkin')) || 1;
    selectSkin(selectedSkin);
    
    // Инициализация кошелька
    tonConnectUI.onStatusChange((wallet) => {
        connectedWallet = wallet;
        updateSkinButtons();
    });
    
    tonConnectUI.connectionRestored.then(() => {
        connectedWallet = tonConnectUI.wallet;
        updateSkinButtons();
    });

    

    addSkin(
        "Standard", 
        "Skins/StandartSkin1.svg",
        null,
        {
            gradient: 'linear-gradient(205.61deg, rgba(25, 25, 25, 0.75) 0%, rgba(73, 73, 73, 1) 100%)',
            borderColor: '#565656',
            stars: "☆☆☆☆☆"
        }
    );

    // Скин за TON
    addSkin(
        "GoodMan", 
        "Skins/GoodManSkin1.svg",
        "MiniGameImage/GoodManRowingSkin.png",
        {
            priceTON: 0.45,
            gradient: 'linear-gradient(206.02deg, #272727 0%, #0087CF 167.73%)',
            borderColor: '#0087CF',
            stars: "★☆☆☆☆"
        }
    );

    // Скин за ROW
    addSkin(
        "Champ", 
        "Skins/ChampSkin1.svg",
        "MiniGameImage/ChampRowingSkin.png",
        {
            priceROW: 1000,
            gradient: 'linear-gradient(205deg, rgb(44, 51, 0) 0%, rgb(130, 104, 0) 100%)',
            borderColor: '#FFB200',
            stars: "★★★★★"
        }
    );

    addSkin(
        "buyforROW", 
        "Skins/ChampSkin1.svg",
        null,
        {
            priceROW: 5000,
            gradient: 'linear-gradient(205deg, rgb(0, 51, 4) 0%, rgb(0, 130, 7) 100%)',
            borderColor: '#009D22',
            stars: "★★★☆☆"
        }
    );

    addSkin(
        "Omg", 
        "Skins/ChampSkin1.svg",
        null,
        {
            priceROW: 50,
            gradient: 'linear-gradient(205deg, rgba(26, 51, 0, 1) 0%, rgba(130, 33, 0, 1) 100%)',
            borderColor: '#9d0000ff',
            stars: "★★★☆☆"
        }
    );

    addSkin(
        "Limiваt", 
        "Skins/ChampSkin1.svg",
        null,
        {
            priceROW: 1,
            gradient: 'linear-gradient(205deg, rgba(51, 0, 30, 1) 0%, rgba(130, 0, 0, 1) 100%)',
            borderColor: '#9d006eff',
            stars: "★★★☆☆"
        },
        {
            isLimited: true,
            endTime: Date.now() + 3600000 // 1 час (Для лимитированных скинов нужно доработать связь глобального времени из сервера к фронту)
        }
    );

    addSkin(
        "Omавыg", 
        "Skins/ChampSkin1.svg",
        null,
        {
            priceROW: 500,
            gradient: 'linear-gradient(205deg, rgba(0, 37, 51, 1) 0%, rgba(130, 0, 7, 1) 100%)',
            borderColor: '#009d0dff',
            stars: "★★★☆☆"
        }
    );



    addSkin(
        "Test NFT", 
        "Skins/ChampSkin1.svg",
        null, // miniGameImagePath не нужен для NFT
        {
            bonusPercent: 20, // Это делает скин NFT
            gradient: 'linear-gradient(205deg, rgb(44, 51, 0) 0%, rgb(130, 104, 0) 100%)',
            stars: "★★★★★"
        }
    );


    
    renderMyLotsMenu();
});


// Marketplase MY Lots paje

const MyLotsNFTMArket = document.querySelector('.MyLotsNFTMArket');
const AllLotsNFTMArket = document.querySelector('.AllLotsNFTMArket'); 
document.querySelector('.MyLotsMenu').style.display = 'none';

MyLotsNFTMArket.addEventListener('click', () => {
    MyLotsNFTMArket.style.color = '#FFFFFF';
    AllLotsNFTMArket.style.color = '#515151';
    document.querySelector('.AllLotsMenu').style.display = 'none';
    document.querySelector('.MyLotsMenu').style.display = 'block';
    renderMyLotsMenu(); // чтобы обновить количество лотов
    showMyLotsPanel(); // показать только панель для моих лотов
});

AllLotsNFTMArket.addEventListener('click', () => {
    MyLotsNFTMArket.style.color = '#515151';
    AllLotsNFTMArket.style.color = '#FFFFFF';
    document.querySelector('.AllLotsMenu').style.display = 'block';
    document.querySelector('.MyLotsMenu').style.display = 'none';
    // Обновляем количество лотов для AllLotsMenu
    const lotsNumb = document.querySelector('.AllLotsNumb');
    if (lotsNumb) {
        lotsNumb.textContent = 'Total: 1 lot';
    }
    showAllLotsPanel(); // показать только основную панель
});

if (NftMarketMainBtn) {
    NftMarketMainBtn.addEventListener('click', () => {
        document.getElementById('main').style.display = 'none';
        document.getElementById('MarketplaseNFT').style.display = 'block';
        // Всегда показываем AllLotsMenu
        document.querySelector('.AllLotsMenu').style.display = 'block';
        document.querySelector('.MyLotsMenu').style.display = 'none';
        const lotsNumb = document.querySelector('.AllLotsNumb');
        if (lotsNumb) {
            lotsNumb.textContent = 'Total: 1 lot';
        }
        showAllLotsPanel();
        // Выделяем AllLotsNFTMArket
        const allLotsBtn = document.querySelector('.AllLotsNFTMArket');
        const myLotsBtn = document.querySelector('.MyLotsNFTMArket');
        if (allLotsBtn) allLotsBtn.style.color = '#FFFFFF';
        if (myLotsBtn) myLotsBtn.style.color = '#515151';
    });
}

// --- выделение кнопок при переключении ---
const allLotsBtn = document.querySelector('.AllLotsNFTMArket');
const myLotsBtn = document.querySelector('.MyLotsNFTMArket');
if (allLotsBtn && myLotsBtn) {
    allLotsBtn.addEventListener('click', () => {
        allLotsBtn.style.color = '#FFFFFF';
        myLotsBtn.style.color = '#515151';
        document.querySelector('.AllLotsMenu').style.display = 'block';
        document.querySelector('.MyLotsMenu').style.display = 'none';
        showAllLotsPanel();
    });
    myLotsBtn.addEventListener('click', () => {
        allLotsBtn.style.color = '#515151';
        myLotsBtn.style.color = '#FFFFFF';
        document.querySelector('.AllLotsMenu').style.display = 'none';
        document.querySelector('.MyLotsMenu').style.display = 'block';
        renderMyLotsMenu(null, sortByStars);
        showMyLotsPanel();
    });
}

// --- СОРТИРОВКА ПО ЗВЁЗДАМ В MyLotsMenu ---
let sortByStars = null; // null | 'desc' | 'asc'
let lastSearchQuery = '';
function countStars(starsStr) {
    if (!starsStr) return 0;
    return (starsStr.match(/★/g) || []).length;
}

// Оставляем только один рабочий обработчик сортировки:
const myLotsSortBtn = document.querySelector('.MyLotsMenu .ButtonPriseUp');
if (myLotsSortBtn) {
    myLotsSortBtn.addEventListener('click', () => {
        if (sortByStars === null || sortByStars === 'asc') {
            sortByStars = 'desc';
        } else {
            sortByStars = 'asc';
        }
        renderMyLotsMenu(null, sortByStars);
    });
}

// --- Исправить сортировку в renderMyLotsMenu ---
function renderMyLotsMenu(filteredSkins = null, sort = null) {
    ensureStandardSkin();
    const menu = document.querySelector('.MyLotsMenu');
    if (!menu) return;
    menu.innerHTML = '';
    let boughtSkins = [];
    // Собираем все купленные скины (даже если их нет в магазине)
    for (let key in localStorage) {
        if (key.startsWith('skin_') && key.endsWith('_data')) {
            const skinNumber = parseInt(key.split('_')[1]);
            const data = JSON.parse(localStorage.getItem(key));
            if (data && localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(data)) {
                boughtSkins.push({ ...data, skinNumber });
            }
        }
    }
    // Гарантируем, что стандартный скин всегда есть
    const standardKey = Object.keys(localStorage).find(key => key.startsWith('skin_') && key.endsWith('_data') && (JSON.parse(localStorage.getItem(key))?.name === 'Standard'));
    if (standardKey) {
        const skinNumber = parseInt(standardKey.split('_')[1]);
        const data = JSON.parse(localStorage.getItem(standardKey));
        const alreadyIn = boughtSkins.some(s => s.skinNumber === skinNumber);
        if (!alreadyIn) {
            boughtSkins.unshift({ ...data, skinNumber });
        }
    }
    // Standard всегда первый
    let standardSkin = boughtSkins.find(s => s.name === 'Standard');
    let otherSkins = boughtSkins.filter(s => s.name !== 'Standard');
    if (filteredSkins !== null) {
        boughtSkins = filteredSkins;
        standardSkin = boughtSkins.find(s => s.name === 'Standard');
        otherSkins = boughtSkins.filter(s => s.name !== 'Standard');
    }
    if (sort === 'desc') {
        otherSkins.sort((a, b) => countStars(b.stars) - countStars(a.stars));
    } else if (sort === 'asc') {
        otherSkins.sort((a, b) => countStars(a.stars) - countStars(b.stars));
    }
    boughtSkins = standardSkin ? [standardSkin, ...otherSkins] : otherSkins;
    // додумать что там дальше надо
}

function showAllLotsPanel() {
    const panel1 = document.querySelector('.BackPanrlAllMarket');
    const panel2 = document.querySelector('.BackPanrlAllMarket2');
    if (panel1) panel1.style.display = '';
    if (panel2) panel2.style.display = 'none';
}
function showMyLotsPanel() {
    const panel1 = document.querySelector('.BackPanrlAllMarket');
    const panel2 = document.querySelector('.BackPanrlAllMarket2');
    if (panel1) panel1.style.display = 'none';
    if (panel2) panel2.style.display = '';
}




// ===== Mini game =====


// Total NFT bonus


function getTotalNFTBonus() {
    let totalBonus = 0;
    
    // Проверяем все скины в localStorage
    for (let key in localStorage) {
        if (key.startsWith('skin_') && key.endsWith('_data')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                const skinNumber = parseInt(key.split('_')[1]);
                
                // Проверяем, что скин является NFT и куплен
                if (data && data.isNFT && 
                    localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(data)) {
                    totalBonus += data.bonusPercent || 0;
                }
            } catch (e) {
                console.error('Ошибка при обработке данных скина:', e);
            }
        }
    }
    
    return totalBonus;
}


document.addEventListener('DOMContentLoaded', () => {
    // Скрываем игровое поле изначально
    document.getElementById('GameOnTask').style.display = 'none';
    
    // Основные элементы игры
    let waterImage1, waterImage2;
    let leftRemainingElement, collectedCountElement, bestResultElement;
    let playBtn, playBtnText, currentPin, bestPin, gameField;
    let countdownElement;
    let imageRowerMiniGame, leftBtnMiniGame, rightBtnMiniGame, columnClipMiniGame;
    let gameObjectsLayer;
    let currentPosition = 1; // Центральная колонка по умолчанию
    
    // Параметры колонок
    const COLUMNS = [
        { x: 20, path: "M100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50V340C0 367.614 22.3858 390 50 390C77.6142 390 100 367.614 100 340V50Z" },
        { x: 145, path: "M226 50C226 22.3858 203.614 0 176 0C148.386 0 126 22.3858 126 50V340C126 367.614 148.386 390 176 390C203.614 390 226 367.614 226 340V50Z" },
        { x: 270, path: "M352 50C352 22.3858 329.614 0 302 0C274.386 0 252 22.3858 252 50V340C252 367.614 274.386 390 302 390C329.614 390 352 367.614 352 340V50Z" }
    ];
    
    // Границы gameObjectsLayer
    const GAME_LAYER_LEFT = 0.18 * 352;
    const GAME_LAYER_WIDTH = 0.64 * 352;
    const GAME_LAYER_RIGHT = GAME_LAYER_LEFT + GAME_LAYER_WIDTH;
    
    // Настройки игры
    const difficultyLevels = [
        { speed: 4, spawnRate: 1700 },
        { speed: 5, spawnRate: 1500 },
        { speed: 6, spawnRate: 1350 },
        { speed: 7, spawnRate: 1200 },
        { speed: 8, spawnRate: 1050 } 
    ];

    // Размеры объектов
    const OBSTACLE_WIDTH = 40;
    const OBSTACLE_HEIGHT = 40;
    const COIN_WIDTH = 25;
    const COIN_HEIGHT = 25;
    const PLAYER_WIDTH = 60;
    const PLAYER_HEIGHT = 155;
    const PLAYER_Y = 160;
    const PLAYER_BOTTOM = PLAYER_Y + PLAYER_HEIGHT;

    // Лимиты игры
    const MAX_DISTANCE = 15000;
    const RESET_TIME = 12 * 60 * 60 * 1000;
    
    // Состояние игры
    let waterPosition = 0;
    let obstacles = [];
    let coins = [];
    let score = 0;
    let distance = 0;
    let bestDistance = localStorage.getItem('bestDistance') || 0;
    let gameInterval;
    let isGameOver = false;
    let currentDifficulty = 0;
    let isGameStarted = false;
    let lastPlayTime = localStorage.getItem('lastPlayTime');
    let difficultyTimer;
    let isMoving = false;
    let isInputBlocked = false;
    let remainingAttempts = 0;
    let isProcessingTransaction = false;

    // Инициализация элементов игры
    function initGameElements() {
        waterImage1 = document.getElementById('waterImage1');
        waterImage2 = document.getElementById('waterImage2');
        leftRemainingElement = document.getElementById('leftRemaining');
        collectedCountElement = document.getElementById('collectedCount');
        bestResultElement = document.getElementById('bestResult');
        playBtn = document.querySelector('.PlayBtnMiniGame');
        playBtnText = playBtn.querySelector('p');
        currentPin = document.querySelector('.NoBestPinInLine');
        bestPin = document.querySelector('.BestPinInLine');
        gameField = document.querySelector('.GameFailed');
        gameObjectsLayer = document.querySelector('.gameObjectsLayer');
        
        // Настройка слоя для игровых объектов
        gameObjectsLayer.style.position = 'absolute';
        gameObjectsLayer.style.top = '0';
        gameObjectsLayer.style.left = '18%';
        gameObjectsLayer.style.width = '64%';
        gameObjectsLayer.style.height = '100%';
        gameObjectsLayer.style.overflow = 'hidden';
        gameObjectsLayer.style.pointerEvents = 'none';
        gameObjectsLayer.style.zIndex = '5';
        
        countdownElement = document.createElement('div');
        countdownElement.className = 'countdown';
        gameField.appendChild(countdownElement);
        
        imageRowerMiniGame = document.getElementById('centerImageOnCenterColomnFiled');
        leftBtnMiniGame = document.querySelector('.LeftBtnMiniGame');
        rightBtnMiniGame = document.querySelector('.RightBtnMiniGame');
        columnClipMiniGame = document.querySelector('#columnClip path');
        
        playBtn.addEventListener('click', handlePlayClick);
        setupInputHandlers();
        document.addEventListener('keydown', handleKeyDown);
        
        if (!imageRowerMiniGame || !columnClipMiniGame) {
            console.error("Элементы игрока или маски не найдены!");
            return;
        }

        // Сброс позиции при инициализации
        currentPosition = 1;
        imageRowerMiniGame.setAttribute('x', COLUMNS[1].x);
        columnClipMiniGame.setAttribute('d', COLUMNS[1].path);

        updatePlayButton();
        updateDistanceInfo();
    }

    function setupInputHandlers() {
        // Удаляем старые обработчики
        leftBtnMiniGame.removeEventListener('click', handleLeftClick);
        rightBtnMiniGame.removeEventListener('click', handleRightClick);
        leftBtnMiniGame.removeEventListener('touchstart', handleLeftTouch);
        rightBtnMiniGame.removeEventListener('touchstart', handleRightTouch);

        // Новые обработчики
        function handleLeftClick() {
            if (!isInputBlocked && isGameStarted) moveToPosition(currentPosition - 1);
        }
        
        function handleRightClick() {
            if (!isInputBlocked && isGameStarted) moveToPosition(currentPosition + 1);
        }
        
        function handleLeftTouch(e) {
            e.preventDefault();
            if (!isInputBlocked && isGameStarted) moveToPosition(currentPosition - 1);
        }
        
        function handleRightTouch(e) {
            e.preventDefault();
            if (!isInputBlocked && isGameStarted) moveToPosition(currentPosition + 1);
        }

        // Добавляем новые обработчики
        leftBtnMiniGame.addEventListener('click', handleLeftClick);
        rightBtnMiniGame.addEventListener('click', handleRightClick);
        leftBtnMiniGame.addEventListener('touchstart', handleLeftTouch, {passive: false});
        rightBtnMiniGame.addEventListener('touchstart', handleRightTouch, {passive: false});
    }
    
    function moveToPosition(newPosition) {
        if (!isGameStarted || !imageRowerMiniGame || !columnClipMiniGame || isMoving || isInputBlocked) {
            return;
        }

        newPosition = Math.max(0, Math.min(newPosition, COLUMNS.length - 1));
        if (newPosition === currentPosition) return;

        isMoving = true;
        isInputBlocked = true;
        currentPosition = newPosition;
        const column = COLUMNS[newPosition];

        // Обновляем позицию игрока
        imageRowerMiniGame.setAttribute('x', column.x);
        columnClipMiniGame.setAttribute('d', column.path);

        setTimeout(() => {
            isMoving = false;
            isInputBlocked = false;
        }, 150);
    }

    // Создание игровых объектов
    function spawnObjects() {
        if (isGameOver || !isGameStarted || !gameObjectsLayer) return;
        
        const spawnType = Math.random() < 0.7 ? 'obstacle' : 'coin';
        const lane = Math.floor(Math.random() * 3);
        const column = COLUMNS[lane];
        
        const width = spawnType === 'obstacle' ? OBSTACLE_WIDTH : COIN_WIDTH;
        const height = spawnType === 'obstacle' ? OBSTACLE_HEIGHT : COIN_HEIGHT;
        const yOffset = -height;

        // Вычисляем позицию объекта относительно игрового слоя
        const columnPosInLayer = column.x - GAME_LAYER_LEFT;
        let adjustedXPos;

        if (lane === 0) { // Левая колонка - смещаем на 3vw к центру
            const centerOffset = window.innerWidth * 0.15; // 3vw в пикселях
            adjustedXPos = columnPosInLayer + (PLAYER_WIDTH - width) / 2 + centerOffset;
        } else if (lane === 1) { // Центральная колонка - без смещения
            adjustedXPos = columnPosInLayer + (PLAYER_WIDTH - width) / 2;
        } else { // Правая колонка - смещаем на 3vw к центру
            const centerOffset = window.innerWidth * 0.15; // 3vw в пикселях
            adjustedXPos = columnPosInLayer + (PLAYER_WIDTH - width) / 2 - centerOffset;
        }

        const FINAL_CORRECTION = -7;
        adjustedXPos += FINAL_CORRECTION;

        // Создание элемента
        const element = document.createElement('div');
        element.className = spawnType;
        element.style.left = `${adjustedXPos}px`;
        element.style.top = `${yOffset}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.zIndex = '10';
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.style.position = 'absolute';
        
        if (spawnType === 'obstacle') {
            const obstacleImages = [
                'PicturesMiniGames/BottlesObstacles.png',
                'PicturesMiniGames/LogObstacle.png',
                'PicturesMiniGames/ManObstacles.png',
                'PicturesMiniGames/ObstacleBanks.png'
            ];
            const randomImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
            element.style.backgroundImage = `url(${randomImage})`;
            
            obstacles.push({
                element: element,
                lane: lane,
                top: yOffset,
                x: adjustedXPos, // Используем относительную позицию
                width: width,
                height: height,
                bottom: yOffset + height
            });
        } else {
            element.style.backgroundImage = 'url(PicturesMiniGames/CoinMiniGames1.png)';
            coins.push({
                element: element,
                lane: lane,
                top: yOffset,
                x: adjustedXPos, // Используем относительную позицию
                width: width,
                height: height,
                bottom: yOffset + height
            });
        }
        
        gameObjectsLayer.appendChild(element);
    }

    // Движение объектов
    function moveObjects() {
        if (isGameOver || !isGameStarted) return;

        distance += 0.83;
        if (distance >= MAX_DISTANCE) {
            distance = MAX_DISTANCE;
            gameOver();
            return;
        }
        
        updateDistanceInfo();
        
        // Движение препятствий
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            obstacle.top += difficultyLevels[currentDifficulty].speed;
            obstacle.bottom = obstacle.top + obstacle.height;
            obstacle.element.style.top = `${obstacle.top}px`;
            
            if (obstacle.top > 390) {
                obstacle.element.remove();
                obstacles.splice(i, 1);
            } else if (checkCollision(obstacle)) {
                gameOver();
                return;
            }
        }
        
        // Движение и начисление монет
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            coin.top += difficultyLevels[currentDifficulty].speed;
            coin.bottom = coin.top + coin.height;
            coin.element.style.top = `${coin.top}px`;
            
            if (coin.top > 390) {
                coin.element.remove();
                coins.splice(i, 1);
            } else if (checkCollision(coin)) {
                coin.element.remove();
                coins.splice(i, 1);
                
                // Рассчитываем бонус от NFT-скинов
                const nftBonus = getTotalNFTBonus();
                const baseReward = 10;
                const bonusReward = Math.round(baseReward * (nftBonus / 100));
                const totalReward = baseReward + bonusReward;
                
                score += totalReward;
                
                // С учетом бонуса
                addRow(totalReward);
                
                // Фактическое количество с бустом
                collectedCountElement.textContent = score;
            }
        }
    }
    
    function checkCollision(object) {
        if (object.lane !== currentPosition) return false;
        return object.top <= PLAYER_BOTTOM && object.bottom >= PLAYER_Y;
    }
    
    function handlePlayClick() {
        if (isProcessingTransaction) return;
        
        if (remainingAttempts > 0 || canPlayAgain()) {
            startCountdown();
        } else {
            buyAdditionalAttempts();
        }
    }

    function handleKeyDown(e) {
        if (!isGameStarted || isMoving || isInputBlocked) return;
        
        if (e.key === 'ArrowLeft') {
            moveToPosition(currentPosition - 1);
        } else if (e.key === 'ArrowRight') {
            moveToPosition(currentPosition + 1);
        }
    }

    function canPlayAgain() {
        if (!lastPlayTime) return true;
        return (Date.now() - lastPlayTime) >= RESET_TIME;
    }

    function updatePlayButton() {
        if (!playBtnText) return;
        
        if (remainingAttempts === 0 && !canPlayAgain()) {
            playBtnText.textContent = 'Buy';
        } else if (remainingAttempts > 0) {
            playBtnText.textContent = `Again`;
        } else {
            playBtnText.textContent = 'Play';
        }
    }

    function updateDistanceInfo() {
        if (!leftRemainingElement || !collectedCountElement || !bestResultElement) return;

        leftRemainingElement.textContent = Math.round(MAX_DISTANCE - distance);
        collectedCountElement.textContent = score;
        bestResultElement.textContent = Math.round(bestDistance);

        // Параметры области движения
        const track = document.querySelector('.ResultLineGame');
        const TRACK_WIDTH = track ? track.offsetWidth : 500;
        const AREA_PERCENT = 0.92; // 89% было 92% стало
        const AREA_WIDTH = TRACK_WIDTH * AREA_PERCENT;
        const START_OFFSET = (TRACK_WIDTH - AREA_WIDTH) / 2; // 4% от ширины

        // Текущий прогресс
        const currentProgress = Math.min(distance / MAX_DISTANCE, 1);
        const currentPos = START_OFFSET + (AREA_WIDTH * currentProgress);

        if (currentPin) {
            currentPin.style.left = `${currentPos}px`;
        }

        // Для лучшего результата
        const bestProgress = Math.min(bestDistance / MAX_DISTANCE, 1);
        const bestPos = START_OFFSET + (AREA_WIDTH * bestProgress);

        if (bestPin) {
            bestPin.style.left = `${bestPos}px`;
        }
    }
    
    let lastFlipTime = 0;
    let isFlipped = false;

    function animateWater(timestamp) {
        // Анимация воды
        waterPosition += 4;
        if (waterPosition >= 599) {
            waterPosition = 0;
        }
        waterImage1.setAttribute('y', waterPosition);
        waterImage2.setAttribute('y', waterPosition - 599);

        // Переворот персонажа каждые 300 мс
        if (!lastFlipTime || timestamp - lastFlipTime >= 300) {
            const centerImage = document.getElementById('centerImageOnCenterColomnFiled');
            
            if (isFlipped) {
                centerImage.style.transform = 'scaleX(1)'; // Возвращаем в исходное состояние
            } else {
                centerImage.style.transform = 'scaleX(-1)'; // Отражаем по горизонтали
            }
            
            isFlipped = !isFlipped;
            lastFlipTime = timestamp;
        }

        if (!isGameOver && isGameStarted) {
            requestAnimationFrame(animateWater);
        }
    }
    
    async function buyAdditionalAttempts() {
        if (!connectedWallet) {
            if (typeof tg !== 'undefined' && tg.showAlert) {
                tg.showAlert("Подключите кошелёк");
            }
            return;
        }
        
        if (isProcessingTransaction) return;
        
        isProcessingTransaction = true;
        updatePlayButton();

        try {
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 300,
                messages: [
                    {
                        address: 'UQDDEEbNMPfVwpL2q1zi5oAbChXADLuZp4gCOdFoHDmHo4Nn',
                        amount: "50000000",
                        message: "Покупка дополнительной попытки"
                    }
                ]
            };
            
            const result = await tonConnectUI.sendTransaction(transaction);
            if (result?.boc) {
                remainingAttempts += 1;
                updatePlayButton();
            }
        } catch (error) {
            console.error("Ошибка при оплате:", error);
        } finally {
            isProcessingTransaction = false;
            updatePlayButton();
        }
    }

    function gameOver() {
        isGameOver = true;
        isGameStarted = false;
        clearInterval(gameInterval);
        clearInterval(difficultyTimer);
        
        // Добавляем ROW-монеты за пройденное расстояние
        //const distanceReward = Math.floor(distance / 100) * 5; // 5 ROW за каждые 100 единиц расстояния
        //if (distanceReward > 0) {
        //    addRow(distanceReward);
        //}
        
        //if (distance > bestDistance) {
        //    bestDistance = distance;
        //    localStorage.setItem('bestDistance', bestDistance);
        //    // Бонус за новый рекорд
        //    const recordBonus = Math.floor(distance / 100) * 10; // 10 ROW за каждые 100 единиц нового рекорда
        //    if (recordBonus > 0) {
        //        addRow(recordBonus);
        //    }
        //}
        
        lastPlayTime = Date.now();
        localStorage.setItem('lastPlayTime', lastPlayTime);
        
        if (remainingAttempts > 0) {
            remainingAttempts--;
        }
        updatePlayButton();
        
        setTimeout(() => {
            resetGameUI();
        }, 500);
    }
    
    function resetGameUI() {
        document.querySelector('.MovementButtonsMiniGame').style.display = 'none';
        document.querySelector('.BottomProgressPanelCentred').style.bottom = '14.2%';
        document.querySelector('.PlayBtnMiniGame').style.display = 'flex';
        document.querySelector('.BackBtnOnMiniGameCentred').style.display = 'flex';
        document.querySelector('.TheResultLineGameCentred').style.bottom = '26%';
        document.querySelector('.ResultLineGame p').style.bottom = '26.2%';
        document.querySelector('.NoBestPinInLine').style.bottom = '26.2%';
        document.querySelector('.BestPinInLine').style.bottom = '26.2%';
        
        while (gameObjectsLayer.firstChild) {
            gameObjectsLayer.removeChild(gameObjectsLayer.firstChild);
        }
        obstacles = [];
        coins = [];
        
        // Сброс позиции игрока в центр
        currentPosition = 1;
        imageRowerMiniGame.setAttribute('x', COLUMNS[1].x);
        columnClipMiniGame.setAttribute('d', COLUMNS[1].path);
    }

    document.querySelector('.GagantOvalGameLeft').style.display = 'none';
    document.querySelector('.GagantOvalGameRight').style.display = 'none';

    function startCountdown() {
        // Принудительный сброс позиции
        currentPosition = 1;
        imageRowerMiniGame.setAttribute('x', COLUMNS[1].x);
        columnClipMiniGame.setAttribute('d', COLUMNS[1].path);

        if (!playBtn || !countdownElement) return;
        
        document.querySelector('.MovementButtonsMiniGame').style.display = 'block';
        document.querySelector('.BottomProgressPanelCentred').style.bottom = '35px';
        document.querySelector('.PlayBtnMiniGame').style.display = 'none';
        document.querySelector('.BackBtnOnMiniGameCentred').style.display = 'none';
        
        document.querySelector('.TheResultLineGameCentred').style.bottom = '17%';
        document.querySelector('.ResultLineGame p').style.bottom = '17.5%';
        document.querySelector('.NoBestPinInLine').style.bottom = '17.5%';
        document.querySelector('.BestPinInLine').style.bottom = '17.5%';
        
        playBtn.style.display = 'none';
        countdownElement.style.display = 'block';
        countdownElement.textContent = '3';
        Object.assign(countdownElement.style, {
            position: 'absolute',
            bottom: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '72px',
            color: 'white',
            zIndex: '100',
            textShadow: '0 0 10px rgba(0,0,0,0.8)'
        });
        
        const ovalLeft = document.querySelector('.GagantOvalGameLeft');
        const ovalRight = document.querySelector('.GagantOvalGameRight');
        
        ovalLeft.style.display = 'block';
        ovalRight.style.display = 'block';
        ovalLeft.style.opacity = '0';
        ovalRight.style.opacity = '0';
        ovalLeft.style.transition = 'opacity 0.3s, filter 0.3s';
        ovalRight.style.transition = 'opacity 0.3s, filter 0.3s';
        
        setTimeout(() => {
            ovalLeft.style.opacity = '1';
            ovalRight.style.opacity = '1';
            
            setTimeout(() => {
                ovalLeft.style.filter = 'blur(15px)';
                ovalRight.style.filter = 'blur(15px)';
                
                setTimeout(() => {
                    ovalLeft.style.filter = 'blur(3px)';
                    ovalRight.style.filter = 'blur(3px)';
                }, 300);
            }, 300);
        }, 10);
        
        let count = 3;
        const countdownInterval = setInterval(() => {
            count--;
            
            if (count > 0) {
                countdownElement.textContent = count;
                
                if (count === 1) {
                    setTimeout(() => {
                        ovalLeft.style.filter = 'blur(15px)';
                        ovalRight.style.filter = 'blur(15px)';
                        
                        setTimeout(() => {
                            ovalLeft.style.filter = 'blur(3px)';
                            ovalRight.style.filter = 'blur(3px)';
                            
                            setTimeout(() => {
                                ovalLeft.style.opacity = '0';
                                ovalRight.style.opacity = '0';
                            }, 200);
                        }, 300);
                    }, 300);
                }
            } else {
                countdownElement.textContent = 'GO!';
                
                setTimeout(() => {
                    countdownElement.style.display = 'none';
                    startGame();
                    clearInterval(countdownInterval);
                    
                    setTimeout(() => {
                        ovalLeft.style.display = 'none';
                        ovalRight.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }, 1000);
    }
    
    function startGame() {
        isGameStarted = true;
        isGameOver = false;
        score = 0;
        distance = 0;
        currentDifficulty = 0;
        
        // Гарантированный сброс позиции
        currentPosition = 1;
        imageRowerMiniGame.setAttribute('x', COLUMNS[1].x);
        columnClipMiniGame.setAttribute('d', COLUMNS[1].path);
        
        updateDistanceInfo();
        gameInterval = setInterval(spawnObjects, difficultyLevels[0].spawnRate);
        
        difficultyTimer = setInterval(() => {
            if (currentDifficulty < difficultyLevels.length - 1) {
                currentDifficulty++;
                clearInterval(gameInterval);
                gameInterval = setInterval(spawnObjects, difficultyLevels[currentDifficulty].spawnRate);
            }
        }, 60000);
        
        requestAnimationFrame(animateWater);
        
        function gameLoop() {
            moveObjects();
            if (!isGameOver && isGameStarted) {
                requestAnimationFrame(gameLoop);
            }
        }
        gameLoop();
    }

    // Обработчики переключения экранов
    document.getElementById('MiniGameRow1').addEventListener('click', () => {
        document.getElementById('taskMain').style.display = 'none';
        document.getElementById('bottombuttonsclass').style.display = 'none';
        document.getElementById('GameOnTask').style.display = 'block';
        setTimeout(initGameElements, 50);
    });
    
    document.querySelector('.BackBtnOnMiniGame').addEventListener('click', () => {
        document.getElementById('taskMain').style.display = 'block';
        document.getElementById('bottombuttonsclass').style.display = 'block';
        document.getElementById('GameOnTask').style.display = 'none';
    });
});





// ======== Widthdrow NFT =========









// ====== Story ====== // 



document.addEventListener('DOMContentLoaded', () => {
    const ShareAgeStory = document.querySelector('.ShareAgeStory');
    if (!ShareAgeStory) return;
    ShareAgeStory.addEventListener('click', async () => {
        const tg = window.Telegram?.WebApp;
        if (!tg || typeof tg.shareToStory !== 'function') return;
        let userAge = 25;
        if (tg.initDataUnsafe?.user?.id) {
            userAge = Math.floor(tg.initDataUnsafe.user.id / 1000000000);
        }
        ShareAgeStory.disabled = true;
        try {
            const imageUrl = 'https://mixagrech.github.io/rowlivefgfmkskefker/telegramHistory2.png';
            const params = {
                text: `Моему аккаунту Telegram: ${userAge} лет 🎮\nПрисоединяйся! 🚣‍♂️`,
                widget_link: {
                    url: 'https://t.me/rowlivebot/row',
                    name: 'Играть сейчас'
                }
            };
            tg.shareToStory(
                imageUrl,
                params,
                () => {
                    ShareAgeStory.disabled = false;
                }
            );
        } catch (e) {
            ShareAgeStory.disabled = false;
        }
    });
});

// === ДОБАВИТЬ/ЗАМЕНИТЬ после функции selectSkin ===

// --- ГАРАНТИЯ НАЛИЧИЯ СТАНДАРТНОГО СКИНА ---
function ensureStandardSkin() {
    // Проверяем, есть ли стандартный скин в localStorage, если нет — добавляем
    let found = false;
    for (let i = 1; i <= skinCounter; i++) {
        const data = JSON.parse(localStorage.getItem(`skin_${i}_data`) || 'null');
        if (data && data.name === 'Standard') {
            found = true;
            // Гарантируем, что он куплен
            localStorage.setItem(`skin_${i}_purchased`, 'true');
            break;
        }
    }
    if (!found) {
        // Добавляем стандартный скин первым
        skinCounter = 0; // сбрасываем, чтобы Standard был первым
        addSkin(
            "Standard", 
            "Skins/StandartSkin1.svg", 
            {
                gradient: 'linear-gradient(205.61deg, rgba(25, 25, 25, 0.75) 0%, rgba(73, 73, 73, 1) 100%)',
                borderColor: '#565656',
                stars: "☆☆☆☆☆"
            }
        );
        // Гарантируем, что он куплен
        localStorage.setItem(`skin_1_purchased`, 'true');
    }
}

// --- renderMyLotsMenu ---

function renderMyLotsMenu(filteredSkins = null, sort = null) {
    ensureStandardSkin();
    const menu = document.querySelector('.MyLotsMenu');
    if (!menu) return;
    menu.innerHTML = '';
    let boughtSkins = [];
    
    for (let key in localStorage) {
        if (key.startsWith('skin_') && key.endsWith('_data')) {
            const skinNumber = parseInt(key.split('_')[1]);
            const data = JSON.parse(localStorage.getItem(key));
            if (data && localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(data)) {
                boughtSkins.push({ ...data, skinNumber });
            }
        }
    }

    // Гарантируем, что стандартный скин всегда есть
    const standardKey = Object.keys(localStorage).find(key => key.startsWith('skin_') && key.endsWith('_data') && (JSON.parse(localStorage.getItem(key))?.name === 'Standard'));
    if (standardKey) {
        const skinNumber = parseInt(standardKey.split('_')[1]);
        const data = JSON.parse(localStorage.getItem(standardKey));
        const alreadyIn = boughtSkins.some(s => s.skinNumber === skinNumber);
        if (!alreadyIn) {
            boughtSkins.unshift({ ...data, skinNumber });
        }
    }

    boughtSkins.sort((a, b) => {
        if (a.name === 'Standard') return -1;
        if (b.name === 'Standard') return 1;
        return 0;
    });

    if (filteredSkins !== null) {
        boughtSkins = filteredSkins;
    }

    if (sort === 'desc') {
        boughtSkins.sort((a, b) => countStars(b.stars) - countStars(a.stars));
    } else if (sort === 'asc') {
        boughtSkins.sort((a, b) => countStars(a.stars) - countStars(b.stars));
    }

    const topBase = 58;
    const topStep = 36;

    const backPanel2 = document.querySelector('.BackPanrlAllMarket2');
    let nonSearchMsg = backPanel2 ? backPanel2.querySelector('.nonSearchSkin') : null;
    if (!nonSearchMsg && backPanel2) {
        nonSearchMsg = document.createElement('p');
        nonSearchMsg.className = 'nonSearchSkin';
        nonSearchMsg.textContent = 'Skin not found';
        backPanel2.appendChild(nonSearchMsg);
    }
    if (nonSearchMsg) nonSearchMsg.style.display = 'none';

    if (boughtSkins.length === 0) {
        if (nonSearchMsg) nonSearchMsg.style.display = 'block';
    } else {
        if (nonSearchMsg) nonSearchMsg.style.display = 'none';
        boughtSkins.forEach((skin, idx) => {
            let style;
            if (boughtSkins.length === 1) {
                const top = topBase;
                style = `position:absolute;left:20px;top:${top}%;width:40%;height:31%;z-index:2;`;
            } else {
                const isLeft = idx % 2 === 0;
                const row = Math.floor(idx / 2);
                const top = topBase + row * topStep;
                style = `position:absolute;${isLeft ? 'left:20px;' : 'right:20px;'}top:${top}%;width:40%;height:31%;z-index:2;`;
            }

            const form = document.createElement('div');
            form.className = 'MyLotsOnMarketplase';
            form.style = style;
            form.innerHTML = `
                <div class="TheSkinOnMarketMyLots" style="background: ${skin.gradient};">
                    <img src="${skin.imagePath}" alt="${skin.name}" class="StandardSkinOnMyLots">
                </div>
                <p class="SkinNameShopMy">${skin.name}</p>
                <p class="RarityOfTheSkinMyLots">${skin.stars || '☆☆☆☆☆'}</p>
                <div class="BoostPercentageSkinMArkMyLots">
                    <p class="BoostPercentForm2">${skin.isNFT ? `+${skin.bonusPercent}%` : '+0%'}</p>
                </div>
                <div class="PriceBtnMyLotsMarket" style="${skin.isNFT ? 'background: linear-gradient(90.01deg, #494949 0.01%, #151515 171.13%) !important;' : ''}">
                    <p class="PriceMyLotsMarket"><b>${skin.isNFT ? 'Mint' : 'Withdraw'}</b></p>
                </div>
            `;

            const btn = form.querySelector('.PriceBtnMyLotsMarket');
            if (btn) {
                btn.addEventListener('mousedown', () => {
                    btn.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        btn.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Обработка нажатия на кнопку Mint для NFT
                    if (skin.isNFT) {
                        mintNFT(skin.skinNumber);
                    } else {
                        // Логика для обычных скинов (Withdraw)
                        withdrawSkin(skin.skinNumber);
                    }
                });
            }
            menu.appendChild(form);
        });
    }

    const lotsNumb = document.querySelector('.AllLotsNumb');
    if (lotsNumb) {
        lotsNumb.textContent = `Total: ${boughtSkins.length} lot`;
    }
}

// Функция для минта NFT (заглушка)
function mintNFT(skinNumber) {
    console.log(`Minting NFT for skin ${skinNumber}`);
    // Здесь будет логика минта NFT на блокчейн
}

// Функция для вывода обычного скина (заглушка)
function withdrawSkin(skinNumber) {

    console.log(`Withdrawing skin ${skinNumber}`);

    // Здесь будет логика вывода скина
}

function searchMyLotsSkins() {
    const input = document.querySelector('.SearchPanelonNFTMarket');
    if (!input) return;
    // Очищаем строку поиска от потенциально опасных символов
    const query = input.value.replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s\-]/g, '').trim().toLowerCase();
    lastSearchQuery = query;
    if (query === '') {
        renderMyLotsMenu(null, sortByStars);
        return;
    }
    // Поиск только среди купленных скинов + стандартный
    let boughtSkins = [];
    for (let key in localStorage) {
        if (key.startsWith('skin_') && key.endsWith('_data')) {
            const skinNumber = parseInt(key.split('_')[1]);
            const data = JSON.parse(localStorage.getItem(key));
            if (data && localStorage.getItem(`skin_${skinNumber}_purchased`) === getSkinHash(data)) {
                boughtSkins.push({ ...data, skinNumber });
            }
        }
    }
    // Добавляем стандартный скин, если его нет
    const standardKey = Object.keys(localStorage).find(key => key.startsWith('skin_') && key.endsWith('_data') && (JSON.parse(localStorage.getItem(key))?.name === 'Standard'));
    if (standardKey) {
        const skinNumber = parseInt(standardKey.split('_')[1]);
        const data = JSON.parse(localStorage.getItem(standardKey));
        const alreadyIn = boughtSkins.some(s => s.skinNumber === skinNumber);
        if (!alreadyIn) {
            boughtSkins.unshift({ ...data, skinNumber });
        }
    }
    const found = boughtSkins.filter(skin => skin.name.toLowerCase().includes(query));
    if (found.length > 0) {
        renderMyLotsMenu(found, sortByStars);
    } else {
        renderMyLotsMenu([], sortByStars);
    }
}

// Обработчики поиска и сортировки (объявить переменные только один раз!)
const searchInput = document.querySelector('.SearchPanelonNFTMarket');
const searchBtn = document.querySelector('.SearchOnMarketplase');
const backBtnNFTMarket = document.querySelector('.BackBTNNFTMarket');

if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchMyLotsSkins();
        }
    });
}
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchMyLotsSkins();
    });
}
if (buttonPriseUp) {
    buttonPriseUp.addEventListener('click', () => {
        if (sortByStars === null || sortByStars === 'asc') {
            sortByStars = 'desc';
        } else {
            sortByStars = 'asc';
        }
        // Если есть активный поиск — сортировать найденные
        if (lastSearchQuery && lastSearchQuery !== '') {
            searchMyLotsSkins();
        } else {
            renderMyLotsMenu(null, sortByStars);
        }
    });
}
if (backBtnNFTMarket) {
    backBtnNFTMarket.addEventListener('click', () => {
        sortByStars = null;
        // Если есть активный поиск — сбросить поиск и показать все скины
        const input = document.querySelector('.SearchPanelonNFTMarket');
        if (input) input.value = '';
        lastSearchQuery = '';
        renderMyLotsMenu();
    });
}

// === КНОПКА СОРТИРОВКИ ДЛЯ ALL LOTS ===
const allLotsSortBtn = document.querySelector('.AllLotsMenu .ButtonPriseUp');
if (allLotsSortBtn) {
    allLotsSortBtn.addEventListener('click', () => {
        // Здесь сортировка не нужна, просто меняем иконку
        isPriceMarketUp = !isPriceMarketUp;
        allLotsSortBtn.innerHTML = '$' + (isPriceMarketUp ? upPriceSVG : downPriceSVG);
        // Количество лотов всегда 1
        const lotsNumb = document.querySelector('.AllLotsNumb');
        if (lotsNumb) {
            lotsNumb.textContent = 'Total: 1 lot';
        }
    });
}
// === КНОПКА СОРТИРОВКИ ДЛЯ MY LOTS ===
if (myLotsSortBtn) {
    myLotsSortBtn.addEventListener('click', () => {
        if (sortByStars === null || sortByStars === 'asc') {
            sortByStars = 'desc';
        } else {
            sortByStars = 'asc';
        }
        // Если есть активный поиск — сортировать найденные
        if (lastSearchQuery && lastSearchQuery !== '') {
            searchMyLotsSkins();
        } else {
            renderMyLotsMenu(null, sortByStars);
        }
    });
}

// --- ФУНКЦИЯ ДЛЯ УНИКАЛЬНОГО HASH СКИНА ---
function getSkinHash(skinData) {
    return btoa(encodeURIComponent(
        (skinData.name || '') + '|' + (skinData.imagePath || '') + '|' + (skinData.priceROW || '') + '|' + (skinData.priceTON || '')
    ));
}

// --- Фильтрация скинов для магазина по relevance ---
function renderShopSkins() {
    let shopSkins = [];
    for (let key in localStorage) {
        if (key.startsWith('skin_') && key.endsWith('_data')) {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && (data.relevance === 'Actively' || !data.relevance)) {
                shopSkins.push({ ...data });
            }
        }
    }

}



//Мгновенное добавление квестов


// Загрузка состояния игры при старте
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        gameState = JSON.parse(savedState);
        if (rowscoreElement) {
            rowscoreElement.textContent = gameState.rowscore;
        }
    }
}

// Сохранение состояния игры
function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Функция добавления квеста
function addTask(name, imagePath, reward, isLimitedTask = false, limitTimeTask = 0, onClickCode) {
    const taskMain = document.getElementById('taskMain');
    if (!taskMain) {
        console.error('Элемент taskMain не найден');
        return;
    }

    // Проверяем, является ли это разделом
    if (name === "chapter") {
        addChapterSeparator();
        return;
    }

    // Создаем уникальный ID для задания
    const taskId = `task_${name.replace(/\s+/g, '_').toLowerCase()}`;
    
    // Проверяем, не выполнено ли уже это задание
    if (localStorage.getItem(`completed_${taskId}`) === 'true') {
        console.log(`Задание "${name}" уже выполнено`);
        return;
    }
    
    // Для лимитированных квестов
    let endTime = 0;
    if (isLimitedTask) {
        try {
            const savedData = localStorage.getItem(`task_${taskId}_data`);
            const taskData = savedData ? JSON.parse(savedData) : {};
            
            endTime = taskData.endTime || (Date.now() + limitTimeTask);
            
            // Если время вышло - не создаем квест
            if (endTime <= Date.now()) {
                console.log(`Лимитированное задание "${name}" истекло`);
                return;
            }
            
            // Сохраняем данные квеста
            localStorage.setItem(`task_${taskId}_data`, JSON.stringify({
                endTime: endTime,
                isLimited: true
            }));
        } catch (e) {
            console.error('Ошибка обработки данных квеста:', e);
            endTime = Date.now() + limitTimeTask;
            localStorage.setItem(`task_${taskId}_data`, JSON.stringify({
                endTime: endTime,
                isLimited: true
            }));
        }
    }
    
    // Получаем все элементы и вычисляем позицию
    const allElements = Array.from(taskMain.children);
    let currentPosition = 40;
    let taskIndex = 0;

    // Проходим по всем элементам и вычисляем позицию для нового элемента
    for (const element of allElements) {
        if (element.classList.contains('taskCentred') && !element.classList.contains('chapter-separator')) {
            currentPosition += 15.7;
            taskIndex++;
        } else if (element.classList.contains('chapter-separator')) {
            currentPosition += 4;
        }
    }

    // Создаем уникальные классы
    const taskClass = `taskNumb${taskIndex + 1}`;
    const centredClass = `taskNumb${taskIndex + 1}Centred`;
    const separatorClass = `taskSeparator${taskIndex + 1}`;

    // HTML структура задачи
    const taskHTML = `
        <div class="${centredClass} taskCentred" data-task-id="${taskId}" style="top: ${currentPosition}%">
            <div class="${taskClass}">
                <img src="${imagePath}" alt="logo" class="Task${taskIndex + 1}logo">
                <p class="TaskName${taskIndex + 1}">${name}</p>
                <p class="TaskReward${taskIndex + 1}"><span>+${reward}</span><span>ROW</span></p>
                ${isLimitedTask ? `
                <div class="taskTimerContainer">
                    <div class="taskTimerDays"><p>0 DAYS</p></div>
                    <div class="taskTimerTime"><p>0 HOURS</p></div>
                </div>
                ` : ''}
                <svg class="arrowTask${taskIndex + 1}" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 14L8 7.5L1 1" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="${separatorClass} taskSeparator" data-separator-id="${taskId}" style="top: ${currentPosition + 15.7}%"></div>
    `;

    taskMain.insertAdjacentHTML('beforeend', taskHTML);

    // Добавляем стили для этой задачи
    const style = document.createElement('style');
    style.textContent = `
        .${centredClass} {
            position: absolute;
            width: 100%;
            height: 13.7%;
            display: flex;
            justify-content: center;
            transition: top 0.3s ease;
        }

        .${taskClass} {
            width: 86.8%;
            height: 100%;
            background-color: #131313;
            border-radius: 7px;
            border: 2px solid #3A3A3A;
            display: flex;
            align-items: center;
            position: relative;
        }

        .Task${taskIndex + 1}logo {
            position: absolute;
            left: 3%;
            width: 70px;
            object-fit: contain;
            border-radius: 7px;
        }

        .arrowTask${taskIndex + 1} {
            position: absolute;
            right: 8%;
            height: 16%;
        }

        .TaskName${taskIndex + 1} {
            position: absolute;
            font-size: 1rem;
            font-weight: 500;
            color: #FFFFFF;
            left: 31%;
            top: 17%;
            margin: 0;
        }

        .TaskReward${taskIndex + 1} {
            position: absolute;
            color: #7D7D7D;
            left: 31%;
            top: 40%;
            margin: 0;
        }

        .TaskReward${taskIndex + 1} span:first-child {
            font-size: 1rem;
            font-weight: 600;
        }

        .TaskReward${taskIndex + 1} span:last-child {
            font-weight: 400;
            font-size: 0.7rem;
            margin-left: 2px;
        }

        .${separatorClass} {
            position: absolute;
            width: 5px;
            height: 13.7%;
            left: 0;
            background-color: rgba(255, 255, 255, 0);
            pointer-events: none;
            transition: top 0.3s ease;
        }

        /* Стили для таймера */
        .taskTimerContainer {
            position: absolute;
            display: flex;
            gap: 5px;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
        }
        
        .taskTimerDays, 
        .taskTimerTime {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            padding: 2px 5px;
            border: 1px solid #266187;
        }
        
        .taskTimerDays p, 
        .taskTimerTime p {
            color: #FFF;
            font-size: 0.6rem;
            margin: 0;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);

    // Функция disappears для этого квеста
    const disappears = () => {
        localStorage.setItem(`completed_${taskId}`, 'true');
        
        const taskToRemove = taskMain.querySelector(`[data-task-id="${taskId}"]`);
        const separatorToRemove = taskMain.querySelector(`[data-separator-id="${taskId}"]`);
        
        if (taskToRemove) {
            // Плавное исчезновение
            taskToRemove.style.opacity = '0';
            taskToRemove.style.transform = 'translateY(-20px)';
        }
        if (separatorToRemove) {
            separatorToRemove.style.opacity = '0';
        }
        
        // Ждем завершения анимации и затем удаляем
        setTimeout(() => {
            if (taskToRemove) taskToRemove.remove();
            if (separatorToRemove) separatorToRemove.remove();
            
            // Плавно обновляем позиции ВСЕХ оставшихся элементов
            updateAllTaskPositionsWithAnimation();
            
            // Проверяем, можно ли скрыть разделы
            checkAndHideChapters();
        }, 300);
    };

    // Обработчик клика
    const taskElement = taskMain.querySelector(`.${taskClass}`);
    if (taskElement) {
        taskElement.addEventListener('click', () => {
            try {
                // Создаем объект thisQuest для управления квестом
                const thisQuest = {
                    id: taskId,
                    name: name,
                    reward: reward,
                    addReward: false,
                    complete: false,
                    element: taskElement,
                    disappears: disappears,
                    setAddReward: function(value) { 
                        this.addReward = value; 
                        if (value) {
                            // Начисляем награду
                            gameState.rowscore += this.reward;
                            // Обновляем отображение
                            if (rowscoreElement) {
                                rowscoreElement.textContent = gameState.rowscore;
                            }
                            // Сохраняем состояние игры
                            saveGameState();
                        }
                    },
                    setComplete: function(value) { 
                        this.complete = value; 
                        if (value) {
                            this.disappears();
                        }
                    }
                };

                // Выполняем пользовательский код с доступом к thisQuest
                new Function('thisQuest', `
                    try {
                        ${onClickCode}
                        
                        // Автоматическое завершение квеста если установлены флаги
                        if (thisQuest.addReward && thisQuest.complete) {
                            thisQuest.setComplete(true);
                        }
                    } catch(e) {
                        console.error('Ошибка в коде задания:', e);
                    }
                `)(thisQuest);
                
            } catch (error) {
                console.error('Ошибка выполнения кода задачи:', error);
            }
        });
    }

    // Обработчик ошибки изображения
    const imgElement = taskMain.querySelector(`.Task${taskIndex + 1}logo`);
    if (imgElement) {
        imgElement.onerror = function() {
            this.onerror = null;
            this.src = "Rowlogo.png";
        };
    }

    // Запускаем таймер для лимитированного квеста
    if (isLimitedTask && endTime > Date.now()) {
        startTaskTimer(taskId, endTime, disappears);
    }
}

// Функция для добавления разделителя раздела
function addChapterSeparator() {
    const taskMain = document.getElementById('taskMain');
    if (!taskMain) return;

    const chapterId = `chapter_${Date.now()}`;
    const allElements = Array.from(taskMain.children);
    let currentPosition = 40;

    // Вычисляем позицию для нового разделителя
    for (const element of allElements) {
        if (element.classList.contains('taskCentred') && !element.classList.contains('chapter-separator')) {
            currentPosition += 15.7;
        } else if (element.classList.contains('chapter-separator')) {
            currentPosition += 4;
        }
    }

    const chapterHTML = `
        <div class="chapter-separator" data-chapter-id="${chapterId}" style="top: ${currentPosition}%">
            <div class="chapter-line"></div>
        </div>
    `;

    taskMain.insertAdjacentHTML('beforeend', chapterHTML);
}

// Функция для плавного обновления позиций ВСЕХ элементов
function updateAllTaskPositionsWithAnimation() {
    const taskMain = document.getElementById('taskMain');
    if (!taskMain) return;

    const allElements = Array.from(taskMain.children)
        .filter(el => window.getComputedStyle(el).display !== 'none')
        .sort((a, b) => parseFloat(a.style.top || 0) - parseFloat(b.style.top || 0));
    
    let currentPosition = 40;
    
    allElements.forEach(element => {
        const targetPosition = currentPosition;
        
        if (element.classList.contains('taskCentred') && !element.classList.contains('chapter-separator')) {
            // Плавное перемещение квеста
            animateElementToPosition(element, targetPosition);
            
            const separatorId = element.dataset.taskId;
            const separator = taskMain.querySelector(`[data-separator-id="${separatorId}"]`);
            if (separator) {
                animateElementToPosition(separator, targetPosition + 15.7);
            }
            
            currentPosition += 15.7;
        } else if (element.classList.contains('chapter-separator')) {
            // Плавное перемещение разделителя
            animateElementToPosition(element, targetPosition);
            currentPosition += 4;
        }
    });
}

// Функция для плавной анимации перемещения элемента
function animateElementToPosition(element, targetPosition) {
    const startPosition = parseFloat(element.style.top || 0);
    
    if (Math.abs(startPosition - targetPosition) < 0.1) {
        element.style.top = `${targetPosition}%`;
        return;
    }
    
    element.style.top = `${targetPosition}%`;
}

// Функция для проверки и скрытия разделов
function checkAndHideChapters() {
    const taskMain = document.getElementById('taskMain');
    if (!taskMain) return;

    const chapters = Array.from(taskMain.querySelectorAll('.chapter-separator'))
        .filter(chapter => window.getComputedStyle(chapter).display !== 'none');
    
    chapters.forEach(chapter => {
        const chapterPosition = parseFloat(chapter.style.top || 0);
        const tasksAfterChapter = Array.from(taskMain.querySelectorAll('.taskCentred:not(.chapter-separator)'))
            .filter(task => {
                const taskPosition = parseFloat(task.style.top || 0);
                return taskPosition > chapterPosition && window.getComputedStyle(task).display !== 'none';
            });
        
        // Если после раздела нет задач или все задачи завершены
        const allCompleted = tasksAfterChapter.every(task => {
            const taskId = task.dataset.taskId;
            return localStorage.getItem(`completed_${taskId}`) === 'true';
        });
        
        if (tasksAfterChapter.length === 0 || allCompleted) {
            // Плавное скрытие раздела
            chapter.style.opacity = '0';
            chapter.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                chapter.style.display = 'none';
                // После скрытия раздела плавно обновляем позиции
                updateAllTaskPositionsWithAnimation();
            }, 300);
        }
    });
}



// === Функция для удаления разделителя выше определенного квеста ===


function removeChapterAboveTask(taskId) {
    const taskMain = document.getElementById('taskMain');
    if (!taskMain) return;

    const taskElement = taskMain.querySelector(`[data-task-id="${taskId}"]`);
    if (!taskElement) return;

    const taskPosition = parseFloat(taskElement.style.top || 0);
    
    // Находим все разделители выше этой позиции
    const chaptersAbove = Array.from(taskMain.querySelectorAll('.chapter-separator'))
        .filter(chapter => {
            const chapterPosition = parseFloat(chapter.style.top || 0);
            return chapterPosition < taskPosition && window.getComputedStyle(chapter).display !== 'none';
        })
        .sort((a, b) => parseFloat(b.style.top || 0) - parseFloat(a.style.top || 0)); // Сортируем сверху вниз

    if (chaptersAbove.length === 0) return;

    // Удаляем самый нижний разделитель (ближайший к заданию)
    const chapterToRemove = chaptersAbove[0];
    
    // Плавно скрываем разделитель
    chapterToRemove.style.opacity = '0';
    chapterToRemove.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        chapterToRemove.style.display = 'none';
        
        // После скрытия разделителя обновляем позиции всех элементов
        updateAllTaskPositionsWithAnimation();
    }, 300);
}




// Глобальный объект для хранения таймеров квестов
const taskTimers = {};

function startTaskTimer(taskId, endTime, disappearsCallback) {
    // Останавливаем предыдущий таймер, если был
    if (taskTimers[taskId]) {
        clearInterval(taskTimers[taskId]);
        delete taskTimers[taskId];
    }

    function updateTimer() {
        const now = Date.now();
        const timeLeft = endTime - now;
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const isCompleted = localStorage.getItem(`completed_${taskId}`) === 'true';

        // Если квест выполнен - останавливаем таймер
        if (isCompleted) {
            clearInterval(taskTimers[taskId]);
            delete taskTimers[taskId];
            return;
        }

        if (timeLeft <= 0) {
            // Удаляем квест
            disappearsCallback();
            clearInterval(taskTimers[taskId]);
            delete taskTimers[taskId];
            return;
        }

        // Рассчитываем оставшееся время
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Обновляем отображение таймера
        const daysElement = taskElement?.querySelector('.taskTimerDays p');
        const timeElement = taskElement?.querySelector('.taskTimerTime p');

        if (daysElement && timeElement) {
            if (days > 0) {
                daysElement.textContent = `${days} DAY${days !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${Math.floor(hours)} HOUR${Math.floor(hours) !== 1 ? 'S' : ''}`;
            } else if (hours > 0) {
                daysElement.textContent = `${Math.floor(hours)} HOUR${Math.floor(hours) !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${Math.floor(minutes)} MIN${Math.floor(minutes) !== 1 ? 'S' : ''}`;
            } else {
                daysElement.textContent = `${Math.floor(minutes)} MIN${Math.floor(minutes) !== 1 ? 'S' : ''}`;
                timeElement.textContent = `${seconds} SEC${seconds !== 1 ? 'S' : ''}`;
            }
        }
    }

    // Обновляем сразу и затем каждую секунду
    updateTimer();
    taskTimers[taskId] = setInterval(updateTimer, 1000);
}

// Инициализация таймеров при загрузке страницы
function initializeTaskTimers() {
    const taskKeys = Object.keys(localStorage).filter(key => key.startsWith('task_') && key.endsWith('_data'));

    for (const key of taskKeys) {
        try {
            const taskId = key.replace('_data', '');
            const savedData = localStorage.getItem(key);
            
            if (!savedData) continue;
            
            const taskData = JSON.parse(savedData);
            
            if (taskData.isLimited && taskData.endTime && !localStorage.getItem(`completed_${taskId}`)) {
                const disappears = () => {
                    const taskMain = document.getElementById('taskMain');
                    if (!taskMain) return;
                    
                    const taskToRemove = taskMain.querySelector(`[data-task-id="${taskId}"]`);
                    const separatorToRemove = taskMain.querySelector(`[data-separator-id="${taskId}"]`);
                    
                    if (taskToRemove) taskToRemove.remove();
                    if (separatorToRemove) separatorToRemove.remove();
                    
                    // Обновляем позиции оставшихся квестов
                    const remainingTasks = Array.from(taskMain.querySelectorAll('.taskCentred'))
                        .sort((a, b) => parseFloat(a.style.top) - parseFloat(b.style.top));
                    
                    remainingTasks.forEach((task, index) => {
                        const newTop = 40 + (index * 15.7);
                        task.style.top = `${newTop}%`;
                        
                        const separatorId = task.dataset.taskId;
                        const separator = taskMain.querySelector(`[data-separator-id="${separatorId}"]`);
                        if (separator) separator.style.top = `${newTop + 15.7}%`;
                    });
                };
                
                if (taskData.endTime > Date.now()) {
                    startTaskTimer(taskId, taskData.endTime, disappears);
                } else {
                    // Время вышло - удаляем квест
                    disappears();
                    localStorage.removeItem(key);
                }
            }
        } catch (e) {
            console.error('Ошибка инициализации таймера для квеста:', key, e);
        }
    }
}

// Вызываем инициализацию при загрузке
window.addEventListener('DOMContentLoaded', initializeTaskTimers);



// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    
    addTask(
        "NFT Taso", 
        "Rowlogo.png",
        20,
        false,
        0,
        `// Устанавливаем флаги
        addSkin(
            "Test NFT2", 
            "Skins/ChampSkin1.svg",
            null, // miniGameImagePath не нужен для NFT
            {
                bonusPercent: 0, // Это делает скин NFT
                gradient: 'linear-gradient(205deg, rgba(0, 51, 28, 1) 0%, rgba(0, 82, 130, 1) 100%)',
                stars: "★★★★★"
            }
        );

        thisQuest.setAddReward(true);
        thisQuest.setComplete(true);
        `
    );

    addTask(
        "Test quest4k67", 
        "Rowlogo.png",
        20,
        true, // isLimitedTask
        3600000, // limitTimeTask в миллисекундах (1 час)
        `
        thisQuest.setAddReward(true); 
        thisQuest.setComplete(true);
        `
    );


    // Обычные квесты
    addTask(
        "NFT Taskавf5ыc", 
        "Rowlogo.png",
        20,
        false,
        0,
        `// Устанавливаем флаги
        thisQuest.setAddReward(true);
        thisQuest.setComplete(true);
        `
    );

    // Раздел
    addTask("chapter");

    // Квест после раздела
    addTask(
        "Test quest4f7dsиgд", 
        "Rowlogo.png",
        20,
        false,
        0,
        `
        thisQuest.setAddReward(true); 
        thisQuest.setComplete(true);
        `
    );
    addTask(
        "Test quest47ffdдвsg", 
        "Rowlogo.png",
        20,
        false,
        0,
        `
        thisQuest.setAddReward(true); 
        thisQuest.setComplete(true);
        `
    );
    addTask(
        "Test quest47ffdпвsдg", 
        "Rowlogo.png",
        20,
        false,
        0,
        `
        thisQuest.setAddReward(true); 
        thisQuest.setComplete(true);
        `
    );
});



// ===== Settings screen =====

const BtnSettingsOnProfile = document.querySelector('.BtnSettingsOnProfile');
const SettingsScreen = document.getElementById('SettingsScreen').style.display = 'none';

BtnSettingsOnProfile.addEventListener('click', () => {
    document.getElementById('SettingsScreen').style.display = 'block';
    document.getElementById('ProfileMain').style.display = 'none';
});

const BackBtnOnSettings = document.querySelector('.BackBtnOnSettings');

BackBtnOnSettings.addEventListener('click', () => {
    document.getElementById('SettingsScreen').style.display = 'none';
    document.getElementById('ProfileMain').style.display = 'block';
});


// ### avatar ###

function setupUserAvatarSettings() {
    const avatarContainer = document.querySelector(".UserAvatarSettings");
    if (!avatarContainer || !window.Telegram?.WebApp) return;

    const user = Telegram.WebApp.initDataUnsafe?.user;

    if (user?.photo_url) {
        const img = document.createElement("img");
        img.src = user.photo_url;
        img.onerror = () => showFallbackAvatarSettings(user); // Если фото не загрузилось
        avatarContainer.appendChild(img);
    } else {
        showFallbackAvatarSettings(user); // Показываем заглушку
    }
}

showFallbackAvatar
function showFallbackAvatarSettings() {
    const avatarContainer = document.querySelector(".UserAvatarSettings");
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0C12.6392 0 10.8546 0.743222 9.53885 2.06616C8.22307 3.38911 7.48387 5.1834 7.48387 7.05433C7.48387 8.92525 8.22307 10.7195 9.53885 12.0425C10.8546 13.3654 12.6392 14.1087 14.5 14.1087C16.3608 14.1087 18.1454 13.3654 19.4612 12.0425C20.7769 10.7195 21.5161 8.92525 21.5161 7.05433C21.5161 5.1834 20.7769 3.38911 19.4612 2.06616C18.1454 0.743222 16.3608 0 14.5 0ZM7.01613 17.871C5.15534 17.871 3.37076 18.6142 2.05498 19.9371C0.739197 21.2601 0 23.0544 0 24.9253V27.1601C0 28.5785 1.02155 29.7862 2.41355 30.0138C10.4175 31.3287 18.5825 31.3287 26.5865 30.0138C27.2597 29.9024 27.8717 29.5545 28.3137 29.0319C28.7557 28.5094 28.9989 27.8461 29 27.1601V24.9253C29 23.0544 28.2608 21.2601 26.945 19.9371C25.6292 18.6142 23.8447 17.871 21.9839 17.871H21.3477C20.9985 17.8722 20.6592 17.9261 20.3299 18.0327L18.7097 18.5651C15.9743 19.463 13.0257 19.463 10.2903 18.5651L8.67006 18.0327C8.34166 17.9268 7.99901 17.8723 7.65413 17.871H7.01613Z" fill="white"/>
        </svg>
    `;
}

setupUserAvatarSettings();


// ### First and last name ### 



// ### Open Support contact ###

document.querySelector('.Support').addEventListener('click', () => {
    window.open('https://t.me/RL_Cooperation', '_blank');
});
