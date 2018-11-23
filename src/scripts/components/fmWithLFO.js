import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';

export const fmWithLFO = (Tone) => {
    
    const parentElement = Component('fmWithLfo');

    const synth = new Tone.FMSynth({
        modulationIndex: 30,
        harmonicity: 1,
        envelope : {
            attack : 0.01,
            decay : 0.2
        },
        modulation : {
            type : "square"
        },
        modulationEnvelope : {
            attack : 0.5,
            decay : 0.01
        }
    }).toMaster();

    const volumeLFO = new Tone.LFO({
        "type" : "sine",
        "min" : 0,
        "max" : -100,
        "frequency": 1
    });

    volumeLFO.connect(synth.volume);
    volumeLFO.start();
    
    const triggerAttack = (note) => {
        console.log('trigger attack');
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
    
    createButton('play', 'trigger attack', () => triggerAttack(), parentElement);
    createButton('stop', 'trigger release', () => triggerRelease(), parentElement);
    
    createSlider(0, 10000, 'synth-freq', updateFreq, synth.frequency.value, 'Hz', parentElement);
};