var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dog1;
var dog2;

function preload()
{
dog1 = loadImage("images/dogImg.png");
dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dog1);
  dog.scale = 0.15;


  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  foodS=20;
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
  }

  if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dog1);

    }




  drawSprites();
  textSize(20);
  fill("red");
  text("Note: Press UP_ARROW key to feed Drago milk",55,100);
  fill("white");
  text("food remaining"+foodS,200,400);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(foodS){

  if(foodS<=0){
    foodS = 0
 }else{
    foodS=foodS-1
  }

  database.ref('/').update({
    Food:foodS
  })
}

