import { Component } from '../ui/component';
import { createButton, createSlider, createRangeSlider } from '../ui/ui';

export const NoiseSynthEnvelopes = (Tone) => {
    
    const parentElement = Component('NoiseSynth-Envelopes');

    const synth = new Tone.NoiseSynth({
        noise: {
            type: 'pink'
        },
        envelope: {
            attack: 0.005,
            decay: 0.01,
            sustain: 0.5,
            release: 5
        }
    });


    const highpass = new Tone.Filter(100, "highpass");
    const lowpass = new Tone.Filter(1000, "lowpass");

    const channel = new Tone.Volume();

    const highPassEnvelope = new Tone.ScaledEnvelope({
        attack: 0.5,
        decay: 1,
        sustain: 1,
        release: 1,
        min: 2000,
        max: 100
    });
    highPassEnvelope.connect(highpass.frequency);

    synth.chain(highpass, lowpass, channel);
    channel.toMaster();

    const triggerAttackRelease = (length) => {
        synth.triggerAttackRelease(length);
        highPassEnvelope.triggerAttackRelease(length);
    };

     createButton('play', 'play note', () => triggerAttackRelease("2n"), parentElement);
};