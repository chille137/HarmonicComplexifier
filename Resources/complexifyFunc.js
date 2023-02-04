import {keyFinder, newSeqFinder, retDegrees, romToInt, updateValues} from "./functions.js";
import {showChords, showDegrees, showScale} from "./elements.js";
import {allNotes, degrees, quadriads, scaleBuilder, triads} from "./notes&chords.js";

export function complexify(lvl){
    let tonic = keyFinder();
    showScale(tonic);
    let seq;
    let newChords;
    showDegrees(tonic);
    if(!tonic){
        seq=false;
        newChords=updateValues();
        // showSequence(seq, "");
        showChords(newChords);
        return newChords;
    }
    let degs = retDegrees(tonic,updateValues());
    //seq = seqFinder(degs);
    seq = newSeqFinder(degs);
    if(!seq) {
        newChords = updateValues()
        // showSequence(seq, "");
        showChords(newChords);
        return newChords;
    }

    // showSequence(seq);

    if(lvl) {
        //newChords = triadsToQuadriads(tonic, seq);
        newChords = newTriadsToQuadriads(tonic,seq);
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
        newChords = tritone(tonic,newChords)

    showChords(newChords);
    return newChords;

}

/*function triadsToQuadriads(tonic,seq){
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
}*/

function newTriadsToQuadriads(tonic,seq){
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
    newChords.splice(6, 0, min4)
    newChords[5].duration=2;
    return newChords
}

function tritone(tonic,chords){
    let newChords =  JSON.parse(JSON.stringify(chords));
    let i=1;
    if(chords[chords.length-1].note==tonic)
        i=2;
    let n = (allNotes.indexOf(chords[i].note)+6)%12;
    let chord = {note:allNotes[n], type:quadriads[1], duration:1};
    newChords.splice(i, 1, chord)
    i+=2;
    n = (allNotes.indexOf(chords[i].note)+6)%12;
    chord = {note:allNotes[n], type:quadriads[1], duration:1};
    newChords.splice(i, 1, chord)
    return newChords;
}
