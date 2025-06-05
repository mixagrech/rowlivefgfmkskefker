document.ondragstart = noselect;
document.onselectstart = noselect;
function noselect() {return false;}

let tg = window.Telegram.WebApp;

let champrangt = document.getElementById('heder_acc_age');
let accountage = document.getElementById('account_age').style.display = 'none';
let buttonbackage_btn = document.getElementById('buttonbackage_btn');

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

buttonbackage_btn.addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('account_age').style.display = 'none';
    document.getElementById("user-avatar").style.display = "none"; // Скрываем аватар
})

var rowscore = 0;

var score = document.getElementById('rowscore');



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
    // Если награда еще не получалась
    if (!gameState.lastDailyClaim) return true;
    
    const lastClaim = new Date(gameState.lastDailyClaim);
    const now = new Date();
    const hoursPassed = (now - lastClaim) / (1000 * 60 * 60);
    
    // Если прошло больше 48 часов - полный сброс
    if (hoursPassed >= RESET_HOURS) {
        gameState.dailyStreak = 0;
        saveGameState();
        return true;
    }
    
    // Если прошло больше 24 часов - награда доступна
    return hoursPassed >= REWARD_COOLDOWN_HOURS;
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
    if (rowscoreElement) {
        rowscoreElement.textContent = gameState.rowscore;
    }
}

// Показать экран награды
function showDailyReward() {
    if (!dailyRewardScreen) return;
    
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
    
    // Проверяем, не пропустил ли игрок более 48 часов
    if (lastClaim) {
        const hoursPassed = (now - lastClaim) / (1000 * 60 * 60);
        if (hoursPassed >= RESET_HOURS) {
            gameState.dailyStreak = 0;
        }
    }
    
    // Выдаем награду
    addRow(getDailyReward());
    
    // Обновляем дату получения
    gameState.lastDailyClaim = now.toISOString();
    
    // Увеличиваем счетчик дней
    gameState.dailyStreak++;
    
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


// ===== ФУНКЦИЯ ДЛЯ СЛУЧАЙНЫХ ЧИСЕЛ ===== //
function getRandomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

// Генерируем случайное количество монет
const randomNumbRewDay = getRandomInRange(500, 1000);

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
        // Добавляем монеты
        await addRow(randomNumbRewDay);
        
        // Обновляем состояние
        ageRewardState = {
            claimed: true,
            amount: randomNumbRewDay
        };
        saveAgeRewardState();
        
        // Обновляем отображение
        usernameonAgeRewardID.textContent = randomNumbRewDay;
        
        // Обновляем глобальный счет
        if (typeof loadRowScore === 'function') {
            await loadRowScore();
        }
        
        // Показываем уведомление
        if (window.Telegram?.WebApp?.showAlert) {
            console.log(`🎉 Вы получили ${randomNumbRewDay} монет за возраст!`);
        } else {
            console.log(`🎉 Вы получили ${randomNumbRewDay} монет за возраст!`);
        }
    } catch (e) {
        console.error('Ошибка при выдаче награды:', e);
        if (window.Telegram?.WebApp?.showAlert) {
            console.log('⚠️ Ошибка при получении награды');
        } else {
            console.log('⚠️ Ошибка при получении награды');
        }
    }
}

// Инициализация системы наград
function initAgeReward() {
    loadAgeRewardState();
    usernameonAgeRewardID.textContent = ageRewardState.claimed 
        ? ageRewardState.amount 
        : randomNumbRewDay;

    if (buttonbackage_btn) {
        buttonbackage_btn.addEventListener('click', ageReward);
    } else {
        console.error('Элемент buttonbackage_btn не найден');
    }
}

if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    usernameonAgeID.innerHTML = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
} else {
    usernameonAgeID.innerHTML = "Пользователь не найден";
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initAgeReward();
});

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

// Загрузка текущего счета из localStorage при старте
let currentRowScore = 0;

