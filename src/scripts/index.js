import '../styles/index.scss';
import * as Tone from 'tone';

import { Simple } from './components/simple';
import { fmWithLFO } from './components/fmWithLFO';
import { DetuneSirens } from './components/detuneSirens';

Simple(Tone);
fmWithLFO(Tone);
DetuneSirens(Tone);