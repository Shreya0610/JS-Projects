const grid_display = document.querySelector(".grid");

let box = [];
let width = 22;

box = Array.from({length: width}, () => 
    Array.from({length: width}, () => 0)
);

let html = "";
for (let i = 0; i < box.length; i++) {
    html += `<div class="rows">`
    for (let j = 0; j < box[0].length; j++) {
        if (i % 2 === 0) {
            if (j % 2 === 0) {
                html += `<div class="columns1"></div>`
            } else {
                html += `<div class="columns2"></div>`
            }
        } else {
            if (j % 2 === 0) {
                html += `<div class="columns2"></div>`
            } else {
                html += `<div class="columns1"></div>`
            }
        }   
    }
    html += `</div>`;
}
grid_display.innerHTML = html;