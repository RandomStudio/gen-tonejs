import '../styles/index.scss';

import * as Tone from 'tone';
import { createButton, createSlider } from './ui';

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

const updateFreq = freq => {
    synth.frequency.rampTo(freq, 0.1);
};

createButton('play', 'trigger attackRelease', () => triggerAttackRelease("C4", "4n"));
createButton('play', 'trigger attack', () => triggerAttack("C4"));
createButton('stop', 'trigger release', () => triggerRelease());

createSlider(0, 10000, 'update-freq', updateFreq);