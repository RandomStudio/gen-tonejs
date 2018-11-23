import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';
import { freqRangeValues } from '../utils/utils';

export const Simple = (Tone) => {
    
    const parentElement = Component('Simple');

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
    
    createButton('play', 'play note', () => triggerAttackRelease("C4", "4n"), parentElement);
    createButton('play', 'trigger attack', () => triggerAttack(), parentElement);
    createButton('stop', 'trigger release', () => triggerRelease(), parentElement);
    
    createSlider('simple-synth-freq', {
        min: 0, max: 10000,
        initValue: synth.frequency.value, 
        units: 'Hz', 
        labelValues: freqRangeValues
     }, updateFreq, parentElement);
};