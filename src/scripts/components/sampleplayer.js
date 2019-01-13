import { Component } from '../ui/component';
import { createButton, createToggle } from '../ui/ui';
import { freqRangeValues } from '../utils/utils';

export const SamplePlayer = (Tone) => {
    
    const parentElement = Component('SamplePlayer');

    const player = new Tone.Player(
        '/public/samples/aah.m4a'       
    ).toMaster();
    
    createButton('play', 'play', () => player.start(), parentElement);
    createButton('stop', 'stop', () => player.stop(), parentElement);
    
    createToggle('reverse', 'reverse', state => { 
        player.reverse = state; 
    }, parentElement);
    createToggle('loop', 'loop', state => { 
        player.loop = state; 
    }, parentElement);

    
};