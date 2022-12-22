import {keyFinder, newSeqFinder, retDegrees, romToInt, seqFinder, updateValues} from "./functions.js";
import {showChords, showDegrees, showScale, showSequence} from "./elements.js";
import {degrees, modes, quadriads, scaleBuilder, triads} from "./notes&chords.js";

export function complexify(lvl){
    let tonic = keyFinder();
    showScale(tonic);
    let seq;
    let newChords;
    showDegrees(tonic);
    if(!tonic){
        seq=false;
        newChords=updateValues();
        showSequence(seq, "");
        showChords(newChords);
        return newChords;
    }
    let degs = retDegrees(tonic,updateValues());
    //seq = seqFinder(degs);
    seq = newSeqFinder(degs);
    if(!seq) {
        newChords = updateValues()
        showSequence(seq, "");
        showChords(newChords);
        return newChords;
    }

    showSequence(seq);

    if(lvl) {
        //newChords = triadsToQuadriads(tonic, seq);
        newChords = newTriadsToQuadriads(tonic,seq);
        lvl-=1;
    }
    if(lvl) {
        newChords = relativeMinor(tonic,newChords);
        lvl-=1;
    }
    if(lvl) {
        newChords = secondaryDominant(tonic,newChords,seq)
    }

    showChords(newChords);
    return newChords;

}

function triadsToQuadriads(tonic,seq){
    let chords = updateValues();
    let newChords = updateValues();
    let start = 0;
    let finish = chords.length;
    let degs = retDegrees(tonic,chords)

    if (degs[0]!=seq[0]) {
        degs = degs.slice(1, degs.length);
        degs = [degrees[0]].concat(degs)
        newChords = newChords.slice(1, newChords.length)
        newChords = [scaleBuilder(tonic)[0]].concat(newChords)
        newChords[0].duration=4
    }
    else {
        if (seq.length == 3)
            seq = [degrees[0]].concat(seq)
        if (degs[degs.length - 1] != seq[seq.length - 1] || degs[degs.length - 1] == degs[degs.length - 2]) {
            degs = degs.slice(0, degs.length - 1);
            degs = [degrees[0]].concat(degs)
            newChords = newChords.slice(0, newChords.length - 1)
            newChords = [scaleBuilder(tonic)[0]].concat(newChords)
            newChords[0].duration = 4
        }
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

function newTriadsToQuadriads(tonic,seq){
    let start = 0;
    let finish = chords.length;
    let scale = scaleBuilder(tonic)
    let newChords = [];

    if (seq.length == 3)
        seq = [degrees[0]].concat(seq)

    let quadriads = modes[0].quadriads;
    let degsInt = [];

    for (let i = 0; i < seq.length; i++)
        degsInt[i]=romToInt(seq[i])
    for (let i = 0; i < 4; i++) {
        newChords[i] = scale[2 * (degsInt[i]) + 1]
        newChords[i].duration=4;
    }
    return newChords;
}

function relativeMinor(tonic,chords){
    let minor7 = scaleBuilder(tonic)[11]
    minor7.duration=2;
    //let newChords =  [...chords];
    let newChords = JSON.parse(JSON.stringify(chords));
    newChords.splice(1, 0, minor7)
    newChords[0].duration=2;
    return newChords
}

function secondaryDominant(tonic,chords,seq){
    if(seq.length==3)
        seq=[degrees[0]].concat(seq)
    let subs=[]
    let scale = scaleBuilder(tonic);
    for(let i=0;i<5;i++){
        let j = ((5+i)*2)%14
        let n=scale[j].note;
        subs = subs.concat({note:n, type:quadriads[1]})
    }
    let deg = romToInt(seq[1]);
    let seventh = subs[deg-1];
    seventh.duration=1;
    let newChords =  JSON.parse(JSON.stringify(chords));
    newChords.splice(2, 0, seventh)
    newChords[1].duration=1;
    return newChords

}
