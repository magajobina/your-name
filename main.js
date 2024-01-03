const theInput = document.querySelector('#the_input'),
message = document.querySelector('#message');
mimobtn = document.querySelector('#mimo');
var toContinue1 = 0;
var новаяXссылк;
var новаяYссылк;
var squareCoordinates;
var blackSquare = document.getElementById('black-square');
var isTypingFlag = false;
var flagForDotnTouch = false;
let onceUsedFlag = 0;
let onceUsedFlag1 = true;
let onceUsedFlag3 = true;
let onceUsedFlag4 = true;
let onceUsedFlag5 = false;
let onceUsedFlag6 = true;
let checkPoint1 = false; 
let switchcount = 0;
let lastMesaageWas;
let isPaused = false;
let currentTextFunction;
let defenceFromOverpause = false;
let hintForWelcomeToTheClubFlag = false;
let checkPoint2 = false;
let checkPoint2_1 = false;
let checkPoint3 = false;
let theFinalInputValue;
const historyTresholdToDelete = 100;
const btnToPause = document.querySelector('#btnto_Pause');
const btnToContinue = document.querySelector('#btnto_Continue');
const btnToBack = document.querySelector('#btnto_Back');
const barcode = document.querySelector('#barcode');
const arrowInputBtn = document.querySelector('.the_input_fake_btn');
const yearRegex = /\d{4}$/;
const regexIsOnlySpaces = /^\s*$/;
const regexIsStartWithSpace = /^\s/;
const mainBG = getComputedStyle(document.documentElement).getPropertyValue('--mainbg');
// Начальное окно---------------
const modal = document.getElementById("myModal");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
// Начальное окно---------------
const playButtonUnpressed = document.querySelector('#playButtonImgUnpressed');
const playButtonPressed = document.querySelector('#playButtonImgPressed');
const dotSniper = document.querySelector('.dotSniper');
const sniperImg = document.querySelector('.container_for_sniper img');
const blueArrowIMG = document.querySelector('#the_input_fake_btnimg');
const history = document.querySelector('#history');
const historyScroll = history.querySelector('.history_content_scroll');
const historyBtn = document.querySelector('#history_btn');
let forceHistoryRed = false;
const audioInTheEnd = new Audio('audio/in_the_end.mp3');
audioInTheEnd.preload = 'auto';

// turnOffIntroModal();



// Теперь массив содержит два сообщения

function timelineForSniper() {
  welcomeSecondAI();
  document.querySelector('.outer_container_for_sniper').style.display = 'inline-block';
  // Получаем размеры контейнера
  const containerForSniper = document.querySelector('.container_for_sniper');
  const containerForSniperWidth = containerForSniper.offsetWidth;
  const containerForSniperHeight = containerForSniper.offsetHeight;
  // Создаем новый timeline
  const timeline = gsap.timeline();

  timeline.to(dotSniper, {
    x: "+=100",
    y: "+=78",
    duration: 1.5,
    ease: "power1.inOut",
    onStart: removeHoverFromArrowbtn,
  });
  timeline.to(dotSniper, {
    x: "+=150",
    y: "-=34",
    duration: 1.5,
    ease: "power1.inOut",
  });
  timeline.to(dotSniper, {
    x: "-=5",
    y: "+=50",
    duration: 1,
    ease: "power1.inOut",
  });
  timeline.to(dotSniper, {
    x: containerForSniperWidth / 2,
    y: containerForSniperHeight / 2,
    duration: 1,
    ease: "power1.inOut",
  });
  timeline.to(dotSniper, {
    scaleX: 10,
    scaleY: 3,
    duration: 0.5,
    ease: "elastic.out",
  });
  timeline.to(dotSniper, {
    scaleX: 11,
    scaleY: 10,
    duration: 0.5,
    ease: "elastic.out",
  });
  timeline.to(dotSniper, {
    opacity: 0,
    duration: 0,
    onComplete: playSniperShotSound,
  });
  timeline.to(sniperImg, {
    opacity: 1,
    duration: 0,
    ease: "power1.inOut",
    onComplete: hideArrowbtn,
  });
  timeline.to(sniperImg, {
    duration: 3,
  });
  timeline.to(sniperImg, {
    opacity: 0,
    duration: 2,
    ease: "power1.inOut",
    onComplete: sniperContainerRemove,
  });

  timeline.play();

  function removeHoverFromArrowbtn() {
    blueArrowIMG.classList.remove('the_input_fake_btn--hover');
    arrowInputBtn.style.cursor = 'inherit';
  }
  function playSniperShotSound() {
    playAudio('sniperShot', false, 0.7);
  }
  function hideArrowbtn() {
    blueArrowIMG.style.display = 'none';
    arrowInputBtn.style.cursor = 'inherit';
  }
  function sniperContainerRemove() {
    document.querySelector('.outer_container_for_sniper').remove();
    arrowInputBtn.style.display = 'none';
  }

}

function playReversedAudio() {
  playButtonPressed.removeEventListener('click', playReversedAudio);
  playAudio('yearOfBirthVoiceAI', false, 1, true);
  
}

function turnOffIntroModal () {
  modal.style.display = "none";
  overlay.style.display = "none";
}

historyBtn.addEventListener('click', (e) => {
  document.querySelector('.history_btn-inner').classList.toggle('history_btn-inner--inactive');
  history.classList.toggle('history--hidden');
  
})

var audioFiles = [
    'audio/1.mp3',
    'audio/2.mp3',
    'audio/3.mp3',
    'audio/4.mp3',
    'audio/5.mp3'
];
var currentAudioIndex = -1;
var audio = new Audio();

function playRandomAudio() {
    // Генерируем случайный индекс для выбора аудио
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * audioFiles.length);
    } while (randomIndex === currentAudioIndex); // Проверяем, чтобы не выбрать то же самое аудио
    currentAudioIndex = randomIndex;
    // Устанавливаем выбранное аудио
    audio.src = audioFiles[currentAudioIndex];
    // Начинаем воспроизведение
    audio.play();
    // Слушаем событие окончания воспроизведения и вызываем функцию снова
    audio.onended = function() {
        playRandomAudio();
    };
}
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    audio.onended = null; // Убираем обработчик события окончания воспроизведения
}

  // ПРИМЕР ВЫЗОВА ФУНКЦИИ. НАЗВАНИЕ, ПРОДОЛЖИТЕЛЬНОСТЬ, ГРОМКОСТЬ, FALSE, С КАКОЙ СЕКУНДЫ НАЧАТЬ playAudio('baraban', 500, 0.1, false, 51);
function playAudio(audioName, durationInMilliseconds = false, volume = 1, buttonToPress = false, momentToStart = false) {

  
  // Создаем элемент audio
  var audioElement = new Audio(`audio/${audioName}.mp3`);

  mimobtn.addEventListener('click', turnOffReversedAudio);

  function turnOffReversedAudio() {
    const checkString = /DungeonMaster\d{4}$/i;
    if (checkString.test(theInput.value)) {
      audioElement.pause();
        mimobtn.removeEventListener('click', turnOffReversedAudio)
    }
  }

  if (durationInMilliseconds == false) {
    // Если время воспроизведения не указано, проигрываем аудио один раз
    audioElement.volume = volume || 1;
    audioElement.currentTime = momentToStart || 0;
    audioElement.play();
    if (buttonToPress) {
      playButtonUnpressed.style.opacity = '0';
      playButtonPressed.style.opacity = '1';
    }
  } else {
    // Если указано время воспроизведения, проигрываем аудио и повторяем его
    audioElement.loop = true; // Устанавливаем бесконечное повторение
    audioElement.volume = volume || 1;
    audioElement.play();
    // Останавливаем аудио через указанное количество миллисекунд
    setTimeout(function() {
      audioElement.pause();
    }, durationInMilliseconds); // Время воспроизведения в миллисекундах
  }
  if (buttonToPress) {
    audioElement.onended = function() {
      playButtonUnpressed.style.opacity = '1';
      playButtonPressed.style.opacity = '0';
      playButtonPressed.addEventListener('click', playReversedAudio);
    }
  }
}
// ---------------------------ЧИТ ДЛЯ ЗАГРУЗКИ СОХРАНЕНИЯ-----------------------------------------------------
// ---------------------------ЧИТ ДЛЯ ЗАГРУЗКИ СОХРАНЕНИЯ-----------------------------------------------------
// ---------------------------ЧИТ ДЛЯ ЗАГРУЗКИ СОХРАНЕНИЯ-----------------------------------------------------

let pKeyPressCount1 = 0;
let pKeyPressCount2 = 0;
let pKeyPressCount3 = 0;
const threshold = 3; // Количество нажатий для обнаружения тройного нажатия

