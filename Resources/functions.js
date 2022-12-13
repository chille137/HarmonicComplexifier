import {allNotes, degrees, scaleBuilder} from "./Notes&Chords.js";

/** given a scale and a chord, returns if the chord is contained in that scale**/
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
/**given the tonic of a scale and a chord, returns the degree of the chord if possible**/
export function findDegree(tonic,chord){
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

/** find the key of the four chord progression **/
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
        return "Can't define the Root"
}

/*let chord1v = document.getElementById("chord1").childNodes[0];
let chord2v = document.getElementById("chord2").childNodes[0];
let chord3v = document.getElementById("chord3").childNodes[0];
let chord4v = document.getElementById("chord4").childNodes[0];
let chord1t = document.getElementById("chord1").childNodes[1];
let chord2t = document.getElementById("chord2").childNodes[1];
let chord3t = document.getElementById("chord3").childNodes[1];
let chord4t = document.getElementById("chord4").childNodes[1];*/

//let chords = [{note: chord1v.value, type: chord1t.value}, {note: chord2v.value, type: chord2t.value},{note: chord3v.value,type: chord3t.value},{note: chord4v.value, type: chord4t.value}]

export function updateValues(){
    let chord1v_new = document.getElementById("chord1").childNodes[0].value;
    let chord2v_new = document.getElementById("chord2").childNodes[0].value;
    let chord3v_new = document.getElementById("chord3").childNodes[0].value;
    let chord4v_new = document.getElementById("chord4").childNodes[0].value;
    let chord1t_new = document.getElementById("chord1").childNodes[1].value;
    let chord2t_new = document.getElementById("chord2").childNodes[1].value;
    let chord3t_new = document.getElementById("chord3").childNodes[1].value;
    let chord4t_new = document.getElementById("chord4").childNodes[1].value;
    return [{note: chord1v_new, type: chord1t_new}, {note: chord2v_new, type: chord2t_new},{note: chord3v_new,type: chord3t_new},{note: chord4v_new, type: chord4t_new}]
}