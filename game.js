var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function (e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(e.target.id);
    animatePress(e.target.id);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(gamePattern);
}




function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    var activeButton = $("." + currentColor);
    activeButton.addClass("pressed");

    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}