const canvas = document.getElementById("canvas");
const colorCanvas = document.getElementById("colors");
const divSquares = document.querySelectorAll("#canvas > div");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const canvasSize = 600;

let onMouseColor = "black";
let isMouseDown = false;
let rainbowColorChoose = false;
let hue = 300;

generateSquares(16);

function generateSquares(squareNum) {

    let squareSize = canvasSize / squareNum

    for(let i = 0; i < (squareNum ** 2); i++) {
    let divSquares = document.createElement("div");
    canvas.appendChild(divSquares);
    divSquares.classList.add("divSquares");
    divSquares.style.width = `${squareSize}px`
    divSquares.style.height = `${squareSize}px`
    }

}

clearBtn.addEventListener("click", () => {

    const _divSquares = document.querySelectorAll("#canvas > .divSquares");
    _divSquares.forEach(eachDiv => {
        eachDiv.style.backgroundColor = "white";
    });

})

canvas.addEventListener("mousedown", (event) => {

    if(event.target.classList.contains("divSquares")) {
        event.preventDefault();
        isMouseDown = true;
        event.target.style.backgroundColor = `${onMouseColor}`;
    }

    if(event.target.classList.contains("divSquares") && rainbowColorChoose === true) {
        event.preventDefault();
        isMouseDown = true;
        changeHue();
    }

});

canvas.addEventListener("mouseup", (event) => {

        isMouseDown = false;

});


canvas.addEventListener("mousemove", (event) => {

    if(isMouseDown && event.target.classList.contains("divSquares")) {
        event.target.style.backgroundColor = `${onMouseColor}`;  
    }

    if(rainbowColorChoose === true && isMouseDown && event.target.classList.contains("divSquares")) {
        changeHue();
    }
    
});

document.body.addEventListener("mouseup", () => {

    isMouseDown = false;

});

colorCanvas.addEventListener("click", (event) => {

    if (event.target.classList.contains("color")) {
        onMouseColor = event.target.id;
        rainbowColorChoose = false;
    }

    else {
        rainbowColorChoose = true;
    }

});

function changeHue() {

    hue = Math.floor(Math.random() * 360);
    onMouseColor = `hsl(${hue}, 100%, 50%)`;

}

generateBtn.addEventListener("click", () => {

    let squareNum = parseFloat(prompt("Enter a number of squares per side. For example, 16 for 16 squares each side, total of 256 squares. Default value is 16."));

    if(squareNum <= 100 && squareNum > 0) {
        canvas.textContent = "";
        generateSquares(squareNum); 
    }
    else if(squareNum > 100) {   
        alert("You can create max 100x100 squares. Default value will be applied");
        canvas.textContent = "";
        generateSquares(16); 
    }
    else if(isNaN(squareNum)) {
        alert("You can only input numbers. Default value will be applied");
        canvas.textContent = "";
        generateSquares(16); 
    }
    else {
        alert("Please enter positive numbers. Default value will be applied");
        canvas.textContent = "";
        generateSquares(16); 
    }
    
});

