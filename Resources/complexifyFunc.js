import {findDegree, keyFinder, retDegrees, romToInt, seqFinder, updateValues} from "./functions.js";
import {showChords, showDegrees, showScale, showSequence} from "./elements.js";
import {degrees, modes, triads} from "./Notes&Chords.js";

export function complexify(){
    let tonic = keyFinder();
    showScale(tonic)
    showDegrees(tonic)
    if (!tonic) {
        showSequence("Couldn't complexify the sequence")
        return
    }
    let degs = retDegrees(tonic,updateValues());
    let seq = seqFinder(degs);
    showSequence(seq);
    let newChords = triadsToQuadriads(tonic,seq);
    showChords(newChords);

}

function triadsToQuadriads(tonic,seq){
    let chords = updateValues();
    let newChords = chords;
    let start = 0;
    let finish = chords.length;
    let degs = retDegrees(tonic,chords)
    if (degs[0]!=seq[0]) {
        start=1;
        degs = degs.slice(1, degs.length);
    }
    else
        if (degs[degs.length]!=seq[seq.length]) {
            finish=chords.length-1;
            degs = degs.slice(1, degs.length);
        }
    let quadriads = modes[0].quadriads;
    let degsInt = [];

    for (let i = 0; i < degs.length; i++)
        degsInt[i]=romToInt(degs[i])
    for (let i = start; i < finish; i++)
        if (triads.includes(newChords[i].type))
            if(start==0)
                newChords[i].type=quadriads[degsInt[i]];
            else
                newChords[i].type=quadriads[degsInt[i-1]];
    return newChords;
}