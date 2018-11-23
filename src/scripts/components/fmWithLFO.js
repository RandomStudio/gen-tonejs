import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';
import { freqRangeValues } from '../utils/utils';

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
            attack : 1,
            decay : 0.1
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

    const updateVolumeLFOfrequency = (freq) => {
        volumeLFO.frequency.rampTo(freq, 0.1);
    };

    const updateModulatorFrequency = (freq, time = 0.1) => {
        synth.modulation.frequency.rampTo(freq, time);
    };

    
    createButton('play', 'trigger attack', () => triggerAttack(), parentElement);
    createButton('stop', 'trigger release', () => triggerRelease(), parentElement);
    
    createSlider('fmsynth-freq', { 
        min: 0, max: 10000,
        initValue: synth.frequency.value, 
        units: 'Hz', 
        labelValues: freqRangeValues
    }, updateFreq, parentElement);

    createSlider('lfo-volume-freq', {
        min: 0, max: 100, 
        initValue: volumeLFO.frequency.value, 
        units: 'Hz'
    }, updateVolumeLFOfrequency, parentElement);

    createSlider('fmsynth-mod-freq', {
        min: 0, max: 1000, 
        initValue: synth.modulation.frequency.value, 
        units: 'Hz', 
        labelValues: freqRangeValues
    }, updateModulatorFrequency, parentElement);

};