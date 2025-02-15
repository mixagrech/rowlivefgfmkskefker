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

var heventPressed = setInterval(function() {
    var heventPressedDate = new Date();
    day_numberNumb.innerHTML = (heventPressedDate.getHours());
}, 60000);

if (day_numberNumb == "0") {
    day_numberNumb == 0;
}

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
    AirdropMain = document.getElementById('AirdropMain').style.display='none';
}, 120000);

// task

let NoQuestsID1 = document.getElementById('NoQuestsID1').style.display = 'none';

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

    document.getElementById('AirdropMain').style.display = 'none';
    document.getElementById('AirdropBtnGolg').style.display = 'none';
    document.getElementById('AirdropBtnGray').style.display = 'block';
    document.querySelector('.buttonairdropimg').style.bottom = '3.5%';
});

window.onload = function() {
    const HomeBtnGray = document.getElementById('HomeBtnGray');

    if (HomeBtnGray) {
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
        console.error('Элемент HomeBtnGray не найден на странице.');
    }
};

// completed task1

let BtnOverTask1 = document.getElementById('BtnOverTask1');

let SpecTaskText = document.querySelector('.SpecTaskText');
let TaskBlockStart2 = document.querySelector('.TaskBlockStart2');
let SponsorTaskLogoClass2 = document.querySelector('.SponsorTaskLogoClass2');
let TaskToBtn2 = document.querySelector('.TaskToBtn2');
let arrowTaskBtn2 = document.querySelector('.arrowTaskBtn2');
let QuantityAddRow2 = document.querySelector('.QuantityAddRow2');


BtnOverTask1.addEventListener('click', () => {
    BtnOverTask1.style.display = 'none';
    score.innerHTML = (rowscore += 20);
    document.getElementById('NoQuestsID1').style.display = 'block';
    SpecTaskText.style.top = '27%';
    TaskBlockStart2.style.top = '31.5%';
    SponsorTaskLogoClass2.style.top = '32%';
    TaskToBtn2.style.top = '34%';
    arrowTaskBtn2.style.top = '31.5%';
    QuantityAddRow2.style.top = '37.8%';
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

var ReferalLink = 'Hi, join me play the game.' + '\n' + 'https://t.me/rowlivebot' + '\n' +'Enter the code and add me as a friend';

function copyReferalLink() {
    navigator.clipboard.writeText(ReferalLink)
        .catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
}

document.querySelector(".AddFriendCopyLinkBtn").addEventListener("click", () => {
    document.querySelector('.SecsessCopyOrSentMessage').style.display = 'block';
    setInterval(CopySecsessFunc, 1000);
    counter = 0;
});
document.querySelector(".AddFriendCopyLinkBtn").addEventListener("click", copyReferalLink);



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


// clear friend input on click

const SendReferalCode = document.querySelector('.SendReferalCode');

SendReferalCode.addEventListener('click', () => {
    document.querySelector('.ReferalcodeInput').value = '';
});

const ReferalcodeInputClick = document.querySelector('.ReferalcodeInput');
ReferalcodeInputClick.addEventListener('focus', () => {
    window.scrollTo(0, document.body.scrollHeight);
});
