import '../styles/index.scss';
import * as Tone from 'tone';

import { Simple } from './components/simple';
import { fmWithLFO } from './components/fmWithLFO';

Simple(Tone);
fmWithLFO(Tone);