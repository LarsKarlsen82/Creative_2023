let c;
let angle = 0;
let sound;
let isPlaying = true; // Variable to track the sound state

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('./assets/sound/Breathing_Sound_Effect.mp3');
}

function setup() {
  c = createCanvas(900, 600);
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

  // Draw the four circles inside each other with light grey outer and third rings
  drawNestedCircles(width / 2, height / 2, 4, 300, 90, 40); // Adjust the circle parameters as needed

  // Update the angle for animation
  angle += 0.02;
}

function drawNestedCircles(x, y, numCircles, startingDiameter, gap, fourthCircleSize) {
  for (let i = 0; i < numCircles; i++) {
    let currentDiameter;

    if (i === 1) {
      // Make the second circle broader with yin-yang
      currentDiameter = startingDiameter - i * gap * 1.2 + sin(angle) * 20; // Adjust the multiplier and amplitude as needed
      fill(255, 150); // Other outer circles (you can adjust the color)
      drawYinYang(x, y, currentDiameter); // Draw yin-yang for the second circle
      continue; // Skip drawing the second circle separately
    } else {
      currentDiameter = startingDiameter - i * gap;
    }

    noStroke(); // No outline for circles

    if (i === 0 || i === 2) {
      fill(200); // Light grey for outer and third rings
    } else if (i === 3) {
      fill(255, 150); // Other outer circles (you can adjust the color)
      drawReverseYinYang(x, y, fourthCircleSize); // Draw reverse yin-yang for the fourth circle
      continue; // Skip drawing the fourth circle separately
    } else {
      fill(0, 0); // Fully transparent for inner circles
    }

    ellipse(x, y, currentDiameter, currentDiameter);

    if (i % 2 === 1) {
      if (i !== 3) {
        drawYinYang(x, y, currentDiameter);
      }
    }
  }
}

function drawYinYang(x, y, diameter) {
  let radius = diameter / 2;

  fill(255); // White color for yin-yang symbol
  arc(x, y, diameter, diameter, PI / 2, -PI / 2, CHORD); // Upper half

  fill(0); // Black color for yin-yang symbol
  arc(x, y, diameter, diameter, -PI / 2, PI / 2, CHORD); // Lower half

  // Small circles for eyes
  fill(255); // White color for eyes
  ellipse(x - diameter * 0.25, y, diameter * 0.2); // Left eye

  fill(0); // Black color for eyes
  ellipse(x + diameter * 0.25, y, diameter * 0.2); // Right eye
}

function drawReverseYinYang(x, y, diameter) {
  let radius = diameter / 2;

  fill(0); // Black color for reverse yin-yang symbol
  arc(x, y, diameter, diameter, PI / 2, -PI / 2, CHORD); // Lower half

  fill(255); // White color for reverse yin-yang symbol
  arc(x, y, diameter, diameter, -PI / 2, PI / 2, CHORD); // Upper half

  // Small circles for eyes
  fill(0); // Black color for eyes
  ellipse(x - diameter * 0.25, y, diameter * 0.2); // Left eye

  fill(255); // White color for eyes
  ellipse(x + diameter * 0.25, y, diameter * 0.2); // Right eye
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
  } else {
    sound.loop();
  }
  isPlaying = !isPlaying;
}
