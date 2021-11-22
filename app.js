window.addEventListener("DOMContentLoaded", start);

function start() {
  let timer = document.querySelector("#timer");
  let shuffledLetters = document.querySelector(".shuffledLetters");
  let chosenLetters = document.querySelector(".chosenLetters input");
  let correctWords = document.querySelector(".correctWords");
  let reshuffle = document.querySelector(".reshuffle");
  let remWords = document.querySelector(".remWords");
  let wordsFound = document.querySelector(".wordsFound");
  let correctWordsList = [];

  let words = "successful sec sue success flu";

  let wordsCompare = words.split(" ");
  let uppercased = wordsCompare.map((wordCompare) => wordCompare.toUpperCase());
  remWords.innerHTML = uppercased.length;
  wordsFound.innerHTML = 0;
  let correctWordCount = 0;

  let minute = 1;
  let sec = 30;
  setInterval(function () {
    timer.innerHTML = minute + " : " + sec;
    sec--;
    if (sec === 00) {
      minute--;
      sec = 60;
      if (minute < 2) {
        timer.style.color = "red";
      }

      if (minute < 0) {
        alert("Out Of Time");
        location.reload();
      }
    }
  }, 1000);

  let word = "successful";
  let wordArr = word.split("");
  let sortedArr = wordArr.sort((a, b) => 0.5 - Math.random());

  function display() {
    for (i = 0; i < sortedArr.length; i++) {
      let letters = document.createElement("h1");
      letters.innerHTML = sortedArr[i];
      shuffledLetters.appendChild(letters);
    }
    let indLetters = document.querySelectorAll("h1");
    indLetters.forEach(function (indLetters) {
      indLetters.addEventListener("click", () => {
        chosenLetters.value += indLetters.innerText;
        shuffledLetters.removeChild(indLetters);
        let userWord = chosenLetters.value;

        reshuffle.addEventListener("click", () => {
          chosenLetters.value = "";
          while (shuffledLetters.firstChild) {
            shuffledLetters.removeChild(shuffledLetters.lastChild);
          }
          display();
        });

        if (uppercased.includes(userWord)) {
          correctWordsList.push(userWord);
          chosenLetters.value = "";
          while (shuffledLetters.firstChild) {
            shuffledLetters.removeChild(shuffledLetters.lastChild);
          }
          display();

          uppercased = uppercased.filter((x) => x != userWord);
          remWords.innerHTML = uppercased.length;
          correctWordCount++;
          wordsFound.innerHTML = correctWordCount;
          addToCorrectWords();
        }
      });
    });
  }
  display();
  function addToCorrectWords() {
    for (i = 0; i < correctWordsList.length; i++) {
      let div = document.createElement("div");
      let words = document.createElement("h4");
      div.appendChild(words);
      correctWords.appendChild(div);
      words.innerHTML = correctWordsList[i];
    }
    correctWordsList = [];
  }
}
