// Define the variables that are needed through the document
var quiz = document.getElementById("quiz")
var i = 0;
var currentQuestionIndex = 0;
var currentHighScore = null;
var highScores = []
var numCorrectAnswers = 0

var myTimer = null;
var startTime = null;
var defaultStartTime = 60

// Adds users name and score to the high score list
function addHighScore(name, score) {
    var obj = {
        name, score
    }
    // Adds high score object to the object array
    highScores.push(obj)
}
// Creates object array for questions, possible answers, and correct answer
var quizQuest = [{
    question: "Which is not a building block of a Javascript application?",
    possibleAnswers: ["Conditionals", "Variables", "Functions", "Dictionary"],
    correctAnswer: "Dictionary", // Change to index #
},
{
    question: "What is a variable?",
    possibleAnswers: ["Containers for storing data values", "A true/false statement", "Your best friend's name", "An integer"],
    correctAnswer: "Containers for storing data values",
},
{
    question: "What kind of tag would a user use to insert javascript into an HTML file?",
    possibleAnswers: ["<div> tag", "<header> tag", "<script> tag", "<title> tag"],
    correctAnswer: "<script> tag", // Change to index #
},
{
    question: "What does a prompt do in javascript?",
    possibleAnswers: ["Prompt the user to enter a value", "Ask the user to choose true/false", "Deliver a pizza to the users home", "Store a value in an array"],
    correctAnswer: "Prompt the user to enter a value", // Change to index #
},
{
    question: "How would a user write i is NOT equal to 0 in javascript?",
    possibleAnswers: ["i === 0", "i !== 0", "i >= 0", "i =/= 0"],
    correctAnswer: "i !== 0", // Change to index #
}
];

quizInstructions()

// Displays on page the instructions for the quiz and shows button to get to questions
function quizInstructions() {
    // Clears the quiz
    quiz.innerHTML = ""
    // Displays introductory info for the quix
    var title = document.createElement("h3");
    title.textContent = "Coding Quiz"
    var instructions = document.createElement("p");
    instructions.textContent = "Welcome to the coding quiz! Your goal is to answer all 5 quesitions correctly. Sounds easy enough, right?! Well, each wrong answer is going to cost you 5 seconds! You will start with 60 seconds. Good luck!"
    var submit = document.createElement("button");
    submit.textContent = "Start Quiz!"
    submit.classList.add("startQuiz")
    quiz.append(title, instructions, submit)
}


// Defines what happens when user clicks the Start Quiz button
document.addEventListener("click", function (event) {
    console.log(event.target.textContent)
    // Checks to see if target is an answer button
    if (event.target.classList.contains("startQuiz")) {
        // Defind myTimer to change every second
        myTimer = setInterval(countdownTimer, 1000);
        // This is the amount of time that the user to take the quiz
        startTime = defaultStartTime;
        // Questions begin from index position 0
        currentQuestionIndex = 0;
        // Call funtion to create the question the user will see
        createQuestion(quizQuest[currentQuestionIndex])
        // Tracker for how many question are correct
        numCorrectAnswers = 0
    }
})

// What setInterval does
function countdownTimer() {
    // Time decreases by 1 second
    startTime--
    // Will need to clearInterval when startime reaches 0
    // This will trigger "Game over" (see line 23 in ReadMe)
    // If tie is <= 0 the quiz ends
    if (startTime <= 0) {
        // If all questions aren't answered, quiz ends when times get to zero
        startTime = 0;
        endQuiz();
    }
    // Displays the times on the quiz page
    document.querySelector("#timer").textContent = startTime

}

// Passes questions through the function to display on screen
// createQuestion(quizQuest[currentQuestionIndex])
function createQuestion(questionObject) {
    var question = document.createElement("h3");
    question.textContent = questionObject.question
    console.log("createQuestion")
    // Creates answer to display on screen
    function createAnswer(answerText) {
        var answer = document.createElement("button");
        answer.textContent = answerText;
        answer.classList.add("answer")
        // Creates HTML element that is the answer
        return answer;
    }
    // Clears the quiz question
    quiz.innerHTML = ""
    // Places questions on on the page
    quiz.append(question)
    // This runs the loop and displays the answers
    for (var i = 0; i < questionObject.possibleAnswers.length; i++) {
        var oneAnswer = questionObject.possibleAnswers[i];
        var answerEl = createAnswer(oneAnswer);
        console.log(answerEl)
        // Places answers on the page
        quiz.append(answerEl)
    }

}

