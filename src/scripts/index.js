import '../styles/index.scss';

import * as Tone from 'tone';

//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster();

const triggerAttackRelease = (note, length) => {
    console.log('event1');
    synth.triggerAttackRelease(note, length);
};

const triggerAttack = (note) => {
    console.log('event2');
    synth.triggerAttack(note);
};

const triggerRelease = () => {
    console.log('event3');
    synth.triggerRelease();
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

createButton('play', 'trigger attackRelease', () => triggerAttackRelease("C4", "4n"));
createButton('play', 'trigger attack', () => triggerAttack("C4"));
createButton('stop', 'trigger release', () => triggerRelease());
