const startButton = document.getElementById('startButton');
const quizBody = document.getElementById('quizBody');
const anchor1 = document.getElementById('anchor1');
const headerText = document.getElementById('headerText');
const timer = document.getElementById('timer');
const answerDisplay = document.getElementById('answerDisplay');

var questions = [
    {
        question: "In web development, CSS is used to establish the layout of a webpage while HTML is used to add style and formatting",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        question: "What does HTML stand for?",
        choices: ["Heavy Type Mobile Lab", "How To Make Lemonade", "Highly-Transferable Modeling Layout", "Hypertext Markup Language"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "How many levels of headings are predefined in HTML?",
        choices: ["3", "10", "6", "1"],
        answer: "6"
    },
    {
        question: "What method is used on a string to make all characters within the string lowercase?",
        choices: ["lowCaseOnly()", "toLowerCase()", "noUpperCase()", "injectLowerCase()"],
        answer: "toLowerCase()"
    },
    {
        question: "What does '*' mean in CSS?",
        choices: ["Exclude This", "One Level Up", "All", "None"],
        answer: "All"
    },
    {
        question: "What does DOM stand for?",
        choices: ["Default Override Method", "Document Object Model", "Database Organization Matrix", "Data Overflow Marker"],
        answer: "Document Object Model"
    },
    {
        question: "What method makes an attempt to read the numeric value of an element even if the element is not storing a numeric value?",
        choices: ["getValue()", "valueOf()", "readValue()", "toNum()"],
        answer: "valueOf()"
    },
    {
        question: "What are objects in HTML files (such as '<p>', '<h1>', '<title>') called?",
        choices: ["Items", "Objects", "Instances", "Elements"],
        answer: "Elements"
    },
    {
        question: "In what folder are files such as CSS or Javascript stored?",
        choices: ["supplementaries", "assets", "supporting files", "reference files"],
        answer: "assets"
    },
    {
        question: "Which side of the web service does JavaScript operate on?",
        choices: ["Client-Side", "Server Side", "Neither", "Both"],
        answer: "Both"
    }
    
];
timer.classList.add("hidden");
answerDisplay.classList.add("hidden");



var timeLeft = 90;
var correctAnswers = 0;

function startQuizTimer() {
    interval = setInterval(function() {
        timer.textContent = timeLeft;
        timeLeft--;

        if (timeLeft <= 0) {
            timeRanOut();
        }
    }, 1000);
};

function updateQuizTimer(){
    timer.textContent = timeLeft;
}

function stopQuizTimer(){
    clearInterval(interval);
}


startButton.addEventListener("click", startQuiz);

function startQuiz() {
console.log("Starting Quiz");

let tempQuestionArray = questions.slice();

startButton.style.display = "none";
quizBody.textContent = "";
headerText.textContent = "";

if (timer.classList.contains("hidden")) {
    timer.classList.remove("hidden")
    timer.classList.add("show")
  }

if (answerDisplay.classList.contains("hidden")) {
   answerDisplay.classList.remove("hidden")
   answerDisplay.classList.add("show")
 }

startQuizTimer();
displayQuestion(tempQuestionArray);

}

function clearChildren() {
    var children = quizBody.firstElementChild;
    while (children) {
        children.remove();
        children = quizBody.firstElementChild;
    }
}

function displayQuestion(questionArray){
      
    let currentQuestionIndex = Math.floor(Math.random()*questionArray.length);
    let currentQuestionSet = questionArray[currentQuestionIndex];
    let currentQuestion = currentQuestionSet.question;
    let currentAnswer = currentQuestionSet.answer;
    let newQuestionArray;

    console.log(currentQuestionIndex);

    console.log(currentQuestionSet);

    clearChildren();

    headerText.textContent = currentQuestion;
    
    for (let i=0; i < (currentQuestionSet.choices.length); i++) {
        var optionButton = document.createElement("button");
        optionButton.innerText = currentQuestionSet.choices[i];
        quizBody.append(optionButton);
    }
    
    quizBody.addEventListener("click", function(answer) {
        if (answer.target.innerHTML == currentAnswer) {
            answerDisplay.textContent = "Correct!"
            correctAnswers++;
        } else {
            timeLeft -= 5;
            updateQuizTimer();
            answerDisplay.textContent = "Sorry, that's incorrect"
        }

        console.log("Current correct answers: " + correctAnswers);
        
       newQuestionArray = questionArray.splice(currentQuestionIndex, 1);

        console.log(newQuestionArray);

        if (newQuestionArray.length > 0) {
            console.log("remaining questions: " + newQuestionArray.length);
            displayQuestion(newQuestionArray)
        } else {
            console.log("Quiz complete!");
            finishQuiz();
        }

    });

    
    
    

} 

function finishQuiz() {
    clearChildren();
    stopQuizTimer();
    answerDisplay.textContent = "";
    headerText.textContent = "Congratulations!";
    quizBody.textContent  = "You answered " + correctAnswers + " question(s) correctly, with " + timeLeft + " seconds remaining.";
}
function timeRanOut() {
    clearChildren();
    stopQuizTimer();
    answerDisplay.textContent = "";
    headerText.textContent = "Sorry, out of time!";
    quizBody.textContent  = "You answered " + correctAnswers + " question(s) correctly."

}

