import {addChords, showScale,showDegrees} from "./Resources/elements.js"
import {keyFinder} from "./Resources/functions.js";

//window.addEventListener("load", addChords, false);
addChords();

let findRoot = document.getElementById("findRoot");
findRoot.onclick=showTonic;

function showTonic(){
    let tonic = keyFinder();
    showScale(tonic)
    showDegrees(tonic)
}

