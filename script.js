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
})

buttonbackage_btn.addEventListener('click', () => {
    document.getElementById('main').style.display = 'block';
    document.getElementById('account_age').style.display = 'none';
})

var rowscore = 0;

var score = document.getElementById('rowscore');

//daily reward

document.getElementById('main').style.display = 'none';

var DayNumb0 = 400;
var DayNumb1 = 520;
var DayNumb2 = 640;
var DayNumb3 = 760;
var DayNumb4 = 880;
var DayNumb5andBiger = 1100;

var day_number = document.getElementById('day_number');
var rowdayly_text_id = document.getElementById('rowdayly_text_id');

//receiving an award

let daily_claim_btn = document.getElementById('daily_claim_btn_img');

daily_claim_btn.addEventListener('click', () => {
    document.getElementById('AirdropMain').style.display='none';
    document.getElementById('daily_reward').style.display = 'none';
    document.getElementById('account_age').style.display = 'none';
    document.getElementById('taskMain').style.display = 'none';
    document.getElementById('FriendsMain').style.display = 'none';
    document.getElementById('ProfileMain').style.display = 'none';

    document.getElementById('main').style.display = 'block';
})


var day_numberNumb = 0;
day_number.innerHTML = day_numberNumb;

rowdayly_text_id.innerHTML = ("+" + DayNumb0 + "ROW");
score.innerHTML = '0';

const dayly_reward_con = () => {
    day_numberNumb ++ ;
    day_number.innerHTML = day_numberNumb;
    if (day_numberNumb == 0) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb0 + "ROW");
        score.innerHTML = (rowscore + DayNumb0);
    } else if (day_numberNumb == 1) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb1 + "ROW");
        score.innerHTML = (rowscore += DayNumb0);
    } else if (day_numberNumb == 2) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb2 + "ROW");
        score.innerHTML = (rowscore += DayNumb1);
    } else if (day_numberNumb == 3) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb3 + "ROW");
        score.innerHTML = (rowscore += DayNumb2);
    } else if (day_numberNumb == 4) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb4 + "ROW");
        score.innerHTML = (rowscore += DayNumb3);
    } else if (day_numberNumb == 5) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb5andBiger + "ROW");
        score.innerHTML = (rowscore += DayNumb4);
    } else if (day_numberNumb >= 6) {
        rowdayly_text_id.innerHTML = ("+" + DayNumb5andBiger + "ROW");
        score.innerHTML = (rowscore += DayNumb5andBiger);
    }
};

daily_claim_btn.addEventListener('click', dayly_reward_con);

setInterval(function() {
    document.getElementById('daily_reward').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById('account_age').style.display = 'none';
    document.getElementById('taskMain').style.display = 'none';
    document.getElementById('FriendsMain').style.display = 'none';
    document.getElementById('ProfileMain').style.display = 'none';
    document.getElementById('YourRank').style.display = 'none';
    document.getElementById('AirdropMain').style.display = 'none';
    document.getElementById('MarketplaseNFT').style.display = 'none';
    document.getElementById('GameOnTask').style.display = 'none';
}, 120000);

// task



let TaskBtnMain = document.getElementById('TaskBtnMain');
const HomeBtnGray = document.getElementById('HomeBtnGray').style.display = 'none';
let taskMain = document.getElementById('taskMain').style.display = 'none';
let TaskBtnTask = document.getElementById('TaskBtnTask').style.display = 'none';
let mainmenu = document.getElementById('mainmenu').style.display = 'block';

let topTaskText = document.getElementById('topTaskText').style.display = 'none';    //top text on task

let HomeBtnID = document.getElementById('HomeBtnID');


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

let usernameonAgeID = document.getElementById('usernameonAgeID');
let usernameonAgeRewardID = document.getElementById('usernameonAgeRewardID');

var ageRewardVar = 0;
var counterAgeRewards = 0;
var isAgeRewardAssigned = false;

function getRandomInRange (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var randomNumbRewDay = getRandomInRange (1500, 2000)

const ageReward = () => {
    counterAgeRewards++;

    if (!isAgeRewardAssigned) {
        ageRewardVar = score.innerHTML = (rowscore += randomNumbRewDay);
        isAgeRewardAssigned = true; 
    }
    usernameonAgeRewardID.innerHTML = randomNumbRewDay;
};


buttonbackage_btn.addEventListener('click', ageReward);


if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    usernameonAgeID.innerHTML = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
} else {
    usernameonAgeID.innerHTML = "Пользователь не найден";
}

usernameonAgeRewardID.innerHTML = randomNumbRewDay;

//hat web app

tg.setHeaderColor("#0d0d0d");

//Friends main

