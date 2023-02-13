import {allNotes, triads, quadriads, sequences, scaleBuilder} from "./notes&chords.js";
import {findDegree, romToInt} from "./functions.js"

let chords = document.getElementById("chords");
let grid = document.getElementById("grid");
let elem = document.querySelector('input[type="range"]');
let preset = document.getElementById("preset");
let allTypes = triads.concat(quadriads);



// export function addChords(){
//     for(let i=1;i<5;i++) {
//         const newDiv = document.createElement("div");
//         newDiv.id="chord"+String(i);
//         newDiv.className="box";
//         newDiv.classList.add("grid-container_2")
//         const noteSel = document.createElement("select");
//         noteSel.name="tonic";
//         noteSel.className="selection";
//         const typeSel = document.createElement("select");
//         typeSel.name="type";
//         typeSel.className="type_selection";
//         const default_option = document.createElement("option");
//         default_option.innerText="Notes";
//         default_option.setAttribute("selected", "");
//         default_option.setAttribute("disabled", "");
//         noteSel.appendChild(default_option)
//         for(let j=0;j<allNotes.length;j++){
//             const option = document.createElement("option");
//             option.value = allNotes[j];
//             option.text = allNotes[j];
//             noteSel.appendChild(option);
//         }
//         const default_option2 = document.createElement("option");
//         default_option2.innerText="Type";
//         default_option2.setAttribute("selected", "");
//         default_option2.setAttribute("disabled", "");
//         typeSel.appendChild(default_option2)
//         for(let j=0;j<allTypes.length;j++){
//             const option = document.createElement("option");
//             option.value = allTypes[j];
//             option.text = allTypes[j];
//             typeSel.appendChild(option);
//         }
//         newDiv.appendChild(noteSel);
//         newDiv.appendChild(typeSel);
//         chords.appendChild(newDiv);
//     }
// }

export function addPreset(){
    const text = document.createElement("div");
    text.style.gridArea = "1 / 1 / 2 / 3";
    text.innerHTML="Preset";
    const preset_box = document.getElementById("preset");
    const noteSel = document.createElement("select");
    noteSel.name="tonic";
    noteSel.className="selection";
    noteSel.style.gridArea = "grid-area:  2 / 1 / 3 / 2";
    const seqSel = document.createElement("select");
    seqSel.name="sequence";
    seqSel.className="type_selection";
    seqSel.style.gridArea = "grid-area:  2 / 2 / 3 / 3";
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
    preset_box.appendChild(text);
    preset_box.appendChild(noteSel);
    preset_box.appendChild(seqSel);
    noteSel.addEventListener("change",checkPreset);
    seqSel.addEventListener("change",checkPreset);
}

function checkPreset(){
    const note = preset.childNodes[1].value;
    const sequence = preset.childNodes[2].value;
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
        noteSel.className="selection";
        const typeSel = document.createElement("select");
        typeSel.name="type";
        typeSel.className="type_selection";
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
        c.appendChild(noteSel);
        c.appendChild(typeSel);
        newDiv.appendChild(c);
        chords.appendChild(newDiv);
    }
}

export function showChords(chords){
    const display = document.getElementById("compDisplay");
    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }
    if(!chords)
        return
    for(let i=0;i<chords.length;i++) {
        const newDiv = document.createElement("div");
        newDiv.id="chord"+String(i+1);
        newDiv.className="box_2";

        const img = document.createElement("img");
        img.className = "image";
        img.src = "https://www.martinguitar.com/dw/image/v2/BGJT_PRD/on/demandware.static/-/Library-Sites-MartinSharedLibrary/default/dwc7164208/images/blog/021622-chords/E.jpg";
        newDiv.appendChild(img);


        const text = document.createElement("div");
        text.className = "text-container";
        const label = document.createElement("h4");
        label.innerHTML=chords[i].note+chords[i].type+"("+chords[i].duration+")";
        text.appendChild(label);
        newDiv.appendChild(text);

        display.appendChild(newDiv);
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

    // display.style.gridTemplateColumns = "repeat(children,1fr)";

    const play_out = document.getElementById("playOut")
    play_out.style.display = "block";
    const midi = document.getElementById("midiButton");
    midi.style.display = "block";
    // setTimeout(() => {window.scrollBy({top: 300, left:0, behavior: 'smooth'})}, 800);




}

export function showScale(note){
    const newRoot = document.createElement("div");
    newRoot.id="root";
    if(!note)
        newRoot.innerHTML = "Couldn't find the root";
    else
        newRoot.innerHTML = "The root is: "+note;
    const display = document.getElementById("rootDisplay");
    // display.classList.add("coral");
    if (display.children.length!=0){
        const root = document.getElementById("root");
        display.removeChild(root)
    }
    display.appendChild(newRoot);
    display.classList.add("animation");
}

// export function showDegrees(tonic){
//     for(let i = 0; i < chords.children.length; i++) {
//         let current = document.getElementById("chord"+String(i+1))
//         let chordRoot = current.childNodes[0].value;
//         let chordType = current.childNodes[1].value;
//         let chord = {note: chordRoot,type: chordType};
//         let panel = document.getElementById("chords");
//         const newDegree = document.createElement("p");
//         if(tonic) {
//             let degree = findDegree(tonic, chord);
//             newDegree.id = "degree" + String(i + 1);
//             newDegree.innerHTML = degree;
//         }
//         if (current.childNodes.length==3) {
//             const prev = current.childNodes[2];
//             current.removeChild(prev);
//         }
//         if(tonic)
//             current.appendChild(newDegree);
//             // panel.appendChild(newDegree);
//     }
// }

export function showDegrees(tonic){
    for(let i = 0; i < chords.children.length; i++) {
        let position = document.getElementById("pos_chord"+String(i+1))
        let current = position.childNodes[0];
        let chordRoot = current.childNodes[0].value;
        let chordType = current.childNodes[1].value;
        let chord = {note: chordRoot,type: chordType};
        const newDegree = document.createElement("p");
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
            newDegree.classList.add("animation2")
        }
    }
}

// export function showSequence(seq){
//     const newSeq = document.createElement("p");
//     newSeq.id="seq";
//     if(!seq)
//         newSeq.innerHTML="Couldn't find any known sequence"
//     else
//         newSeq.innerHTML = "The sequence is:"+seq;
//     const display = document.getElementById("seqDisplay");
//     display.classList.add("coral");
//     if (display.children.length!=0){
//         const sequence = document.getElementById("seq");
//         display.removeChild(sequence)
//     }
//     display.appendChild(newSeq);
// }


// range slider

export function rangeValue(){
    let slider = document.getElementById("complexLvl");
    let newValue = slider.value;
    let level = document.getElementById("compLev");
    level.innerHTML = "Lv. " + newValue;
    slider.addEventListener("input", rangeValue);
}

export function rangeValue2(){
    let slider = document.getElementById("speed");
    let newValue = slider.value;
    let level = document.getElementById("speedLev");
    level.innerHTML = "x " + newValue;
    slider.addEventListener("input", rangeValue2);
}

export function rangeValue3(){
    let slider = document.getElementById("pattern");
    let newValue = slider.value;
    let level = document.getElementById("patternLev");
    level.innerHTML = newValue;
    slider.addEventListener("input", rangeValue3);
}


// export function rangeValue(slid, lev){
//     let slider = document.getElementById(slid);
//     let newValue = slider.value;
//     let level = document.getElementById(lev);
//     level.innerHTML = "Lv. " + newValue;
//     slider.addEventListener("input", rangeValue);
// }