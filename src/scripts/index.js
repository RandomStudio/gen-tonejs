import '../styles/index.scss';

import * as Tone from 'tone';
import { createButton, createSlider } from './ui';

//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster();

const triggerAttackRelease = (note, length) => {
    synth.triggerAttackRelease(note, length);
};

const triggerAttack = (note) => {
    if (note) {
        synth.triggerAttack(note);
    } else {
        synth.triggerAttack(synth.frequency.value);
    }
};

const triggerRelease = () => {
    synth.triggerRelease();
};

const updateFreq = (freq) => {
    synth.frequency.rampTo(freq, 0.1);
};

createButton('play', 'play note', () => triggerAttackRelease("C4", "4n"));
createButton('play', 'trigger attack', () => triggerAttack());
createButton('stop', 'trigger release', () => triggerRelease());

createSlider(0, 10000, 'update-freq', updateFreq, synth.frequency.value, 'Hz');