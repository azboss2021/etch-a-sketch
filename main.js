const gridSize_input = document.querySelector(".inputField");
const randomColor_input = document.querySelector(".colorCheckbox");
const specificColor_input = document.querySelector(".specificInput")
const border_button = document.querySelector(".borderButton");
const grid_button = document.querySelector(".gridButton");
const submit_button = document.querySelector(".submit");

let borders = true;
let randomColor = false;
let color = "black";

const containerSize = 600;

const container_div = document.querySelector(".container");
let cols;
container_div.style.height=containerSize + "px";

function createGrid (newSize) {
    const boxSize = containerSize/newSize + "px";
    for(let i=0;i<newSize;i++){
        let row = document.createElement("div");
        row.style.width=boxSize*newSize;
        container_div.appendChild(row).className="row";
        for(let j=0;j<newSize;j++){
            let col = document.createElement("div");
            col.style.height=boxSize;
            col.style.width=boxSize;
            if(borders!==true) col.style.border="none";
            else col.style.border="1px solid black";
            row.appendChild(col).className="col";
        }
    }
    cols = document.querySelectorAll(".col");
    cols.forEach(item => {
        item.addEventListener('mouseover', e => {
            if(randomColor === true){
                color = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            item.style.background=color;
        });
    });
}

function removeBorders () {
    if(borders===true) {
        cols.forEach(item => item.style.border="none");
        borders = false;
    }
    else {
        cols.forEach(item => item.style.border="1px solid black");
        borders = true;
    }
}

function resetGrid () {
    document.querySelectorAll(".col").forEach(item => {
        item.style.background="white";
    })
}

function clearElements () {
    while(container_div.firstChild){
        container_div.removeChild(container_div.firstChild);
    }
    cols.forEach(item => item=null);
}

function submitChanges () {
    if(!randomColor_input.checked){
        color = specificColor_input.value;
        randomColor = false;
    } else {
        randomColor = true;
    }
    if(gridSize_input.value){
        if(gridSize_input.value<1) gridSize_input.value=1;
        else if(gridSize_input.value>100) gridSize_input.value=100;
        clearElements();
        createGrid(gridSize_input.value);
    }
}

createGrid(16);
border_button.addEventListener('click', removeBorders);
grid_button.addEventListener('click', resetGrid);
submit_button.addEventListener('click', submitChanges);