/*    
      COMP125
      Assignment #3
      BooSmasher
      Student: Amanda Nunes Sardella 
      Student number: #301288044
      Date: March 31, 2023
 */

//create the canvas for the game
const canvasAmanda = document.createElement("canvas");
const gameScreenAmanda = canvasAmanda.getContext("2d");
canvasAmanda.width = 638;
canvasAmanda.height = 476;
document.getElementById("canvasDiv").appendChild(canvasAmanda);

let scoreAmanda = 0;

const ghostAmanda = {
  x: Math.floor(Math.random() * 548),
  y: Math.floor(Math.random() * 386), //476-90(90size of the boo//desconsidera imagem do boo)
  speed: 2000,
};

let timerAmanda = setInterval(hopping, ghostAmanda.speed); //to update the time that the ghost hoops

//select background image
let backgroundLoadedAmanda = false; //bool
let backgroundImageAmanda = new Image();
backgroundImageAmanda.onload = function () {
  backgroundLoadedAmanda = true;
};
backgroundImageAmanda.src = "images/background.png";

//boo image
let booLoadedAmanda = false; //bool
let booImageAmanda = new Image();
booImageAmanda.onload = function () {
  booLoadedAmanda = true;
};
booImageAmanda.src = "images/boo.png";

function hopping() {
  ghostAmanda.x = Math.floor(Math.random() * 548);
  ghostAmanda.y = Math.floor(Math.random() * 386);
}

function clickGhost() {
  scoreAmanda += 10;
  ghostAmanda.speed -= 100;
  clearInterval(timerAmanda);
  timerAmanda = setInterval(hopping, ghostAmanda.speed); //to update the time that the ghost hoops
  hopping();
}

//mouseup event
canvasAmanda.addEventListener("mouseup", clicked, false);

function clicked(e) {
  e.preventDefault();
  //get the location of the mouse click
  let xMouseAmanda = e.clientX;
  let yMouseAmanda = e.clientY;

  //if the player click on boo
  if (
    xMouseAmanda > ghostAmanda.x &&
    xMouseAmanda < ghostAmanda.x + 95 &&
    yMouseAmanda > ghostAmanda.y &&
    yMouseAmanda < ghostAmanda.y + 132
  ) {
    clickGhost();
  }
}

function resetScore() {
  scoreAmanda = 0;
}

function resetSpeed() {
  ghostAmanda.speed = 2000;
  clearInterval(timerAmanda);
  timerAmanda = setInterval(hopping, ghostAmanda.speed);
}

//render/draw background img
function render() {
  if (backgroundLoadedAmanda) {
    gameScreenAmanda.drawImage(backgroundImageAmanda, 0, 0);
  }
  if (booLoadedAmanda) {
    gameScreenAmanda.drawImage(booImageAmanda, ghostAmanda.x, ghostAmanda.y);
  }
  document.getElementById("score").innerHTML = scoreAmanda;
}

//main loop
const mainAmanda = function () {
  render();
  //request to do this again
  requestAnimationFrame(mainAmanda); //fps
};
mainAmanda();
