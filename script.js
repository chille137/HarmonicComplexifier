import {addChords} from "./Resources/elements.js"
import {updateValues} from "./Resources/functions.js";
import {complexify} from "./Resources/complexifyFunc.js";
import {play, stop} from "./Resources/audio.js";
import {pop} from "./Resources/particleExplosion.js";
import {rangeValue} from "./Resources/elements.js";

//window.addEventListener("load", addChords, false);
addChords();
rangeValue();

let newChords = []

let complex = document.getElementById("complexButton");
let playIn = document.getElementById("playIn");
let playOut = document.getElementById("playOut");
let pause = document.getElementById("stop");


playIn.onclick=playin;
playOut.onclick=playout;
pause.onclick=stop;

complex.onclick=applyComplexify;
complex.addEventListener('click', pop);



/**TO DO: add bpm**/
let bpm = 60

function applyComplexify(){
    let lvl = document.getElementById("complexLvl").value;
    newChords=complexify(lvl);
}

function playin(){
    play(1,updateValues(),bpm)
}

function playout(){
    if(!newChords.length)
        return
    play(1,newChords,bpm)

}


