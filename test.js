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
let checkPoint1 = false; 
let switchcount = 0;
let lastMesaageWas;
let isPaused = false;
let currentTextFunction;
let defenceFromOverpause = false;
const btnToPause = document.querySelector('#btnto_Pause');
const btnToContinue = document.querySelector('#btnto_Continue');
const btnToBack = document.querySelector('#btnto_Back');
// Получаем значение цвета из переменной css в root
const mainBG = getComputedStyle(document.documentElement).getPropertyValue('--mainbg');


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
// ---------------------------ЧИТ ДЛЯ СОХРАНЕНИЯ-----------------------------------------------------

let pKeyPressCount = 0;
const threshold = 3; // Количество нажатий для обнаружения тройного нажатия

document.addEventListener("keydown", function(event) {
    if (event.key === "p" || event.key === "з") {
        pKeyPressCount++;

        if (pKeyPressCount === threshold) {
          checkPoint1 = true;
            console.log("Чекпоинт номер 1 == " + checkPoint1);
            pKeyPressCount = 0; // Сбросить счетчик после тройного нажатия
        }
    } else {
        pKeyPressCount = 0; // Сбросить счетчик при нажатии на другую клавишу
    }
});
// ---------------------------ЧИТ ДЛЯ СОХРАНЕНИЯ----------------------------------------------------

// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50); --Курсор мигает
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, false); --Курсор перестаёт мигать
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, true, 20); --Курсор мигает + изменение шрифта
// typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50, true, 16); --Курсор перестаёт мигать + изменение шрифта

//=========================typeWriter||typeWriter||typeWriter===========================================
function typeWriter(delay, func, text, speed, isRemainCursorBlinking = true, fontSize) {
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
      message.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
      if (i == text.length) {
        stopAudio();
        if (isRemainCursorBlinking == true) {
          cursor.style.display = "inline";
        } else {
          cursor.style.display = "none";
        }
        setTimeout(() => {
          func();
        }, delay);
      }
    }
  }
  
  type(); // вызываем функцию печати текста
}
//=========================typeWriter||typeWriter||typeWriter===========================================

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
    //   setTimeout(() => {
    //     message.innerHTML = '';
    //     typeWriter('Ты вроде начинаешь понимать что тут к чему', 50, true);
    //   }, 1000);
    //   setTimeout(() => {
    //     message.innerHTML = '';
    //     typeWriter('Ну-с, продолжим придумывать тебе никнейм ))))', 50, true);
    // }, 5000);
    //   setTimeout(() => {
    //     message.innerHTML = '';
    //     checkPoint1 = true;
    //     typeWriter('Пока у тебя написано только "имя". Можешь стереть его, т.к. я просто проверял тебя', 40, true);
    // }, 10000);
    //   setTimeout(() => {
    //     typeWriter('Ладно, идём дальше по нашей бюрократической цепочке', 50);
    //     mimobtn.addEventListener('click', check);
    // }, 17500);
    //   setTimeout((FAKE) => {
    //     typeWriter('Дебик', 10);
    //     mimobtn.addEventListener('click', check);
    // }, 1);
    }
  }
  // Удаляем обработчики событий перемещения и отпускания кнопки мыши
  document.removeEventListener('mousemove', перетаскивание);
  document.removeEventListener('mouseup', прекратитьПеретаскивание);
  // blackSquare.removeEventListener('mouseover', mimoOverTheSquare);
}

// Регистрируем обработчик события нажатия на кнопку мыши
кнопка.addEventListener('mousedown', начатьПеретаскивание);
кнопка.addEventListener('mouseover', fleeFromMouse);


