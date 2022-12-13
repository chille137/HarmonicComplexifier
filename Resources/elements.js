import {allNotes, triads, quadriads} from "./Notes&Chords.js";
import {findDegree} from "./functions.js"

let chords = document.getElementById("chords");
let allTypes = triads.concat(quadriads);


export function addChords(){
    for(let i=1;i<5;i++) {
        const newDiv = document.createElement("div");
        newDiv.id="chord"+String(i);
        const noteSel = document.createElement("select");
        noteSel.name="tonic";
        const typeSel = document.createElement("select");
        typeSel.name="type";
        for(let j=0;j<allNotes.length;j++){
            const option = document.createElement("option");
            option.value = allNotes[j];
            option.text = allNotes[j];
            noteSel.appendChild(option);
        }
        for(let j=0;j<allTypes.length;j++){
            const option = document.createElement("option");
            option.value = allTypes[j];
            option.text = allTypes[j];
            typeSel.appendChild(option);
        }
        newDiv.appendChild(noteSel);
        newDiv.appendChild(typeSel);
        chords.appendChild(newDiv);
    }
}

export function showScale(note){
    const newRoot = document.createElement("p");
    newRoot.id="root";
    newRoot.innerHTML = "The root is:"+note;
    const display = document.getElementById("rootDisplay");
    if (display.children.length!=0){
        const root = document.getElementById("root");
        display.removeChild(root)
    }
    display.appendChild(newRoot);
}

export function showDegrees(tonic){
    for(let i = 0; i < chords.children.length; i++) {
        let current = document.getElementById("chord"+String(i+1))
        let chordRoot = current.childNodes[0].value;
        let chordType = current.childNodes[1].value;
        let chord = {note: chordRoot,type: chordType};
        let degree = findDegree(tonic,chord);
        const newDegree = document.createElement("p");
        newDegree.id = "degree"+String(i+1);
        newDegree.innerHTML = degree;
        if (current.childNodes.length==3) {
            const prev = current.childNodes[2];
            current.removeChild(prev);
        }
        current.appendChild(newDegree);
    }
}