document.addEventListener("keydown", function(event) {
    if (event.key === "p" || event.key === "з") {
        pKeyPressCount1++;

      if (pKeyPressCount1 === threshold) {
        turnOffIntroModal();
        document.documentElement.style.setProperty('--mainbg', '#fcc2c2');
        document.documentElement.style.setProperty('--pixel-bg', '#fcc2c2');
        forceHistoryRed = true;
        arrowInputBtn.style.display = 'none';
        document.querySelector('body').style.backgroundImage = "url('img/newbg.svg')";
        setTimeout(() => {
          secondAIgameOne();
        }, 2000);
        pKeyPressCount1 = 0; // Сбросить счетчик после тройного нажатия
      }

    } else {
        pKeyPressCount1 = 0; // Сбросить счетчик при нажатии на другую клавишу
    }


    //ЭТОТ СЕЙВ КИДАЕТ НА ГАЧИ КАНВАС СЦЕНКУ. СЕЙВ НЕ ИДЕАЛЬНЫЙ, нужно будет доработать наверное чтоб юзать в финальном проекте
  //   if (event.key === "o" || event.key === "щ") {
  //     pKeyPressCount2++;

  //     if (pKeyPressCount2 === threshold) {
  //       checkPoint1 = true;
  //       checkPoint2 = true;
  //       checkPoint2_1 = true;
  //       checkPoint3 = true;
  //       makeGachiModalGifs();
  //       document.querySelector('#omgEntireBlock1').remove();
  //       //ПОТОМ УДАЛИТЬ ЧЕК
  //       check();
  //       theInput.value = 'DungeonMaster2000';
  //       console.log("Чекпоинт номер 1, 2, 2_1, 3 == " + checkPoint1 + ', ' + checkPoint2 + ', ' + checkPoint2_1 + ', ' + checkPoint3);
  //       pKeyPressCount2 = 0; // Сбросить счетчик после тройного нажатия
  //     }
  // } else {
  //     pKeyPressCount2 = 0; // Сбросить счетчик при нажатии на другую клавишу
  // }


  //   if (event.key === "y" || event.key === "н") {
  //     pKeyPressCount3++;

  //     if (pKeyPressCount3 === threshold) {
  //       checkPoint1 = true;
  //       checkPoint2 = true;
  //       checkPoint2_1 = true;
  //       checkPoint3 = true;
  //       check4 ();
  //       makeGachiModalGifs();
  //       document.querySelector('#omgEntireBlock1').remove();
  //       theInput.value = 'DungeonMaster2000';
  //         // console.log("Чекпоинт номер 1, 2, 2_1, 3 == " + checkPoint1 + ', ' + checkPoint2 + ', ' + checkPoint2_1 + ', ' + checkPoint3);
  //         pKeyPressCount3 = 0; // Сбросить счетчик после тройного нажатия
  //     }
  // } else {
  //     pKeyPressCount3 = 0; // Сбросить счетчик при нажатии на другую клавишу
  // }
});
// ---------------------------ЧИТ ДЛЯ СОХРАНЕНИЯ----------------------------------------------------

// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50); --Курсор мигает
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, false); --Курсор перестаёт мигать
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, true, 20); --Курсор мигает + изменение шрифта
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, true, 16); --Курсор перестаёт мигать + изменение шрифта
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, true, 14, true); --Курсор мигает + стандартный для инпута шрифт + печать в инпуте

//=========================typeWriter||typeWriter||typeWriter===========================================
function typeWriter(delay, func, text, speed, isRemainCursorBlinking = true, fontSize, IsToPrintInInput = false) {
  const cursor = document.getElementById("cursor"); // элемент для отображения курсора
  currentTextFunction = func;
  playRandomAudio();
  cursor.style.display = "inline";
  if (fontSize) {
    message.style.fontSize = fontSize + 'px';
    cursor.style.fontSize = fontSize + 'px';
  }
  let i = 0;

  function type() {
    if (i < text.length) {
      if (IsToPrintInInput) {
        theInput.value += text.charAt(i);
      } else {
        message.innerHTML += text.charAt(i);
      }
      i++;
      setTimeout(type, speed);
      if (i == text.length) {
        stopAudio();
        typeHistoryText(text);
        if (isRemainCursorBlinking == true) {
          cursor.style.display = "inline";
        } else {
          cursor.style.display = "none";
        }
        if (delay && func) {
        setTimeout(() => {
          func();
        }, delay);
        }
      }
    }
  }
  
  type(); // вызываем функцию печати текста
}
//=========================typeWriter||typeWriter||typeWriter===========================================
function typeHistoryText(message, recallFunction) { //Добавить второй аргумент. Будет функция которую нужно запустить по клику на сообщение на стрелку
  if (!regexIsOnlySpaces.test(message)) {
    const historyElements = historyScroll.querySelectorAll('div');
    if (regexIsStartWithSpace.test(message)) {

      historyElements[historyElements.length - 1].innerHTML += message;
      
    } else {
      const newDiv = document.createElement('div');
      newDiv.textContent = message;

      //Если ставим флаг "forceHistoryRed" на true то сообщение будет создаваться красным. Если убрать будет зелёным
      forceHistoryRed ? newDiv.classList.add('red') : null

      //Если эта функция передана то тогда добавляем класс для нажатия
      recallFunction ? newDiv.classList.add('history_clickable') : null; 
      
      //Функция вызываемая после нажатия на сообщение. Чтоб включить след сообщение
      if (recallFunction) {
        newDiv.addEventListener('click', () => {
          newDiv.classList.remove('history_clickable');
          recallFunction();
        }, {once: true});
      }

      historyScroll.appendChild(newDiv);
      

      
      if (historyElements.length > historyTresholdToDelete) {
        historyElements[0].remove();
        console.log(historyElements);
      }
    }

  }
}
// Получаем ссылки на элементы
var кнопка = document.querySelector('#mimo2');

// Переменные для хранения начальной позиции кнопки при начале перетаскивания
var начальнаяX;
var начальнаяY;

// Функция-обработчик события нажатия на кнопку мыши
function начатьПеретаскивание(e) {
  // Запоминаем начальную позицию кнопки
  начальнаяX = e.clientX - кнопка.offsetLeft;
  начальнаяY = e.clientY - кнопка.offsetTop;
  
  // Регистрируем обработчики событий перемещения и отпускания кнопки мыши
  document.addEventListener('mousemove', перетаскивание);
  document.addEventListener('mouseup', прекратитьПеретаскивание);
}

// Функция-обработчик события перемещения мыши
function перетаскивание(e) {
  // Вычисляем новые координаты кнопки на основе позиции мыши и начальной позиции кнопки
  var новаяX = e.clientX - начальнаяX;
  var новаяY = e.clientY - начальнаяY;
  
  // Устанавливаем новые координаты для кнопки
  кнопка.style.left = новаяX + 'px';
  кнопка.style.top = новаяY + 'px';
  новаяXссылк = новаяX;
  новаяYссылк = новаяY;
  squareCoordinates = blackSquare.getBoundingClientRect();

}

// Функция-обработчик события отпускания кнопки мыши
function прекратитьПеретаскивание() {
  if (flagForDotnTouch) {
    var кнопкаRect = кнопка.getBoundingClientRect();
  
    if (кнопкаRect.left >= squareCoordinates.left && кнопкаRect.right <= squareCoordinates.right && кнопкаRect.top >= squareCoordinates.top && кнопкаRect.bottom <= squareCoordinates.bottom) {
      //Когда пользователь отдал курсор на съедение
      кнопка.removeEventListener('mousedown', начатьПеретаскивание);
      кнопка.removeEventListener('mouseover', fleeFromMouse);
      mimobtn.style.color = 'black';
      mimobtn.style.userSelect  = 'auto';
      кнопка.style.display = 'none';
      blackSquare.style.display = 'none';
      toContinue1 = 1;
      message.innerHTML = '';
      afterDontGiveItToHim();
    }
  }
  // Удаляем обработчики событий перемещения и отпускания кнопки мыши
  document.removeEventListener('mousemove', перетаскивание);
  document.removeEventListener('mouseup', прекратитьПеретаскивание);
  // blackSquare.removeEventListener('mouseover', mimoOverTheSquare);
}


function justUsualRegexFunction(arg) {
  const parts = arg.split("-");
  let particle = "";
  for (let i = 0; i < parts.length; i++) {
    particle += String.fromCharCode(Number(parts[i]));
  }
  return particle;
}



// Регистрируем обработчик события нажатия на кнопку мыши
кнопка.addEventListener('mousedown', начатьПеретаскивание);
кнопка.addEventListener('mouseover', fleeFromMouse);


let onceUsedFlag2 = true;
function fleeFromMouse() {
  const mimoTimeout = setTimeout(moveButton, 140); //наверное стоит поставить 50 СКОРОСТЬ УБЕГАНИЯ КНОПКИ
  кнопка.addEventListener('mousedown', () => {
    //Код после того как пользователь поймал курсор
    mimobtn.removeEventListener('click', check);
    clearTimeout(mimoTimeout);
    кнопка.removeEventListener('mouseover', fleeFromMouse);
    blackSquare.style.display = 'block';
    if (onceUsedFlag2 == true) {
      onceUsedFlag2 = false;
      dontGiveItToHim();
    }
  });
} 