// Инициализация цветов рангов
function initRankColors() {
    document.querySelector('.PathLine1').setAttribute('stroke', '#004C75');
    document.querySelector('.PathLine2').setAttribute('stroke', '#004C75');
    
    document.querySelector('.PathCircle3').setAttribute('fill', '#97DBFF');
    document.querySelector('.PathCircle3').setAttribute('stroke', '#0087CF');
    
    document.querySelector('.PathCircle2').setAttribute('fill', '#97DBFF');
    document.querySelector('.PathCircle2').setAttribute('stroke', '#0087CF');
    
    document.querySelector('.PathCircle1').setAttribute('fill', '#358344');
    document.querySelector('.PathCircle1').setAttribute('stroke', '#57E873');
}

// Проверка и обновление ранга
function updateRankSystem() {
    // Загружаем актуальное значение из localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
        const parsed = JSON.parse(savedState);
        currentRowScore = parseInt(parsed.rowscore) || 0;
    }

    // Находим текущий ранг
    const currentRank = RANKS.find(rank => 
        currentRowScore >= rank.min && currentRowScore < rank.max
    );
    
    // Обновляем отображение
    if (currentRank) {
        document.getElementById('champrangtitle').textContent = currentRank.name;
        document.getElementById('RankOnPath').textContent = currentRank.name;
        updateRankColors(currentRowScore);
    }
}

// Функция обновления цветов ранга
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
    document.querySelector('.PathLine1').setAttribute('stroke', '#004C75');
    document.querySelector('.PathLine2').setAttribute('stroke', '#004C75');
    document.querySelector('.PathCircle3').setAttribute('fill', defaultColors.fill);
    document.querySelector('.PathCircle3').setAttribute('stroke', defaultColors.stroke);
    document.querySelector('.PathCircle2').setAttribute('fill', defaultColors.fill);
    document.querySelector('.PathCircle2').setAttribute('stroke', defaultColors.stroke);
    document.querySelector('.PathCircle1').setAttribute('fill', activeColors.fill);
    document.querySelector('.PathCircle1').setAttribute('stroke', activeColors.stroke);

    // Последовательно применяем цвета в зависимости от счета
    if (score >= 1000) {
        // Активируем второй круг и первую линию
        document.querySelector('.PathCircle2').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle2').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine1').setAttribute('stroke', '#404040');
        document.querySelector('.PathCircle1').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle1').setAttribute('stroke', activeColors.stroke);
    }
    
    if (score >= 5000) {
        // Активируем третий круг и вторую линию
        document.querySelector('.PathCircle3').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle3').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine2').setAttribute('stroke', '#404040');
        // Предыдущие элементы остаются активными
        document.querySelector('.PathCircle2').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle2').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathCircle1').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle1').setAttribute('stroke', activeColors.stroke);
    }
    
    if (score >= 15000) {
        // Активируем четвертый круг и третью линию
        document.querySelector('.PathCircle4').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle4').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine3').setAttribute('stroke', '#404040');
        // Все предыдущие элементы остаются активными
    }
    
    if (score >= 50000) {
        // Активируем пятый круг и четвертую линию
        document.querySelector('.PathCircle5').setAttribute('fill', activeColors.fill);
        document.querySelector('.PathCircle5').setAttribute('stroke', activeColors.stroke);
        document.querySelector('.PathLine4').setAttribute('stroke', '#404040');
        // Все предыдущие элементы остаются активными
    }
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
});



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

        // Обновляем счетчик
        updateFriendsCounter(data.referrals?.length || 0);

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
        // Достаём предыдущее значение из data-атрибута (или 0, если его нет)
        const lastCount = parseInt(counter.dataset.lastCount) || 0;
        
        // Обновляем счетчик
        counter.textContent = `${count}/15 friends`;
        counter.dataset.lastCount = count; // Сохраняем текущее значение
        
        if (count > lastCount) {
            const newFriends = count - lastCount;
            const reward = newFriends * 120;
            addRow(reward);
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
});
document.querySelector('.PanelOnBackAttention').addEventListener('click', () => {
    document.querySelector('.AttentionTextOnClick').style.display = 'none';
});

//Buying a skin for TON and equeped 

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://mixagrech.github.io/rowlivefgfmkskefker/tonconnect-manifest.json',
    buttonRootId: 'ton-connect',
    bridgeUrl: 'https://bridge.tonapi.io/bridge'
});

