import { Component } from '../ui/component';
import { createButton, createToggle, createBufferImage } from '../ui/ui';

export const SamplePlayer = (Tone) => {
    
    const parentElement = Component('SamplePlayer');

    const player = new Tone.Player(
        '/public/samples/aah.m4a', 
        () => {
            console.log('loaded');
            createBufferImage('aah-sample-draw', 'aah', player.buffer, parentElement);
        }    
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