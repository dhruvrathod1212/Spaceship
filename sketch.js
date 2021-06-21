var canvas, background;

var gameState=0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1Img, car2Img, car3Img, car4Img;

function preload(){
    track = loadImage("images/background.jpg");
    car1Img = loadImage("images/player1.png");
    car2Img = loadImage("images/player2.png");
    car3Img = loadImage("images/player3.png");
    car4Img = loadImage("images/player4.png");
}

function setup() {
    canvas = createCanvas(displayWidth - 20, displayHeight-160);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw() {
    if(playerCount===4) {
        game.update(1);
    }
    if(gameState === 1){
        clear();
        game.play();
    }
    if(gameState === 2) {
        game.end();
    }
}