tonConnectUI.uiOptions = {
    twaReturnUrl: 'https://t.me/rowlivebot'
};

let connectedWallet = null;
let isProcessingTransaction = false;
let isSelected1 = true; // Первый скин выбран по умолчанию
let isSelected2 = false;

// Функция для безопасного получения элементов
function getElement(selector) {
    const el = document.querySelector(selector);
    if (!el) console.error(`Элемент не найден: ${selector}`);
    return el;
}

// Функция для принудительной загрузки изображений
function loadSkinImages() {
    try {
        const skin1 = getElement('.youeScinSelectedStandart1');
        const skin2 = getElement('.youeScinSelectedStandart2');
        
        if (skin1 && isSelected1) {
            skin1.src = '';
            skin1.src = 'Skins/StandartSkin1.svg?' + Date.now();
            console.log('StandartSkin1 перезагружен');
        }
        
        if (skin2 && isSelected2) {
            skin2.src = '';
            skin2.src = 'Skins/GoodManSkin1.svg?' + Date.now();
            console.log('GoodManSkin1 перезагружен');
        }
    } catch (e) {
        console.error('Ошибка при загрузке изображений:', e);
    }
}

// Обновление отображения скинов
function updateSkinDisplay() {
    try {
        const skin1 = getElement('.youeScinSelectedStandart1');
        const skin2 = getElement('.youeScinSelectedStandart2');
        
        if (skin1) {
            skin1.style.display = isSelected1 ? 'block' : 'none';
            if (isSelected1) {
                if (!skin1.src.includes('StandartSkin1.svg')) {
                    skin1.src = 'Skins/StandartSkin1.svg';
                }
                skin1.onerror = () => {
                    console.error('Ошибка загрузки StandartSkin1');
                    loadSkinImages();
                };
            }
        }
        
        if (skin2) {
            skin2.style.display = isSelected2 ? 'block' : 'none';
            if (isSelected2) {
                if (!skin2.src.includes('GoodManSkin1.svg')) {
                    skin2.src = 'Skins/GoodManSkin1.svg';
                }
                skin2.onerror = () => {
                    console.error('Ошибка загрузки GoodManSkin1');
                    loadSkinImages();
                };
            }
        }
        
        // Дополнительная проверка через 500мс
        setTimeout(() => {
            if (isSelected1 && skin1 && !skin1.complete) {
                loadSkinImages();
            }
            if (isSelected2 && skin2 && !skin2.complete) {
                loadSkinImages();
            }
        }, 500);
    } catch (e) {
        console.error('Ошибка в updateSkinDisplay:', e);
    }
}

// Функция для обновления состояния кнопок
function updateSkinButtons() {
    try {
        const btn1 = getElement('.BtnClaimSkin1');
        const btn2 = getElement('.BtnClaimSkin2');
        
        if (btn1) {
            const textEl = btn1.querySelector('p') || document.createElement('p');
            textEl.textContent = isSelected1 ? 'Selected' : 'Unselected';
            btn1.innerHTML = '';
            btn1.appendChild(textEl);
            btn1.style.background = isSelected1 
                ? 'linear-gradient(to right, #A40000, #272727)' 
                : 'linear-gradient(90deg, #494949 0.01%, #151515 171.13%)';
        }
        
        if (btn2) {
            const textEl = btn2.querySelector('p') || document.createElement('p');
            if (!connectedWallet) {
                textEl.innerHTML = '<span style="font-size: 0.7rem;">Connect <b style="font-size: 0.8rem; font-weight: 500;">TON</b> wallet</span>';
                btn2.style.background = 'linear-gradient(90deg, #0088CC 0%, #272727 100%)';
                btn2.style.pointerEvents = 'none';
            } else {
                const isPurchased = localStorage.getItem('skin2Purchased') === 'true';
                textEl.textContent = isSelected2 
                    ? 'Selected' 
                    : (isPurchased ? 'Unselected' : '0,45 TON');
                btn2.style.background = isSelected2 
                    ? 'linear-gradient(to right, #A40000, #272727)' 
                    : (isPurchased ? 'linear-gradient(90deg, #494949 0.01%, #151515 171.13%)' 
                                  : 'linear-gradient(90deg, #0088CC 0%, #272727 100%)');
                btn2.style.pointerEvents = 'auto';
            }
            btn2.innerHTML = '';
            btn2.appendChild(textEl);
        }
    } catch (e) {
        console.error('Ошибка в updateSkinButtons:', e);
    }
}

