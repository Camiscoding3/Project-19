var hamster,ham,hap;
var backplace,wheelImg;
var obstacle, obstacleGroup,nailImg;
var food, foodgroup,raisin;



var PLAY = 1;
var End = 0;
var gamestate = 1;
var score= 0;

var gameOver, restart;
var Ground;
var spawnRate= 1500;
var t;

var spawnRateOfDescent=0.50;
var time=Date.now();
var lastSpawn=-1;
var startTime = Date.now();

var objectFit
var NextSpawnTime = 0;
var MinSpawnTime = 1;
var MaxSpawnTime = 60;

var restart, restartButton


var element = document.getElementById("demo")
element.style.backgroundImage = "url('maybe wheel.png')";

function SetTimer()
{
    raisin.NextSpawnTime = Random.Range(raisin.MinSpawnTime, raisin.MaxSpawnTime);
}

function Start ()
{
    //initialise the spawn counter at startup
    raisin.SetTimer();
}

function Update () 
{
    raisin.NextSpawnTime -= Time.deltaTime;
    if(raisin.NextSpawnTime <= 0)
    {
          Instantiate(raisin.SpawnObject, raisin.SpawnPoint.transform.position, raisin.SpawnPoint.transform.rotation );
          raisin.SetTimer();
    }    
}



function preload(){
ham = loadImage("hap.png");
nailImg = loadImage("nails.png");
wheelImg = loadImage("maybe wheel.jpeg");
food = loadImage("food_pellet.png");
restartButton = loadImage("restartbutton.png");
}

function setup() {
createCanvas(500,400);

hamster = createSprite (50,350,20,50);
hamster.addImage("hap.png",ham);
hamster.scale = 0.3;

//hamster.debug = true;
hamster.setCollider("circle", 0,0,120);

backplace = createSprite(200,210,500,400);
backplace.addImage("backplace",wheelImg);

restart = createSprite (200,150);
restart.addImage("restartbutton.png", restartButton);
restart.visible = false;
restart.scale = 0.5

score = 0;



Ground = createSprite(200,360,400,10);
Ground.visible = false;

obstacleGroup = new Group();
foodgroup = new Group();
}

function draw() {
    background(600)
fill(rgb(30,30,30));
  text("Score: "+ score, 430,30);
  score.depth = 4
backplace.depth = 3;

foodgroup.depth = 3
obstacleGroup.depth = 3

hamster.depth = backplace.depth + 2;


    if(gamestate === PLAY){
      if(keyDown("space") && hamster.y >= 200) {
        hamster.velocityY = -12;
      }
    
      hamster.velocityY = hamster.velocityY + 0.8;

      Spawnfood();
      Spawnanobstacle();


if(foodgroup.isTouching(hamster)){
score = score + 5;
foodgroup.destroyEach();
}


  hamster.collide(Ground);

 

  if(obstacleGroup.isTouching(hamster)){
    gamestate = End;
    hamster.velocityY = 0
    foodgroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    obstacleGroup.destroyEach;
    foodgroup.destroyEach;
  }
    }
 if(gamestate === End){
  textSize(20)
  fill(rgb(52, 235, 107));
text("Game Over :(  Press SPACE to RESTART",50,100);
backplace.visible = false

hamster.destroy
obstacleGroup.setLifetimeEach(-1);
foodgroup.setLifetimeEach(-1);

if(keyDown("space")) {
  reset();
}
}
    
    drawSprites();

  }



    function Spawnfood(){
      if(frameCount % 100 === 0){   var raisin = createSprite(600,300,50,30); raisin.addImage("food_pellet.png", food); raisin.scale = 0.5;
        raisin.velocityX = -(5 + 2*score/50); raisin.scale = 0.6; raisin.lifetime = 100; raisin.depth = 4; foodgroup.add(raisin);}
       
     
    }
    function Spawnanobstacle(){
     if(frameCount % 60 === 0){
        var  obstacle = createSprite(600,300,50,30); obstacle.scale = 0.3; obstacle.addImage("nails.png",nailImg);
        obstacle.velocityX = -(6 + 3*score/50); obstacle.lifetime = 100; obstacle.depth = 4; obstacleGroup.add(obstacle); 
       }
    }
   
    function reset(){
      gamestate = PLAY;
      restart.visible = false;
      
      obstacleGroup.destroyEach();
      foodgroup.destroyEach();

      backplace.visible = true;
        score = 0;
    }