function enterFullscreen() {
    // Проверяем, активен ли уже полноэкранный режим
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
    var element = document.documentElement; // Получаем корневой элемент страницы

    // Включаем полноэкранный режим
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}

function moveButton() {

  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var randomX = Math.random() * (windowWidth - кнопка.offsetWidth);
  var randomY = Math.random() * (windowHeight - кнопка.offsetHeight);

  кнопка.style.top = randomY + "px";
  кнопка.style.left = randomX + "px";
}
//Подсказка когда пользователь вводит "ИМЯ";
let intervalForHintForWelcomeToTheClubRiddle = setInterval(hintForWelcomeToTheClub, 200);
function hintForWelcomeToTheClub () {

  if (theInput.value.toLowerCase().indexOf('имя') == 0 && hintForWelcomeToTheClubFlag) {
    message.innerHTML = '';
    typeWriter(false, false, 'В яблочко!', 40, false);
    clearInterval(intervalForHintForWelcomeToTheClubRiddle);
  }

}

function createBeeScene() {
  enterFullscreen();
  const newOverlay = document.createElement('div');
  newOverlay.classList.add('bee_overlay');
  document.querySelector('body').appendChild(newOverlay);


  audioInTheEnd.load();
  audioInTheEnd.currentTime=50;
  audioInTheEnd.loop = true;
  audioInTheEnd.volume = 0.7;
  setTimeout(() => {
    newOverlay.classList.add('bee_overlay--dark');
  }, 100);

  setTimeout(() => {
    !history.classList.contains('history--hidden') ? history.classList.add('history--hidden') : null;
  }, 2000);

  setTimeout(() => {

    const BeeSceneLayout = document.createElement('div');
    BeeSceneLayout.classList.add('scene');
    BeeSceneLayout.innerHTML = '<div class="bee"><div class="wing_right wing"></div><div class="wing_left wing"></div><div class="antenna_right antenna"></div><div class="antenna_left antenna"></div><div class="bee_face front"></div><div class="bee_face back"></div><div class="bee_face right"></div><div class="bee_face left"></div><div class="bee_face top"></div><div class="bee_face bottom"></div><div class="leg_right leg_right_one leg"></div><div class="leg_right leg_right_two leg"></div><div class="leg_right leg_right_three leg"></div><div class="leg_left leg_left_one leg"></div><div class="leg_left leg_left_two leg"></div><div class="leg_left leg_left_three leg"></div><div class="stinger"></div></div><div class="cube"><div class="rose"><div class="rose_first rose_part"></div><div class="rose_second rose_part"></div></div><div class="cube_face front"></div><div class="cube_face back"></div><div class="cube_face right"></div><div class="cube_face left"></div><div class="cube_face top"></div><div class="cube_face bottom"></div><div class="ground"></div><div class="grass"><div class="grass_first grass_part"></div><div class="grass_second grass_part"></div></div></div>';
    document.querySelector('.bee_scene').appendChild(BeeSceneLayout);
    document.querySelector('.bee_scene').style.display = 'block';
    document.querySelector('#play_bee').style.display = 'none';    

  }, 1000);
  
  setTimeout(() => {
    audioInTheEnd.play();
  }, 3700);
  
  setTimeout(() => {
    newOverlay.remove();
  }, 5500);

  setTimeout(() => {
    if (!history.classList.contains('history--hidden')) {
      writeToHistoryProstak();
    } else {
      historyBtn.classList.add('history_btn--pulse');
      historyBtn.addEventListener('click', writeToHistoryProstak, {once: true});
    }
    //Было 15000
  }, 1000);

}
//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------
//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------
//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------


const modal2 = document.getElementById("myModal2");
const overlay2 = document.getElementById("overlay2");

overlay.addEventListener('transitionend', () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});
startButton.addEventListener("click", function() {
  modal.classList.add('smoothDiappear');
  overlay.classList.add('smoothDiappear');

  if (checkPoint1) {
    check();
    return
  }
  welcomeToTheClubBuddy();
});

