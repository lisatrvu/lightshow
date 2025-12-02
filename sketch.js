let colorPickers = [];
let sizeSlider, speedSlider, patternSelect;
let isMobile = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Detect mobile device
  isMobile = windowWidth < 768;
  
  setupControls();
}

function setupControls() {
  // Remove existing controls if they exist
  for (let cp of colorPickers) {
    if (cp) cp.remove();
  }
  if (sizeSlider) sizeSlider.remove();
  if (speedSlider) speedSlider.remove();
  if (patternSelect) patternSelect.remove();
  
  colorPickers = [];

  if (isMobile) {
    // Mobile layout: instructions at top, sliders horizontally, color pickers on side
    const colorPickerSize = 60;
    const colorPickerSpacing = 75;
    const sliderHeight = 20;
    const sideMargin = 20;
    const topMargin = 20;
    
    // Instructions will be drawn at top (y = 30)
    // Sliders horizontally across the top
    const sliderY = 70;
    const sliderWidth = (windowWidth - 100) / 2; // Two sliders side by side with spacing
    
    // Size slider on left
    sizeSlider = createSlider(30, 300, 120);
    sizeSlider.size(sliderWidth);
    sizeSlider.style('height', sliderHeight + 'px');
    sizeSlider.position(sideMargin, sliderY);
    
    // Speed slider on right
    speedSlider = createSlider(0.5, 5, 2, 0.1);
    speedSlider.size(sliderWidth);
    speedSlider.style('height', sliderHeight + 'px');
    speedSlider.position(sideMargin + sliderWidth + 20, sliderY);
    
    // Pattern select below sliders
    patternSelect = createSelect();
    patternSelect.style('font-size', '18px');
    patternSelect.style('padding', '12px');
    patternSelect.style('min-height', '45px');
    patternSelect.position(sideMargin, sliderY + 50);
    patternSelect.option('Pulse Rings');
    patternSelect.option('Swirl Orbs');
    patternSelect.option('Outward Waves');
    
    // Color pickers stacked vertically on the left side
    const colorPickerX = sideMargin;
    const colorPickerStartY = sliderY + 120; // Below pattern select
    
    for (let i = 0; i < 3; i++) {
      let cp = createColorPicker(['#ff00ff', '#00ffff', '#ffff00'][i]);
      cp.size(colorPickerSize);
      cp.position(colorPickerX, colorPickerStartY + i * colorPickerSpacing);
      colorPickers.push(cp);
    }
  } else {
    // Desktop layout (original)
    const colorPickerSize = 40;
    const colorPickerSpacing = 40;
    const sliderWidth = 200;
    const sliderHeight = 15;
    const controlSpacing = 40;
    const startY = 20;
    const startX = 20;
    
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
    patternSelect.position(startX, startY + 3 * colorPickerSpacing + controlSpacing * 2);
    patternSelect.option('Pulse Rings');
    patternSelect.option('Swirl Orbs');
    patternSelect.option('Outward Waves');
  }
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
  if (isMobile) {
    // Instructions at the top on mobile
    textSize(20);
    textAlign(LEFT, TOP);
    text(
      "🎛 Tap colors + sliders → Your light show reacts instantly!",
      20, 25
    );
    textAlign(LEFT, BASELINE); // Reset to default
  } else {
    // Instructions at the bottom on desktop
    textSize(16);
    textAlign(LEFT, BOTTOM);
    text(
      "🎛 Tap colors + sliders → Your light show reacts instantly!",
      20, height - 60
    );
    textAlign(LEFT, BASELINE); // Reset to default
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-detect mobile on resize
  const wasMobile = isMobile;
  isMobile = windowWidth < 768;
  
  // Recreate controls if mobile state changed or on resize (to update positions)
  if (wasMobile !== isMobile || isMobile) {
    setupControls();
  }
}
