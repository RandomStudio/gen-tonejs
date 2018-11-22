import '../styles/index.scss';

import * as Tone from 'tone';

//create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "1n");