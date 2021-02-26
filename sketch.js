var play=1;
var end=0;
var gameState=play;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var cactus,cactusGroup,cactusimage1,cactusimage2,cactusimage3,cactusimage4;
var cactusimage5,cactusimage6;
var rand,score;
var gameover,restart,gameoverImage,restartImage;

var newImage,checkpointsound,jumpsound,diesound;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  jumpsound =loadSound("jump.mp3");
  checkpointsound=loadSound("checkPoint.mp3");
  diesound =loadSound("die.mp3");
 
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  cactusimage1=loadImage("obstacle1.png");
  cactusimage2=loadImage("obstacle2.png");
  cactusimage3=loadImage("obstacle3.png");
  cactusimage4=loadImage("obstacle4.png");
  cactusimage5=loadImage("obstacle5.png");
  cactusimage6=loadImage("obstacle6.png");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.debug=false;
  trex.setCollider("circle",0,0,50);

  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  score=0;
  cloudGroup=createGroup();
  cactusGroup=createGroup();
  
  gameover=createSprite(300,100,40,40);
  gameover.addImage("gameover",gameoverImage);
  
  restart=createSprite(300,150,20,20);
  restart.addImage("restart",restartImage);
  restart.scale=0.6;
}

function draw() {
 
  
  if(gameState===play){
    background(180);
     
  restart.visible=false;
  gameover.visible=false;
     
  if(frameCount%5===0){
    score=score+1;
  }
    

    
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      jumpsound.play();
      }
    
      if(score%50===0&&score>0){
        checkpointsound.play();
      }
     
      trex.velocityY = trex.velocityY + 0.8;
    
      ground.velocityX=-4;
      
      if (ground.x < 0){
        ground.x = ground.width/2;
        }
    spawnClouds();
    spawnCactus();
    if(trex.isTouching(cactusGroup)){
    // trex.velocityY=-5;
    gameState=end;
    diesound.play();
  
    }
  }
  else if(gameState===end){
    background(255,0,0);
    
    restart.visible=true;
    gameover.visible=true;
    
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    cloudGroup.setLifetimeEach(-10);
    cactusGroup.setLifetimeEach(-10);
    trex.velocityY=0;
    
        if(mousePressedOver(restart)){
        reset();
        }
  }
  
  
  
 
  
  trex.collide(invisibleGround);
  textSize(15);
  fill("yellow");
  text("score:"+score,500,20);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
    cloud.tint="black";
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
    }
}
function spawnCactus () {
  if (frameCount%75===0){
    cactus= createSprite(600,160,5,5);
    cactus.velocityX=-5;
    rand=Math.round(random(1,6));
    switch(rand){
      case 1:cactus.addImage("cactus1",cactusimage1);
      break;
      case 2:cactus.addImage("cactus2",cactusimage2);
      break;
      case 3:cactus.addImage("cactus3",cactusimage3);
      break;
      case 4:cactus.addImage("cactus4",cactusimage4);
      break;
      case 5:cactus.addImage("cactus5",cactusimage5);
      break;
      case 6:cactus.addImage("cactus6",cactusimage6);
      break;
      default:break;
    }
    cactus.scale=0.6;
    cactus.lifetime=120;
    cactusGroup.add(cactus);
    if(score%50===0&&score>0){
      cactus.velocityX=cactus.velocityX-1;
    }
  }
  
  
}
    function reset() {
    gameState=play;
    gameover.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score=0;
    }
