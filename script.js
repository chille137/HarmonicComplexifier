import {addChords, rangeValue, rangeValue2, rangeValue3, index1, addPreset} from "./Resources/elements.js"
import {updateValues} from "./Resources/functions.js";
import {complexify} from "./Resources/complexifyFunc.js";
import {play, stop} from "./Resources/audio.js";
import {pop} from "./Resources/particleExplosion.js";
import {midiExport} from "./Resources/midiExport.js";


addChords();
addPreset();
rangeValue();
rangeValue2();
rangeValue3();
setTimeout(index1, 2110);


let newChords = []
//display the GUI
let complex = document.getElementById("complexButton");
let playbackSpeed = document.getElementById("speed");
let pattern = document.getElementById("pattern");
let midiButton = document.getElementById("midiButton");
let triangle = document.getElementById("triangle");
let triangle2 = document.getElementById("triangle2");
let playbtn = document.getElementById("playIn");
let playbtnout = document.getElementById("playOut");
let isplaying = false;
let isplaying2 = false;
let bpm = 60

// hides the notes explosion if the chords aren't set
export function handle(){
    if(ready()){
        complex.addEventListener('click', pop);
        return
    }
    complex.removeEventListener('click', pop);
}

// checks if all the chords are set to a value
function ready(){
    for(let i = 1; i < 5; i++){
        let current = document.getElementById("chord" + i);
        if (current.childNodes[0].value === "Notes" || current.childNodes[1].value === "Type")
            return false
    }
    return true;
}

//
function applyComplexify(){
    let lvl = document.getElementById("complexLvl").value;
    for(let i = 1; i < 5; i++){
        let current = document.getElementById("chord" + i);
        if (current.childNodes[0].value === "Notes" || current.childNodes[1].value === "Type") {
            alert("Please, insert your chords.");
            return
        }
    }
    newChords=complexify(lvl);
}

function playin(){
    play(pattern.value, updateValues(), bpm * playbackSpeed.value);
}

function playout(){
    if(!newChords.length)
        return
    play(pattern.value,newChords,bpm*playbackSpeed.value)

}

function exportMidi(){
    if(!newChords.length)
        return
    const url = midiExport(newChords)
    const link = document.createElement('a');
    link.href = url;
    link.download = 'complexified_progression_lvl' + document.getElementById("complexLvl").value +'.mid';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



function cambia(){
    if(!ready()) {
        alert("Please, insert your chords.")
        return
    }
    if(isplaying2)
        return
    if(!isplaying){
        playin();
    }
    else{
        stop();
    }
    triangle.classList.toggle("paused");
    isplaying = !isplaying
}
playbtn.onclick = cambia;

function cambia2(){
    if(isplaying)
        return
    triangle2.classList.toggle("paused");
    if(!isplaying2){
        playout();
    }
    else{
        stop();
    }
    isplaying2 = !isplaying2
}
playbtnout.onclick = cambia2;

complex.onclick=applyComplexify;
midiButton.onclick=exportMidi;