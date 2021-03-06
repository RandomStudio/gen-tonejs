import '../styles/index.scss';
import * as Tone from 'tone';

import { Simple } from './components/simple';
import { fmWithLFO } from './components/fmWithLFO';
import { DetuneSirens } from './components/detuneSirens';
import { Noise } from './components/noise';
import { NoiseSynth } from './components/noiseSynth';
import { NoiseSynthEnvelopes } from './components/noiseSynthEnvelopes';
import { meters } from './components/meters';
import { SamplePlayer } from './components/sampleplayer';

Simple(Tone);
fmWithLFO(Tone);
DetuneSirens(Tone);
Noise(Tone);
NoiseSynth(Tone);
NoiseSynthEnvelopes(Tone);
SamplePlayer(Tone);

meters(Tone);