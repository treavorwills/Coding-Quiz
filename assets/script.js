var body = document.body;
var j = 0;
localStorage.setItem("localQuestionIndex", j);
var points = 0;
localStorage.setItem("localPoints", points);

var quizQuestionsArray = [
    ["What is your favorite Star Wars Quote?", "Hello there!", "I've got a bad feeling about this!", "GENERAL KENOBI!", "May the force be with you", "Any"],
    ["Inside which HTML element do we put the JavaScript?", "<js>", "<scripting>", "<script>", "<javascript>", "<script>"],
    ["What is the correct JavaScript syntax to change the content of the following HTML element: <p id=\"demo\">This is a demonstration.</p>","document.getElement(\"p\").innerHTML = \"Hello World!\";","#demo.innerHTML=\"Hello World!\";","document.getElementById(\"demo\").innerHTML=\"Hello World!\";","document.getElementByName(\"p\").innerHTML=\"Hello World!\";","document.getElementById(\"demo\").innerHTML=\"Hello World!\";"],
    ["Where is the correct place to insert a JavaScript?","The <body> section","The <head> section","Both the <head> section and the <body> section are correct","In the <nav> section","The <body> section"],
    ["What is the correct syntax for referring to an external script called \"xxx.js\"?","<script src=\"xxx.js\">","<script name=\"xxx.js\">","<script href=\"xxx.js\">","<script nav=\"xxx.js\">","<script src=\"xxx.js\">"],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
];


// create a variables
var containerDiv = document.querySelector(".container");
// var answerDiv = document.querySelector(".answers");

// create title elements
var titleDiv = document.createElement("div");
var titleH1 = document.createElement("h1");
var titleP = document.createElement("p");
var beginButton = document.createElement("button");

// create the quiz elements
var quizDiv = document.createElement("div");
var quizTimerDiv = document.createElement("div");
var quizTimerP = document.createElement("p");
var quizQuestionDiv = document.createElement("div");
var quizQuestionP = document.createElement("p");
var quizAnswersDiv = document.createElement("div");
var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");

// add classes to the quiz elements
quizDiv.className = "quiz";
quizTimerDiv.className = "timer";
quizQuestionDiv.className = "question";
quizAnswersDiv.className = "answers";

// append the quiz elements
quizDiv.appendChild(quizTimerDiv);
quizDiv.appendChild(quizQuestionDiv);
quizQuestionDiv.appendChild(quizQuestionP);
quizDiv.appendChild(quizAnswersDiv);
quizAnswersDiv.append(option1);
quizAnswersDiv.append(option2);
quizAnswersDiv.append(option3);
quizAnswersDiv.append(option4);
quizTimerDiv.appendChild(quizTimerP);

titleH1.textContent = "JavaScript Coding Quiz";
titleP.textContent = "Select Begin to test your knowledge Java Script. For every question you answer incorrectly, time is deducted from the timer. Answer correctly to earn points and enter your initials at the end!";

titleDiv.className = "question";
beginButton.className = "answers";
beginButton.textContent = "Begin!";

titleDiv.appendChild(titleH1);
titleDiv.appendChild(titleP);
titleDiv.appendChild(beginButton);

containerDiv.appendChild(titleDiv);

beginButton.addEventListener("click", playGame); 

function playGame() {
    event.preventDefault();
    // remove the title div
    titleDiv.remove();

    // add the first quiz question
    containerDiv.appendChild(quizDiv);

    var secondsLeft = 30;
    var questionIndex = localStorage.getItem("localQuestionIndex");
    var timerInterval = setInterval(function() {
        quizTimerP.textContent = secondsLeft + " seconds left!";
        secondsLeft--;
        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            quizTimerP.textContent = "Times up!";
        }
    }, 1000);

    displayQuiz(questionIndex);
    option1.addEventListener("click", getAnswer);
    option2.addEventListener("click", getAnswer);
    option3.addEventListener("click", getAnswer);
    option4.addEventListener("click", getAnswer);
    quizAnswersDiv.addEventListener("click", displayNextQuestion);
};

function displayNextQuestion() {
    questionIndex = localStorage.getItem("localQuestionIndex");
    questionIndex++;
    localStorage.setItem("localQuestionIndex", questionIndex);
    displayQuiz(questionIndex);
}

function displayQuiz(i) {    
    // fill in the question and answers
    quizQuestionP.textContent = quizQuestionsArray[i][0];
    option1.textContent = quizQuestionsArray[i][1];
    option2.textContent = quizQuestionsArray[i][2];
    option3.textContent = quizQuestionsArray[i][3];
    option4.textContent = quizQuestionsArray[i][4];
    console.log("Question index from displayQuiz: " + i);
};

function getQuestion (questionCount) {
    return questionCount++;
};

function getAnswer (questionIndex) {
    var i = localStorage.getItem("localQuestionIndex");
    if (this.textContent === quizQuestionsArray[i][5] || quizQuestionsArray[i][5] === "Any") {
        console.log("Correct!");
        var newPoints = localStorage.getItem("localPoints");
        localStorage.setItem("localPoints", ++newPoints);
    }
        else console.log("Inncorrect!");
    console.log(localStorage.getItem("localPoints"));
};