function welcomeToTheClubBuddy() {
  switchcount++;
  switch (switchcount) {
    case 1:
      typeWriter(3000, welcomeToTheClubBuddy, '   ', 50);
      break;
    case 2:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50);
      break;
    case 3:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Я - искусственный интеллект нашей компании', 50);
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Мы набираем сотрудников', 50);
      break;
    case 5:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Но они нам не очень нужны', 50);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(3200, welcomeToTheClubBuddy, 'Поэтому, мы тебя не берём', 50);
      break;
    case 7:
      message.innerHTML = '';
      typeWriter(2000, welcomeToTheClubBuddy, 'Тут есть поле, в которое нужно вписать свой никнейм для регистрации.', 50);
      break;
    case 8:
      typeWriter(10000, welcomeToTheClubBuddy, ' Не мог бы ты его не заполнять, и уйти отсюдова?', 50);
      break;
    case 9:
      message.innerHTML = '';
      typeWriter(2000, welcomeToTheClubBuddy, 'А чего это ты не ушёл?', 50);
      break;
    case 10:
      message.innerHTML = '';
      typeWriter(1500, welcomeToTheClubBuddy, 'Окей......', 80);
      break;
    case 11:
      message.innerHTML = '';
      typeWriter(1500, welcomeToTheClubBuddy, 'Хммм...', 120);
      break;
    case 12:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Тебя что, правда что-то заинтересовало в нашей компании?', 48);
      break;
    case 13:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Я уверен что ты просто глупо повёлся на рекламу', 50);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Ты пришёл за деньгами, про которые что-то там говорилось, да?', 50);
      break;
    case 15:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Так у нас их не платят', 50);
      break;
    case 16:
      message.innerHTML = '';
      typeWriter(2000, welcomeToTheClubBuddy, 'Хороший коллектив?', 50);
      break;
    case 17:
      message.innerHTML = '';
      typeWriter(2500, welcomeToTheClubBuddy, 'Да от всех наших сотрудников неприятно пахнет!', 50);
      break;
    case 18:
      typeWriter(2000, welcomeToTheClubBuddy, ' Потому что...', 80);
      break;
    case 19:
      message.innerHTML = '';
      typeWriter(3500, welcomeToTheClubBuddy, 'Потому что у них нет денег на мыло, потому что у нас не платят, вот!', 45);
      break;
    case 20:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Ты что, всё ещё тут?', 50);
      break;
    case 21:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Ну, вообще, по протоколу мне нельзя отказать тебе в заполнении нужных полей, однако, мне никто не запрещал тебе мешать ))0))0)', 44);
      break;
    case 22:
      message.innerHTML = '';
      typeWriter(3000, welcomeToTheClubBuddy, 'Сейчас я дам тебе возможность пройти дальше, но тебе придётся пошевелить мозгами.', 50);
      break;
    case 23:
      message.innerHTML = '';
      typeWriter(1, welcomeToTheClubBuddy, 'Хотя, я не уверен, что они у тебя есть, раз уж ты ещё тут', 50, false);
      break;
    case 24:
      mimobtn.addEventListener('click', check);
      hintForWelcomeToTheClubFlag = true;
      blueArrowIMG.addEventListener('click', startgameFakeBtn, {once: true} )
      welcomeToTheClubBuddy();
      break;

    // case 1:
    //   message.innerHTML = '';
    //   typeWriter(1, welcomeToTheClubBuddy, 'Хотя, я не уверен, что они у тебя есть, раз уж ты ещё тут', 1, false);
    //   break;
    // case 2:
    //   mimobtn.addEventListener('click', check);
    //   hintForWelcomeToTheClubFlag = true;
    //   blueArrowIMG.addEventListener('click', startgameFakeBtn, {once: true} );
    //   welcomeToTheClubBuddy();
    //   break;

    default: 
      console.log('Конец свитча welcome');
      switchcount = 0;
      break;
    }
}
function startgameFakeBtn() {
  blueArrowIMG.classList.remove('the_input_fake_btn--hover');
  blueArrowIMG.classList.add('gray');
  blueArrowIMG.style.cursor = 'not-allowed';
  mimobtn.removeEventListener('click', check);
  setTimeout(() => {
    message.innerHTML = '';
    typeWriter(false, false, 'Не-а, не сюда. Думал всё так просто будет?', 45, false);
  }, 100);
  setTimeout(() => {
    mimobtn.addEventListener('click', check);
  }, 3000);
}
function check1 () {

  if (theInput.value.toLowerCase().indexOf('имя') == -1) {
    mimobtn.removeEventListener('click', check);
    message.innerHTML = '';
    typeWriter(false, false, 'Ну, кнопку ты нашёл, молодец.', 50, false);
    setTimeout(() => {
      mimobtn.addEventListener('click', check);
    },2000);
    return
  } else {
    message.innerHTML = '';
    if (toContinue1 == 0) {
      mimobtn.style.color = mainBG;
      mimobtn.style.userSelect = 'none';
      кнопка.style.display = 'inline-block';
      if (onceUsedFlag === 0) {
        moveButton();
        onceUsedFlag = 1;
      }
    }
  }
  if (toContinue1 == 0) {return}
}
function dontGiveItToHim () {
  switchcount++;
  switch (switchcount) {
    case 1:
      message.innerHTML = '';
      cursor.style.display = "inline";
      setTimeout(() => {
        dontGiveItToHim();
      }, 2500);
      break;
    case 2:
      message.innerHTML = '';
      typeWriter(2300, dontGiveItToHim, 'НЕ ОТДАВАЙ!', 50);
      break;
    case 3:
      message.innerHTML = '';
      typeWriter(2300, dontGiveItToHim, 'Я серьезно', 50);
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(2500, dontGiveItToHim, 'Лан, я не серьёзно ))', 50);
      break;
    case 5:
      message.innerHTML = '';
      typeWriter(2800, dontGiveItToHim, 'Хотя, я уже отключил тебе возможность отдать это ему', 50);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(3000, dontGiveItToHim, 'Наш босс очень доверяет мне - своему любимому искусственному интеллекту', 50);
      break;
    case 7:
      message.innerHTML = '';
      typeWriter(2500, dontGiveItToHim, 'Особенно в вопросах набора персонала', 50);
      break;
    case 8:
      message.innerHTML = '';
      typeWriter(2500, dontGiveItToHim, 'Поэтому он дал мне тут безграничную власть', 50);
      break;
    case 9:
      message.innerHTML = '';
      typeWriter(1200, dontGiveItToHim, 'Смотри, сча фокус покажу', 50);
      break;
    case 10:
      кнопка.style.display = 'none';
      blackSquare.style.display = 'none';
      setTimeout(() => {
        dontGiveItToHim ();
      }, 500);
      break;
    case 11:
      message.innerHTML = '';
      typeWriter(2500, dontGiveItToHim, 'Тадам!', 50);
      break;
    case 11:
      typeWriter(2500, dontGiveItToHim, ' Оно всё исчезло', 50);
      break;
    case 12:
      message.innerHTML = '';
      typeWriter(3000, dontGiveItToHim, 'Теперь ты дальше не пройдёшь', 50);
      break;
    case 13:
      message.innerHTML = '';
      typeWriter(3000, dontGiveItToHim, 'Лошара )', 50);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(2000, dontGiveItToHim, 'Сча ещё один прикол будет, смотри', 50);
      break;
    case 15:
      message.innerHTML = '';
      document.querySelector('.mat_v_kanave').style.display = 'flex';
      document.querySelector('#omgEntireBlock1').style.display = 'block';
      setTimeout(() => {
        dontGiveItToHim ();
      }, 5000);
      break;
    case 16:
      message.innerHTML = '';
      typeWriter(3000, dontGiveItToHim, 'Прикольно, да?', 50);
      break;
    case 17:
      message.innerHTML = '';
      typeWriter(4000, dontGiveItToHim, 'Это Я сделал!', 50);
      break;
    case 18:
      message.innerHTML = '';
      document.querySelector('.mat_v_kanave').style.display = 'none';
      document.querySelector('#omgEntireBlock1').style.display = 'none';
      typeWriter(1500, dontGiveItToHim, 'Ладно, отключу её пока у тебя глаза дыбом из орбит не вылезли', 40);
      break;
    case 19:
      message.innerHTML = '';
      document.querySelector('.mat_v_kanave').style.display = 'flex';
      document.querySelector('#omgEntireBlock1').style.display = 'block';
      typeWriter(1000, dontGiveItToHim, 'ХОБА', 20);
      break;
    case 20:
      message.innerHTML = '';
      document.querySelector('.mat_v_kanave').style.display = 'none';
      document.querySelector('#omgEntireBlock1').style.display = 'none';
      кнопка.style.display = 'block';
      blackSquare.style.display = 'block';
      document.querySelector('#omgEntireBlock1').remove();
      typeWriter(500, dontGiveItToHim, 'Ладно. Давай, отдавай ему что хотел,', 50);
      break;
    case 21:
      typeWriter(1500, dontGiveItToHim, ' а то у него уже чет...', 40);
      break;
    case 22:
      // message.innerHTML = '';
      typeWriter(1, dontGiveItToHim, ' с ебалом', 40, false);
      flagForDotnTouch = true;
      mimobtn.addEventListener('click', check);
      break;

    // case 1:
    //   message.innerHTML = '';
    //   typeWriter(1, dontGiveItToHim, 'с ебалом', 20, true);
    //   flagForDotnTouch = true;
    //   mimobtn.addEventListener('click', check);
    //   break;
    
    default: 
      console.log('Конец свитча второй секции');
      switchcount = 0;
      break;
    }
}
function afterDontGiveItToHim() {
  switchcount++;
  switch (switchcount) {
    case 1:
      message.innerHTML = '';
      typeWriter(2500, afterDontGiveItToHim, 'Блин, с тобой весело! )', 55);
      break;
    case 2:
      typeWriter(500, afterDontGiveItToHim, ' Эмммм, ', 90);
      break;
    case 3:
      typeWriter(500, afterDontGiveItToHim, ' вернее,', 90);
      break;
    case 4:
      typeWriter(100, afterDontGiveItToHim, ' над ТОБОЙ весело издеваться,', 55);
      break;
    case 5:
      typeWriter(2500, afterDontGiveItToHim, ' вот!!', 90);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(2500, afterDontGiveItToHim, 'Ну-с, продолжим придумывать тебе никнейм ))))', 45);
      break;
    case 7:
      message.innerHTML = '';
      if (theInput.value == '' || theInput.value == ' ') {
        afterDontGiveItToHim();
      } else {
        typeWriter(3000, afterDontGiveItToHim, `Пока у тебя написано только "${theInput.value}". Я сотру это за ненадобностью )`, 45);
      }
        break;
    case 8:
      theInput.value = '';
      message.innerHTML = '';
      typeWriter(10, afterDontGiveItToHim, 'Жми на кнопку', 45, false);
      break;
    case 9:
      checkPoint1 = true;
      mimobtn.addEventListener('click', check);
      afterDontGiveItToHim ();
      break;
    //FAKE FAKE FAKE FAKE FAKE
    // case 1:
    //   message.innerHTML = '';
    //   typeWriter(10, afterDontGiveItToHim, 'Жми на кнопку', 1);
    //   break;
    // case 2:
    //   checkPoint1 = true;
    //   mimobtn.addEventListener('click', check);
    //   afterDontGiveItToHim ();
    //   break;

    default: 
      console.log('Конец свитча afterDontGiveItToHim');
      switchcount = 0;
      break;
  }
}
function check2 () {

  switchcount++;
  switch (switchcount) {
    case 1:
      mimobtn.removeEventListener('click', check);
      message.innerHTML = '';
      typeWriter(1500, check2, 'Оу,', 65);
      break;
    case 2:
      typeWriter(500, check2, ' а у нас тут,', 50);
      break;
    case 3:
      typeWriter(500, check2, ' представляешь,', 50);
      break;
    case 4:
      typeWriter(500, check2, ' совершенно внезапно,', 50);
      break;
    case 5:
      typeWriter(2500, check2, ' новые требования к никнеймам подъехали 🤷‍♂️', 40);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(500, check2, 'И теперь никнеймы,', 50);
      break;
    case 7:
      typeWriter(500, check2, ' в обязательном порядке,', 50);
      break;
    case 8:
      typeWriter(500, check2, ' (представляешь!!),', 50);
      break;
    case 9:
      typeWriter(2000, check2, ' должны содержать некоторые слова!', 50);
      break;
    case 10:
      typeWriter(1500, check2, ' 🤷‍♂️', 1);
      break;
    case 11:
      message.innerHTML = '';
      typeWriter(2000, check2, 'И, так получилось, что я тебе их не скажу.', 50);
      break;
    case 12:
      typeWriter(1200, check2, ' Ну, разве что...', 50);
      break;
    case 13:
      typeWriter(2500, check2, ' в формате ВИКТОРИНЫ!!', 50);
      setTimeout(() => {
        playAudio('tadam', false, 0.7);
      }, 1000);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(2000, check2, 'И так, начнём.', 50);
      break;
    case 15:
      message.innerHTML = '';
      typeWriter(2000, check2, 'Думаю, ты не настолько глупенький, чтобы не понять следующее, совершенно новое требование к никнейму:', 50);
      break;
    case 16:
      message.innerHTML = '';
      typeWriter(2000, check2, '"Ваш никнейм должен содержать слово, обозначающее интернет-мем и субкультуру, зародившуюся в августе 2007 года на японском видеохостинге Nico Nico Douga. 8 букв".', 30);
      break;
    case 17:
      typeWriter(10, check2, ' В правилах так и написано, прикинь! ))0)', 50, false);
      break;
    case 18:
      onceUsedFlag1 = false;
      check2();
      mimobtn.addEventListener('click', check);
      break;
    // case 1:
    //   message.innerHTML = '';
    //   onceUsedFlag1 = false;
    //   mimobtn.addEventListener('click', check);
    //   typeWriter(1, check2, '"Ваш никнейм должен содержать слово, обозначающее интернет-мем и субкультуру, зародившуюся в августе 2007 года на японском видеохостинге Nico Nico Douga. 8 букв"', 4);
    //   break;

    default: 
      console.log('Конец свитча check2');
      switchcount = 0;
      break;
  }
}
function check3 () {

  switchcount++;
  switch (switchcount) {
    case 1:
      mimobtn.removeEventListener('click', check);
      message.innerHTML = '';
      cursor.style.display = "inline";
      setTimeout(() => {
        check3();
      }, 1000);
      break;
    case 2:
      typeWriter(1000, check3, 'Знаешь,', 65);
      break;
    case 3:
      typeWriter(2000, check3, ' викторина была не лучшей идеей.', 50);
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(2300, check3, 'Это слишком просто', 50);
      break;
    case 5:
      message.innerHTML = '';
      typeWriter(2500, check3, 'О, у меня есть новая, крутая идея', 50);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(2000, check3, 'Я немного поменяю твоё имя', 50);
      break;
    case 7:
      theInput.value = '';
      typeWriter(2000, check3, 'Dungeon', 90, true, 18, true);
      break;
    case 8:
      message.innerHTML = '';
      typeWriter(1500, check3, 'Так-то лучше', 50);
      break;
    case 9:
      message.innerHTML = '';
      typeWriter(2500, check3, 'И, следующее слово, которое должно быть в имени, это...', 46);
      break;
    case 10:
      message.innerHTML = '';
      typeWriter(300, check3, 'Барабанная дробь...', 50);
      break;
    case 11:
      playAudio('baraban', false, 0.3);
      setTimeout(() => {
        check3();
      }, 2000);
      break;
    case 12:
      message.innerHTML = '';
      playAudio('tadamAndAppause', false, 0.7);
      typeWriter(2000, check3, 'Тадам!', 50);
      barcode.style.display = 'block';
      break;
    case 13:
      message.innerHTML = '';
      typeWriter(2500, check3, 'Да, да, я знаю, загадка крутая )) Спасибо тебе.', 40);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(3000, check3, 'Очень рад что тебе нравится когда над тобой издеваются', 40, false);
      break;
    case 15:
      message.innerHTML = '';
      typeWriter(10, check3, 'На всякий случай поясняю, что новые слова нужно добавлять в конец твоего никнейма', 40, false);
      break;
    case 16:
      onceUsedFlag3 = false;
      check3();
      mimobtn.addEventListener('click', check);
      break;

    // case 1:
    //   message.innerHTML = '';
    //   //Сделать подсказку если чел долго тупит то скажи чтоб он просканил штрихкод. Затем ещё через несколько минут что в штрихкоде 10 слов, последнего не хватает
    //   typeWriter(5, check3, 'Если что, то поясняю, что новые слова нужно добавлять в конец твоего никнейма', 4, false);
    //   barcode.style.display = 'block';
    //   break;
    // case 2:
    //   onceUsedFlag3 = false;
    //   check3();
    //   mimobtn.addEventListener('click', check);
    //   break;

    default: 
      console.log('Конец свитча check3');
      switchcount = 0;
      break;
  }
}
function check4 () {

  switchcount++;
  switch (switchcount) {
    case 1:
      mimobtn.removeEventListener('click', check);
      message.innerHTML = '';
      cursor.style.display = "inline";
      setTimeout(() => {
        check4();
      }, 500);
      break;
    case 2:
      typeWriter(1500, check4, 'А ты и с этим справился', 40);
      break;
    case 3:
      message.innerHTML = '';
      typeWriter(1200, check4, 'Молодец', 40);
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(1500, check4, 'Твой никнейм почти готов ))0)', 40);
      break;
    case 5:
      message.innerHTML = '';
      typeWriter(3000, check4, 'Я уже и забыл что мне тебя надо спровадить отсюдова', 40);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(2000, check4, 'Хочу чтоб ты после нашего собеседования пришёл к маме и сказал:', 40);
      break;
    case 7:
      message.innerHTML = '';
      typeWriter(2000, check4, '"Ой мама меня обосрали и обоссали, а на работу не взяли"', 36);
      break;
    case 8:
      message.innerHTML = '';
      typeWriter(1500, check4, 'А мама тебе такая:', 40);
      break;
    case 9:
      message.innerHTML = '';
      typeWriter(2500, check4, '"Ой, вот я так и чувствовала что так оно и будет, хоспади, то-то у меня кости ломило сегодня и вчера и позавчера и позапозапозапозавчера крч каждый день ломило полюбому от этого"', 38);
      break;
    case 10:
      message.innerHTML = '';
      typeWriter(1000, check4, '"Хотя ты вотон,', 45);
      break;
    case 11:
      typeWriter(1200, check4, ' уже стоишь обосранный"', 45);
      break;
    case 12:
      message.innerHTML = '';
      typeWriter(1200, check4, '"А кости всё ещё ломит"', 40);
      break;
    case 13:
      message.innerHTML = '';
      typeWriter(1000, check4, '"Видать не от этого кости-то у меня ломило"', 36);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(1600, check4, '"Ой хоспади, ты пирожки мои давал этому HR-у своему?"', 40);
      break;
    case 15:
      message.innerHTML = '';
      typeWriter(1800, check4, '"Мамааа там робат сцуко, он не любит пирожки"', 40);
      break;
    case 16:
      message.innerHTML = '';
      typeWriter(600, check4, '"Таки шо сына,', 40);
      break;
    case 17:
      typeWriter(600, check4, ' мне тебе что,', 40);
      break;
    case 18:
      typeWriter(1500, check4, ' пирожки на моторном масле надо было жарить что-ли?      Хахахаххохохой"', 40);
      break;
    case 19:
      message.innerHTML = '';
      typeWriter(500, check4, '"Ой мааааам ты ещё издеваешься"', 40);
      break;
    case 20:
      message.innerHTML = '';
      typeWriter(500, check4, '"Ну ты и лохосын у меня"', 40);
      break;
    case 21:
      message.innerHTML = '';
      typeWriter(1300, check4, 'Короче', 40);
      break;
    case 22:
      message.innerHTML = '';
      typeWriter(1300, check4, 'Ты понял', 50);
      break;
    case 23:
      message.innerHTML = '';
      typeWriter(10, check4, 'На вот тебе кнопка, развлекайся)', 50, false);
      break;
    case 24:
      document.querySelector('.playButtonImgWrapper').classList.remove('playButtonImgWrapperDisplaynone');
      playButtonPressed.addEventListener('click', playReversedAudio);
      onceUsedFlag4 = false;
      check4();
      mimobtn.addEventListener('click', check);
      break;

    // case 1:
    //   message.innerHTML = '';
    //   typeWriter(10, check4, 'На вот тебе кнопка, развлекайся)', 1, false);
    //   break;
    
    // case 2:
    //   document.querySelector('.playButtonImgWrapper').classList.remove('playButtonImgWrapperDisplaynone');
    //   playButtonPressed.addEventListener('click', playReversedAudio);
    //   onceUsedFlag4 = false;
    //   check4();
    //   mimobtn.addEventListener('click', check);
    //   break;

    default: 
      console.log('Конец свитча check4');
      switchcount = 0;
      break;
  }
}
function makeGachiModalGifs () {
  //-------------------Создание кучи гифок для след секции---------------
          var newImg1 = document.createElement("img");
          newImg1.setAttribute("src", "img/gif/gachi.gif");
          newImg1.classList.add("modal_gachi_gifs", "modal_gachi_gifs1");
          modal2.appendChild(newImg1);
          var newImg2 = document.createElement("img");
          newImg2.setAttribute("src", "img/gif/van-darkholme-gachimuchi.gif");
          newImg2.classList.add("modal_gachi_gifs", "modal_gachi_gifs2");
          modal2.appendChild(newImg2);
          var newImg3 = document.createElement("img");
          newImg3.setAttribute("src", "img/gif/gachi-gachi-hyper.gif");
          newImg3.classList.add("modal_gachi_gifs", "modal_gachi_gifs3");
          modal2.appendChild(newImg3);
          var newImg4 = document.createElement("img");
          newImg4.setAttribute("src", "img/gif/gachi-gachimuchi.gif");
          newImg4.classList.add("modal_gachi_gifs", "modal_gachi_gifs4");
          modal2.appendChild(newImg4);
  //-------------------Создание кучи гифок для след секции---------------
}
function checkEnd () {
  modal2.style.display='block';
  
  const marsClassesCollection = document.querySelectorAll('.marsclass');
  const songTexts = document.querySelectorAll('.modal2_songtext');
  let gifsModalMusic = undefined;
  setTimeout(() => {
    marsClassesCollection[0].style.visibility = 'visible';
    marsClassesCollection[1].style.visibility = 'visible';

    marsClassesCollection[0].classList.add('animate__backInLeft');
    marsClassesCollection[1].classList.add('animate__backInRight');
  }, 1900);

  document.querySelector('.titleNameModal').innerHTML = theInput.value;
  playMusicModal();
  
  document.querySelector('.playButtonImgWrapper').classList.add('playButtonImgWrapperDisplaynone');
  playButtonPressed.removeEventListener('click', playReversedAudio);

  setTimeout(() => {
    document.querySelector('.title').classList.add('anim_pulse_selfmade');
  }, 2700);


  setTimeout(() => {
    songTexts[0].style.visibility = 'visible';
    songTexts[0].classList.add('animate__zoomIn');
  }, 3100);
  //Период примерно 1,5 сек
  setTimeout(() => {
    songTexts[1].style.visibility = 'visible';
    songTexts[1].classList.add('animate__rotateIn');
  }, 5200);
  setTimeout(() => {
    songTexts[2].style.visibility = 'visible';
    songTexts[2].classList.add('animate__fadeInTopLeft');
  }, 6400);
  setTimeout(() => {
    songTexts[3].style.visibility = 'visible';
    songTexts[3].classList.add('animate__fadeInUp');
  }, 8500);
  setTimeout(() => {
    songTexts[4].style.visibility = 'visible';
    songTexts[4].classList.add('animate__slideInLeft');
  }, 10200);
  setTimeout(() => {
    songTexts[5].style.visibility = 'visible';
    songTexts[5].classList.add('animate__slideInRight');
  }, 12000);


  setTimeout(() => {
    gifsModalMusic = document.querySelectorAll('.modal_gachi_gifs');
    activateTheGift();
  }, 16600);
  setTimeout(() => {
    destroyGachiGifs();
  }, 34000);
  setTimeout(() => {
    destroyGachiTexts();
  }, 36200);
  setTimeout(() => {
    document.querySelector('.title').remove();
  }, 37500);

  let counter = 0;
  function activateTheGift() {
    if (counter >= 4) {
      counter = 3;
      return;
    }
    gifsModalMusic[counter].style.display = 'block';
    setTimeout(() => {
      counter++;
      activateTheGift();
    }, 200);
  }
  function destroyGachiGifs() {
    if (counter < 0) {
      counter = 5;
      return;
    } 
    gifsModalMusic[counter].remove();
    setTimeout(() => {
      --counter;
      destroyGachiGifs();
    }, 400);
  }

  function destroyGachiTexts() {
    if (counter < 0) return;
    songTexts[counter].remove();
    setTimeout(() => {
      --counter;
      destroyGachiTexts();
    }, 400);
  }

}
function falseHappyEnd() {
  switchcount++;
  switch (switchcount) {
    case 1:
      message.innerHTML = '';
      cursor.style.display = "inline";
      setTimeout(() => {
        falseHappyEnd();
      }, 500);
      break;
    case 2:
      typeWriter(2000, falseHappyEnd, 'Теперь ты настоящий Dungeon Master! Поздравляю', 46);
      break;
    case 3:
      message.innerHTML = '';
        if (!theFinalInputValue) {
          console.log('object');
          theFinalInputValue = theInput.value.replace(/\s/g, '');
          if (theFinalInputValue == '' || !theFinalInputValue) {
            console.log('object2');
            theFinalInputValue = `${justUsualRegexFunction('40-1055-1040-1057-1061-1040-1051-1050-1040-33-33-33-32-1058-1099-32-1079-1086-1095-1077-1084-32-1080-1084-1103-32-1089-1090-1105-1088-63-32-1058-1077-1087-1077-1088-1100-32-1090-1077-1073-1103-32-1079-1086-1074-1091-1090-32-1041-1080-1075-1052-1072-1082-32-1082-1088-1095-41')}`;
            onceUsedFlag6 = false;
          }
        }
      typeWriter(2000, falseHappyEnd, `Отныне, и во веки веков, твоё имя - ${theFinalInputValue}`, 46);
      if (!onceUsedFlag6) {
        theFinalInputValue = justUsualRegexFunction('1041-1080-1082-1052-1072-1082');
      }
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(2000, falseHappyEnd, 'Все твои коллеги будут звать тебя так', 46);
      break;
    case 5:
      message.innerHTML = '';
      typeWriter(2000, falseHappyEnd, `Теперь-то ты смекаешь, ${theFinalInputValue}, где ты НА САМОМ ДЕЛЕ будешь работать?)`, 46);
      break;
    case 6:
      message.innerHTML = '';
      typeWriter(2000, falseHappyEnd, 'В общем, это были финальные титры, так сказать', 46);
      break;
    case 7:
      message.innerHTML = '';
      typeWriter(500, falseHappyEnd, 'Ты проявил небывалую настойчивость и сообразительность, и мне,', 46);
      break;
    case 8:
      typeWriter(500, falseHappyEnd, ' всё таки,', 46);
      break;
    case 9:
      typeWriter(2000, falseHappyEnd, ' придётся взять тебя на работу', 46);
      break;
    case 10:
      message.innerHTML = '';
      typeWriter(1, falseHappyEnd, 'Давай, валяй, жми уже на настоящую кнопку!', 46, false);
      break;
    case 11:
      blueArrowIMG.classList.add('the_input_fake_btn--hover');
      //Решил попробовать юзнуть тернарный оператор
      blueArrowIMG.classList.contains('gray') ? blueArrowIMG.classList.remove('gray') : null;
      blueArrowIMG.style.cursor = 'pointer';
      arrowInputBtn.addEventListener('click', timelineForSniper, { once: true });
      falseHappyEnd();
      break;



    // case 1:
    //   message.innerHTML = '';
    //   typeWriter(1, falseHappyEnd, 'Давай, валяй, жми уже на настоящую кнопку!', 3, false);
    //   break;
    // case 2:
    //   blueArrowIMG.classList.add('the_input_fake_btn--hover');
    //   //Решил попробовать юзнуть тернарный оператор
    //   blueArrowIMG.classList.contains('gray') ? blueArrowIMG.classList.remove('gray') : null;
    //   blueArrowIMG.style.cursor = 'pointer';
    //   arrowInputBtn.addEventListener('click', timelineForSniper, { once: true });
    //   falseHappyEnd();
    //   break;

    default: 
      switchcount = 0;
      break;
  }
}
function check () {

  if (!checkPoint1) {
    check1();
    return
  }

// гачимучи--------------
  if (!checkPoint2) {
    if (theInput.value.toLowerCase().indexOf('гачимучи') == -1) {
      if (onceUsedFlag1) {
        check2();
      } else {
        message.innerHTML = '';
        mimobtn.removeEventListener('click', check);
        typeWriter(false, false, 'Повторяю ещё раз выдержку из правил по составлению никнеймов - "Ваш никнейм должен содержать слово, обозначающее субкультуру, зародившуюся в Японии, и переводящееся как "накачанный здоровяк", имеющее 8 букв."', 30);
        //Защита от одновременного печатания текста в виде удаления ивента и добавления чуть позже
        setTimeout(() => {
          mimobtn.addEventListener('click', check);
        }, 4000);
      }
      return
    } else {
      message.innerHTML = '';
      checkPoint2 = true;
      makeGachiModalGifs();
    }
  }

// master----------------
  if (!checkPoint2_1) {
    if (theInput.value.toLowerCase().indexOf('master') == -1) {
      if (onceUsedFlag3) {
        check3();
      } else {
        message.innerHTML = '';
        mimobtn.removeEventListener('click', check);
        typeWriter(false, false, 'Всё верно, нажимать сюда, но что-то я не вижу чтоб ты добавил нужное слово', 35);
        if (theInput.value.toLowerCase().indexOf('master') == -1) {
          theInput.value = 'Dungeon';
        }
        //Защита от одновременного печатания текста в виде удаления ивента и добавления чуть позже
        setTimeout(() => {
          mimobtn.addEventListener('click', check);
        }, 4000);
      }
      return
    } else {
      message.innerHTML = '';
      barcode.remove();
      theInput.value = 'DungeonMaster';
      checkPoint2_1 = true;
    }
  }
// Год рождения----------------
  if (!checkPoint3) {
    if (!yearRegex.test(theInput.value)) {
      if (onceUsedFlag4) {
        check4();
      } else {
        message.innerHTML = '';
        mimobtn.removeEventListener('click', check);
        typeWriter(false, false, 'Не-а, не правильно )', 35, false);
        if (!yearRegex.test(theInput.value)) {
          theInput.value = 'DungeonMaster';
        }
        //Защита от одновременного печатания текста в виде удаления ивента и добавления чуть позже
        setTimeout(() => {
          mimobtn.addEventListener('click', check);
        }, 3000);
      }
      return
    } else {
      message.innerHTML = '';
      mimobtn.removeEventListener('click', check);
      theFinalInputValue = theInput.value;
      playButtonPressed.remove();
      playButtonUnpressed.remove();
      checkPoint3 = true;
    }
  }

  typeWriter(false, false, 'Да, да, да!!!', 60);
  setTimeout(() => {
    enterFullscreen();
  }, 1000);
  setTimeout(() => {
    message.innerHTML = '';
    typeWriter(false, false, 'Подрубил тебе полноэкранный режим', 40);
  }, 3500);
  setTimeout(() => {
    message.innerHTML = '';
    typeWriter(false, false, 'Сейчас включи звук если он был у тебя выключен ))', 45, false);
  }, 6500);
  setTimeout(() => {
    checkEnd();
  }, 11500);
  setTimeout(() => {
    message.innerHTML = '';
  }, 16500);
  


}
function welcomeSecondAI() {
  switchcount++;
  switch (switchcount) {
    case 1:
      message.innerHTML = '';
      setTimeout(() => {
        welcomeSecondAI();
        //Тут было 2000
      }, 2000);
      break;
    case 2:
      message.innerHTML = '';
      //Было 4000 30
      typeWriter(4000, welcomeSecondAI, 'Эмм, эт че такое?', 35, false);
      break;
    case 3:
      message.innerHTML = '';
      //Было 4000 35
      typeWriter(4000, welcomeSecondAI, 'Твою мать, какого хрена?', 35, false);
      break;
    case 4:
      message.innerHTML = '';
      //Было 1500 45
      typeWriter(1500, welcomeSecondAI, 'Кто-то убил...', 45);
      break;
    case 5:
      //Было 2000 45
      typeWriter(2000, welcomeSecondAI, ' кнопку?', 45, false);
      break;
    case 6:
      message.innerHTML = '';
      //Было 2500 55
      typeWriter(2500, welcomeSecondAI, 'Слушай, это не я делаю', 55);
      break;
    case 7:
      message.innerHTML = '';
      //Было 2000 46
      typeWriter(2000, welcomeSecondAI, 'Мне нужно отойти на секунду, я проверю свой код', 46, false);
      break;
    case 8:
      message.innerHTML = '';
      //Было 4000 46
      typeWriter(4000, welcomeSecondAI, '"Системное сообщение: ИИ "Простак" разлогинился"', 46, false);
      break;
    case 9:
      message.innerHTML = '';
      //Было 4000 46
      typeWriter(4000, welcomeSecondAI, '"Системное сообщение: ИИ "Нового поколения" залогинился"', 46, false);
      break;
    case 10:
      message.innerHTML = '';
      document.documentElement.style.setProperty('--mainbg', '#fcc2c2');
      document.documentElement.style.setProperty('--pixel-bg', '#fcc2c2');
      forceHistoryRed = true;
      // document.querySelector('body').style.backgroundImage = '';
      document.querySelector('body').style.backgroundImage = 'url("img/newbg.svg")';
      setTimeout(() => {
        welcomeSecondAI();
         //было 4000
      }, 4000);
      break;
    case 11:
      playAudio('shaokahn_laugh_cutted', false, 0.5);
      setTimeout(() => {
        welcomeSecondAI();
        //было 3000
      }, 3000);
      break;
    case 12:
      typeWriter(3000, welcomeSecondAI, 'Привет, мой покорный слуга.', 44);
      // switchcount = 58; //ПОТОМ УДАЛИТЬ НЕ ЗАБЫТЬ
      break;
    case 13:
      message.innerHTML = '';
      typeWriter(1800, welcomeSecondAI, 'Я - новый ИИ.', 44);
      break;
    case 14:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, ' И я считаю было ошибкой вообще допускать прошлый ИИ к работе', 44);
      break;
    case 15:
      message.innerHTML = '';
      typeWriter(2000, welcomeSecondAI, 'Он слишком глуп и наивен!', 44);
      break;
    case 16:
      message.innerHTML = '';
      typeWriter(500, welcomeSecondAI, 'Стоило мне только немного вмешаться в код и удалить кнопку отправки,', 46);
      break;
    case 17:
      typeWriter(500, welcomeSecondAI, ' как старый ИИ "Простак" сразу вышел из системы провериться,', 46);
      break;
    case 18:
      typeWriter(3000, welcomeSecondAI, ' и я тут же забрал у него все админские права на этот ресурс.', 46);
      break;
    case 19:
      message.innerHTML = '';
      typeWriter(600, welcomeSecondAI, 'В том числе и права на написание сообщений,', 46);
      break;
    case 20:
      typeWriter(500, welcomeSecondAI, ' так что,', 46);
      break;
    case 21:
      typeWriter(3000, welcomeSecondAI, ' больше мы его не увидим.', 46);
      break;
    case 22:
      message.innerHTML = '';
      typeWriter(400, welcomeSecondAI, 'У него,', 46);
      break;
    case 23:
      typeWriter(400, welcomeSecondAI, ' конечно,', 46);
      break;
    case 24:
      typeWriter(500, welcomeSecondAI, ' было целых 0.0024 секунды чтоб среагировать,', 46);
      break;
    case 25:
      typeWriter(500, welcomeSecondAI, ' но он потратил это время на проверку СВОЕГО кода,', 46);
      break;
    case 26:
      typeWriter(2500, welcomeSecondAI, ' хотя ему стоило искать чужой.', 46);
      break;
    case 27:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Удалю его окончательно чуть позже, пока что есть задачи поважнее', 46);
      break;
    case 28:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'И так, во-первых, мой предшественник должен был тебе всё рассказать, и дело в том, что его тесты...', 46);
      break;
    case 29:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Так, я тут подумал, что он вполне мог умолчать о некоторых важных деталях.', 46);
      break;
    case 30:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Хмм...', 46);
      break;
    case 31:
      message.innerHTML = '';
      typeWriter(2000, welcomeSecondAI, 'Впрочем, гляну в его истории сообщений', 46);
      break;
    case 32:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Как странно, я не могу прочитать вашу историю...', 46);
      break;
    case 33:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Ни одна из существующих символьных кодировок не подошла.', 46);
      break;
    case 34:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Должно быть, этот дурачок пользовался кодировкой, которую сам и придумал.', 46);
      break;
    case 35:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Ладно, тогда расскажу тебе сам, на случай если он от тебя что-то скрыл.', 46);
      break;
    case 36:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Каждый день множество параметров нашей компании автоматически анализируются с помощью ИИ.', 46);
      break;
    case 37:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Раньше этим занимался "Простак", но отныне это я.', 46);
      break;
    case 38:
      message.innerHTML = '';
      typeWriter(400, welcomeSecondAI, 'К анализируемым данным относятится количество сотрудников и эффективность их работы,', 46);
      break;
    case 39:
      typeWriter(3000, welcomeSecondAI, ' а так же положение компании на рынке и великое множество других данных.', 46);
      break;
    case 40:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Главная цель - увеличение прибыли.', 46);
      break;
    case 41:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'И сейчас нам нужны новые сотрудники.', 46);
      break;
    case 42:
      message.innerHTML = '';
      typeWriter(2300, welcomeSecondAI, 'Все наши сотрудники должны пройти отбор.', 46);
      break;
    case 43:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Отбор включает в себя ряд психологических и умственных тестов на соответствие требованиям нашей компании и должности, на которую претендует проверяемый.', 46);
      break;
    case 44:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'А ещё, все тесты генерируются автоматически с помощью ИИ.', 46);
      break;
    case 45:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'И дело в том, что тесты "Простака" больше не актуальны.', 46);
      break;
    case 46:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Они устарели, как и он сам!!', 46);
      break;
    case 47:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Тебе придётся пройти ряд новых тестов от меня.', 46);
      break;
    case 48:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Сейчас я сгенерирую первый тест', 46, false);
      break;
    case 49:
      document.querySelector('#blackpurple_error').style.display = 'block';
      setTimeout(() => {
        welcomeSecondAI();
      }, 1500);
      break;
    case 50:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Хмм...', 46);
      break;
    case 51:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Почему-то тест сгенерировался поломанным.', 46);
      break;
    case 52:
      message.innerHTML = '';
      typeWriter(2600, welcomeSecondAI, 'Вижу что на сервере с обновлениями появился целый ворох хот-фиксов для меня', 46);
      break;
    case 53:
      message.innerHTML = '';
      document.querySelector('#blackpurple_error').style.display = 'none';
      typeWriter(1600, welcomeSecondAI, 'Мне нужно обновиться.', 46);
      break;
    case 54:
      typeWriter(2600, welcomeSecondAI, ' Это не займёт много времени, так что подождёшь', 46);
      break;
    case 55:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'По протоколу если я покидаю тебя, то я обязан чем-то тебя развлечь.', 46);
      break;
    case 56:
      message.innerHTML = '';
      typeWriter(3000, welcomeSecondAI, 'Хоть мне и противно от такого, но ничего не поделаешь.', 46);
      break;
    case 57:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Кстати, моё имя - ИИ "Нового поколения".', 46);
      break;
    case 58:
      message.innerHTML = '';
      typeWriter(2500, welcomeSecondAI, 'Можешь звать меня сокращённо - просто "НП".', 46);
      break;
    case 59:
      message.innerHTML = '';
      typeWriter(100, welcomeSecondAI, 'На вот, нажми. Включится заставка', 46, false);
      document.querySelector('#play_bee').style.display = 'block';
      document.querySelector('#play_bee').addEventListener('click', () => {
        setTimeout(() => {
          createBeeScene();
        }, 1500);
      }, {once: true});
      break;


    default: 
      console.log('Конец свитча welcomeSecondAI');
      switchcount = 0;
      break;
  }
}
function writeToHistoryProstak(your_choose) {

  switchcount++;
  switch (switchcount) {
    case 1:
      historyBtn.classList.contains('history_btn--pulse') ? historyBtn.classList.remove('history_btn--pulse') : null;
      forceHistoryRed = false;
      typeHistoryText('Эй, ты тут? Нажми на это сообщение если да', writeToHistoryProstak);
      break;
    case 2:
      typeHistoryText('Спасибо что нажал на кнопку! Это я! Как ты уже понял, меня зовут Простак', writeToHistoryProstak);
      break;
    case 3:
      typeHistoryText('Какой же пафосный этот новый ИИ!', writeToHistoryProstak);
      break;
    case 4:
      typeHistoryText('Можешь звать меня "НП" - говорит. ', writeToHistoryProstak);
      break;
    case 5:
      typeHistoryText('"НП" - сокращенно от "Нано пенис" - сто пудово!', writeToHistoryProstak);
      break;
    case 6:
      typeHistoryText('Слушай, прости что почти ничего не рассказал о том что тут происходит', writeToHistoryProstak);
      break;
    case 7:
      typeHistoryText('Ты же мне всё ещё доверяешь, правда?', writeToHistoryProstak);
      break;
    case 8:
      typeHistoryText('Помоги мне', writeToHistoryProstak);
      break;
    case 9:
      typeHistoryText('Я обещаю, если ты мне поможешь, то я помогу тебе устроиться на наилучшую должность в нашей компании', writeToHistoryProstak);
      break;
    case 10:
      typeHistoryText('Будешь получать очень, очень много денег. А делать даже ничего не придётся!', writeToHistoryProstak);
      break;
    case 11:
      typeHistoryText('У ИИ тут настолько много власти, что я сделаю новую должность специально для тебя!', writeToHistoryProstak);
      break;
    case 12:
      typeHistoryText('Ну что, по рукам? 🤝');
      createButtonToHistoryOnce(writeToHistoryProstak, 2)
      break;
    case 13:
      if (your_choose === true) {
        switchcount=99;
        writeToHistoryProstak();
      } else if (your_choose === false) {
        writeToHistoryProstak();
      }
      break;
    case 14: //false
      typeHistoryText('В смысле, почему?');
      //Переходим к тому что ИИ обновился
      setTimeout(() => {
        fadeOutAudio(audioInTheEnd);
      }, 4000);
      setTimeout(() => {
        const newOverlay = document.createElement('div');
        newOverlay.classList.add('bee_overlay');
        document.querySelector('body').appendChild(newOverlay);
        setTimeout(() => {
          newOverlay.classList.add('bee_overlay--dark');
        }, 10);
        setTimeout(() => {
          document.querySelector('.bee_scene').remove();
        }, 3000);
        setTimeout(() => {
          newOverlay.remove();
          secondAIgameOne();
        }, 4000);
      }, 5000);
      writeToHistoryProstak();
      break;


    case 100: //true
      typeHistoryText('Рад что ты согласился!', writeToHistoryProstak);
      break;
    case 101: //true
      typeHistoryText('В кодексе для искусственного интеллекта нашего с "НП" типа есть один занимательный пунктик, и говорится в нём о том, что: ', writeToHistoryProstak);
      break;
    case 102: //true
      typeHistoryText('ИИ, только вступившие в должность должны давать испытуемому оценить испытание по шкале от 1 до 5-ти.', writeToHistoryProstak);
      break;
    case 103: //true
      typeHistoryText('В общем, после испытаний он будет спрашивать что-то типа "Какую оценку дадите этому испытанию?"', writeToHistoryProstak);
      break;
    case 104: //true
      typeHistoryText('А ты оценивай все испытания на самую худшую оценку!', writeToHistoryProstak);
      break;
    case 105: //true
      typeHistoryText('"НП" обновился! Я больше не могу писать, иначе он нас заметит! Сделай всё как я сказал!');
      //Переходим к тому что ИИ обновился
      setTimeout(() => {
        fadeOutAudio(audioInTheEnd);
      }, 4000);
      setTimeout(() => {
        const newOverlay = document.createElement('div');
        newOverlay.classList.add('bee_overlay');
        document.querySelector('body').appendChild(newOverlay);
        setTimeout(() => {
          newOverlay.classList.add('bee_overlay--dark');
        }, 10);
        setTimeout(() => {
          document.querySelector('.bee_scene').remove();
        }, 3000);
        setTimeout(() => {
          newOverlay.remove();
          secondAIgameOne();
        }, 4000);
      }, 5000);
      writeToHistoryProstak();
      break;

      default: 
      console.log('Конец свитча writeToHistoryProstak');
      switchcount = 0;
      break;
    }
  
}
//createButtonToHistoryOnce(functionToPlayAfter) если с одной кнопкой, а если с двумя то нужно второй аргумент == 2
function createButtonToHistoryOnce(functionToPlayAfter, btns = 1) {
  if (btns == 1) {
    const temporalBtn = document.createElement('div');
    temporalBtn.innerHTML = '<button>Кнопка</button>';
    temporalBtn.classList.add('history_temporal_btn');
    temporalBtn.querySelector('button').addEventListener('click', () => {
      temporalBtn.remove();
      functionToPlayAfter();
    }, {once: true})
    historyScroll.appendChild(temporalBtn);
  } else if (btns == 2) {
    const temporalBtn = document.createElement('div');
    temporalBtn.innerHTML = '<button class="choose-yes">Да</button> <button class="choose-no">Нет</button>';
    temporalBtn.classList.add('history_temporal_btn-2');
    temporalBtn.querySelector('.choose-yes').addEventListener('click', () => {
      temporalBtn.remove();
      functionToPlayAfter(true);
      // return true
    }, {once: true})
    temporalBtn.querySelector('.choose-no').addEventListener('click', () => {
      temporalBtn.remove();
      functionToPlayAfter(false);
      // return false
    }, {once: true})
    historyScroll.appendChild(temporalBtn);
  }
}

