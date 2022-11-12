/**Create Notes, Chords and degrees ref **/

export const allNotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
/** piano keys **/
export const whiteKeysENG = ["C","","D","","E","F","","G","","A","","B"]
export const blackKeysENG ={
    sharps: ["","C#","","D#","","","F#","","G#","","A#",""],
    flats:  ["","Db","","Eb","","","Gb","","Ab","","Bb",""]
}
export const whiteKeysLAT = ["DO","","RE","","MI","FA","","SOL","","LA","","SI"]
export const blackKeysLAT ={
    sharps: ["","DO#","","RE#","","","FA#","","SOL#","","LA#",""],
    flats:  ["","REb","","MIb","","","SOLb","","LAb","","SIb",""]
}

/** notation for grades and chords**/
export const degrees = ["I","II","III","IV","V","VI","VII"]
export const triads = ["M", "m","dim"]
export const quadriads = ["Δ","7","m7","dim7"]

/**  accepted chords notation **/
const note_notationENG = /^[A-G][#b]?$/;
const note_notationLAT = /^(DO|RE|MI|FA|SOL|LA|SI|)[#b]?$/
const type_notation = /^(m|dim|Δ|min7|7|dim7)?$/;

/** define the degrees used for possible chord shapes **/
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
        name:'Δ',
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
        semitones:[3,6,10]
    },
]

/** modes definition **/
export const modes = [{
    name: 'Ionian',
    notes: [0,2,4,5,7,9,11],
    triads: ["M","m","m","M","M","m","dim"],
    quadriads: ["Δ","min7","min7","Δ","7","min7","dim7"]
}];

/** given the tonic and the type of chord, returns the notes to build the desired chord**/
export function chordBuilder(note,type) {
    let notes = [];
    if (!allNotes.includes(note))
        throw "Invalid note";
    let noteIndex = allNotes.indexOf(note);
    notes.push(noteIndex);
    for(let i=0;i < chordTypes.length; i++)
        if (type === chordTypes[i].name)
            chordTypes[i].semitones.forEach((degree)=>{
                let newNote = allNotes[(note+degree)%12];
                notes.push(newNote);
            })
    return notes;
}

