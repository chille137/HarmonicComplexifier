import {allNotes, degrees, scaleBuilder, sequences} from "./notes&chords.js";

// given a scale and a chord, returns if the chord is contained in that scale
export function containsChord(scale,chord){
    let note = chord.note;
    let type = chord.type;
    for (let i = 0; i < scale.length; i++){
        let note_i = scale[i].note;
        let type_i = scale[i].type;
        if (note==note_i && type==type_i)
            return true
    }
    return false;
}
// given the tonic of a scale and a chord, returns the degree of the chord if possible
export function findDegree(tonic,chord){
    if (!tonic)
        return "chord not in scale"
    let note = chord.note;
    let type = chord.type;
    let scale = scaleBuilder(tonic);
    for (let i = 0; i < scale.length; i ++){
        let note_i = scale[i].note;
        let type_i = scale[i].type;
        if (note==note_i && type==type_i)
            return degrees[Math.floor(i/2)];
    }
    return "chord not in scale";
}

// given the tonic and an array of chords, returns an array of the degrees of each chord
export function retDegrees(tonic,chords){
    let deg=[];
    for (let i = 0; i < chords.length; i++)
        deg[i]=findDegree(tonic,chords[i]);
    return deg;
}

// given an array of chord degrees, finds if the sequence is one among the ones used by the software
export function seqFinder(degrees_param){
    let degs = [...degrees_param];
    let notFound = "chord not in scale"
    let seq = JSON.parse(JSON.stringify(sequences));

    if(degs.includes(notFound)) {
        let j = degs.indexOf(notFound)
        if(degs[(j-1)%4]!=degrees[0])
            return false
        degs.splice(j,1)
        seq=seq.slice(0,4)
        for(let i = 0; i<seq.length; i++)
            seq[i]=seq[i].slice(1,4)
    }

    let seqCounter;

    for(let i = 0; i<degs.length; i++){
        for (let j = 0; j<seq.length; j++){
            seqCounter=0;
            for (let k = 0; k<degs.length; k++){
                if(seq[j][k]==degs[k])
                    seqCounter+=1;
            }
            if (seqCounter==4)
                return seq[j]
            if (seqCounter==3 && degs.length==3)
                return seq[j]
        }
        degs = degs.slice(1,4).concat(degs[0])
    }

    if (degs.length==4)
        return false

    for(let i = 0; i<seq.length; i++)
        seq[i]=seq[i].slice(1,4)

    for(let i = 0; i<degs.length; i++){
        for (let j = 0; j<seq.length; j++){
            seqCounter=0;
            for (let k = 0; k<degs.length; k++){
                if(seq[j][k]==degs[k])
                    seqCounter+=1;
            }
            if (seqCounter==3)
                return seq[j]
        }
        degs = degs.slice(1,4).concat(degs[0])
    }

    return false
}

// finds the key of the four chord progression
export function keyFinder(){
    let chords = updateValues();
    let chords_in = 0;
    let tonic = '';

    //we check if one of the 4 chords is the tonic
    for (let i = 0; i < chords.length; i++){
        let scale = scaleBuilder(chords[i].note);
        let chords_in_new=0;
        for (let j = 0; j < chords.length; j++){
            if(containsChord(scale,chords[j]))
                chords_in_new+=1;
        }
        if (chords_in_new>chords_in) {
            chords_in = chords_in_new;
            tonic=chords[i].note;
        }
        if (chords_in == 4)
            return tonic;
    }
    if (chords_in > 2)
        return tonic
    //if the scale found contains too few chords (e.g. 2), we check other scales as well
    for (let i = 0; i < allNotes.length; i++) {
        let scale = scaleBuilder(allNotes[i]);
        let chords_in_new = 0;
        for (let j = 0; j < chords.length; j++) {
            if (containsChord(scale,chords[j]))
                chords_in_new += 1;
        }
        if (chords_in_new > chords_in) {
            chords_in = chords_in_new;
            tonic = allNotes[i];
        }
    }
    if (chords_in > 2)
        return tonic
    else
        return false
}

// converts the degrees from roman numbers to integers
export function romToInt(deg){
    switch(deg) {
        case "I": return 0;
        case "II": return 1;
        case "III": return 2;
        case "IV": return 3;
        case "V": return 4;
        case "VI": return 5;
        case "VII": return 6;
        default: return;
    }
}

// reads the values of the 4 chords and returns an array of notes, types and duration
export function updateValues(){
    let chord1v_new = document.getElementById("chord1").childNodes[0].value;
    let chord2v_new = document.getElementById("chord2").childNodes[0].value;
    let chord3v_new = document.getElementById("chord3").childNodes[0].value;
    let chord4v_new = document.getElementById("chord4").childNodes[0].value;
    let chord1t_new = document.getElementById("chord1").childNodes[1].value;
    let chord2t_new = document.getElementById("chord2").childNodes[1].value;
    let chord3t_new = document.getElementById("chord3").childNodes[1].value;
    let chord4t_new = document.getElementById("chord4").childNodes[1].value;
    return [{note: chord1v_new, type: chord1t_new, duration: 4},
            {note: chord2v_new, type: chord2t_new, duration: 4},
            {note: chord3v_new, type: chord3t_new, duration: 4},
            {note: chord4v_new, type: chord4t_new, duration: 4}]
}