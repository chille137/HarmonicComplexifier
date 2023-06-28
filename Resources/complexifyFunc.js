import {keyFinder, seqFinder, retDegrees, romToInt, updateValues} from "./functions.js";
import {showChords, showDegrees, showScale} from "./elements.js";
import {allNotes, degrees, quadriads, scaleBuilder, triads} from "./notes&chords.js";

export function complexify(lvl){
    let tonic = keyFinder();
    showScale(tonic);
    let seq;
    let newChords;
    showDegrees(tonic);
    if(!tonic){
        newChords=updateValues();
        showChords(newChords);
        return newChords;
    }
    let degs = retDegrees(tonic,updateValues());
    seq = seqFinder(degs);
    if(!seq) {
        newChords = updateValues()
        showChords(newChords);
        return newChords;
    }


    // showSequence(seq);

    if(lvl) {
        newChords = triadsToQuadriads(tonic,seq);
        lvl-=1;
    }
    if(lvl) {
        newChords = relativeMinor(tonic,newChords,seq);
        lvl-=1;
    }
    if(lvl) {
        newChords = secondaryDominant(tonic,newChords,seq)
        lvl-=1;
    }
    if(lvl) {
        newChords = parallelKey(tonic,newChords,seq)
        lvl-=1;
    }
    if(lvl)
        newChords = tritone(seq,newChords)

    showChords(newChords);
    return newChords;

}

function triadsToQuadriads(tonic,seq){
    let scale = scaleBuilder(tonic)
    let newChords = [];

    if (seq.length == 3)
        seq = [degrees[0]].concat(seq)

    let degsInt = [];

    for (let i = 0; i < seq.length; i++)
        degsInt[i]=romToInt(seq[i])
    for (let i = 0; i < 4; i++) {
        newChords[i] = scale[2 * (degsInt[i]) + 1]
        newChords[i].duration=4;
    }
    return newChords;
}

function relativeMinor(tonic,chords,seq){
    if(romToInt(seq[1])==5)
        return chords
    let minor7 = scaleBuilder(tonic)[11]
    minor7.duration=2;
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
    let deg,seventh;
    let newChords = JSON.parse(JSON.stringify(chords));

    deg = romToInt(seq[1]);
    seventh = subs[deg - 1];
    seventh.duration = 1;
    let secondSub = chords.length-4;
    if(deg==5){
        newChords.splice(1, 0, seventh)
        newChords[0].duration = 3;
    }
    else{
        newChords.splice(2, 0, seventh)
        newChords[1].duration = 1;
    }

    deg = romToInt(seq[2]);
    seventh = subs[deg-1];
    seventh.duration=1;
    newChords.splice(3+secondSub, 0, seventh)
    newChords[2+secondSub].duration=3;
    return newChords
}

function parallelKey(tonic,chords){
    let scale = scaleBuilder(tonic);
    let n = scale[7].note
    let min4 = {note:n, type:triads[1]};
    min4.duration=2;
    let newChords =  JSON.parse(JSON.stringify(chords));
    let i = 6
    if(chords[chords.length-1].note!=tonic)
        i = chords.length
    newChords.splice(i, 0, min4)
    newChords[i-1].duration=2;
    return newChords
}

function tritone(sequence,chords){
    let newChords =  JSON.parse(JSON.stringify(chords));
    let i=2;
    if(sequence[1]==degrees[5])
        i=1;
    let n = (allNotes.indexOf(chords[i].note)+6)%12;
    let chord = {note:allNotes[n], type:quadriads[1], duration:1};
    newChords.splice(i, 1, chord)
    i+=2;
    n = (allNotes.indexOf(chords[i].note)+6)%12;
    chord = {note:allNotes[n], type:quadriads[1], duration:1};
    newChords.splice(i, 1, chord)
    return newChords;
}