let MainByFriends = document.getElementById('FriendsMain').style.display = 'none';
var FriendBlueBtn = document.getElementById('FriendBlueBtn').style.display = 'none';
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


let SecsessCopyOrSentMessage = document.querySelector('.SecsessCopyOrSentMessage').style.display = 'none';

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

//rank image color function

document.querySelector('.PathLine1').setAttribute('stroke', '#004C75');
document.querySelector('.PathLine2').setAttribute('stroke', '#004C75');


document.querySelector('.PathCircle3').setAttribute('fill', '#97DBFF');
document.querySelector('.PathCircle3').setAttribute('stroke', '#0087CF');

document.querySelector('.PathCircle2').setAttribute('fill', '#97DBFF');
document.querySelector('.PathCircle2').setAttribute('stroke', '#0087CF');

document.querySelector('.PathCircle1').setAttribute('fill', '#358344');
document.querySelector('.PathCircle1').setAttribute('stroke', '#57E873');

function RankImageColor() {
    if (rowscore >= 0 && rowscore <= 1000) {
        RankColor0();
    } else if (rowscore >= 1000 && rowscore <= 5000) {
        RankColor1();
    } else if (rowscore >= 5000 && rowscore <= 15000) {
        RankColor2();
    } else if (rowscore >= 15000 && rowscore <= 50000) {
        RankColor3();
    } else if (rowscore >= 50000 && rowscore <= 100000) {
        RankColor4()
    }

    setTimeout(RankImageColor, 500);
}

function RankColor0() {
    document.getElementById('champrangtitle').innerHTML = ('NOOB 🐤 RANK');
    document.getElementById('RankOnPath').innerHTML = ('NOOB 🐤 RANK');
}

let RankColor1Faslse = false;

function RankColor1() {
    document.querySelector('.PathCircle2').setAttribute('fill', '#358344');
    document.querySelector('.PathCircle2').setAttribute('stroke', '#57E873');

    document.querySelector('.PathCircle1').setAttribute('fill', '#BFBFBF');
    document.querySelector('.PathCircle1').setAttribute('stroke', '#818181');

    document.querySelector('.PathLine1').setAttribute('stroke', '#404040');
    
    if (!RankColor1Faslse) {
        score.innerHTML = (rowscore += 100);
        RankColor1Faslse = true;
    }
    document.getElementById('champrangtitle').innerHTML = ('AVERAGE 😐 RANK');
    document.getElementById('RankOnPath').innerHTML = ('AVERAGE 😐 RANK');
}

let RankColor2Faslse = false;

function RankColor2() {
    document.querySelector('.PathCircle3').setAttribute('fill', '#358344');
    document.querySelector('.PathCircle3').setAttribute('stroke', '#57E873');

    document.querySelector('.PathCircle2').setAttribute('fill', '#BFBFBF');
    document.querySelector('.PathCircle2').setAttribute('stroke', '#818181');

    document.querySelector('.PathLine2').setAttribute('stroke', '#404040');

    if (!RankColor2Faslse) {
        score.innerHTML = (rowscore += 500);
        RankColor2Faslse = true;
    }
    document.getElementById('champrangtitle').innerHTML = ('NORMAl 👍 RANK');
    document.getElementById('RankOnPath').innerHTML = ('NORMAl 👍 RANK');
}

let RankColor3Faslse = false;

function RankColor3() {
    document.querySelector('.PathCircle4').setAttribute('fill', '#358344');
    document.querySelector('.PathCircle4').setAttribute('stroke', '#57E873');

    document.querySelector('.PathCircle3').setAttribute('fill', '#BFBFBF');
    document.querySelector('.PathCircle3').setAttribute('stroke', '#818181');

    document.querySelector('.PathLine3').setAttribute('stroke', '#404040');

    if (!RankColor3Faslse) {
        score.innerHTML = (rowscore += 1500);
        RankColor3Faslse = true;
    }
    document.getElementById('champrangtitle').innerHTML = ('BETTER 💪 RANK');
    document.getElementById('RankOnPath').innerHTML = ('BETTER 💪 RANK');
}

let RankColor4Faslse = false;

function RankColor4() {
    document.querySelector('.PathCircle5').setAttribute('fill', '#358344');
    document.querySelector('.PathCircle5').setAttribute('stroke', '#57E873');

    document.querySelector('.PathCircle4').setAttribute('fill', '#BFBFBF');
    document.querySelector('.PathCircle4').setAttribute('stroke', '#818181');

    document.querySelector('.PathLine4').setAttribute('stroke', '#404040');

    if (!RankColor4Faslse) {
        score.innerHTML = (rowscore += 5000);
        RankColor4Faslse = true;
    }
    document.getElementById('champrangtitle').innerHTML = ('CHAMP 🏆 RANK');
    document.getElementById('RankOnPath').innerHTML = ('CHAMP 🏆 RANK');
}

