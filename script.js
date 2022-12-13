import {addChords, showScale, showDegrees, showSequence} from "./Resources/elements.js"
import {keyFinder, retDegrees, seqFinder, updateValues} from "./Resources/functions.js";

//window.addEventListener("load", addChords, false);
addChords();

let complex = document.getElementById("complexButton");
complex.onclick=showTonic;

function showTonic(){
    let tonic = keyFinder();
    showScale(tonic)
    showDegrees(tonic)
    if (!tonic) {
        showSequence("Sequence not found")
        return
    }
    let degs = retDegrees(tonic,updateValues());
    let seq = seqFinder(degs);
    showSequence(seq);


}

