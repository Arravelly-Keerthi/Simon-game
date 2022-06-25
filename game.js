var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});
//on click storing it in userclicked pattern
$( ".btn" ).click(function() {
   var userChosenColour= $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
         if(gamePattern.length===userClickedPattern.length)
         {
           setTimeout(function () { nextSequence();}, 1000);
         }
  }
  else{//if the buuton is pressed wrongly
      playSound("wrong");
 $("body").addClass("game-over");
 $("#level-title").text("Game Over, Press Any Key to Restart");
 setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    restart();
  }
}

function nextSequence(){
  userClickedPattern=[];//because the user needs to press from level 1
  level++;//to show the level in the game every time next sequence is called means they proceeded to next level
  $("#level-title").text("Level "+ level);// selecting h1 through id and changing the text
  var randomNumber= Math.floor(Math.random() * 4);// generating the random number
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function  animatePress(currentColour)// animating the buuton by selectiong it using id colour
{
  // first adding the css class
  $("#" + currentColour).addClass("pressed");
  // removing it after a delay to produce animation effect
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// to play sound of the clicked button
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function restart(){
  level=0;
  gamePattern=[];
  started=false;
}
