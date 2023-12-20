let c;
let angle = 0;
let sound;
let isPlaying = true; // Variable to track the sound state
let isAnimating = true; // Variable to track the animation state
let circles = []; // Array to store circle data

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('./assets/sound/Breathing_Sound_Effect.mp3');
}

function setup() {
  c = createCanvas(600, 900);
  centerCanvas();

  // Start the sound loop
  sound.loop();
}

function draw() {
  background(173, 216, 230); // Light blue background

  // Draw the left white rectangle with a light grey border
  fill(0);
  noStroke(); // No border for this rectangle
  strokeWeight(20); // Adjust the border thickness as needed
  rect(0, 0, width / 2, height);

  // Draw the right black rectangle without a light grey border
  noStroke(); // No border for this rectangle
  fill(255);
  rect(width / 2, 0, width / 2, height);

  // Draw a light grey border around the entire canvas
  noFill(); // No fill for the border
  stroke(200); // Light grey color for the border
  strokeWeight(80); // Adjust the border thickness as needed
  rect(0, 0, width, height);

  // Draw the circles only when animating or paused
  drawNestedCircles(width / 2, height / 3, 4, 300, 90, 40);

  // Update the angle for animation
  if (isAnimating) {
    angle += 0.02;
  }
}

function drawNestedCircles(x, y, numCircles, startingDiameter, gap, fourthCircleSize) {
  for (let i = 0; i < numCircles; i++) {
    let currentDiameter;

    if (i === 1) {
      currentDiameter = startingDiameter - i * gap * 1.2 + sin(angle) * 20;
      fill(255, 150);
      drawYinYang(x, y, currentDiameter);
      continue;
    } else {
      currentDiameter = startingDiameter - i * gap;
    }

    noStroke();

    if (i === 0 || i === 2) {
      fill(200);
    } else if (i === 3) {
      fill(255, 150);
      drawReverseYinYang(x, y, fourthCircleSize);
      continue;
    } else {
      fill(0, 0);
    }

    ellipse(x, y, currentDiameter, currentDiameter);

    if (i % 2 === 1) {
      if (i !== 3) {
        drawYinYang(x, y, currentDiameter);
      }
    }

    // Store circle data for redrawing when paused
    circles[i] = { x, y, diameter: currentDiameter };
  }
}

function drawYinYang(x, y, diameter) {
  let radius = diameter / 2;

  fill(255);
  arc(x, y, diameter, diameter, PI / 2, -PI / 2, CHORD);

  fill(0);
  arc(x, y, diameter, diameter, -PI / 2, PI / 2, CHORD);

  fill(255);
  ellipse(x - diameter * 0.25, y, diameter * 0.2);

  fill(0);
  ellipse(x + diameter * 0.25, y, diameter * 0.2);
}

function drawReverseYinYang(x, y, diameter) {
  let radius = diameter / 2;

  fill(0);
  arc(x, y, diameter, diameter, PI / 2, -PI / 2, CHORD);

  fill(255);
  arc(x, y, diameter, diameter, -PI / 2, PI / 2, CHORD);

  fill(0);
  ellipse(x - diameter * 0.25, y, diameter * 0.2);

  fill(255);
  ellipse(x + diameter * 0.25, y, diameter * 0.2);
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function mousePressed() {
  // Toggle pause/play when the mouse is pressed
  if (isPlaying) {
    sound.pause();
    noLoop(); // Stop the animation loop
  } else {
    sound.loop();
    loop(); // Resume the animation loop
  }
  isPlaying = !isPlaying;

  // Toggle animation pause/resume when the mouse is pressed
  isAnimating = !isAnimating;

  // Redraw circles when paused
  if (!isAnimating) {
    for (let i = 0; i < circles.length; i++) {
      let { x, y, diameter } = circles[i];
      if (i === 1 || i === 3) {
        fill(255, 150);
        if (i === 1) {
          drawYinYang(x, y, diameter);
        } else {
          drawReverseYinYang(x, y, diameter);
        }
      } else {
        fill(i === 0 || i === 2 ? 200 : 0, 0);
        ellipse(x, y, diameter, diameter);
      }
    }
  }
}
