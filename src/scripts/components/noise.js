import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';
import { freqRangeValues } from '../utils/utils';

export const Noise = (Tone) => {
    
    const parentElement = Component('Noise');

    const noise = new Tone.Noise('pink').toMaster();
    noise.volume.value = -30;

    const start = () => {
        noise.start();
    };

    const stop = () => {
        noise.stop();
    };

    const noiseVolume = (value) => {
        noise.volume.value = value;
    };
    
    createButton('start', 'start', () => start(), parentElement);
    createButton('stop', 'stop', () => stop(), parentElement);

    createSlider(-100, 0, 'noise-volume', noiseVolume, noise.volume.value, 'dB', [], parentElement);
};