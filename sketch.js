/*
Week 4 — Simple Example: 2 Levels + Arrays + Loops
Course: GBDA302
Instructors: Dr. Karen Cochrane and David Han
Date: Feb. 5, 2026

PURPOSE (matches the instructions):
1. Generate a level using arrays/JSON data (LEVELS)
2. Use nested loops to draw tiles + obstacles + words
BONUS: Level 2 loads automatically when Level 1 is finished (reach the goal)
*/

const TS = 32; // tile size

/*
GRID LEGEND (numbers):
0 = floor
1 = wall
2 = obstacle
3 = word
4 = goal
*/

// LEVEL DATA (arrays/JSON-style)
const LEVELS = [
  {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 3, 0, 0, 0, 4, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 3, 0, 0, 0, 1, 0, 4, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];

// current level + player
let levelIndex = 0;
let grid = [];
let pr = 1; // player row
let pc = 1; // player col

function loadLevel(i) {
  levelIndex = i;

  // copy level grid so we can edit it (remove words)
  const src = LEVELS[levelIndex].grid;
  grid = [];
  for (let r = 0; r < src.length; r++) {
    grid[r] = [...src[r]];
  }

  // reset player
  pr = 1;
  pc = 1;

  // canvas matches grid size
  createCanvas(grid[0].length * TS, grid.length * TS);
  noStroke();
}

function setup() {
  loadLevel(0);
}

function draw() {
  background(240);

  // LOOP: draw tiles from the array (dynamic placement)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const t = grid[r][c];

      if (t === 1)
        fill(30, 50, 60); // wall
      else if (t === 2)
        fill(120, 35, 35); // obstacle
      else if (t === 3)
        fill(255, 210, 70); // word
      else if (t === 4)
        fill(40, 170, 80); // goal
      else fill(230); // floor

      rect(c * TS, r * TS, TS, TS);
    }
  }

  // player
  fill(40, 110, 255);
  rect(pc * TS + 6, pr * TS + 6, TS - 12, TS - 12);

  // tiny label
  fill(0);
  textSize(14);
  text("Level " + (levelIndex + 1), 10, 16);
}

function keyPressed() {
  let dr = 0,
    dc = 0;
  if (keyCode === UP_ARROW) dr = -1;
  if (keyCode === DOWN_ARROW) dr = 1;
  if (keyCode === LEFT_ARROW) dc = -1;
  if (keyCode === RIGHT_ARROW) dc = 1;

  const nr = pr + dr;
  const nc = pc + dc;

  // bounds
  if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return;

  const next = grid[nr][nc];

  // blocked by wall or obstacle
  if (next === 1 || next === 2) return;

  // move
  pr = nr;
  pc = nc;

  // collect word (turn into floor)
  if (next === 3) grid[nr][nc] = 0;

  // BONUS: finish level (goal) -> load next
  if (next === 4 && levelIndex < LEVELS.length - 1) {
    loadLevel(levelIndex + 1);
  }
}
