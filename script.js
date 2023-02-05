import {addChords, rangeValue, rangeValue2, rangeValue3} from "./Resources/elements.js"
import {addPreset} from "./Resources/elements.js"
import {updateValues} from "./Resources/functions.js";
import {complexify} from "./Resources/complexifyFunc.js";
import {play, stop} from "./Resources/audio.js";
import {pop} from "./Resources/particleExplosion.js";



//window.addEventListener("load", addChords, false);
addChords();
addPreset();
rangeValue();
rangeValue2();
rangeValue3();

// rangeValue("complexLvl", "compLev");

let newChords = []

let complex = document.getElementById("complexButton");
let playIn = document.getElementById("playIn");
let playOut = document.getElementById("playOut");
let pause = document.getElementById("stop");
let playbackSpeed = document.getElementById("speed");
let pattern = document.getElementById("pattern");


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
    play(pattern.value,updateValues(),bpm*playbackSpeed.value)
}

function playout(){
    if(!newChords.length)
        return
    play(pattern.value,newChords,bpm*playbackSpeed.value)

}


