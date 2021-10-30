
 var song 
 var amp
 var img
 var fft
 var particles= []
 function preload() {
   song = loadSound('cradles.mp3')
   img = loadImage('music.jpg')
 }

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  angleMode(DEGREES)
  img.filter(BLUR,12)
  fft = new p5.FFT()
 
}

function draw() {
  background(0);
  
  fft.analyze()
  amp = fft.getEnergy(20,250)


push()
if(amp >200){
  rotate(random(-0.5,0.5))
}
image(img,0,0,width,height)
pop()


var layer = map(amp,0,255,180,150)
fill(0,layer)
noStroke()
rect(0,0,windowWidth,windowHeight)

strokeWeight(3)
stroke(255)
noFill()
 
  translate(width/2 , height/2) 
  var wave = fft.waveform()

for(var t=-1;t<=1;t+=2){
  beginShape()

  for(var i =0;i<=180;i+=0.45){
    var index = floor(map(i,0,width,0,wave.length-1))
    var r = map(wave[index],-1,1,150,350)
    var x = r * sin(i) * t
    var y =  r * cos(i)
    vertex(x,y)
  }
  endShape() 
}

var p = new Particle();
particles.push(p)
 for(var i=particles.length-1; i>=0;i--){
   if(!particles[i].edges()){
   particles[i].update(amp > 200)
   particles[i].show();
   }else{
     particles.splice(i,1)
   }
 }
  
} 

function mouseClicked(){
  if(song.isPlaying()){
    song.pause()

  }else{
    song.play();
  }
}


class Particle{
  constructor(){
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0,0)
    this.acc = this.pos.copy().mult(random(0.0001,0.0001))
    this.w = random(3,5);
 }
 update(cond){
   this.vel.add(this.acc)
   this.pos.add(this.vel)
  if(cond){
  this.pos.add(this.vel)
  this.pos.add(this.vel)
  this.pos.add(this.vel)
 }
 }
 edges(){
    if(this.pos.x<-width/2 || this.pos.x>width/2|| this.pos.y<-height/2 || this.pos.y>height/2){
      return true
    }else{
      return false
    }
 }
 show(){
   noStroke()
   fill(255)
   ellipse(this.pos.x, this.pos.y,4)
 }

}