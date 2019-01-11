import { Component } from '../ui/component';
import { createButton, createSlider } from '../ui/ui';

export const DetuneSirens = (Tone) => {
    
    const parentElement = Component('detune-sirens');

    const channel = new Tone.Volume();
    channel.toMaster();
    
    //initially muted
    channel.mute = true;
    //use this to pan the two oscillators hard left/right
    var merge = new Tone.Merge();
    merge.connect(channel);
    //two oscillators panned hard left / hard right
    var rightOsc = new Tone.Oscillator({
        "type" : "sawtooth",
        "volume" : -20
    }).connect(merge.right).start();
    var leftOsc = new Tone.Oscillator({
        "type" : "sawtooth",
        "volume" : -20
    }).connect(merge.left).start();
    //create an oscillation that goes from 0 to 1200
    //connection it to the detune of the two oscillators
    var detuneLFO = new Tone.LFO({
        "type" : "sine",
        "min" : 0,
        "max" : 100
    }).fan(rightOsc.detune, leftOsc.detune).start();
    //the frequency signal
    var frequency = new Tone.Signal(0.5);
    //the move the 0 to 1 value into frequency range
    var scale = new Tone.ScaleExp(110, 440);
    
    //multiply the frequency by 2.5 to get a 10th above
    var mult = new Tone.Multiply(2.5);
    
    //chain the components together
    frequency.chain(scale, mult);
    scale.connect(rightOsc.frequency);
    mult.connect(leftOsc.frequency);
    //multiply the frequency by 2 to get the octave above
    var detuneScale = new Tone.Scale(14, 4);
    frequency.chain(detuneScale, detuneLFO.frequency);		
    

    const start = () => {
        channel.mute = false;
    };

    const stop = () => {
        channel.mute = true;
    };

    const updateFreq = (value) => {
        frequency.rampTo(value, 0.01);
    };

    createButton('play', 'unmute', () => start(), parentElement);
    createButton('stop', 'mute', () => stop(), parentElement);
    
    createSlider('voltage-freq', {
        min: 0, max: 1, 
        initValue: frequency.value, 
        units: 'Hz'
    }, updateFreq, parentElement);

};