let colorPickers = [];
let sizeSlider, speedSlider, patternSelect;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // --- Multiple Color Pickers ---
  for (let i = 0; i < 3; i++) {
    let cp = createColorPicker(['#ff00ff', '#00ffff', '#ffff00'][i]);
    cp.position(20, 20 + i * 40);
    colorPickers.push(cp);
  }

  sizeSlider = createSlider(30, 300, 120);
  sizeSlider.position(20, 160);

  speedSlider = createSlider(0.5, 5, 2, 0.1);
  speedSlider.position(20, 200);

  patternSelect = createSelect();
  patternSelect.position(20, 240);
  patternSelect.option('Pulse Rings');
  patternSelect.option('Swirl Orbs');
  patternSelect.option('Outward Waves');
}

function draw() {
  background(5, 5, 15, 40);

  // Get all 3 colors
  let c1 = colorPickers[0].color();
  let c2 = colorPickers[1].color();
  let c3 = colorPickers[2].color();

  const size = sizeSlider.value();
  const speed = speedSlider.value();
  const pattern = patternSelect.value();

  if (pattern === 'Pulse Rings') drawPulseRings(c1, c2, c3, size, speed);
  if (pattern === 'Swirl Orbs') drawSwirlOrbs(c1, c2, c3, size, speed);
  if (pattern === 'Outward Waves') drawWaves(c1, c2, c3, size, speed);

  drawInstructions();
}

function drawPulseRings(c1, c2, c3, size, speed) {
  noFill();
  strokeWeight(4);

  let r = (sin(frameCount * 0.05 * speed) * 0.5 + 0.5) * size;

  // Each ring uses a different color
  stroke(c1);
  ellipse(width / 2, height / 2, r * 2, r * 2);
  
  stroke(c2);
  ellipse(width / 2, height / 2, r * 3, r * 3);
  
  stroke(c3);
  ellipse(width / 2, height / 2, r * 4, r * 4);
}

function drawSwirlOrbs(c1, c2, c3, size, speed) {
  noStroke();

  let t = frameCount * 0.02 * speed;

  for (let i = 0; i < 10; i++) {
    let angle = t + (TWO_PI / 10) * i;
    let radius = size;

    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;

    // Cycle through the 3 colors
    if (i % 3 === 0) fill(c1);
    else if (i % 3 === 1) fill(c2);
    else fill(c3);

    ellipse(x, y, 30, 30);
  }
}

function drawWaves(c1, c2, c3, size, speed) {
  noFill();
  strokeWeight(4);

  let t = frameCount * 0.02 * speed;

  for (let i = 0; i < 8; i++) {
    let r = size + i * 40 + sin(t + i) * 20;
    
    // Cycle through the 3 colors
    if (i % 3 === 0) stroke(c1);
    else if (i % 3 === 1) stroke(c2);
    else stroke(c3);
    
    ellipse(width/2, height/2, r*2, r*2);
  }
}

function drawInstructions() {
  noStroke();
  fill(255);
  textSize(16);
  text(
    "🎛 Tap colors + sliders → Your light show reacts instantly!",
    20, height - 60
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
