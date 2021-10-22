const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,cheese,ground;
var fruit_con;
var cheese_con_2,cheese_con_3;

var bg_img;
var food;
var mouse;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2,rope3

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var button2,button3
function preload()
{
  bg_img = loadImage('background.jfif');
  food = loadImage('cheese.png');
  mouse= loadImage('mouse.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("mouse.png","mouse_blink1.png");
  eat = loadAnimation("mouse.png","mouse_blink1.png");
 
  
  blink.playing = true;
  eat.playing = true;
 
  eat.looping = false; 
}

function setup() {
 
  createCanvas(2000,2000);
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(100,100);
  button.mouseClicked(drop);

  button2=createImg("cut_btn.png")
  button2.position(330,35)
  button2.size(100,100)
  button2.mouseClicked(drop2)

  


  mute_btn = createImg('mute.png');
  mute_btn.position(400,550);
  mute_btn.size(200,200);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2= new Rope(7,{x:370,y:40});
  

  ground = new Ground(200,600,20);


  blink.frameDelay = 20;
  eat.frameDelay = 20;

  mouse = createSprite(300,600,30,30);
  mouse.scale = 0.5;

  mouse.addAnimation('blinking',blink);
  mouse.addAnimation('eating',eat);
 
  mouse.changeAnimation('blinking');
  
  cheese = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,cheese);

  cheese_con = new Link(rope,cheese);
  cheese_con_2 = new Link(rope2,cheese);
  


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(cheese!=null){
    image(food,cheese.position.x,cheese.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show()

  Engine.update(engine);
  ground.display();

  drawSprites();

  if(collide(cheese,mouse)==true)
  {
    mouse.changeAnimation('eating');
    eating_sound.play();
  }


 
}

function drop()
{
  cut_sound.play();
  rope.break();
  cheese_con.detach();
  cheese_con = null; 
}

function drop2(){
  cut_sound.play();
  rope2.break();
  cheese_con_2.detach()
  cheese_con_2=null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,cheese);
               cheese = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


