import {allNotes, chordBuilder} from "./notes&chords.js";

function durationToTicks(duration) {
   switch(duration) {
       case 1 : return 4
       case 2 : return 2
       case 3 : return "d2"
       case 4 : return 1
   }

}

// Create a MIDI file from the chord sequence
export function midiExport(sequence){
    let currentTime=0;
    const track = new MidiWriter.Track();

    for (let j = 0; j < sequence.length; j++) {
        let chord=sequence[j]
        const chordNotes = chordBuilder(chord.note, chord.type);
        let prevNote = 48
        for (let i = 0; i < chordNotes.length; i++){
            let note = chordNotes[i]
            let midi = allNotes.indexOf(note)+48
            if (prevNote > midi)
                midi +=12
            prevNote = midi
            chordNotes[i]=midi

        }
        let ticks =  durationToTicks(chord.duration);
        const noteEvent = new MidiWriter.NoteEvent({
            pitch: chordNotes,
            duration: ticks,
            velocity: 100
        });
        track.addEvent(noteEvent, currentTime);
        currentTime+=chord.duration
    }
    const writer = new MidiWriter.Writer([track]);

// Generate a download link for the MIDI file
    const byteArray = writer.buildFile();
    const blob = new Blob([byteArray], { type: 'audio/midi' });
    return URL.createObjectURL(blob);
}
