import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import './ui.scss';

export const createButton = (name, label, clickHandler, parent = document.body) => {
    const button = document.createElement('button');
    button.value = name;
    button.label = name;
    button.appendChild(document.createTextNode(label));
    button.onclick = clickHandler;
    parent.appendChild(button);
    return button;
};

export const createSlider = (min, max, name, onchange, initValue = 0, units = '', labelValues = [], parent = document.body) => {
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
        pips: labelValues.length > 0 
        ?
            {
                mode: 'values',
                density: 2,
                values: labelValues
            }
        :
            {
                mode: 'range',
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