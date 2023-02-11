var numStars = 300;
let stars = [];
var speed = 0.2;
let backgroundColor = 0;
var scale = 1;
let scaleDirection = 0.1;

function preload() {
  img = loadImage('asset/logo500kuser.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noStroke();
  image(img, 0, 0);
  var reds =  document.getElementById("reds")
  
  strokeWeight(2);
  var time = setInterval(() => {
    speed += 0.6;
    if (speed > 4) {
      // window.location.assign("https://quangtrinh-dev.vercel.app/");
      clearInterval(time);
      setTimeout(()=>{
        noCanvas();
        reds.style.display = 'block';
      },500)
    }
  
  }, 1000);

  for (let i = 0; i < numStars; i++) {
    stars.push(new Star(random(width), random(height)));
  }
}

function draw() {
  background(backgroundColor, 50);

  image(img, windowWidth / 2, windowHeight / 2, img.width * 1, img.height * 1);

  scale = scale + scaleDirection;

  const acc = map(windowWidth/2, 0, width, 0.005, speed);
  backgroundColor = backgroundColor + 0.6;

  stars = stars.filter((star) => {
    star.draw();
    star.update(acc);
    return star.isActive();
  });

  while (stars.length < numStars && speed < 3.5) {
    backgroundColor + 0.5
    stars.push(new Star(random(width), random(height)));
  }

}

class Star {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = createVector(x, y);

    this.vel = createVector(0, 0);

    this.ang = atan2(y - height / 2, x - width / 2);
  }

  isActive() {
    return onScreen(this.prevPos.x, this.prevPos.y);
  }

  update(acc) {
    this.vel.x += cos(this.ang) * acc;
    this.vel.y += sin(this.ang) * acc;

    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw() {
    const alpha = map(this.vel.mag(), 0, 3, 0,100);
    stroke(color('#1bd8ee'), alpha);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}

function onScreen(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}
