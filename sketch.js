var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doraemon,doraemon_running;
var back,backImg,invisibleGround;
var doraCake,doraCakeImg,car,carImg;
var cakeGroup,carGroup;
var gameOver,gameOverImg;
var restart,restartImg;

var score;

function preload(){
doraemon_running = loadAnimation("Doraemon 1.png","Doraemon 2.png","Doraemon 3.png","Doraemon 4.png","Doraemon 5.png","Doraemon 6.png");

backImg = loadImage("background2.png");
  
doraCakeImg = loadImage("doracake.png");
carImg = loadImage("police_car.png"); 
  
  gameOverImg = loadImage("gameover3.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(550, 300);
  
  
  back = createSprite(600,300,400,20);
  back.addImage(backImg);
  back.scale = 1.2;

  doraemon = createSprite(80,490,20,50);
  doraemon.addAnimation("running",doraemon_running);
  doraemon.scale = 0.9;
  
  restart = createSprite(200, 300);
  restart.addImage(restartImg);
  
  gameOver = createSprite(610,750);
  gameOver.addImage(gameOverImg);
  

  
  gameOver.scale = 0.3;
  restart.scale = 1.2;
  
  invisibleGround = createSprite(200,510,800,10);
  invisibleGround.visible = false;
  
  cakeGroup = createGroup();
  carGroup = createGroup();
  
//  doraemon.setCollider("rectangle",0,0,doraemon.width,doraemon.height);
  doraemon.debug = false;
  
  score = 0;
}

function draw() {
   background(255);

   camera.x = doraemon.x;
   camera.y = doraemon.y;
back.velocityX = -5;
  
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
  back.velocityX = -(4 + 3* score/100);
  
  
  if(back.x < 0){
    back.x = back.width/2;
  }
  
  if(keyDown("space") && doraemon.y >= 300){
    doraemon.velocityY = -15;
  }
    
  doraemon.velocityY = doraemon.velocityY + 1;
  
    //monkey.collide(ground);
  cake();
  car();
  
    if(carGroup.isTouching(doraemon)) {
   gameState = END; 
    }
      if(cakeGroup.isTouching(doraemon)){
      cakeGroup.destroyEach();
        score = score+2;
      }
   }
  
  else if(gameState === END){
    

    gameOver.visible = true;
      restart.visible = true;
     
    if(mousePressedOver(restart)) {
      reset();
    }
    
    back.velocityX = 0;
    doraemon.velocityY = 0; 
    
    carGroup.setLifetimeEach(-1);
    cakeGroup.setLifetimeEach(-1);
    
     carGroup.setVelocityXEach(0);
     cakeGroup.setVelocityXEach(0); 
  
    }
  
  
  doraemon.collide(invisibleGround);
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  textFont("algerian");
  text("SCORE : "+score,250,50);
 

}
function cake(){
  if(World.frameCount % 80 === 0){
   var cake = createSprite(550,500,10,10);
    cake.y = Math.round(random(100,300));
    cake.addImage(doraCakeImg);
    cake.scale = 0.06;
    cake.velocityX = -6;
    
    cake.lifetime = 100;
    
    cake.depth = doraemon.depth;
    doraemon.depth = doraemon.depth+1;
  
    cakeGroup.add(cake);
  
  }
}
function car(){
  if(World.frameCount % 100 === 0){  
  var car = createSprite(400,470,10,10);
  car.addImage(carImg);
  car.velocityX = -(6 + score/100);
  car.scale = 0.9;
  car.lifetime = 100;
  
  carGroup.add(car);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  cakeGroup.destroyEach();
  carGroup.destroyEach();
  //doraemon.changeAnimation("running",doraemon_running);
  score = 0;
}
