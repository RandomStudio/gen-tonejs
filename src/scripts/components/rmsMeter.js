import { Component } from '../ui/component';
import { createDynamicLabel } from '../ui/ui';

export const rmsMeter = (Tone) => {

    let value = 0;

    const parentElement = Component('rms-meter');
    parentElement.classList.add('meter');

    const meter = new Tone.Meter();

    Tone.Master.chain(meter);

    createDynamicLabel('rms', 'level', () => { return meter.getLevel(); }, parentElement);

    // const intervalUpdate = setInterval(() => {
    //     console.log(meter.getLevel());
    // }, 500);

};