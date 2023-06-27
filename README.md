# Harmonic Complexifier
Advanced Coding Tool and Methodologies & Computer Music Representation and Models - Politecnico di Milano - Music and Acoustic Engineering 2022/2023

<p>
  <img src = "readmeImgs/GUI.png">
</p>

## Introduction
The "Harmonic Complexifier" is a web-developed software that allows the user to add up to 5 level of complexity to a commonly structured 4-chords sequence, given as input. 
The main idea of this project was to develop a sort of didactic tool that enables inexperienced musicians to generate intricate and dynamically evolving chord sequences. This would be accomplished by using specific musical rules and substitutions, which will be discussed in detail later.

## Features
- up to six possible "complexifiable" sequences
- seven possible chord types as input, including diminished and diminshed 7th
- preset selection, allowing the user for a quicker input by giving only a root and a sequence
- level of complexity selection
- chord sequence playback, to compare the obtained result with the input
- 2 different playing patterns: Strummed and Finger-Picked
- 3 levels of playback speed
- guitar tablature for the outputted chords
- midi file export of the "complexified" sequence 

## Implementation
Let's now see in detail how these features have been implemented.

### Sequence Recognition and Root Finding
First of all, the inputted sequence is converted into an array of Object, structured as {note: note_name, type: chord_type, duration: 4}, by using the function "updateValues()", from the [function.js](Resources/function.js) file.

```
export function updateValues(){
    let chord1v_new = document.getElementById("chord1").childNodes[0].value;
    let chord2v_new = document.getElementById("chord2").childNodes[0].value;
    ...
    let chord1t_new = document.getElementById("chord1").childNodes[1].value;
    ...
    return [{note: chord1v_new, type: chord1t_new, duration: 4}, ...]
}
```
#### KeyFinder

Now, the "keyfinder()" function allows us to find the root, if present, of the given sequence.
To do so, we build the major scale for each chord note by using the "scaleBuilder(note)" funciton, which returns an array of all the chords in the given scale, both in triads and in tetrads. All the music related data is contained under the [notes&chords.js](Resources/notes&chords.js) file.
If one of the given scales contains all the chords of the sequence, then that will be the root of the sequence.
If none of the scales contains all the chords, the scale that contains at least 3 chords will be considered as the root.

```
export function keyFinder(){
    let chords = updateValues();  //obtain the array of chords
    let chords_in = 0;
    let tonic = '';
    for (let i = 0; i < chords.length; i++){ //create the scale for each of the chords note
        let scale = scaleBuilder(chords[i].note);
        let chords_in_new=0;
        for (let j = 0; j < chords.length; j++){
            if(containsChord(scale,chords[j]))
                chords_in_new+=1;
        }
        if (chords_in_new>chords_in) { //update the tonic if the number of chords contained is higher than the previous one
            chords_in = chords_in_new;
            tonic=chords[i].note;
        }
        if (chords_in == 4) //if it contains all the chords, that note will be the root
            return tonic;
    }
    if (chords_in > 2) //the root of the scale containing at least 3 chords will be returned as the root of the sequence
        return tonic 
```
If none of the scales contains at least 3 chords, then we check all the other possible major scales.
If one of the scales satisfies the previous mentioned requirements, the root of that scale will be considered as the root. Else, the function returns false.

#### Sequence Finder
We then check if the sequence of chords that has been inputted by the user fits with the possible sequences used by the software. In fact, this implementation of the Harmonic Complexifier works only with these 6 different sequences of chords:
- 1-2-5-1
- 1-4-5-1
- 1-5-4-1
- 1-6-5-1
- 1-6-2-5
- 1-5-6-4

Having obtained the array containing the degrees of the chords, by using the "retDegrees(root,chords)" function, we pass it as a parameter to the "newSeqFinder(degrees_param)" function shown here:
```
```

### Complexifying the Sequence
### Audio playback
### Midi Export
### User Interface
#### CSS Grid layout
The Graphical User Interface of the Harmonic Complexifier is a grid-based GUI obtained through the use of <b>CSS Grid layout</b>. Thanks to this powerful layout system, a flexibile and responsive layout has been obtained in a more intuitive and easier way. \
For example, the entire page is based on the following grid: 
```
.grid-container{
    display: grid;
    grid-template-columns: repeat(6, 1fr); /*six column of 1fr */
    grid-template-rows: 1fr 3.2fr auto 3fr;
    grid-column-gap: 0.25em;
    grid-row-gap: 4%;
}
```

#### 3D Button
A peculiar feature of the Harmonic Complexifier GUI consists in the style of the buttons:
<p>
  <img src = "readmeImgs/COMP_BUTT.png">
  <img src = "readmeImgs/PLAY_BUTT.png">
  <img src = "readmeImgs/MIDI_BUTT.png">
</p>
The 3D style of the buttons has been achieved thanks to the pseudo-element <b>::before</b> which creates a layered effect adding a sense of depth and a 3D-like appearance to the button. In particular, within <b>.big-button::before</b>, the <b>transform</b> property in combination with <b>translate3d()</b> function is responsible for creating the 3D effect. In addiction, by applying various background colors, border radius, and box shadow to the pseudo-element, the 3D effect of the button is enhanced.

```
.big-button::before {
    position: absolute;
    content: "";
    width: 100%; height: 100%;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--colorShadeC);
    border-radius: inherit;
    box-shadow: 0 0 0 2px var(--colorShadeB), 0 0.75em 0 0 var(--colorShadeA);
    transform: translate3d(0, 0.75em, -1em);
    transition: all 175ms cubic-bezier(0, 0, 1, 1);
}
```

#### Range Slider
Another important object which builds up this graphical interface is the input HTML element of the type <b>range</b>. \
The Harmonic Complexifier provides three sliders which play different role but they all share the same CSS style:
<p>
  <img src = "readmeImgs/LEVEL.png">
  <img src = "readmeImgs/PATTERN.png">
  <img src = "readmeImgs/SPEED.png">
</p>
Each slider is composed by the following elements: <b>value</b>, <b>label</b> and the type <b>range</b> input with the so-called <b>thumb</b> (the small and movable indicator that users can interact with by clicking or dragging to set a specific value on the slider):
<p>
  <img src = "readmeImgs/slider.png">
</p>
These elements are wrapped together in a container for a better positioning of each entire slider. 

#### Input chords
The user is allowed to choose the <b>note</b> and the <b>type</b> of note of each input chord by the means of two HTML <b>select</b> element; \
by clicking on the arrow, a drop-down list of options is created and the user can choose only one value in this case.
<p>
  <img src = "readmeImgs/select.png">
</p>

The input chords can be also selected using the <b>Preset menu</b> which contains two other HTML <b>select</b> elements, the first one for the notes and the second one for the sequences:

<p>
  <img src = "readmeImgs/preset.png">
</p>

#### Output chords
Each output chord box contains two fundamental elements: the output chord <b>name</b> and the output chord <b>duration symbol</b>. \
For example:
<p>
  <img src = "readmeImgs/output.png">
</p>

Last but not least, once the complexified chords are outputted, the user can visualize the corresponding guitar chord chart hovering on each output chord box:
<p>
  <img src = "readmeImgs/guitar.png">
</p>

## Conclusions
We believe that the "Harmonic Complexifier" succeds in its purpouse of guiding a beginning musician in music theory, by encouraging him to evolve and vary using the level of complexity and transformations he likes best.
There are some aspect that could be improved or added in following implementations, such as increasing the possible sequences to work with and the harmonization of minor keys. Also, it would be a nice addition to differ the musical instruments with which the result can be heard, and visualize the tablature of the outputted chords for those instruments as well.


