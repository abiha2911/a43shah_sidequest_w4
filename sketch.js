/*
Week 4 — Grid + Dynamic Levels (Same Setup Format)
Course: GBDA302
Instructors: Dr. Karen Cochrane and David Han
Date: Feb. 5, 2026

PURPOSE:
1. Generate level using arrays/JSON data (LEVELS)
2. Use nested loops to dynamically place tiles
BONUS: Level 2 loads automatically
*/

const TS = 32;

/*
GRID LEGEND:
0 = floor
1 = wall
2 = obstacle
3 = word
4 = goal
*/

// 16 columns × 11 rows (SAME as original)
const LEVELS = [
  {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 4, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];

let levelIndex = 0;
let grid = LEVELS[0].grid; // START WITH LEVEL 1

let pr = 1;
let pc = 1;

/*
p5.js SETUP: Runs once when sketch loads
*/
function setup() {
  // Canvas size = grid dimensions × tile size
  // grid[0].length = 16 columns, grid.length = 11 rows
  // Canvas = 16×32 = 512px wide, 11×32 = 352px tall
  createCanvas(grid[0].length * TS, grid.length * TS);

  noStroke();
  textFont("sans-serif");
  textSize(14);
}

/*
p5.js DRAW: Runs 60 times per second
*/
function draw() {
  background(240);

  // NESTED LOOPS: dynamically draw tiles from grid data
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let tile = grid[r][c];

      if (tile === 1)
        fill(30, 50, 60); // wall
      else if (tile === 2)
        fill(120, 35, 35); // obstacle
      else if (tile === 3)
        fill(255, 210, 70); // word
      else if (tile === 4)
        fill(40, 170, 80); // goal
      else fill(230); // floor

      rect(c * TS, r * TS, TS, TS);
    }
  }

  // Player
  fill(40, 110, 255);
  rect(pc * TS + 6, pr * TS + 6, TS - 12, TS - 12);

  fill(0);
  text("Level " + (levelIndex + 1), 10, 16);
}

function keyPressed() {
  let dr = 0;
  let dc = 0;

  if (keyCode === UP_ARROW) dr = -1;
  if (keyCode === DOWN_ARROW) dr = 1;
  if (keyCode === LEFT_ARROW) dc = -1;
  if (keyCode === RIGHT_ARROW) dc = 1;

  let nr = pr + dr;
  let nc = pc + dc;

  if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return;

  let next = grid[nr][nc];

  if (next === 1 || next === 2) return; // blocked

  pr = nr;
  pc = nc;

  if (next === 3) grid[nr][nc] = 0; // collect word

  // BONUS: auto-load Level 2 when reaching goal
  if (next === 4 && levelIndex < LEVELS.length - 1) {
    levelIndex++;
    grid = LEVELS[levelIndex].grid;
    pr = 1;
    pc = 1;
  }
}
