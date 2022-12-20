import {allNotes, triads, quadriads} from "./notes&chords.js";
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

export function showChords(chords){
    const display = document.getElementById("compDisplay");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }
    if(!chords)
        return
    for(let i=0;i<chords.length;i++) {
        const newDiv = document.createElement("div");
        newDiv.id="chord"+String(i+1);
        newDiv.innerHTML=chords[i].note+chords[i].type+"("+chords[i].duration+")";
        display.appendChild(newDiv);
    }
}

export function showScale(note){
    const newRoot = document.createElement("p");
    newRoot.id="root";
    if(!note)
        newRoot.innerHTML = "Couldn't find the root";
    else
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
        const newDegree = document.createElement("p");
        if(tonic) {
            let degree = findDegree(tonic, chord);
            newDegree.id = "degree" + String(i + 1);
            newDegree.innerHTML = degree;
        }
        if (current.childNodes.length==3) {
            const prev = current.childNodes[2];
            current.removeChild(prev);
        }
        if(tonic)
            current.appendChild(newDegree);
    }
}

export function showSequence(seq){
    const newSeq = document.createElement("p");
    newSeq.id="seq";
    if(!seq)
        newSeq.innerHTML="Couldn't find any known sequence"
    else
        newSeq.innerHTML = "The sequence is:"+seq;
    const display = document.getElementById("seqDisplay");
    if (display.children.length!=0){
        const sequence = document.getElementById("seq");
        display.removeChild(sequence)
    }
    display.appendChild(newSeq);
}