RankImageColor();


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
            rowscore += RowFriendReward;
            score.innerHTML = rowscore;
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
    const telegramBtn = document.getElementById('AddFriendSentMessageBtnID');
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
            rowscore += reward;
            score.innerHTML = rowscore;
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

// Widthrow NFT skin




// Конфиг NFT коллекции
const NFT_CONFIG = {
    collectionAddress: 'EQAG1zMLkCFOCl8lJSCiPS7nXKoookxzN3-IuPshaG5QeNqd',
    gasAmount: '0.05', // Комиссия
    metadata: {
        name: "ROW LIVE Reward",
        description: "Withdrawn from ROW LIVE game",
        image: "ipfs://bafybeici36x6pedrpai6o4kfw5aaxkp3wlxnep6pl5cvjifu2kcwznx5vy",
        attributes: [
            { "trait_type": "Type", "value": "Game Reward" }
        ]
    }
};

// Функция отправки уведомления
async function sendTonkeeperNotification(userAddress) {
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer TC-MSG_436fe48b166ab892d29ae81fce8605cfddc79bcd2c2a192dae27c1c0c520435028'
        }
    });
    return await response.json();
}

// Основная функция вывода NFT
async function withdrawNft() {
    try {
        // 1. Проверка подключения кошелька
        if (!connector.connected) {
            await connector.connect();
            return;
        }

        const userAddress = connector.account.address;
        
        // 2. Подготовка транзакции (используем window.TonCore если подключили через script tag)
        const TonCore = window.TonCore || (await import('@ton/core')).default;
        const { beginCell } = TonCore;
        
        const tx = {
            validUntil: Math.floor(Date.now() / 1000) + 300,
            messages: [{
                address: NFT_CONFIG.collectionAddress,
                amount: (parseFloat(NFT_CONFIG.gasAmount) * 1000000000).toString(),
                payload: beginCell()
                    .storeUint(1, 32) // op = mint
                    .storeAddress(TonCore.Address.parse(userAddress))
                    .storeRef(
                        beginCell()
                            .storeStringTail(JSON.stringify(NFT_CONFIG.metadata))
                            .endCell()
                    )
                    .endCell()
                    .toBoc()
                    .toString('base64')
            }]
        };

        // 3. Отправка транзакции
        const result = await connector.sendTransaction(tx);
        console.log('NFT minted:', result);

        // 4. Отправка уведомления (через бекенд!)
        await sendTonkeeperNotification(userAddress);
        
        // 5. Открытие кошелька
        window.open(`https://app.tonkeeper.com/collection/${NFT_CONFIG.collectionAddress}`, '_blank');
        
    } catch (error) {
        console.error('Withdraw error:', error);
        alert('Error: ' + (error.message || 'Please try later'));
    }
}

// Вешаем обработчик на кнопку
document.querySelector('.PriceBtnMyLotsMarket').addEventListener('click', withdrawNft);


//Mini game





