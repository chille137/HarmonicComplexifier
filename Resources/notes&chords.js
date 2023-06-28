// Create Notes, Chords and degrees ref

export const allNotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

//notation for grades and chords
export const degrees = ["I","II","III","IV","V","VI","VII"]
export const triads = ["M", "m","dim"]
export const quadriads = ["Maj7","7","m7","dim7"]

/** allowed sequences **/
export const sequences = [
                            [degrees[0],degrees[1],degrees[4],degrees[0]],
                            [degrees[0],degrees[3],degrees[4],degrees[0]],
                            [degrees[0],degrees[4],degrees[3],degrees[0]],
                            [degrees[0],degrees[5],degrees[4],degrees[0]],
                            [degrees[0],degrees[5],degrees[1],degrees[4]],
                            [degrees[0],degrees[4],degrees[5],degrees[3]]
                            ]

//define the degrees used for possible chord shapes
export const chordTypes=[
    {
        name: 'M',
        semitones: [4,7]
    },
    {
        name: 'm',
        semitones: [3,7]
    },
    {
        name:'dim',
        semitones: [3,6]
    },
    {
        name:'Maj7',
        semitones:[4,7,11]
    },
    {
        name:'7',
        semitones:[4,7,10]
    },
    {
        name:'m7',
        semitones:[3,7,10]
    },
    {
        name:'dim7',
        semitones:[3,6,9]
    }
]

// modes definition
export const modes = [{
    name: 'Ionian',
    notes: [0,2,4,5,7,9,11],
    triads: ["M","m","m","M","M","m","dim"],
    quadriads: ["Maj7","m7","m7","Maj7","7","m7","dim7"]
}];

// given the root and the type of chord, returns the notes to build the desired chord
export function chordBuilder(note,type) {
    let notes = [];
    if (!allNotes.includes(note)) {
        throw "Invalid note";
    }
    notes.push(note);
    let noteIndex = allNotes.indexOf(note);
    for(let i=0;i < chordTypes.length; i++)
        if (type === chordTypes[i].name)
            chordTypes[i].semitones.forEach((degree)=>{
                let newNote = allNotes[(noteIndex+degree)%12];
                notes.push(newNote);
            })
    return notes;
}

// given the root note, creates the chords that are present in that major scale
export function scaleBuilder(note) {
    let dorian = modes[0];
    let notes = [];
    if(!allNotes.includes(note))
        throw "Invalid note";
    let noteIndex=allNotes.indexOf(note);
    let i = 0;
    while (i < dorian.notes.length){
        let newNote = (noteIndex+dorian.notes[i])%12;
        let chordTriad = {note:allNotes[newNote], type:dorian.triads[i]}
        let chordQuad = {note:allNotes[newNote], type:dorian.quadriads[i]}
        notes.push(chordTriad)
        notes.push(chordQuad)
        i++;
    }
    return notes
}
