let scene = 'black';
let earthAngle = 0, venusAngle = 0;
let earthRadius, venusRadius;
let earthAngleSpeed, venusAngleSpeed;
const SPEED = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  earthAngleSpeed = SPEED * (2 * PI / 60 / 20 * 8);
  venusAngleSpeed = SPEED * (2 * PI / 60 / 20 * 13);
  earthRadius = width / 2.0 * (2.5 / 3);
  venusRadius = width / 2.0 / 2;
  background(0);

  const socket = io();
  socket.on('scene', (msg) => {
    scene = msg;
    console.log('Scene changed to:', scene);
  });
}

function draw() {
  background(0);
  if (scene === 'venus') {
    drawVenusPattern();
  } else if (scene === 'cover') {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Cover Page or Logo Here', width/2, height/2);
  }
  // else stays black
}

function drawVenusPattern() {
  let centerX = width / 2;
  let centerY = height / 2;

  fill('#ffcc00');
  ellipse(centerX, centerY, 10, 10);

  let earthX = centerX + earthRadius * cos(earthAngle);
  let earthY = centerY + earthRadius * sin(earthAngle);
  fill('#ff0000');
  ellipse(earthX, earthY, 10, 10);

  let venusX = centerX + venusRadius * cos(venusAngle);
  let venusY = centerY + venusRadius * sin(venusAngle);
  fill('#9cf');
  ellipse(venusX, venusY, 10, 10);

  stroke(255, 90);
  line(earthX, earthY, venusX, venusY);

  earthAngle += earthAngleSpeed;
  venusAngle += venusAngleSpeed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}