let onceUsedFlag2 = true;
function fleeFromMouse() {
  const mimoTimeout = setTimeout(moveButton, 500); //наверное стоит поставить 50
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



function moveButton() {

  // mimobtn.style.position = 'absolute';

  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var randomX = Math.random() * (windowWidth - кнопка.offsetWidth);
  var randomY = Math.random() * (windowHeight - кнопка.offsetHeight);

  кнопка.style.top = randomY + "px";
  кнопка.style.left = randomX + "px";
}



//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------
//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------
//---------------------------------ОСНОВНОЕ ТЕЛО------------------------------------


var modal = document.getElementById("myModal");
var overlay = document.getElementById("overlay");
var startButton = document.getElementById("startButton");

startButton.addEventListener("click", function() {
  modal.style.display = "none";
  overlay.style.display = "none";
  welcomeToTheClubBuddy();
});


function welcomeToTheClubBuddy() {
  switchcount++;
  switch (switchcount) {
    // case 1:
    //   typeWriter(3000, welcomeToTheClubBuddy, '   ', 50);
    //   break;
    // case 2:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'О, привет!', 50);
    //   break;
    // case 3:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Я - искусственный интеллект нашей компании', 50);
    //   break;
    // case 4:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Мы набираем сотрудников', 50);
    //   break;
    // case 5:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Но они нам не очень нужны', 50);
    //   break;
    // case 6:
    //   message.innerHTML = '';
    //   typeWriter(3200, welcomeToTheClubBuddy, 'Поэтому, мы тебя не берём', 50);
    //   break;
    // case 7:
    //   message.innerHTML = '';
    //   typeWriter(2000, welcomeToTheClubBuddy, 'Тут есть поле, в которое нужно вписать свой никнейм для регистрации.', 50);
    //   break;
    // case 8:
    //   typeWriter(1, welcomeToTheClubBuddy, ' Не мог бы ты его не заполнять, и уйти отсюдова?', 50);
    //   break;
    // case 9:
    //   message.innerHTML = '';
    //   typeWriter(2000, welcomeToTheClubBuddy, 'Ты ещё тут что-ли?', 50);
    //   break;
    // case 10:
    //   message.innerHTML = '';
    //   typeWriter(1500, welcomeToTheClubBuddy, 'Окей......', 80);
    //   break;
    // case 11:
    //   message.innerHTML = '';
    //   typeWriter(1500, welcomeToTheClubBuddy, 'Хммм...', 120);
    //   break;
    // case 12:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Тебя что, правда что-то заинтересовало в нашей компании?', 48);
    //   break;
    // case 13:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Я уверен что ты просто глупо повёлся на рекламу', 50);
    //   break;
    // case 14:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Ты пришёл за деньгами, про которые что-то там говорилось, да?', 50);
    //   break;
    // case 15:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Так у нас их не платят', 50);
    //   break;
    // case 16:
    //   message.innerHTML = '';
    //   typeWriter(2000, welcomeToTheClubBuddy, 'Хороший коллектив?', 50);
    //   break;
    // case 17:
    //   message.innerHTML = '';
    //   typeWriter(2500, welcomeToTheClubBuddy, 'Да все наши сотрудники воняют!', 50);
    //   break;
    // case 18:
    //   typeWriter(2000, welcomeToTheClubBuddy, ' Потому что...', 80);
    //   break;
    // case 19:
    //   message.innerHTML = '';
    //   typeWriter(4000, welcomeToTheClubBuddy, 'Потому что у них нет денег на мыло потому что у нас не платят, вот!', 45);
    //   break;
    // case 20:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Ты что, всё ещё тут?', 50);
    //   break;
    // case 21:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Ну, вообще, по протоколу мне нельзя отказать тебе в заполнении нужных полей, однако, мешать тебе мне никто не запрещал ))0))0)', 44);
    //   break;
    // case 22:
    //   message.innerHTML = '';
    //   typeWriter(3000, welcomeToTheClubBuddy, 'Сейчас я дам тебе возможность пройти дальше, но тебе придётся пошевелить мозгами.', 50);
    //   break;
    // case 23:
    //   message.innerHTML = '';
    //   typeWriter(1, welcomeToTheClubBuddy, 'Хотя, я не уверен, что они у тебя есть, раз уж ты ещё тут', 50, false);
    //   break;
    // case 24:
    //   mimobtn.addEventListener('click', check);
    //   welcomeToTheClubBuddy();
    //   break;
    case 1:
      message.innerHTML = '';
      typeWriter(1, welcomeToTheClubBuddy, 'Хотя, я не уверен, что они у тебя есть, раз уж ты ещё тут', 5, false);
      break;
    case 2:
      mimobtn.addEventListener('click', check);
      welcomeToTheClubBuddy();
      break;

    default: 
      console.log('Конец свитча welcome');
      switchcount = 0;
      break;
    }
}
function dontGiveItToHim () {
  switchcount++;
  switch (switchcount) {
    // case 1:
    //   message.innerHTML = '';
    //   cursor.style.display = "inline";
    //   setTimeout(() => {
    //     dontGiveItToHim();
    //   }, 500);
    //   break;
    // case 2:
    //   message.innerHTML = '';
    //   typeWriter(2300, dontGiveItToHim, 'НЕ ОТДАВАЙ!', 50);
    //   break;
    // case 3:
    //   message.innerHTML = '';
    //   typeWriter(2300, dontGiveItToHim, 'Я серьезно', 50);
    //   break;
    // case 4:
    //   message.innerHTML = '';
    //   typeWriter(2500, dontGiveItToHim, 'Лан, я не серьёзно ))', 50);
    //   break;
    // case 5:
    //   message.innerHTML = '';
    //   typeWriter(2800, dontGiveItToHim, 'Хотя, я уже отключил тебе возможность отдать это ему', 50);
    //   break;
    // case 6:
    //   message.innerHTML = '';
    //   typeWriter(3000, dontGiveItToHim, 'Наш босс очень доверяет мне - своему любимому искусственному интеллекту', 50);
    //   break;
    // case 7:
    //   message.innerHTML = '';
    //   typeWriter(2500, dontGiveItToHim, 'Особенно в вопросах набора персонала', 50);
    //   break;
    // case 8:
    //   message.innerHTML = '';
    //   typeWriter(2500, dontGiveItToHim, 'Поэтому он дал мне тут безграничную власть', 50);
    //   break;
    // case 9:
    //   message.innerHTML = '';
    //   typeWriter(1200, dontGiveItToHim, 'Смотри, сча фокус покажу', 50);
    //   break;
    // case 10:
    //   кнопка.style.display = 'none';
    //   blackSquare.style.display = 'none';
    //   setTimeout(() => {
    //     dontGiveItToHim ();
    //   }, 500);
    //   break;
    // case 11:
    //   message.innerHTML = '';
    //   typeWriter(2500, dontGiveItToHim, 'Тадам!', 50);
    //   break;
    // case 11:
    //   typeWriter(2500, dontGiveItToHim, ' Оно всё исчезло', 50);
    //   break;
    // case 12:
    //   message.innerHTML = '';
    //   typeWriter(3000, dontGiveItToHim, 'Теперь ты дальше не пройдёшь', 50);
    //   break;
    // case 13:
    //   message.innerHTML = '';
    //   typeWriter(3000, dontGiveItToHim, 'Лошара )', 50);
    //   break;
    // case 14:
    //   message.innerHTML = '';
    //   typeWriter(2000, dontGiveItToHim, 'Сча ещё один прикол будет, смотри', 50);
    //   break;
    // case 15:
    //   message.innerHTML = '';
    //   document.querySelector('.mat_v_kanave').style.display = 'flex';
    //   document.querySelector('#omgEntireBlock1').style.display = 'block';
    //   setTimeout(() => {
    //     dontGiveItToHim ();
    //   }, 5000);
    //   break;
    // case 16:
    //   message.innerHTML = '';
    //   typeWriter(3000, dontGiveItToHim, 'Прикольно, да?', 50);
    //   break;
    // case 17:
    //   message.innerHTML = '';
    //   typeWriter(4000, dontGiveItToHim, 'Это Я сделал!', 50);
    //   break;
    // case 18:
    //   message.innerHTML = '';
    //   document.querySelector('.mat_v_kanave').style.display = 'none';
    //   document.querySelector('#omgEntireBlock1').style.display = 'none';
    //   typeWriter(1500, dontGiveItToHim, 'Ладно, отключу её пока у тебя глаза дыбом из орбит не вылезли', 45);
    //   break;
    // case 19:
    //   message.innerHTML = '';
    //   document.querySelector('.mat_v_kanave').style.display = 'flex';
    //   document.querySelector('#omgEntireBlock1').style.display = 'block';
    //   typeWriter(1000, dontGiveItToHim, 'ХОБА', 20);
    //   break;
    // case 20:
    //   message.innerHTML = '';
    //   document.querySelector('.mat_v_kanave').style.display = 'none';
    //   document.querySelector('#omgEntireBlock1').style.display = 'none';
    //   typeWriter(3000, dontGiveItToHim, 'Ладно. Давай, отдавай ему что хотел,', 50);
    //   break;
    // case 21:
    //   message.innerHTML = '';
    //   typeWriter(1500, dontGiveItToHim, ' а то у него уже чет... ', 40);
    //   break;
    // case 22:
    //   message.innerHTML = '';
    //   typeWriter(1, dontGiveItToHim, ' с ебалом', 40);
    //   mimobtn.addEventListener('click', check);
    //   break;

    case 1:
      message.innerHTML = '';
      typeWriter(1, dontGiveItToHim, 'с ебалом', 20, true);
      mimobtn.addEventListener('click', check);
      break;
    
    default: 
      console.log('Конец свитча второй секции');
      switchcount = 0;
      break;
    }
      // typeWriter(2000, dontGiveItToHim, 'Смотри, сча фокус покажу', 50, true);
}
function check1 () {

  if (theInput.value.toLowerCase().indexOf('имя') == -1) {
    mimobtn.removeEventListener('click', check);
    message.innerHTML = '';
    typeWriter('Ну, кнопку ты нашёл, молодец', 50, true);
    setTimeout(() => {
      message.innerHTML = '';
      typeWriter('Если не понял как, то сделай те же действия', 50);
    },4000);
    setTimeout(() => {
      mimobtn.addEventListener('click', check);
    },6000);
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
// mimobtn.addEventListener('click', check);

function check () {
  if (!checkPoint1) {
    check1();
  } else {
    console.log('функция check сделала return');
    return
  }


//dungeon master 2000
  if (theInput.value.toLowerCase().indexOf('dungeon') == -1) {

    if (onceUsedFlag1) {
      // mimobtn.removeEventListener('click', check);
      // message.innerHTML = '';
      // typeWriter('Ой', 75, true);
      // setTimeout(() => {
      //   typeWriter(', а у нас тут, представляешь, совершенно внезапно, новые требования к никнейму подъехали 🤷‍♂️', 55, true);
      //   },2000);
      // setTimeout(() => {
      //   message.innerHTML = '';
      //   typeWriter('И теперь никнеймы, ', 50, true);
      //   },11000);
      // setTimeout(() => {
      //   typeWriter('в обязательном порядке, ', 55, true);
      //   },12600);
      // setTimeout(() => {
      //   typeWriter('(представляешь!!), ', 55, true);
      //   },14500);
      // setTimeout(() => {
      //   typeWriter('должны содержать некоторые слова!', 55, true);
      //   },16500);
      // setTimeout(() => {
      //   typeWriter('🤷‍♂️', 10, true);
      //   },20000);
      // setTimeout(() => {
      //   message.innerHTML = '';
      //   typeWriter('И, так получилось, что я тебе их не скажу.', 70, true);
      //   },24000);
      // setTimeout(() => {
      //   typeWriter(' Ну, разве что... ', 70, true);
      //   },28000);
      // setTimeout(() => {
      //   typeWriter('в формате ВИКТОРИНЫ!!', 70, true);
      //   },31500);
      // setTimeout(() => {
      //   message.innerHTML = '';
      //   typeWriter('И так, начнём.', 70, true);
      //   },35000);
      // setTimeout(() => {
      //   message.innerHTML = '';
      //   typeWriter('Думаю, ты не настолько глупенький, чтобы не понять следующий вопрос:', 60, true);
      //   },38000);
      // setTimeout(() => {
      //   message.innerHTML = '';
      //   typeWriter('Ваш никнейм должен содержать слово, обозначающее субкультуру, зародившуюся в Японии в августе 2007 года', 45, true, true);
      //   },43500);
      // setTimeout(() => {
      //     mimobtn.addEventListener('click', check);
      //     onceUsedFlag1 = false;
      //   },48000);
      // typeWriter('Ваш никнейм должен содержать слово, обозначающее название полового органа (как мужского, так и женского). Это слово является уменьшительно-ласкательным, и, зачастую, используется в разговоре с детьми.', 70);
      // message.innerHTML = 'Ваш пороль должен содержать слово "писька"';
      
    } else {
      message.innerHTML = '';
      //playSound(4000);
      typeWriter('Ваш никнейм должен содержать слово, обозначающее название полового органа (как мужского, так и женского). Это слово является уменьшительно-ласкательным, и, зачастую, используется в разговоре с детьми.', 17);
    }
    return
  } else {
    message.innerHTML = '';
  }

  if (theInput.value.indexOf('Дакка') == -1) {
    typeWriter('Ваше имя должно содержать столицу Бангладеша', 40);
    // message.innerHTML = 'Ваш пороль должен содержать столицу Бангладеша';
    return
  } else {
    message.innerHTML = '';
  }

  navigator.clipboard.readText().then(text => {
    // console.log(text);
    if (text.toLowerCase().indexOf('люблю') && text.toLowerCase().indexOf('порно') && (text.toLowerCase().indexOf('курица') || text.toLowerCase().indexOf('курицей'))) {
      typeWriter('В вашем буфере обмена должо быть скопировано что-то про любовь к порно с курицей', 40);
      //   люблю порно с курицей
      // message.innerHTML = 'В вашем буфере обмена должо быть скопировано что-то про любовь к порно с курицей';
      return
    } else {
      typeWriter('Эммм...', 80, true);
      setTimeout(() => {
        typeWriter(' Знаешь...', 80, true);
    }, 1000);
      setTimeout(() => {
        typeWriter(' Это ПИздец', 120, true, true);
    }, 3000);
      setTimeout(() => {
        typeWriter('Ладно, забудем...', 120);
    }, 5500);
      setTimeout(() => {
        typeWriter('ПИЗДЕЦ', 20);
    }, 9000);
    setTimeout(() => {
      typeWriter('Ладно...', 120);
    }, 9300);
      // message.innerHTML = 'Эммм... <br> знаешь... <br> это пиздец';
    }
  });


}