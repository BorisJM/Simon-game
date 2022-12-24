/* variable level that is in HEADING*/
var level = 0;
//** Color clicked by user */
var userClickedPattern = [];
/*-------*/
var started = false;
/*- Random game color */
var gamePattern = [];
/*- Random game color */
/*------------------------*/
//** Button colours */

var buttonColours = ["red", "blue", "green", "yellow"];
/*-------*/

/** Staring function with random color WITH keyboard */

$("body").one("keydown", function () {
  nextSequence();
});

/*--------*/

//** Function with random color  */
function nextSequence() {
  userClickedPattern = [];
  /* Changing heading text to levels*/
  $("h1").text("Level " + level);
  level++;
  /**  Random number*/

  var randomNumber = Math.floor(Math.random() * 4);

  /** ------------- */

  /** random color */
  var randomChosenColour = buttonColours[randomNumber];
  /**----------------- */
  /** putting color in array */
  gamePattern.push(randomChosenColour);
  /**--------------------------- */

  //**Selecting the button and animating it **/
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  //**-------------- */

  //**Sound of the choosen color */

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  //**-------------- */
  console.log(gamePattern);
}

//** User chosen color function */
$(".btn").click(function () {
  //**Clicked button by user */
  var userChosenColour = this.id;
  console.log(userChosenColour);
  /* Putting in array users clicked color*/
  userClickedPattern.push(userChosenColour);
  //*-----*/
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/* function play user color sound */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
/*-------*/

/*Animating users clicked buttons*/
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed"), 100;
  });
}
/*----*/

/* Checking users answers function */
function checkAnswer(currentLevel) {
  /* Chcecking if recent answer is equal recent game color */
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }

    console.log(userClickedPattern);
  } else {
    /*** If user got answer wrong */
    console.log(userClickedPattern);
    console.log(gamePattern);
    var audiowrong = new Audio("sounds/wrong.mp3");
    audiowrong.play();
    /** Play audio */
    /*-- add class and remove after 200 miliseconds */
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    /* Calling function to restart the Game */
  }
}

/* Restarting The Game */
