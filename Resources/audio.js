let isPlaying=false;
let source = [];
let seq = null;


export function play(pattern, chords,bpm){
    if(isPlaying)
        return
    let timeout = !source.length
    source = buildSource(pattern,chords)
    let sound = buildSound(source)
    isPlaying=true
    if(timeout)
        setTimeout(() => sequencer(sound,0,bpm),100)
    else
        sequencer(sound,0,bpm)

}
export function stop(){
    Howler.stop()
    clearTimeout(seq)
    isPlaying=false;
}

function buildSource(pattern, chords){
    let sources = []
    let begin = 'AudioFiles/Pattern'+String(pattern)+'/'
    let speed = '';
    let add = '';
    if (pattern == 2) {
        speed = document.getElementById("speed").value
        if (speed == 1.5)
            add = '_1_5'
    }
    for (let i = 0; i<chords.length; i++){
        let note = chords[i].note
        note = note.replace('#','s')
        let type = chords[i].type
        if(type==='M')
            type=''
        for(let j=0; j<chords[i].duration; j++)
            sources = sources.concat([begin + String(note) + String(type) + String(add) + '.wav'])
    }
    return sources
}

function buildSound(source){
    let sound = []
    for(let i=0; i < source.length; i++){
        sound=sound.concat([new Howl({src: [source[i]],preload:true})])
    }
    return sound;
}

function sequencer(audio,i,bpm){
    Howler.stop()
    if(!isPlaying)
        return
    audio[i].play()
    let dur = (60/bpm)*1000
    seq = setTimeout(() => sequencer(audio,(i+1)%audio.length,bpm),dur)
}
