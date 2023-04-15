import {addChords, rangeValue, rangeValue2, rangeValue3} from "./Resources/elements.js"
import {addPreset} from "./Resources/elements.js"
import {showPreset} from "./Resources/elements.js"
import {index1} from "./Resources/elements.js"
import {updateValues} from "./Resources/functions.js";
import {complexify} from "./Resources/complexifyFunc.js";
import {play, stop} from "./Resources/audio.js";
import {pop} from "./Resources/particleExplosion.js";
import {midiExport} from "./Resources/midiExport.js";



//window.addEventListener("load", addChords, false);
addChords();
addPreset();
rangeValue();
rangeValue2();
rangeValue3();
setTimeout(showPreset,100);
setTimeout(index1, 2110);

// rangeValue("complexLvl", "compLev");

let newChords = []

let complex = document.getElementById("complexButton");
let playIn = document.getElementById("playIn");
let playOut = document.getElementById("playOut");
let pause = document.getElementById("stop");
let playbackSpeed = document.getElementById("speed");
let pattern = document.getElementById("pattern");
let midiButton = document.getElementById("midiButton");


playIn.onclick=playin;
playOut.onclick=playout;
pause.onclick=stop;
midiButton.onclick=exportMidi;

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

function exportMidi(){
    if(!newChords.length)
        return
    const url = midiExport(newChords)
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_midi_file.mid';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


