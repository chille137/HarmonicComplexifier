import {findDegree, keyFinder, retDegrees, romToInt, seqFinder, updateValues} from "./functions.js";
import {showChords, showDegrees, showScale, showSequence} from "./elements.js";
import {degrees, modes, triads} from "./Notes&Chords.js";

export function complexify(){
    let tonic = keyFinder();
    showScale(tonic);
    showDegrees(tonic);
    let seq;
    let newChords;
    if(tonic){
        let degs = retDegrees(tonic,updateValues());
        seq = seqFinder(degs);
        if(!seq)
            newChords=updateValues()
        else
            newChords = triadsToQuadriads(tonic,seq);
    }
    else{
        seq=false;
        newChords=updateValues();
    }
    showSequence(seq);
    showChords(newChords)
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