// Allows user to click on an answer
document.addEventListener("click", function (event) {
    console.log(event.target.textContent)
    // Checks to see if target is an answer button
    if (event.target.classList.contains("answer")) {
        var answerText = event.target.textContent
        // Checks if answer clicked is correct
        if (quizQuest[currentQuestionIndex].correctAnswer == answerText) {
            console.log("correct")
            // correctAnswer fuctions will run after correct answer is clicked
            correctAnswer()
            // User will be taken to next question when correct answer is chosen
            goToNextQuestion()
        }
        // Takes time off the timer if incorrect
        else {
            console.log("wrong")
            wrongAnswer()
        }
    }
})
// Incrementing the number of correct answers
function correctAnswer() {
    numCorrectAnswers++
}

// If answer is correct, 5 second is removed from the timer
function wrongAnswer() {
    startTime -= 5
}

function goToNextQuestion() {
    // Takes user to the next question
    currentQuestionIndex++;
    // Questions run until all questions have been displayed
    if (currentQuestionIndex >= quizQuest.length) {
        // Quiz end when question are finished
        endQuiz()
        // If quiz is not over, go to next question
    } else (createQuestion(quizQuest[currentQuestionIndex]))
}

// When quiz is over, the numer of correct answers is multiplied by the start time
function endQuiz() {
    currentHighScore = (numCorrectAnswers * startTime)
    // User will be taken to screen to enter initials
    createEnterName()
    // Clears the timer
    clearInterval(myTimer)
}

// Allows user to enter initials for high score
function createEnterName() {
    // Clears the quiz
    quiz.innerHTML = ""
    // Goes through all steps of user information once quiz is completed
    var allDone = document.createElement("h3");
    allDone.textContent = "ALL DONE!"
    var highScore = document.createElement("p");
    highScore.textContent = "High Score: " + currentHighScore
    var label = document.createElement("label");
    label.textContent = "Enter Initials: "
    var input = document.createElement("input");
    input.classList.add("nameInput")
    var submit = document.createElement("button");
    submit.textContent = "Submit"
    submit.classList.add("Submit")
    quiz.append(allDone, highScore, label, input, submit)
}
// Allows user to submit high score to be stored
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("Submit")) {
        // console.log(submit);
        var input = document.getElementsByClassName("nameInput")[0];
        var value = input.value;
        console.log(value)
        // Takes initals and score and adds to high score array
        addHighScore(value, currentHighScore)
        // Allows score and initals to be stored into local storage
        setHighScores()
        console.log(highScores)
        createHighScorePage()
    }
})

// Creates the high score page
function createHighScorePage() {
    // Clears the quiz
    quiz.innerHTML = ""
    // Goes through all steps of user information once quiz is completed
    var title = document.createElement("h3");
    title.textContent = "HighScores"
    var submit = document.createElement("button");
    submit.textContent = "Try Again"
    submit.classList.add("startQuiz")
    // Making HTML list of stored scores and initials
    var list = document.createElement("ol");

    // Takes score and initials from local storage and displays them on high scores page
    var localHighScores = getHighScores()
        console.log(localHighScores)
    // Make a list of every item, change it's text content, and append it to the list
    for (i = 0; i < localHighScores.length; i++){
        var li = document.createElement("li")
        li.textContent = localHighScores[i].name + localHighScores[i].score
        list.append(li)
    }
    quiz.append(title, submit, list)
}

// Moves user input of scores and initials to local storage on device
function setHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Returns user input of scores and initials from local storage
function getHighScores() {
    highScoresArray = localStorage.getItem("highScores")
    parseHighScores = JSON.parse(highScoresArray)
    return parseHighScores
}
