//-------------------------Так выглядит чит который кидает нас к той заставке с гачимучи-------------------------
document.addEventListener("keydown", function(event) {
  if (event.key === "p" || event.key === "з") {
      pKeyPressCount++;

      if (pKeyPressCount === threshold) {
        checkPoint1 = true;
        checkPoint2 = true;
        checkPoint2_1 = true;
        checkPoint3 = true;
        makeGachiModalGifs();
        document.querySelector('#omgEntireBlock1').remove();
        //ПОТОМ УДАЛИТЬ ЧЕК
        check();
        theInput.value = 'DungeonMaster2000';
          console.log("Чекпоинт номер 1, 2, 2_1, 3 == " + checkPoint1 + ', ' + checkPoint2 + ', ' + checkPoint2_1 + ', ' + checkPoint3);
          pKeyPressCount = 0; // Сбросить счетчик после тройного нажатия
      }
  } else {
      pKeyPressCount = 0; // Сбросить счетчик при нажатии на другую клавишу
  }

//ЭТОТ СЕЙВ КИДАЕТ К СЦЕНЕ ПОЯВЛЕНИЯ ЗЛОГО ИИ
  if (event.key === "p" || event.key === "з") {
    pKeyPressCount1++;

    if (pKeyPressCount1 === threshold) {
      checkPoint1 = true;
      checkPoint2 = true;
      checkPoint2_1 = true;
      checkPoint3 = true;
      makeGachiModalGifs();
      mimobtn.removeEventListener('click', check);
      blueArrowIMG.removeEventListener('click', startgameFakeBtn);
      document.querySelector('#omgEntireBlock1').remove();
      falseHappyEnd();
      theInput.value = 'DungeonMaster1999';
        console.log("Чекпоинт номер 1, 2, 2_1, 3 == " + checkPoint1 + ', ' + checkPoint2 + ', ' + checkPoint2_1 + ', ' + checkPoint3);
        pKeyPressCount1 = 0; // Сбросить счетчик после тройного нажатия
    }
} else {
    pKeyPressCount1 = 0; // Сбросить счетчик при нажатии на другую клавишу
}
});





//Шифровка слова в Юникод
function encryptWord(word) {
  // Заменяем каждую букву на её юникод-код
  let encrypted = "";
  for (let i = 0; i < word.length; i++) {
    encrypted += word.charCodeAt(i) + "-";
  }
  return encrypted;
}

const encryptedWord = encryptWord("(ПАСХАЛКА!!! Ты зочем имя стёр? Теперь тебя зовут БигМак крч)");
console.log(encryptedWord);

