import '../styles/index.scss';
import * as Tone from 'tone';

import { Simple } from './components/simple';
import { fmWithLFO } from './components/fmWithLFO';
import { DetuneSirens } from './components/detuneSirens';
import { Noise } from './components/noise';
import { NoiseSynth } from './components/noiseSynth';

Simple(Tone);
fmWithLFO(Tone);
DetuneSirens(Tone);
Noise(Tone);
NoiseSynth(Tone);