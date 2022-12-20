let isPlaying=false;
let source = [];
export function play(pattern, chords,bpm){
    if(isPlaying)
        return
    source = buildSource(pattern,chords)
    let sound = buildSound(source)
    isPlaying=true
    sequencer(sound,0,bpm)

}
export function stop(){
    /*for(let i = 0; i < source.length; i++)
        source[i].unload()
    isPlaying=false;*/
    Howler.stop()
    isPlaying=false;
}

function buildSource(pattern, chords){
    let sources = []
    let begin = 'AudioFiles/Pattern'+String(pattern)+'/'
    for (let i = 0; i<chords.length; i++){
        let note = chords[i].note
        note = note.replace('#','s')
        let type = chords[i].type
        if(type==='M')
            type=''
        for(let j=0; j<chords[i].duration; j++)
            sources = sources.concat([begin+String(note)+String(type)+'.wav'])
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
   setTimeout(() => sequencer(audio,(i+1)%audio.length,bpm),dur)

}