// Функция для отправки транзакции
async function sendPayment() {
    if (!connectedWallet || isProcessingTransaction) return;
    
    isProcessingTransaction = true;
    updateSkinButtons();

    try {
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 300,
            messages: [
                {
                    address: 'UQDDEEbNMPfVwpL2q1zi5oAbChXADLuZp4gCOdFoHDmHo4Nn',
                    amount: "0",
                    message: "Покупка скина в приложении"
                }
            ]
        };

        const result = await tonConnectUI.sendTransaction(transaction);
        if (result?.boc) {
            localStorage.setItem('skin2Purchased', 'true');
            selectSkin2();
        }
    } catch (error) {
        console.error("Ошибка при оплате:", error);
    } finally {
        isProcessingTransaction = false;
        updateSkinButtons();
    }
}

// Выбрать первый скин
function selectSkin1() {
    if (!connectedWallet) {
        console.log('Пожалуйста, подключите кошелек для выбора скина');
        return;
    }
    
    isSelected1 = true;
    isSelected2 = false;
    updateSkinButtons();
    updateSkinDisplay();
    localStorage.setItem('lastSelectedSkin', 'skin1');
}

// Выбрать второй скин
function selectSkin2() {
    if (!connectedWallet) {
        console.log('Пожалуйста, подключите кошелек для выбора скина');
        return;
    }
    
    if (localStorage.getItem('skin2Purchased') !== 'true') return;
    
    isSelected2 = true;
    isSelected1 = false;
    updateSkinButtons();
    updateSkinDisplay();
    localStorage.setItem('lastSelectedSkin', 'skin2');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Создаем контейнер для скинов если его нет
    let skinContainer = document.querySelector('.skin-images-container');
    if (!skinContainer) {
        skinContainer = document.createElement('div');
        skinContainer.className = 'skin-images-container';
        skinContainer.style.position = 'relative';
        document.body.appendChild(skinContainer);
    }

    // Создаем элементы изображений если их нет
    if (!document.querySelector('.youeScinSelectedStandart1')) {
        const img1 = document.createElement('img');
        img1.className = 'youeScinSelectedStandart1';
        img1.style.position = 'absolute';
        img1.style.width = '63.5%';
        img1.style.height = '33%';
        img1.style.left = '15%';
        img1.style.top = '82%';
        img1.style.zIndex = '6';
        img1.style.display = 'block';
        img1.alt = 'Standart Skin';
        img1.src = 'Skins/StandartSkin1.svg';
        skinContainer.appendChild(img1);
    }

    if (!document.querySelector('.youeScinSelectedStandart2')) {
        const img2 = document.createElement('img');
        img2.className = 'youeScinSelectedStandart2';
        img2.style.position = 'absolute';
        img2.style.width = '63.5%';
        img2.style.height = '33%';
        img2.style.left = '15%';
        img2.style.top = '82%';
        img2.style.zIndex = '5';
        img2.style.display = 'none';
        img2.alt = 'GoodMan Skin';
        img2.src = 'Skins/GoodManSkin1.svg';
        skinContainer.appendChild(img2);
    }

    // Инициализация кнопок
    const btn1 = document.querySelector('.BtnClaimSkin1');
    const btn2 = document.querySelector('.BtnClaimSkin2');
    
    if (btn1) {
        btn1.addEventListener('click', selectSkin1);
        // Устанавливаем первый скин выбранным по умолчанию
        const p = btn1.querySelector('p') || document.createElement('p');
        p.textContent = 'Selected';
        btn1.innerHTML = '';
        btn1.appendChild(p);
        btn1.style.background = 'linear-gradient(to right, #A40000, #272727)';
    }
    
    if (btn2) {
        btn2.addEventListener('click', () => {
            if (!connectedWallet) {
                console.log('Пожалуйста, подключите кошелек');
                return;
            }
            
            if (localStorage.getItem('skin2Purchased') === 'true') {
                selectSkin2();
            } else {
                sendPayment();
            }
        });
    }
    
    // Восстановление состояния
    updateSkinButtons();
    updateSkinDisplay();
    
    // Проверка подключения кошелька
    tonConnectUI.onStatusChange((wallet) => {
        connectedWallet = wallet;
        updateSkinButtons();
        updateSkinDisplay();
    });
    
    tonConnectUI.connectionRestored.then(() => {
        connectedWallet = tonConnectUI.wallet;
        updateSkinButtons();
    });
    
    // Отслеживание видимости страницы для обработки возврата из кошелька
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(() => {
                loadSkinImages();
                updateSkinDisplay();
            }, 300);
        }
    });
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
});

