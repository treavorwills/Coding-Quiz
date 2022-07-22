var body = document.body;
var j = 0;
localStorage.setItem("localQuestionIndex", j);
var points = 0;
localStorage.setItem("localPoints", points);
var timer = 1;
localStorage.setItem("localTimer", timer);
var scores = [0];
localStorage.setItem("localScores", JSON.stringify(scores));

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

// create the form elements
var initialsForm = document.createElement("form");
var initialsFormText = document.createElement("input");
var initialsFormSubmit = document.createElement("input");
var initialsFormLabel = document.createElement("label");

// add types, IDs and Labels to the form elements
initialsFormText.type = "text";
initialsFormSubmit.type = "submit";
initialsFormText.id = "fInitials";
initialsFormLabel.setAttribute("for", "fInitials");
initialsFormLabel.innerText = "Initials: ";
initialsFormSubmit.addEventListener("click", saveScore);

// append the form together
initialsForm.appendChild(initialsFormLabel);
initialsForm.appendChild(initialsFormText);
initialsForm.appendChild(initialsFormSubmit);

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
titleP.textContent = "Test your knowledge in Java Script and get a high score! Don't guess, if you answer inncorrectly you will lose time!";

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

    var secondsLeft = localStorage.getItem("localTimer");
    var questionIndex = localStorage.getItem("localQuestionIndex");
    var timerInterval = setInterval(function() {
        // quizTimerP.textContent = secondsLeft + " seconds left!";
        // secondsLeft--;
        quizTimerP.textContent = localStorage.getItem("localTimer") + " seconds left!";
        localStorage.setItem("localTimer", --secondsLeft);
        if(localStorage.getItem("localTimer") == 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            quizEnd();
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

function quizEnd() {
    quizTimerP.textContent = "Times up!";
    quizQuestionP.textContent = "Nice work! Enter your initials to save your score."
    quizDiv.removeChild(quizAnswersDiv);
    quizDiv.appendChild(initialsForm);
}

function saveScore() {
   event.preventDefault();
    var init = document.getElementById("fInitials").value;
    console.log(init);
    var playerScore = [
        {
        player:init,
        highScore: localStorage.getItem("localPoints")
        }
    ];
    var tempScores = JSON.parse(localStorage.getItem("localScores"));
    tempScores.push(playerScore);
    localStorage.setItem("localScores", JSON.stringify(tempScores));
    let poop = JSON.parse(localStorage.getItem("localScores"));
    console.log(poop);
}

