var highScores = document.querySelector("#highScore");
var goBackBtn = document.querySelector("#goBack");
var clear = document.querySelector("#clear");

//get item from local storage
var scoresList = localStorage.getItem("allScores");
scoresList = JSON.parse(scoresList);

console.log(scoresList);

//List all scores if it is not empty
if (scoresList !==null) {
    for (i=0; i < scoresList.length; i++) {
        var scoresListEl = document.createElement("li");
        scoresListEl.textContent = scoresList[i].initials + "--" + scoresList[i].score;
        highScores.appendChild(scoresListEl);
    }
}

//click the button and clear all scores in local storage
clear.addEventListener("click", function() {
    window.localStorage.removeItem("allScores");
    window.location.reload();
});
