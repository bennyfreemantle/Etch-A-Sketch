const slider = document.querySelector("#slider");
const sliderValue = document.querySelector(".slider-container > p");
const colorPicker = document.querySelector("#picker");
const rainbowButton = document.querySelector("#rainbow-button");
const clearScreenButton = document.querySelector("#clear-screen");

let penColour = `#000000`;
let rainbow = false;

rainbowButton.addEventListener("click", () => {
  if (rainbow == true) {
    rainbowButton.textContent = "Rainbow Pen - OFF";
    rainbow = false;
  } else {
    rainbowButton.textContent = "Rainbow Pen - ON";
    rainbow = true;
  }
});

clearScreenButton.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.style.backgroundColor = "#e3e3e3";
    cell.removeAttribute("data-colourCount");
  });
});

colorPicker.addEventListener("input", () => {
  penColour = colorPicker.value;
  rainbow = false;
});

sliderValue.textContent = `${slider.value} x ${slider.value}`;
slider.oninput = sliderEvent;

function sliderEvent() {
  sliderValue.textContent = `${slider.value} x ${slider.value}`;
  generateGrid();
}

function generateGrid() {
  const gridSize = slider.value;
  const sketchPad = document.querySelector(".sketch-pad");
  sketchPad.textContent = "";

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    sketchPad.append(row);

    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.append(cell);

      cell.addEventListener("mouseover", draw);
    }
  }
}
/** NOT MY FUNCTION - ONLY MODIFIED **/
function hexToHSL(H, data) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  l = +(l - data * 3);
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
/** NOT MY FUNCTION - ONLY MODIFIED **/

function draw(e) {
  if (rainbow) {
    let rainbow = Math.floor(Math.random() * 360);
    e.target.style.backgroundColor = `hsl(${rainbow}, 100%, 50%)`;
    //   } else {
    //     e.target.style.backgroundColor = penColour;
  } else if (e.target.dataset.colourcount > 0) {
    let hslColour = hexToHSL(penColour, e.target.dataset.colourcount);

    // Checks current 'iteration' of colouring and +1
    let count = +e.target.dataset.colourcount + 1;
    e.target.setAttribute("data-colourCount", count);

    // Simple modifer based off colour 'iteration' to darken the RGB
    let modifier = count * 10;

    // if modifier > 128 negative RGB values default to 0
    e.target.style.backgroundColor = hslColour;
  } else {
    e.target.setAttribute("data-colourCount", 1);
    e.target.style.backgroundColor = penColour;
  }
}

generateGrid();
