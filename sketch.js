var jetpack, rocket, coins, bg1, restart;
var jetpackimg, rocketimg, coinsimg, bg1img, restartimg;
var rocketsGroup, coinsGroup;
var Play = 1;
var End = 0;
var gameState = Play;
var score = 0;

function preload(){
jetpackimg = loadImage ("Sprites/jetpack.png.png");
coinsimg = loadImage ("Sprites/coin.png");
rocketimg = loadImage ("Sprites/rocket.png");
bg1img=loadImage("Sprites/BgImage.png");
restartimg = loadImage ("Sprites/restart-removebg-preview.png");

}

function setup() {

  createCanvas(1500,700);

  bg1 = createSprite(600,400,1200,800);
  bg1.addImage(bg1img);
  bg1.scale = 12;
  bg1.velocityX=-4;


  jetpack = createSprite(100,590,10,20);
  jetpack.addImage(jetpackimg);
  jetpack.scale = 0.7;


  
 coinsGroup=new Group();
  rocketsGroup= new Group();

  jetpack.debug = "true";

  jetpack.setCollider ("rectangle",10,10,jetpack.width,jetpack.height);
  
}

function draw() {
  background(220);   
  
  if(gameState===Play){

if(bg1.x < 0){
bg1.x = bg1.width/2;
}

if (keyDown ("space")){
jetpack.velocityY = -12;
}

jetpack.velocityY = jetpack.velocityY + 1;
  
  spawnCoins();
spawnRockets();

if(jetpack.isTouching(coinsGroup)){
score = score+1;




}

if(jetpack.isTouching(rocketsGroup)){
gameState = End;
bg1.velocityX = 0;
rocketsGroup.destroyEach();
coinsGroup.destroyEach();
restart = createSprite(650,350,20,20);
restart.addImage(restartimg);
restart.scale = 0.5;
}
if(mousePressedOver(restart)){
/*  gameState=Play;
  coinsGroup.destroyEach();
  rocketsGroup.destroyEach();*/
  reset();
  }

}

  else if(gameState===End){
jetpack.velocityY = 0;
coinsGroup.destroyEach();
rocketsGroup.destroyEach();


  }
  
  drawSprites();

  fill ("white")
  textSize(50);
  text("Score: " +score,900,80);
}

function spawnCoins(){
  if(frameCount % 180 ===0){
coins = createSprite(800,Math.round(random(120,220)),20,20);
coins.velocityX = -7;
coins.addImage(coinsimg);
coins.scale=0.02;
coinsGroup.add (coins);
  }
}

function spawnRockets(){
  if(frameCount % 280 ===0){
rocket = createSprite(800,Math.round(random(130,240)),20,20);
rocket.velocityX = -10;
rocket.addImage(rocketimg);
rocketsGroup.add(rocket);


  }
}

function reset(){
  gameState=Play;
  coinsGroup.destroyEach();
  rocketsGroup.destroyEach();
  score = 0;
}


