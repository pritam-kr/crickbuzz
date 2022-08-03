const words = [
  "bowling",
  "stumped",
  "fielder",
  "batsman",
  "ran out",
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



// generate 12 * 12 matrix
const matrix = (alphabates) => {

  for (var i = 0; i < 169; i++) {
    matrixContainer.innerHTML += `<div class="matrix" id="matrix">${alphabates[i]}</div>`;
  }
};

const getMatrix = matrix(alphabates);


// Put line over through the exiting words
const lineThrough = (word) => {
  const listOfWords = document.querySelectorAll("#word-list");

  const allWords = []

  for (let eachWord of listOfWords) {
    allWords.push(eachWord.innerText.toLowerCase())
    if (word.toLowerCase() === eachWord.innerText.toLowerCase()) {
      eachWord.style.textDecoration = "line-through ";
      eachWord.style.backgroundColor = "yellow"

    }  
  }



  // Error Handling
  if(allWords.includes(word.toLowerCase())){
    return
  }else{
    showingAnError("There is no word like you entered. Try something else!")
  }

   
};

// match the word in matrix
const matchWord = (word) => {
  const matrix = document.querySelectorAll("#matrix");

  let makeWords = [];

  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabates.length; j++) {
      if (word[i].toUpperCase() === alphabates[j].toUpperCase()) {
        makeWords.push(alphabates[j]);
      }
    }

    // if(word.toUpperCase().includes(matrix[i].innerHTML)){
    //      matrix[i].style.backgroundColor = "yellow"
    // }
  }

  if (makeWords.length === 0) {
    showingAnError("Something went wrong, Try Again later!");
  } else {
    lineThrough([...new Set(makeWords)].join(""));
  }
};

// Input handler
const inputHandler = (event) => {
  let inputValue = inputWords.value.trim();

  if (!inputValue) {
    // Showing an error
    showingAnError("Your Input field can not be empty.")
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