AllLotsNFTMArket.addEventListener('click', () => {
    MyLotsNFTMArket.style.color = '#515151';
    AllLotsNFTMArket.style.color = '#FFFFFF';
    document.querySelector('.AllLotsMenu').style.display = 'block';
    document.querySelector('.MyLotsMenu').style.display = 'none';
});


//Mini game





document.addEventListener('DOMContentLoaded', () => {
    // Скрываем игровое поле изначально
    document.getElementById('GameOnTask').style.display = 'none';
    startCountdown
    // Основные элементы игры
    let waterImage1, waterImage2;
    let leftRemainingElement, collectedCountElement, bestResultElement;
    let playBtn, playBtnText, currentPin, bestPin, gameField;
    let countdownElement;
    let imageRowerMiniGame, leftBtnMiniGame, rightBtnMiniGame, columnClipMiniGame;
    let gameObjectsLayer;
    let currentPosition = 1; // Центральная колонка по умолчанию
    
    // Параметры колонок (как в референсе)
    const COLUMNS = [
        { x: 20, path: "M100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50V340C0 367.614 22.3858 390 50 390C77.6142 390 100 367.614 100 340V50Z" },
        { x: 145, path: "M226 50C226 22.3858 203.614 0 176 0C148.386 0 126 22.3858 126 50V340C126 367.614 148.386 390 176 390C203.614 390 226 367.614 226 340V50Z" },
        { x: 270, path: "M352 50C352 22.3858 329.614 0 302 0C274.386 0 252 22.3858 252 50V340C252 367.614 274.386 390 302 390C329.614 390 352 367.614 352 340V50Z" }
    ];

    // Границы gameObjectsLayer (18% от левого края, ширина 64%)
    const GAME_LAYER_LEFT = 0.18 * 352; // ~63px
    const GAME_LAYER_WIDTH = 0.64 * 352; // ~225px
    const GAME_LAYER_RIGHT = GAME_LAYER_LEFT + GAME_LAYER_WIDTH;

    // Настройки игры
    const difficultyLevels = [
        { speed: 5, spawnRate: 1500 },
        { speed: 7, spawnRate: 1200 },
        { speed: 9, spawnRate: 900 },
        { speed: 11, spawnRate: 700 },
        { speed: 13, spawnRate: 500 }
    ];

    // Размеры объектов
    const OBSTACLE_WIDTH = 30;
    const OBSTACLE_HEIGHT = 30;
    const COIN_WIDTH = 20;
    const COIN_HEIGHT = 20;
    const PLAYER_WIDTH = 60;
    const PLAYER_HEIGHT = 155;
    const PLAYER_Y = 140; // Верхняя граница игрока
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
        leftBtnMiniGame.addEventListener('click', () => isGameStarted && moveToPosition(currentPosition - 1));
        rightBtnMiniGame.addEventListener('click', () => isGameStarted && moveToPosition(currentPosition + 1));
        document.addEventListener('keydown', handleKeyDown);
        
        updatePlayButton();
        updateDistanceInfo();
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

        let xPos;
        if (lane === 0) { // Левая колонка (рандом от 0.272 до 0.292)
            const randomMultiplier = 0.272 + Math.random() * (0.302 - 0.262);
            xPos = column.x + (GAME_LAYER_WIDTH * randomMultiplier); 
        } else if (lane === 1) { // Центральная колонка (рандом от 1.6 до 1.8)
            const randomMultiplier = 1.6 + Math.random() * (1.9 - 1.5);
            xPos = column.x + (PLAYER_WIDTH - width) / randomMultiplier;
        } else { // Правая колонка (рандом от 0.262 до 0.282)
            const randomMultiplier = 0.262 + Math.random() * (0.302 - 0.262);
            xPos = column.x + PLAYER_WIDTH - width - (GAME_LAYER_WIDTH * randomMultiplier);
        }

        // 2. Применяем ЖЕСТКУЮ коррекцию сдвига
        const FINAL_CORRECTION = -7; // Пиксельная коррекция
        xPos += FINAL_CORRECTION;

        // 3. Преобразуем в координаты gameObjectsLayer
        const adjustedXPos = xPos - GAME_LAYER_LEFT;

        // Жесткая проверка границ
        if (adjustedXPos < 0 || adjustedXPos + width > GAME_LAYER_WIDTH) {
            console.warn(`Объект выходит за границы: ${adjustedXPos}`);
            return;
        }

        // Создание элемента
        const element = document.createElement('div');
        element.className = spawnType;
        element.style.left = `${adjustedXPos}px`;;
        element.style.top = `${yOffset}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.zIndex = '10';
        
        if (spawnType === 'obstacle') {
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            element.style.borderRadius = '10px';
            obstacles.push({
                element: element,
                lane: lane,
                top: yOffset,
                x: xPos,
                width: width,
                height: height,
                bottom: yOffset + height
            });
        } else {
            element.style.backgroundColor = 'gold';
            element.style.borderRadius = '50%';
            coins.push({
                element: element,
                lane: lane,
                top: yOffset,
                x: xPos,
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
        
        // Движение монет
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
                score += 10;
                addRow(10)
                
                collectedCountElement.textContent = score;
            }
        }
    }


    function checkCollision(object) {
        if (object.lane !== currentPosition) return false;
        return object.top <= PLAYER_BOTTOM && object.bottom >= PLAYER_Y;
    }


    function moveToPosition(newPosition) {
        if (!isGameStarted || !imageRowerMiniGame || !columnClipMiniGame) return;
        
        if (newPosition >= 0 && newPosition < COLUMNS.length) {
            currentPosition = newPosition;
            const column = COLUMNS[newPosition];
            
            // Устанавливаем позицию картинки игрока
            imageRowerMiniGame.setAttribute('x', column.x);
            
            // Обновляем clipPath для маски
            columnClipMiniGame.setAttribute('d', column.path);
        }
    }

    // Остальные функции без изменений
    function handlePlayClick() {
        if (isProcessingTransaction) return;
        
        if (remainingAttempts > 0 || canPlayAgain()) {
            startCountdown();
        } else {
            buyAdditionalAttempts();
        }
    }

    function handleKeyDown(e) {
        if (!isGameStarted) return;
        if (e.key === 'ArrowLeft') moveToPosition(currentPosition - 1);
        if (e.key === 'ArrowRight') moveToPosition(currentPosition + 1);
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
            playBtnText.textContent = `Again ${remainingAttempts}`;
        } else {
            playBtnText.textContent = 'Play';
        }
    }

    function updateDistanceInfo() {
        if (!leftRemainingElement || !collectedCountElement || !bestResultElement) return;
        
        leftRemainingElement.textContent = Math.round(MAX_DISTANCE - distance);
        collectedCountElement.textContent = score;
        bestResultElement.textContent = Math.round(bestDistance);
        
        // Жесткие константы (12px отступ с каждой стороны)
        const START_OFFSET = 13; // 12px слева
        const TRACK_WIDTH = 500; // Общая ширина трека
        const AVAILABLE_WIDTH = TRACK_WIDTH - (2 * START_OFFSET); // 500 - 26 = 474px
        
        // Текущая позиция (от 12px до 488px)
        const currentProgress = Math.min(distance / MAX_DISTANCE, 1);
        const currentPos = START_OFFSET + (AVAILABLE_WIDTH * currentProgress);
        
        if (currentPin) {
            currentPin.style.left = `${currentPos}px`;
            console.log("Current pin position:", currentPos); // Для дебага
        }
        
        // Лучшая позиция (аналогично)
        const bestProgress = Math.min(bestDistance / MAX_DISTANCE, 1);
        const bestPos = START_OFFSET + (AVAILABLE_WIDTH * bestProgress);
        
        if (bestPin) {
            bestPin.style.left = `${bestPos}px`;
            console.log("Best pin position:", bestPos); // Для дебага
        }
    }

    function animateWater() {
        waterPosition += 4;
        
        if (waterPosition >= 599) {
            waterPosition = 0;
        }
        
        waterImage1.setAttribute('y', waterPosition);
        waterImage2.setAttribute('y', waterPosition - 599);
        
        if (!isGameOver && isGameStarted) {
            requestAnimationFrame(animateWater);
        }
    }
    
    let remainingAttempts = 0;
    let isProcessingTransaction = false;

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
                        amount: "0", // 0.05 TON в нанотонах 50000000
                        message: "Покупка дополнительной попытки"
                    }
                ]
            };
            
            const result = await tonConnectUI.sendTransaction(transaction);
            if (result?.boc) {
                // При успешной покупке добавляем 1 попытку
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
        
        if (distance > bestDistance) {
            bestDistance = distance;
            localStorage.setItem('bestDistance', bestDistance);
        }
        
        lastPlayTime = Date.now();
        localStorage.setItem('lastPlayTime', lastPlayTime);
        
        // Уменьшаем количество оставшихся попыток только если они были
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
    }

    document.querySelector('.GagantOvalGameLeft').style.display = 'none';
    document.querySelector('.GagantOvalGameRight').style.display = 'none';

    function startCountdown() {
        if (!playBtn || !countdownElement) return;
        
        // Показать игровые элементы
        document.querySelector('.MovementButtonsMiniGame').style.display = 'block';
        document.querySelector('.BottomProgressPanelCentred').style.bottom = '35px';
        document.querySelector('.PlayBtnMiniGame').style.display = 'none';
        document.querySelector('.BackBtnOnMiniGameCentred').style.display = 'none';
        
        // Опускаем ResultLineGame вниз
        document.querySelector('.TheResultLineGameCentred').style.bottom = '17%';
        document.querySelector('.ResultLineGame p').style.bottom = '17.5%';
        document.querySelector('.NoBestPinInLine').style.bottom = '17.5%';
        document.querySelector('.BestPinInLine').style.bottom = '17.5%';
        
        // Настройка счетчика
        playBtn.style.display = 'none';
        countdownElement.style.display = 'block';
        countdownElement.textContent = '3';
        Object.assign(countdownElement.style, {
            position: 'absolute',
            bottom: '30%', // Изменил позицию счетчика
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '72px',
            color: 'white',
            zIndex: '100',
            textShadow: '0 0 10px rgba(0,0,0,0.8)'
        });
        
        // Получаем элементы овалов
        const ovalLeft = document.querySelector('.GagantOvalGameLeft');
        const ovalRight = document.querySelector('.GagantOvalGameRight');
        
        // Настройка овалов
        ovalLeft.style.display = 'block';
        ovalRight.style.display = 'block';
        ovalLeft.style.opacity = '0';
        ovalRight.style.opacity = '0';
        ovalLeft.style.transition = 'opacity 0.3s, filter 0.3s';
        ovalRight.style.transition = 'opacity 0.3s, filter 0.3s';
        
        // Первое моргание (при появлении)
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
                
                // Второе моргание (перед "GO!")
                if (count === 1) {
                    setTimeout(() => {
                        ovalLeft.style.filter = 'blur(15px)';
                        ovalRight.style.filter = 'blur(15px)';
                        
                        setTimeout(() => {
                            ovalLeft.style.filter = 'blur(3px)';
                            ovalRight.style.filter = 'blur(3px)';
                            
                            // Плавное исчезновение
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
                    
                    // Полное скрытие
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
        currentPosition = 1;
        moveToPosition(currentPosition);
        
        updateDistanceInfo();
        gameInterval = setInterval(spawnObjects, difficultyLevels[0].spawnRate);
        
        // Увеличиваем сложность каждую минуту
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







// ======== Share Message Referal ========= // 



    





document.addEventListener('DOMContentLoaded', function() {
  const button = document.createElement('button');
  button.textContent = 'Отправить сообщение';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#0088cc';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.margin = '20px';
  
  document.body.appendChild(button);

  button.addEventListener('click', function() {
    // Проверяем, доступен ли Telegram WebApp
    if (!window.Telegram?.WebApp) {
      alert('Это работает только в Telegram!');
      return;
    }

    // Проверяем версию Telegram (нужна 8.0+)
    const webAppVersion = Telegram.WebApp.version;
    const isVersionSupported = webAppVersion && compareVersions(webAppVersion, '8.0') >= 0;

    if (!isVersionSupported) {
      alert(`Ваша версия Telegram (${webAppVersion}) не поддерживает shareMessage. Нужна 8.0+`);
      return;
    }

    // Если метод доступен, пробуем отправить сообщение
    if (typeof Telegram.WebApp.shareMessage === 'function') {
      try {
        // ❗ Нужен msg_id, а не просто текст!
        // В реальном приложении его нужно получить через PreparedInlineMessage
        const dummyMsgId = '12345'; // Замените на реальный msg_id
        Telegram.WebApp.shareMessage(dummyMsgId, (success) => {
          if (success) {
            console.log('Сообщение отправлено!');
          } else {
            console.log('Ошибка отправки');
          }
        });
      } catch (e) {
        console.error('Ошибка shareMessage:', e);
        alert('Не удалось отправить сообщение');
      }
    } else {
      alert('Метод shareMessage недоступен');
    }
  });
});

// Функция для сравнения версий (например, "8.1" > "8.0")
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    if (partA > partB) return 1;
    if (partA < partB) return -1;
  }
  return 0;
}


// ====== Story ====== // 


// Создаем кнопку
const storiesBtn = document.querySelector('.TestMessageSent') || document.createElement('button');
storiesBtn.textContent = 'Опубликовать в Stories';
Object.assign(storiesBtn.style, {
  padding: '12px 24px',
  background: 'linear-gradient(45deg, #FF0076, #8A2BE2)',
  color: 'white',
  borderRadius: '24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  margin: '10px',
  border: 'none'
});
document.body.appendChild(storiesBtn);

// Проверяем, есть ли флаг о публикации в localStorage
if (localStorage.getItem('storyPublished') === 'true') {
  alert("Спасибо!");
}

// Обработчик клика
storiesBtn.addEventListener('click', () => {
  const tg = window.Telegram?.WebApp;
  
  if (!tg?.shareToStory) {
    alert('Функция доступна только в Telegram 7.8+');
    return;
  }

  // Параметры Stories
  const params = {
    text: 'Присоединяйся к игре! 🚣‍♂️',
    widget_link: {
      url: 'https://t.me/rowlivebot/row',
      name: 'Играть сейчас'
    }
  };

  // Показываем статус загрузки
  storiesBtn.textContent = 'Загрузка...';
  storiesBtn.disabled = true;

  // Пытаемся отправить
  tg.shareToStory(
    'https://mixagrech.github.io/rowlivefgfmkskefker/Rowlogo.png',
    params,
    (success) => {
      storiesBtn.disabled = false;
      if (success) {
        storiesBtn.textContent = 'Опубликовано!';
        storiesBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E8B57)';
        // Сохраняем факт публикации в localStorage
        localStorage.setItem('storyPublished', 'true');
        alert("Спасибо!");
      } else {
        storiesBtn.textContent = 'Отменено';
        storiesBtn.style.background = 'linear-gradient(45deg, #FF5722, #F44336)';
      }
      
      setTimeout(() => {
        storiesBtn.textContent = 'Опубликовать в Stories';
        storiesBtn.style.background = 'linear-gradient(45deg, #FF0076, #8A2BE2)';
      }, 2000);
    }
  );
});