document.addEventListener('DOMContentLoaded', () => {
    // Скрываем игровое поле изначально
    document.getElementById('GameOnTask').style.display = 'none';
    
    // Основные элементы
    let waterImage1, waterImage2;
    let leftRemainingElement, collectedCountElement, bestResultElement;
    let playBtn, playBtnText, currentPin, bestPin, gameField;
    let countdownElement;
    let imageRowerMiniGame, leftBtnMiniGame, rightBtnMiniGame, columnClipMiniGame;
    let currentPosition = 1; // Центральная колонка по умолчанию
    
    // Точные параметры колонок из SVG path
    const COLUMNS = [
        { center: 90, playerX: 20, path: "M100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50V340C0 367.614 22.3858 390 50 390C77.6142 390 100 367.614 100 340V50Z" },
        { center: 167, playerX: 145, path: "M226 50C226 22.3858 203.614 0 176 0C148.386 0 126 22.3858 126 50V340C126 367.614 148.386 390 176 390C203.614 390 226 367.614 226 340V50Z" },
        { center: 242, playerX: 270, path: "M352 50C352 22.3858 329.614 0 302 0C274.386 0 252 22.3858 252 50V340C252 367.614 274.386 390 302 390C329.614 390 352 367.614 352 340V50Z" }
    ];

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
    const PLAYER_Y = 230;

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

    // Инициализация игры
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

    function spawnObjects() {
        if (isGameOver || !isGameStarted || !gameField) return;
        
        const spawnType = Math.random() < 0.7 ? 'obstacle' : 'coin';
        const lane = Math.floor(Math.random() * 3);
        const column = COLUMNS[lane];
        
        const width = spawnType === 'obstacle' ? OBSTACLE_WIDTH : COIN_WIDTH;
        const height = spawnType === 'obstacle' ? OBSTACLE_HEIGHT : COIN_HEIGHT;
        const yOffset = spawnType === 'obstacle' ? -OBSTACLE_HEIGHT : -COIN_HEIGHT;
        
        // Точное центрирование в колонке
        const xPos = column.center - width/2;
        
        const element = document.createElement('div');
        element.className = spawnType;
        element.style.position = 'absolute';
        element.style.left = `${xPos}px`;
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
                width: width,
                height: height
            });
        } else {
            element.style.backgroundColor = 'gold';
            element.style.borderRadius = '50%';
            coins.push({
                element: element,
                lane: lane,
                top: yOffset,
                width: width,
                height: height
            });
        }
        
        gameField.appendChild(element);
    }

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
            coin.element.style.top = `${coin.top}px`;
            
            if (coin.top > 390) {
                coin.element.remove();
                coins.splice(i, 1);
            } else if (checkCollision(coin)) {
                coin.element.remove();
                coins.splice(i, 1);
                score += 10;
                collectedCountElement.textContent = score;
            }
        }
    }

    function checkCollision(object) {
        if (object.lane !== currentPosition) return false;
        
        const playerTop = PLAYER_Y;
        const playerBottom = playerTop + PLAYER_HEIGHT;
        const objectBottom = object.top + object.height;
        
        return (
            objectBottom > playerTop &&
            object.top < playerBottom
        );
    }

    function handlePlayClick() {
        if (canPlayAgain() || playBtnText.textContent === 'Again') {
            startCountdown();
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
        if (playBtnText) {
            playBtnText.textContent = canPlayAgain() ? 'Play' : 'Again';
        }
    }

    function updateDistanceInfo() {
        if (!leftRemainingElement || !collectedCountElement || !bestResultElement) return;
        
        leftRemainingElement.textContent = Math.round(MAX_DISTANCE - distance);
        collectedCountElement.textContent = score;
        bestResultElement.textContent = Math.round(bestDistance);
        
        const currentPos = Math.min(distance / 30, 500);
        if (currentPin) currentPin.style.left = `${currentPos}px`;
        
        const bestPos = Math.min(bestDistance / 30, 500);
        if (bestPin) bestPin.style.left = `${bestPos}px`;
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

    function gameOver() {
        isGameOver = true;
        isGameStarted = false;
        clearInterval(gameInterval);
        
        if (distance > bestDistance) {
            bestDistance = distance;
            localStorage.setItem('bestDistance', bestDistance);
        }
        
        lastPlayTime = Date.now();
        localStorage.setItem('lastPlayTime', lastPlayTime);
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
        document.querySelector('.TheResultLineGameCentred').style.bottom = '-100%';
        document.querySelector('.ResultLineGame p').style.bottom = '-100%';
        document.querySelector('.NoBestPinInLine').style.bottom = '-100%';
        document.querySelector('.BestPinInLine').style.bottom = '-100%';
        
        obstacles.forEach(o => o.element && o.element.remove());
        coins.forEach(c => c.element && c.element.remove());
        obstacles = [];
        coins = [];
    }

    function startCountdown() {
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
        countdownElement.style.position = 'absolute';
        countdownElement.style.bottom = '30%';
        countdownElement.style.left = '50%';
        countdownElement.style.transform = 'translateX(-50%)';
        countdownElement.style.fontSize = '72px';
        countdownElement.style.color = 'white';
        countdownElement.style.zIndex = '100';
        countdownElement.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
        
        let count = 3;
        countdownElement.textContent = count;
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownElement.textContent = count;
            } else {
                countdownElement.textContent = 'GO!';
                setTimeout(() => {
                    countdownElement.style.display = 'none';
                    startGame();
                    clearInterval(countdownInterval);
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
        requestAnimationFrame(animateWater);
        
        function gameLoop() {
            moveObjects();
            if (!isGameOver && isGameStarted) {
                requestAnimationFrame(gameLoop);
            }
        }
        gameLoop();
    }

    function moveToPosition(newPosition) {
        if (!isGameStarted || !imageRowerMiniGame || !columnClipMiniGame) return;
        
        if (newPosition >= 0 && newPosition < COLUMNS.length) {
            currentPosition = newPosition;
            const column = COLUMNS[newPosition];
            imageRowerMiniGame.setAttribute('x', column.playerX);
            columnClipMiniGame.setAttribute('d', column.path);
        }
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
