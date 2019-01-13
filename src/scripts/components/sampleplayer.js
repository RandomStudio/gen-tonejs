import { Component } from '../ui/component';
import { createButton, createToggle, createBufferImage, createSlider } from '../ui/ui';

export const SamplePlayer = (Tone) => {
    
    const parentElement = Component('SamplePlayer');

    const player = new Tone.Player(
        '/public/samples/aah.m4a', 
        () => {
            console.log('loaded');
            createBufferImage('aah-sample-draw', 'aah', player.buffer, parentElement);
        }    
    ).toMaster();

    const updateRate = (rate) => {
        player.playbackRate = rate;
    };
    
    createButton('play', 'play', () => player.start(), parentElement);
    createButton('stop', 'stop', () => player.stop(), parentElement);
    
    createToggle('reverse', 'reverse', state => { 
        player.reverse = state; 
    }, parentElement);
    createToggle('loop', 'loop', state => { 
        player.loop = state; 
    }, parentElement);

    createSlider('playback-rate', {
        min: 0, max: 8,
        initValue: 1, 
        units: 'x', 
    }, updateRate, parentElement);

};