import {allNotes, triads, quadriads, sequences, scaleBuilder} from "./notes&chords.js";
import {findDegree, romToInt} from "./functions.js"
import {handle} from "../script.js";


let chords = document.getElementById("chords");
let preset = document.getElementById("first");
let preset1 = document.getElementById("preset_box");
let allTypes = triads.concat(quadriads);



//creates the preset input option
export function addPreset(){
    const preset_box = document.getElementById("first");
    const noteSel = document.createElement("select");
    noteSel.name="tonic";
    noteSel.className="preset_selection";
    noteSel.id = "notes_select_preset";
    const seqSel = document.createElement("select");
    seqSel.name="sequence";
    seqSel.className="preset_selection";
    seqSel.id = "type_select_preset";
    const default_option = document.createElement("option");
    default_option.innerText="Notes";
    default_option.setAttribute("selected", "");
    default_option.setAttribute("disabled", "");
    noteSel.appendChild(default_option)
    for(let j=0;j<allNotes.length;j++){
        const option = document.createElement("option");
        option.value = allNotes[j];
        option.text = allNotes[j];
        noteSel.appendChild(option);
    }
    const default_option2 = document.createElement("option");
    default_option2.innerText="Sequence";
    default_option2.setAttribute("selected", "");
    default_option2.setAttribute("disabled", "");
    seqSel.appendChild(default_option2)
    for(let j=0;j<sequences.length;j++){
        const option = document.createElement("option");
        option.value = sequences[j];
        option.text = sequences[j];
        seqSel.appendChild(option);
    }
    preset_box.appendChild(noteSel);
    preset_box.appendChild(seqSel);
    noteSel.addEventListener("change",checkPreset);
    seqSel.addEventListener("change",checkPreset);
    noteSel.addEventListener("change",handle);
    seqSel.addEventListener("change",handle);
}

//check if both the note and sequence of the preset have been set.
//Updates the values of the chords in input
function checkPreset(){
    const note = preset.childNodes[0].value;
    const sequence = preset.childNodes[1].value;
    if (note == "Notes" || sequence == "Sequence")
        return
    let seq;
    for(let i = 0; i < sequences.length; i++)
        if(sequence==sequences[i])
            seq=sequences[i];
    const scale = scaleBuilder(note);
    for(let i = 0; i < 4; i++){
        const chord = document.getElementById("chord"+(i+1))
        const scalechord = scale[2 * (romToInt(seq[i]))]
        chord.childNodes[0].value=scalechord.note;
        chord.childNodes[1].value=scalechord.type;
    }
}

//adds the chords square inputs
export function addChords(){
    for(let i=1;i<5;i++) {
        const newDiv = document.createElement("div");
        newDiv.id="pos_chord"+String(i);
        const c = document.createElement("div");
        c.className="box";
        c.id="chord"+String(i);
        c.classList.add("grid-container_2")
        const noteSel = document.createElement("select");
        noteSel.name="tonic";
        noteSel.className="chord_selection";
        noteSel.classList.add("notes_selection");
        const typeSel = document.createElement("select");
        typeSel.name="type";
        typeSel.className="chord_selection";
        typeSel.classList.add("type_selection");
        const default_option = document.createElement("option");
        default_option.innerText="Notes";
        default_option.setAttribute("selected", "");
        default_option.setAttribute("disabled", "");
        noteSel.appendChild(default_option)
        for(let j=0;j<allNotes.length;j++){
            const option = document.createElement("option");
            option.value = allNotes[j];
            option.text = allNotes[j];
            noteSel.appendChild(option);
        }
        const default_option2 = document.createElement("option");
        default_option2.innerText="Type";
        default_option2.setAttribute("selected", "");
        default_option2.setAttribute("disabled", "");
        typeSel.appendChild(default_option2)
        for(let j=0;j<allTypes.length;j++){
            const option = document.createElement("option");
            option.value = allTypes[j];
            option.text = allTypes[j];
            typeSel.appendChild(option);
        }
        noteSel.addEventListener("change",handle);
        typeSel.addEventListener("change",handle);
        c.appendChild(noteSel);
        c.appendChild(typeSel);
        newDiv.appendChild(c);
        chords.appendChild(newDiv);
    }
}

