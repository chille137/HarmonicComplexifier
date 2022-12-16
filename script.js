import {addChords, showScale, showDegrees, showSequence} from "./Resources/elements.js"
import {keyFinder, retDegrees, seqFinder, updateValues} from "./Resources/functions.js";
import {complexify} from "./Resources/complexifyFunc.js";

//window.addEventListener("load", addChords, false);
addChords();

let complex = document.getElementById("complexButton");
complex.onclick=applyComplexify;

function applyComplexify(){
    let lvl = document.getElementById("complexLvl").value;
    complexify(lvl);
}

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

