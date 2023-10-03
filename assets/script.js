// Quiz questions
const questions = [
  {
    question: "What is JavaScript?",
    options: [
      "A programming language",
      "A type of coffee",
      "A brand of sneakers",
      "A new dance move",
    ],
    answer: 0,
  },
  {
    question: "What does 'DOM' stand for?",
    options: [
      "Document Object Model",
      "Dancing Octopus Mascot",
      "Dreadful Oatmeal",
      "Digital Output Module",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Angular", "Banana", "Cucumber", "Dragon"],
    answer: 0,
  },
  {
    question: "What does 'HTML' stand for?",
    options: [
      "Hypertext Markup Language",
      "Highway Traffic Management League",
      "Hyperlink and Text Markup Language",
      "Holographic Text Manipulation Language",
    ],
    answer: 0,
  },
  {
    question: "What is the purpose of 'localStorage' in JavaScript?",
    options: [
      "To store data locally in the browser",
      "To send data to a remote server",
      "To print text on the screen",
      "To make coffee",
    ],
    answer: 0,
  },
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const initialsInput = document.getElementById("initials-input");
const saveScoreButton = document.getElementById("save-score-button");
const timeRemaining = document.getElementById("time-remaining");

// Start button click event
startButton.addEventListener("click", startQuiz);

// Option button click event
optionsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("option")) {
    const selectedOptionIndex = Array.from(optionsContainer.children).indexOf(
      e.target
    );
    checkAnswer(selectedOptionIndex);
  }
});

// Save score button click event
saveScoreButton.addEventListener("click", saveScore);

// Start the quiz
function startQuiz() {
  startButton.style.display = "none";
  questionContainer.style.display = "block";
  displayQuestion(currentQuestionIndex);
  startTimer();
}

// Display a question
function displayQuestion(index) {
  const question = questions[index];
  questionText.textContent = question.question;

  // Clear previous options
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }

  // Add new options
  question.options.forEach((option, i) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option");
    optionsContainer.appendChild(optionButton);
  });
}

// Check the answer
function checkAnswer(selectedOptionIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOptionIndex === currentQuestion.answer) {
    score++;
    resultText.textContent = "Correct!";
  } else {
    timeLeft -= 10; // Subtract 10 seconds for incorrect answers
    resultText.textContent = "Incorrect!";
  }

  // Move to the next question or end the quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timeRemaining.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultText.textContent = `Quiz Over! Your Score: ${score}`;
}

// Save the score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    // Save the score to local storage (you can modify this to use a server or database)
    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    savedScores.push({ initials, score });
    localStorage.setItem("quizScores", JSON.stringify(savedScores));

    // Reset the game for replay
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    initialsInput.value = "";
    resultContainer.style.display = "none";
    startButton.style.display = "block";
    timeRemaining.textContent = timeLeft;
  }
}
