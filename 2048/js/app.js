const grid_display = document.querySelector(".grid");
const score_display = document.getElementById("score");
const result_display = document.getElementById("result");
const width_change = document.getElementById("width");
const new_game = document.getElementById("new-game");

// create initial board
let width = 4;
let squares = [];
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  init();
  event_listeners();
});

// Initial
function init() {
  score = 0;
  squares = Array.from({ length: width }, () =>
    Array.from({ length: width }, () => 0)
  );
  render_game();
  put_random_value_to_random_place();
  put_random_value_to_random_place();
}

function render_game() {
  let html = "";
  for (let i = 0; i < squares.length; i++) {
    html += `<div class="row">`;
    for (let j = 0; j < squares[0].length; j++) {
      let box = squares[i][j];
      if (box === 0) {
        html += `<div class="hide">${box}</div>`;
      } else {
        let getColor = color_picker(box);
        html += `<div style="background-color: ${getColor}">${box}</div>`;
      }
    }
    html += `</div>`
  }
  grid_display.innerHTML = html;
  score_display.innerHTML = score;
}

function generate_random_value() {
  const num = [2, 4];
  return num[Math.floor(Math.random() * num.length)];
}

function get_random_place() {
  let positions = [];
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (squares[i][j] === 0) {
        positions.push({ i, j });
      }
    }
  }
  return positions[Math.floor(Math.random() * positions.length)];
}

function put_random_value_to_random_place() {
  const value = generate_random_value();
  const position = get_random_place();
  if (typeof position == "undefined") {
    game_over();
  } else {
    squares[position.i][position.j] = value;
    render_game();
  }
}

function event_listeners() {
  width_change.addEventListener("change", (e) => {
    width = e.target.value;
    init();
  })

  new_game.addEventListener("click", () => {
    init();
  })

  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        merge_left();
        put_random_value_to_random_place();
        break;
      case "ArrowUp":
        merge_up();
        put_random_value_to_random_place();
        break;
      case "ArrowRight":
        merge_right();
        put_random_value_to_random_place();
        break;
      case "ArrowDown":
        merge_down();
        put_random_value_to_random_place();
        break;
    }
  });
}

function merge_left() {
  for (let i = 0; i < squares.length; i++) {
    let temp = [];
    let length = squares[0].length;
    let k = 1;
    for (let j = 0; j < squares[i].length - 1; j++) {
      let current = squares[i][j];
      let next = squares[i][j + k];
      while (next === 0) {
        k++;
        next = squares[i][j + k];
      }
      if (current === next) {
        let val = 2 * current;
        temp.push(val);
        score += val;
        squares[i][j + k] = 0;
        squares[i][j] = 0;
      } else if (current !== 0) {
        temp.push(current);
        squares[i][j] = 0;
      }
    }
    for (let j = 0; j < squares[0].length; j++) {
      if (squares[i][j] !== 0) {
        temp.push(squares[i][j]);
      }
    }
    let tempLength = temp.length;
    let diff = length - tempLength;
    for (let j = 0; j < diff; j++) {
      temp.push(0);
    }
    if (temp.some((e) => e != 0)) {
      squares[i] = temp;
    }
  }
}

function merge_right() {
  for (let i = 0; i < squares.length; i++) {
    let temp = [];
    let k = 1;
    for (let j = squares[i].length-1; j >= 0; j--) {
      let current = squares[i][j];
      let previous = squares[i][j-k];
      while (previous === 0) {
        k++;
        previous = squares[i][j-k];
      }
      if (current === previous) {
        let val = 2 * current;
        temp.push(val);
        score += val;
        squares[i][j] = 0;
        squares[i][j-k] = 0;
      } else if (current !== 0) {
        temp.push(current);
        squares[i][j] = 0;
      }
    }
    for (let j = squares[i].length-1; j >= 0; j--) {
      if (squares[i][j] !== 0) {
        temp.push(squares[i][j]);
      }
    }
    let tempLength = temp.length;
    let diff = squares[0].length - tempLength;
    while (diff !== 0) {
      temp.push(0);
      diff--;
    }
    if (temp.some((e) => e != 0)) {
      squares[i] = temp.reverse();
    }
  }
}

function merge_up() {
  for (let i = 0; i < squares.length; i++) {
    let temp = [];
    for (let j = 0; j < squares[i].length-1; j++) {
      let k = 1;
      let current = squares[j][i];
      let under = squares[j+k][i];
      while (under === 0 && j+k < squares[0].length) {
        under = squares[j+k][i];
        k++;
      }
      if (j+k === squares[0].length) {
        k--;
      }
      if (current === under) {
        let val = 2 * current;
        temp.push(val);
        score += val;
        squares[j][i] = 0;
        squares[j+k][i] = 0
      } else if (current !== 0) {
        temp.push(current);
        squares[j][i] = 0;
      }
    }
    for (let j = 0; j < squares[0].length; j++) {
      if (squares[j][i] !== 0) {
        temp.push(squares[j][i]);
      }
    }
    let diff = squares[0].length - temp.length;
    while (diff !== 0) {
      temp.push(0);
      diff--;
    }
    if (temp.some((e) => e != 0)) {
      for (let j = 0; j < squares[0].length; j++) {
        squares[j][i] = temp[j];
      }
    }
  }
}

function merge_down() {
  for (let i = 0; i < squares.length; i++) {
    let temp = [];
    for (let j = squares[0].length-1; j > 0; j--) {
      let k = 1;
      let current = squares[j][i];
      let above = squares[j-k][i];
      while (above === 0 && j-k >= 0) {
        above = squares[j-k][i];
        k++;
      }
      if (j-k < 0) {
        k--;
      }
      if (current === above && current !== 0) {
        let val = 2 * current;
        temp.push(val);
        score += val;
        squares[j][i] = 0;
        squares[j-k][i] = 0;
      } else if (current !== 0) {
        temp.push(current);
        squares[j][i] = 0;
      }
    }
    for (let j = squares[0].length-1; j >= 0; j--) {
      if (squares[j][i] !== 0) {
        temp.push(squares[j][i]);
      }
    }
    let diff = squares[0].length - temp.length;
    while (diff !== 0) {
      temp.push(0);
      diff--;
    }
    temp.reverse();
    // console.log(temp);
    if (temp.some((e) => e != 0)) {
      for (let j = squares[0].length-1; j >= 0; j--) {
        squares[j][i] = temp[j];
      }
    }
  }
}

function color_picker(magnitude) {
  let old_max = Math.max(...squares.flat());
  let old_min = 2;
  let new_min = 0;
  let new_max = 255;
  let old_value = magnitude;
  let new_value = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min;

  let color = Math.floor(new_value);
  
  return `hsl(${color}, 50%, 50%)`;
}

function game_over() {
  alert("Game Over");
  init();
}
