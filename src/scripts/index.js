import '../styles/index.scss';

import * as Tone from 'tone';

//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster();

const playNote = () => {
    synth.triggerAttackRelease("C4", "4n");
};

const createButton = (name, label, clickHandler, parent = document.body) => {
    const button = document.createElement('button');
    button.value = name;
    button.label = name;
    button.appendChild(document.createTextNode(label));
    button.onclick = clickHandler;
    parent.appendChild(button);
    return button;
};

createButton('play', 'play note', playNote);
