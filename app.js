const gridContainer = document.querySelector(".grid-container");

function init() {}

function generateGrid() {
  const numOfGrids = 3600; // Needs to be a
  const repeatNumTimes = Math.sqrt(numOfGrids);
  const gridSize = 960 / repeatNumTimes;
  gridContainer.style.gridTemplateColumns = `repeat(${repeatNumTimes}, ${gridSize}px)`;

  for (let i = 0; i < numOfGrids; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("gridCell");
    gridCell.style.width = `${gridSize}px`;
    gridCell.style.height = `${gridSize}px`;
    gridContainer.appendChild(gridCell);
  }
}

function draw() {
  const grids = document.querySelectorAll(".gridCell");

  grids.forEach((gridCell) => {
    gridCell.addEventListener("mouseover", () => {
      // Default first pass over colour
      let [r, g, b] = [128, 128, 128];

      // Checks if the current grid has already been coloured
      if (gridCell.dataset.colourcount > 0) {
        // Checks current 'iteration' of colouring and +1
        let count = +gridCell.dataset.colourcount + 1;
        gridCell.setAttribute("data-colourCount", count);

        // Simple modifer based off colour 'iteration' to darken the RGB
        let modifier = count * 10;

        // if modifier > 128 negative RGB values default to 0
        gridCell.style.backgroundColor = `rgb(${r - modifier},${g - modifier},${
          b - modifier
        })`;
      } else {
        // First time touching the current grid
        // apply default background colour and 'iteration'
        gridCell.setAttribute("data-colourCount", 1);
        gridCell.style.backgroundColor = `rgb(${r},${g},${b})`;
      }
    });
  });
}

// IEF to start our app
(function start() {
  generateGrid();
  draw();
})();
