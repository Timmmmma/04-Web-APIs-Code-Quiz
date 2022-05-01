var startingEl = document.querySelector(".starting");
var askQuestionsEl = document.querySelector(".askQuestions");
var endingEl = document.querySelector(".ending");
var startBtn = document.querySelector("#start");
var showQuestion = document.querySelector(".questions");
var showChoices = document.querySelector(".choices");
var timer = document.querySelector("#time");
var finalScoreEl = document.querySelector("#finalScore");
var summitBtn = document.querySelector("#submit");
var userInitials = document.querySelector("#initials");

//Build up a questions list
var questionsLs = [
    {
        title: "Which of the following is not a type of computer code related to Program Execution?",
        choices: ["Source code", "Bytecode", "Machine Code", "Hex Code"],
        answer: "Hex Code"
    },
    {
        title: "Which of the following is not a programming language?",
        choices: ["TypeScript", "Python", "Anaconda", "Java"],
        answer: "Anaconda"
    },
    {
        title: "WhatsApp concurrent model is implemented using _____ programming language.",
        choices: ["Java", "Node.js", "Erlang", "C"],
        answer: "Erlang"
    },
    {
        title: "Which of the following includes Chrome's V8 JavaScript Engine?",
        choices: ["JQuery", "Java", "npm", "Node.js"],
        answer: "Node.js"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["Javascript", "js", "script", "scripting"],
        answer: "scripting"
    },
    {
        title: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        choices: ["if (i != 5)", "if i <> 5", "if (i <> 5)", "if i =! 5 then"],
        answer: "if (i != 5)"
    },

];

//Set up question index is 0
var questionIndex = 0;
//Set up the time of quiz 
var secondsLeft = questionsLs.length*10;
//Checking and prompting the answer is true or false
var answerCheck = document.createElement("h3");
askQuestionsEl.append(answerCheck);
var userScores = 0;

//Function for presenting questions and choice, when the user clicks the choice present next question
function startQuiz() {
    showQuestion.textContent = questionsLs[questionIndex].title;
    showChoices.innerHTML = "";
    questionsLs[questionIndex].choices.forEach(function(choices) {
        var choicesLs = document.createElement("li");
        var userChoice = document.createElement("button");

        userChoice.setAttribute("class", "choice");
        userChoice.setAttribute("value", choices);

        userChoice.textContent = choices;

        userChoice.onclick = questionClick;
        showChoices.append(choicesLs);
        choicesLs.append(userChoice);
    })
}

//Function for checking the answer is true or false, when all the questions are presented, end the quiz
function questionClick() {
    if (this.value !==questionsLs[questionIndex].answer) {
        answerCheck.textContent = " Wrong";
        answerCheck.style.fontSize = "50px";
        answerCheck.style.color = "red";
        //Time is subtracted from the clock if the answer is flase
        secondsLeft = secondsLeft - 5;
    }else {
        answerCheck.textContent = " Correct";
        answerCheck.style.fontSize = "50px";
        answerCheck.style.color = "green";
        //Earn 10 point if the answer is correct
        userScores = userScores + 10;
    }
    questionIndex++;
    //console.log(questionsLs[questionIndex].answer);
    if (questionIndex >= questionsLs.length) {
        secondsLeft = 0;
        endQuiz()
    }else {
        startQuiz();
    }
    
}

//Hide the quiz interface and display ending interface
function endQuiz() {
    askQuestionsEl.setAttribute("hidden", true);
    endingEl.removeAttribute("hidden", true);
    finalScoreEl.textContent = userScores;
}

//Set up the time and end the quiz when time over
function setTime() {
    var timerInterval = setInterval(function() {
      if (secondsLeft > 0) {
          secondsLeft--;
          timer.textContent = secondsLeft;
      }
  
      if(secondsLeft === 0) { 
        clearInterval(timerInterval);
        endQuiz()
      }
  
    }, 1000);
  }

//hide the star interface and display quiz interface while the button is clicked
startBtn.addEventListener("click", function(){
    startingEl.setAttribute("hidden", true);
    askQuestionsEl.removeAttribute("hidden", true);
    startQuiz();
    setTime();
    console.log("success")
})

//Save the score and initial in local storage
summitBtn.addEventListener ("click", function(){
    var initials = userInitials.value;
    if (initials == "") {
        console.log("No value entered!");
        alert("No value entered!");
    }else {
        console.log(initials);
        var scoresList = {
            score : userScores,
            initials: initials
        };
        console.log(scoresList);
        
        var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
        allScores.push(scoresList);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);


        //localStorage.setItem("Scores-List", scoresList);
        //localStorage.setItem("User-Initials", initials);
        //localStorage.setItem("User-Scores", userScores);
        location.replace("./highScores.html")

    }
})
