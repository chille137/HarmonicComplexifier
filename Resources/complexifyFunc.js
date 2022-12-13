import {keyFinder, retDegrees, seqFinder} from "./functions.js";

function complexify(chords, lvl){
    let tonic = keyFinder();
    if (!tonic)
        return "Couldn't complexify the sequence"

    let degs = retDegrees(tonic,chords);
    let seq = seqFinder(degs)


}