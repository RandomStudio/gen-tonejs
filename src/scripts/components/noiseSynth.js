import { Component } from '../ui/component';
import { createButton, createSlider, createRangeSlider } from '../ui/ui';
import { freqRangeValues } from '../utils/utils';

export const NoiseSynth = (Tone) => {
    
    const parentElement = Component('NoiseSynth');

    const synth = new Tone.NoiseSynth({
        noise: {
            type: 'pink'
        },
        envelope: {
            attack: 0.005,
            decay: 0.01,
            sustain: 0.1
        }
    });

    const highpass = new Tone.Filter(100, "highpass");
    const lowpass = new Tone.Filter(1000, "lowpass");

    const channel = new Tone.Volume();

    synth.chain(highpass, lowpass, channel);
    channel.toMaster();

    const triggerAttackRelease = (length) => {
        console.log('play', length);
        synth.triggerAttackRelease(length);
    };

    const triggerAttack = () => {
        synth.triggerAttack();
    };

    const triggerRelease = () => {
        synth.triggerRelease();
    };

    createButton('play', 'play note', () => triggerAttackRelease("8n"), parentElement);
    createButton('play', 'trigger attack', () => triggerAttack(), parentElement);
    createButton('stop', 'trigger release', () => triggerRelease(), parentElement);
    
    createRangeSlider('noise-synth-filters', {
        min: 0,
        max: 20000,
        initValues: [100, 2000],
        labelValues: freqRangeValues
    }, parentElement);
};