//shows the output chords
export function showChords(chords){
    const display = document.getElementById("compDisplay");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }
    if(!chords)
        return
    for(let i=0;i<chords.length;i++) {
        const out_chord = document.createElement("div");
        out_chord.className="box_2";
        const text_container = document.createElement("div");
        text_container.classList.add("outputName");
        text_container.id="chord"+String(i+1);
        text_container.innerHTML=chords[i].note+chords[i].type;
        out_chord.appendChild(text_container);

        const image_container = document.createElement("div");
        image_container.className="guitarImage_cont";
        text_container.appendChild(image_container);

        const nome_nota = chords[i].note+chords[i].type;
        const percorso = nome_nota.replace("#","d");
        const img = document.createElement("img");
        img.className = "guitarImage";
        img.src = "immagini/" + percorso + ".png";
        image_container.appendChild(img);

        const imgDur = document.createElement("div");
        imgDur.classList.add("durationImage_cont");
        out_chord.appendChild(imgDur);

        const durata = chords[i].duration;
        const img2 = document.createElement("img");
        img2.className = "durationImage";
        if(durata==4){
            img2.classList.add("semibreve");
        }
        img2.src = "immagini/" + durata + ".png";
        imgDur.appendChild(img2);
        display.appendChild(out_chord);
    }
    let children = display.childNodes.length;
    display.style.display = "grid";
    if(children==4)
        display.style.gridTemplateColumns = "repeat(4,1fr)";
    if(children==5)
        display.style.gridTemplateColumns = "repeat(5,1fr)";
    if(children==6)
        display.style.gridTemplateColumns = "repeat(6,1fr)";
    if(children==7)
        display.style.gridTemplateColumns = "repeat(7,1fr)";
    if(children==8)
        display.style.gridTemplateColumns = "repeat(8,1fr)";


    const play_out = document.getElementById("play_out_cont")
    play_out.style.display = "block";
    play_out.classList.add("showPlayOut");
    const midi = document.getElementById("midi_cont");
    midi.style.display = "block";
    midi.classList.add("showMidi");

}

//Shows the root of the sequence
export function showScale(note){
    const newRoot = document.createElement("div");
    newRoot.id="root";
    if(!note)
        newRoot.innerHTML = "Couldn't find the root";
    else
        newRoot.innerHTML = "The root is: "+note;
    const display = document.getElementById("rootDisplay");
    if (display.children.length!=0){
        const root = document.getElementById("root");
        display.removeChild(root)
    }
    display.appendChild(newRoot);
    display.classList.add("animation");
}

//shows the degree of each chord in input
export function showDegrees(tonic){
    for(let i = 0; i < chords.children.length; i++) {
        let position = document.getElementById("pos_chord"+String(i+1))
        let current = position.childNodes[0];
        let chordRoot = current.childNodes[0].value;
        let chordType = current.childNodes[1].value;
        let chord = {note: chordRoot,type: chordType};
        const newDegree = document.createElement("div");
        newDegree.classList.add("deg");
        if(tonic) {
            let degree = findDegree(tonic, chord);
            newDegree.id = "degree" + String(i + 1);
            newDegree.innerHTML = degree;
            if(degree=="chord not in scale"){
                newDegree.classList.add("nis")
            }
        }
        if (position.childNodes.length==2) {
            const prev = position.childNodes[1];
            position.removeChild(prev);
        }
        if(tonic) {
            // current.appendChild(newDegree);
            position.appendChild(newDegree);
        }
    }
}



// range slider for the complexity level
export function rangeValue(){
    let slider = document.getElementById("complexLvl");
    let newValue = slider.value;
    let level = document.getElementById("compLev");
    level.innerHTML = "Lv. " + newValue;
    slider.addEventListener("input", rangeValue);
}

//range slider for the speed level
export function rangeValue2(){
    let slider = document.getElementById("speed");
    let newValue = slider.value;
    let level = document.getElementById("speedLev");
    level.innerHTML = "x " + newValue;
    slider.addEventListener("input", rangeValue2);
}

//range slider for patter selection
export function rangeValue3(){
    let slider = document.getElementById("pattern");
    let newValue = slider.value;
    let level = document.getElementById("patternLev");
    level.innerHTML = newValue;
    slider.addEventListener("input", rangeValue3);
}


export function index1(){
    preset1.style.zIndex = "0";
}