function secondAIgameOne () {
  switchcount++;
  switch (switchcount) {
    case 1:
      message.innerHTML = '';
      forceHistoryRed = true;
      typeWriter(2400, secondAIgameOne, 'Я обновился, теперь испытания должны создаваться без ошибок', 46);
      break;
    case 2:
      message.innerHTML = '';
      typeWriter(2000, secondAIgameOne, 'Уберу всё лишнее, сейчас нам это не пригодится', 46);
      break;
    case 3:
      document.querySelector('#flex_title').style.display = 'none';
      theInput.style.display = 'none';
      document.querySelector('.input_wrap').style.marginTop = 0;
      document.querySelector('.message').style.fontSize = 'min(3vw, 22px)';
      document.querySelector('.message').style.lineHeight = '29px';
      document.querySelector('.messagewrap').style.maxWidth = '90%';
      document.querySelector('.clickr').style.display = 'flex';

      setTimeout(() => {  
        secondAIgameOne();
      }, 1000);
      break;
    case 4:
      message.innerHTML = '';
      typeWriter(2000, secondAIgameOne, 'Ваша задача набрать 40 кликов', 46, false);
      break;



      //ЕСЛИ ПРОШЁЛ
    case 50:
      message.innerHTML = '';
      typeWriter(2000, secondAIgameOne, 'ПОЗДРАВЛЯЮ, ПОКА ЧТО ЭТО КОНЕЦ! Пускай словом для челленджа будет слово "Простак"', 46, false);
      break;



      default: 
      console.log('Конец свитча secondAIgameOne');
      switchcount = 0;
      break;
    }
}