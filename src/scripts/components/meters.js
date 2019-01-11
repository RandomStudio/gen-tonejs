import { Component } from '../ui/component';
import { createHorizontalMeter } from '../ui/ui';

export const meters = (Tone) => {

    const parentElement = Component('meters');
    parentElement.classList.add('floater');

    const meter = new Tone.Meter();
    meter.smoothing = 0.1;

    Tone.Master.chain(meter);

    createHorizontalMeter('rms-meter', 'rms', () => { 
        let value = meter.getLevel();
        const min = -60;
        const max = 0;
        if (value < min) {
            value = min;
        }
        if (value > max) {
            value = max;
        }
        return 1 - value / min;
    }, parentElement);

};