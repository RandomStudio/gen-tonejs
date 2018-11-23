import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import './ui.css';

export const createButton = (name, label, clickHandler, parent = document.body) => {
    const button = document.createElement('button');
    button.value = name;
    button.label = name;
    button.appendChild(document.createTextNode(label));
    button.onclick = clickHandler;
    parent.appendChild(button);
    return button;
};

export const createSlider = (min, max, name, onchange, initValue = 0, units = '', parent = document.body) => {
    // <input type="range" min="1" max="100" value="50" class="slider" id="myRange">

    const slider = document.createElement('div');
    slider.classList.add('slider');
    const label = document.createElement('div');
    label.appendChild(document.createTextNode(name));
    slider.appendChild(label);
    label.classList.add('label');

    const showValue = document.createElement('span');
    showValue.id = name + '-value';
    showValue.classList.add('value');
    label.appendChild(showValue);

    parent.appendChild(slider);

    noUiSlider.create(slider, {
        start: initValue,
        range: { min, max },
        pips: {
            mode: 'values',
            values: [20, 440, 1000, 2000, 10000],
            density: 2
        }
    });
    
    slider.noUiSlider.on('update', values => { 
        const number = parseFloat(values);
        onchange(number);
        const showValue = document.getElementById(name + '-value');
        showValue.innerHTML = `${number} ${units}`;
    });
};