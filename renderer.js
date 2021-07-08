//stores canvas variables
let canvasStore = {
    width: 0,
    height: 0,
    pixelSize: 0,
    canvas: null,
    ctx: null,
    state: createState()
}

//Uses window dimensions to set canvas dimensions
function setCanvasDims(canvasStore) {
    canvasStore.width = window.innerWidth/2;
    canvasStore.height = window.innerWidth/4;
    canvasStore.pixelSize = canvasStore.width/64;
} 

function createCanvas(canvasStore) {
    //locates the div to put the circuit in, creates the canvas, puts it in the div, saves the canvas variables for later use
    const target = document.getElementById("canvasHolder");
    const arrow = `<canvas id="canvas" width=${canvasStore.width} height=${canvasStore.height} style="background-color:#000000;"></canvas>`
    target.innerHTML = arrow;
    canvasStore.canvas = document.getElementById("canvas");
    canvasStore.ctx = canvasStore.canvas.getContext("2d");
}

//toggles the state of a pixel in the canvas state
function pixelToggle(x, y, canvasStore) {
    //wraps location around screen if overflow
    const X = (x < 0) ? (x % 64) + 64 : x % 64;
    const Y = (y < 0) ? (y % 32) + 32 : y % 32;
    canvasStore.state[X][Y] = canvasStore.state[X][Y] ? 0 : 1;
    return !canvasStore.state[X][Y]; //returns 1 if a pixel was turned off, for collision checks
}

//clears the canvas
function canvasClear(canvasStore) {
    const ctx = canvasStore.ctx;
    ctx.clearRect(0, 0, canvasStore.width, canvasStore.height);
}

//renders the current state to the screen
function stateRender(canvasStore) {
    canvasClear(canvasStore);
    const ctx = canvasStore.ctx;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    for (i in canvasStore.state) {
        for (j in canvasStore.state[i]) {
            if (canvasStore.state[i][j]) {
                ctx.beginPath();
                ctx.rect(i*canvasStore.pixelSize, j*canvasStore.pixelSize, canvasStore.pixelSize, canvasStore.pixelSize);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}