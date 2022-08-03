const words = [
  "bowling",
  "stumped",
  "fielder",
  "batsman",
  "ranout",
  "catch",
  "umpire",
  "inning",
  "appeal",
  "batting",
  "spin",
  "tea",
  "stumps",
  "boundary",
];

const alphabates = [
  "R",
  "A",
  "N",
  "O",
  "U",
  "T",
  "A",
  "T",
  "C",
  "H",
  "Q",
  "R",
  "O",
  "S",
  "F",
  "Z",
  "W",
  "N",
  "A",
  "X",
  "E",
  "Y",
  "U",
  "V",
  "X",
  "T",
  "E",
  "A",
  "E",
  "S",
  "T",
  "U",
  "M",
  "P",
  "E",
  "D",
  "T",
  "Z",
  "K",
  "X",
  "Y",
  "V",
  "Q",
  "W",
  "S",
  "A",
  "L",
  "L",
  "C",
  "F",
  "X",
  "L",
  "X",
  "L",
  "B",
  "A",
  "B",
  "K",
  "N",
  "H",
  "G",
  "L",
  "H",
  "Q",
  "A",
  "W",
  "X",
  "W",
  "Q",
  "H",
  "A",
  "U",
  "C",
  "G",
  "P",
  "O",
  "L",
  "Q",
  "E",
  "N",
  "K",
  "E",
  "U",
  "R",
  "M",
  "W",
  "B",
  "Q",
  "X",
  "J",
  "B",
  "A",
  "V",
  "B",
  "O",
  "W",
  "L",
  "I",
  "N",
  "G",
  "F",
  "I",
  "E",
  "L",
  "D",
  "E",
  "R",
  "M",
  "G",
  "D",
  "C",
  "S",
  "P",
  "I",
  "N",
  "V",
  "B",
  "O",
  "U",
  "N",
  "D",
  "A",
  "R",
  "Y",
  "P",
  "U",
  "I",
  "L",
  "T",
  "J",
  "V",
  "I",
  "T",
  "X",
  "C",
  "A",
  "T",
  "C",
  "H",
  "I",
  "G",
  "W",
  "A",
  "M",
  "H",
  "E",
  "V",
  "L",
  "D",
  "J",
  "K",
  "D",
  "U",
  "M",
  "P",
  "I",
  "R",
  "E",
  "K",
  "K",
  "D",
  "B",
  "S",
  "T",
  "U",
  "M",
  "P",
  "S",
  "C",
];

const wordsContainer = document.querySelector("#words-container");
const btnSubmit = document.querySelector("#btn-submit");
const inputWords = document.querySelector("#input-words");
const matrixContainer = document.querySelector("#matrix-container");
const primaryToast = document.querySelector(".primary-toast");

// show words in words container
const showWords = (words) => {
  let wordList = "";

  words.forEach((eachWord) => {
    wordList += `<li class="lists word-list paragraph" id="word-list">${eachWord} </li>`;
  });

  return wordList;
};

wordsContainer.innerHTML = showWords(words);

// Generate 13 * 13 matrix
const matrix = (alphabates) => {
  for (var i = 0; i < 169; i++) {
    matrixContainer.innerHTML += `<div class="matrix" id="matrix">${alphabates[i]}</div>`;
  }
};

const getMatrix = matrix(alphabates);

// checking that entered word exit on exiting list or not
const checkingWord = (word) =>
  words.find((eachWord) => eachWord.toLowerCase() === word.toLowerCase());

// Put line over through the exiting words
const getLineThrough = (word) => {
  const listOfWords = document.querySelectorAll("#word-list");
  const allWords = [];

  for (let i = 0; i < words.length; i++) {
    // Pushing to, for error if not matched
    allWords.push(words[i].toLowerCase());
    if (checkingWord(word) === words[i].toLowerCase()) {
      listOfWords[i].style.textDecoration = "line-through ";
      listOfWords[i].style.backgroundColor = "yellow";
    }
  }

  // Error Handling
  if (allWords.includes(word.toLowerCase())) {
    return;
  } else {
    showingAnError("There is no word like you entered. Try something else!");
  }
};

// matching the word in matrix 13 * 13 start point
const matchWord = (word) => {
  // Calling getLineThrough function we have matching word
  if (word) {
    getLineThrough(word);
  }

  const matrix = document.querySelectorAll("#matrix");

  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabates.length; j++) {
      if (
        checkingWord(word)[i]?.toUpperCase() === alphabates[j].toUpperCase()
      ) {
        matrix[j].style.backgroundColor = "yellow";
      }
    }
  }
};

// Input handler
const inputHandler = (event) => {
  let inputValue = inputWords.value.trim();

  if (!inputValue) {
    // Showing an error
    showingAnError("Your Input field can not be empty.");
  } else {
    matchWord(inputValue);
  }

  inputWords.value = "";
};

btnSubmit.addEventListener("click", (event) => inputHandler(event));

// Function for toast
const showingAnError = (error) => {
  primaryToast.classList.add("active-toast");
  primaryToast.innerHTML = error;
  setTimeout(() => {
    primaryToast.classList.remove("active-toast");
  }, 3000);
};
