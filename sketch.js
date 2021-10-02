function preload() {
  //load game assets
  ball_image=loadImage("image/ball.png")
  ob_image=loadImage("image/brick.png")
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
 player = createSprite(windowWidth/2,windowHeight-50,200,10)

 leftwall = createSprite(10,windowHeight/2,10,windowHeight)
 rightwall = createSprite(windowWidth-10,windowHeight/2,10,windowHeight)
 upperwall = createSprite(windowWidth/2,10,windowWidth,10)

 bh = 70
  bv = 50

  bvx = 0
  bvy = 0

  transition = false
  gameState = "PLAY"

  ballX = windowWidth/2
  ballY = windowHeight - 100

  ball = createSprite(ballX,ballY,20,20)
  ball.addImage(ball_image)
  ball.scale=0.10

  ball.velocityY = -5
  ball.velocityX = -5

  brickGroup = new Group()
 for(i = 0; i < 50; i++){
   genBricks();
 }
}

function draw() {
  background("seagreen");  

  if(gameState=="STOP" && transition == false){
    bvx = ball.velocityX
    bvy = ball.velocityY 
    ball.velocityX = 0
    ball.velocityY = 0
    transition = true
  }else if(transition && gameState=="PLAY"){
    ball.velocityX = bvx
    ball.velocityY = bvy
    transition = false
  }

  if(keyDown("space")){
    if(gameState=="PLAY"){
      gameState="STOP"
    }else{
      gameState="PLAY"
    }
  }

  //*ellipse(ball.x,ball.y,20,20)

  if(mouseX > 100 && mouseX < windowWidth - 100){
    player.x = mouseX
  }

  for(j = 0; j < brickGroup.length; j++){
    brick = brickGroup.get(j)
    if(ball.isTouching(brick)){
      ball.bounceOff(brick)
      brick.destroy()
    }
  }


  ball.bounceOff(leftwall)
  ball.bounceOff(rightwall)
  ball.bounceOff(upperwall)
  ball.bounceOff(player)
  
 
  drawSprites();
}


function genBricks(){
  b = createSprite(bh,bv,100,50)
  b.addImage(ob_image)
  bh = bh+90
  if ( bh > 70 + 90*13){
    bv = bv + 40
    bh = 70
  }
  brickGroup.add(b)
}