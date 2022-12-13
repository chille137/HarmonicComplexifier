import {allNotes, degrees, scaleBuilder, sequences} from "./Notes&Chords.js";

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

export function retDegrees(tonic,chords){
    let deg=[];
    for (let i = 0; i < chords.length; i++)
        deg[i]=findDegree(tonic,chords[i]);
    return deg;
}

export function seqFinder(degrees){
    let degs = degrees;
    let notFound = "chord not in scale"
    let seq = sequences;
    let resized=false;
    if (degs.includes(notFound)) {
        let j = degs.indexOf(notFound);
        if(j!=0 && j!=(degs.length-1))
            return "Sequence not found"
        degs.splice(j, 1);
        seq = seq.slice(0,3);
        resized=true;
    }
    //4 chords
    let seqCounter;
    if(!resized){
        for(let i = 0; i<seq.length; i++){
            seqCounter=0
            for(let j=0; j<degs.length; j++){
                if(degs[j]==seq[i][j])
                    seqCounter+=1;
            }
            if (seqCounter==4)
                return seq[i]
        }
    }

    if(!resized)
        seq = seq.slice(0, 3);

    for(let i=0;i<seq.length;i++)
        seq[i] = seq[i].slice(1,seq[i].length);

    seqCounter=0;
    if(!resized)
        for(let i = 0; i<seq.length; i++){
            seqCounter=0;
            for(let j = 0 ; j<(degs.length-1); j++){
                if(degs[j]==seq[i][j])
                    seqCounter+=1;
            }
            if (seqCounter==3)
                return sequences[i]
            seqCounter=0;
            for(let j = 0 ; j<(degs.length-1); j++){
                if(degs[j+1]==seq[i][j])
                    seqCounter+=1;
            }
            if (seqCounter==3)
                return sequences[i]
        }
    else
        for(let i=0; i<seq.length; i++){
            seqCounter=0;
            for(let j = 0 ; j<degs.length; j++){
                if(degs[j]==seq[i][j])
                    seqCounter+=1;
            }
            if (seqCounter==3)
                return sequences[i]
        }
    return "Sequence not found";
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
        return false
}

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