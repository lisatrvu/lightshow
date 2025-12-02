let colorPickers = [];
let sizeSlider, speedSlider, patternSelect;
let isMobile = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Detect mobile device
  isMobile = windowWidth < 768;

  // Mobile-optimized sizes
  const colorPickerSize = isMobile ? 60 : 40;
  const colorPickerSpacing = isMobile ? 80 : 40;
  const sliderWidth = isMobile ? windowWidth - 80 : 200;
  const sliderHeight = isMobile ? 20 : 15;
  const controlSpacing = isMobile ? 90 : 40;
  const startY = isMobile ? 30 : 20;
  const startX = isMobile ? 30 : 20;

  // --- Multiple Color Pickers (bigger on mobile) ---
  for (let i = 0; i < 3; i++) {
    let cp = createColorPicker(['#ff00ff', '#00ffff', '#ffff00'][i]);
    cp.size(colorPickerSize);
    cp.position(startX, startY + i * colorPickerSpacing);
    colorPickers.push(cp);
  }

  sizeSlider = createSlider(30, 300, 120);
  sizeSlider.size(sliderWidth);
  sizeSlider.style('height', sliderHeight + 'px');
  sizeSlider.position(startX, startY + 3 * colorPickerSpacing);

  speedSlider = createSlider(0.5, 5, 2, 0.1);
  speedSlider.size(sliderWidth);
  speedSlider.style('height', sliderHeight + 'px');
  speedSlider.position(startX, startY + 3 * colorPickerSpacing + controlSpacing);

  patternSelect = createSelect();
  if (isMobile) {
    patternSelect.style('font-size', '20px');
    patternSelect.style('padding', '15px');
    patternSelect.style('min-height', '50px');
  }
  patternSelect.position(startX, startY + 3 * colorPickerSpacing + controlSpacing * 2);
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
  const instructionSize = isMobile ? 24 : 16;
  const instructionY = isMobile ? height - 40 : height - 60;
  const instructionX = isMobile ? 20 : 20;
  textSize(instructionSize);
  text(
    "🎛 Tap colors + sliders → Your light show reacts instantly!",
    instructionX, instructionY
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-detect mobile on resize
  const wasMobile = isMobile;
  isMobile = windowWidth < 768;
  
  // If mobile state changed, recreate controls with new sizes
  if (wasMobile !== isMobile) {
    // Remove old controls
    for (let cp of colorPickers) cp.remove();
    sizeSlider.remove();
    speedSlider.remove();
    patternSelect.remove();
    
    // Recreate with new sizes
    const colorPickerSize = isMobile ? 60 : 40;
    const colorPickerSpacing = isMobile ? 80 : 40;
    const sliderWidth = isMobile ? windowWidth - 80 : 200;
    const sliderHeight = isMobile ? 20 : 15;
    const controlSpacing = isMobile ? 90 : 40;
    const startY = isMobile ? 30 : 20;
    const startX = isMobile ? 30 : 20;
    
    colorPickers = [];
    for (let i = 0; i < 3; i++) {
      let cp = createColorPicker(['#ff00ff', '#00ffff', '#ffff00'][i]);
      cp.size(colorPickerSize);
      cp.position(startX, startY + i * colorPickerSpacing);
      colorPickers.push(cp);
    }
    
    sizeSlider = createSlider(30, 300, 120);
    sizeSlider.size(sliderWidth);
    sizeSlider.style('height', sliderHeight + 'px');
    sizeSlider.position(startX, startY + 3 * colorPickerSpacing);
    
    speedSlider = createSlider(0.5, 5, 2, 0.1);
    speedSlider.size(sliderWidth);
    speedSlider.style('height', sliderHeight + 'px');
    speedSlider.position(startX, startY + 3 * colorPickerSpacing + controlSpacing);
    
    patternSelect = createSelect();
    if (isMobile) {
      patternSelect.style('font-size', '20px');
      patternSelect.style('padding', '15px');
      patternSelect.style('min-height', '50px');
    }
    patternSelect.position(startX, startY + 3 * colorPickerSpacing + controlSpacing * 2);
    patternSelect.option('Pulse Rings');
    patternSelect.option('Swirl Orbs');
    patternSelect.option('Outward Waves');
  }
}
