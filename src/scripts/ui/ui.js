import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import './ui.scss';

export const createButton = (name, label, clickHandler, parent = document.body) => {
    const button = document.createElement('button');
    button.value = name;
    button.appendChild(document.createTextNode(label));
    button.onclick = clickHandler;
    parent.appendChild(button);
    return button;
};

const sliderElements = (name, parentElement) => {
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

    parentElement.appendChild(slider);  
    
    return slider;
};

export const createRangeSlider = (name, options, parent = document.body) => {
    const { min, max, onchange, initValues = [0,1], units = '', labelValues = [] } = options;
    const slider = sliderElements(name, parent);

    noUiSlider.create(slider, {
        start: initValues,
        connect: true,
        range: {
            min, max
        },
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

};

export const createSlider = (name, options, onchange, parent = document.body) => {
    const { min, max, initValue = 0, units = '', labelValues = [] } = options;
    const slider = sliderElements(name, parent);

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
    
    slider.noUiSlider.on('update', value => { 
        const number = parseFloat(value);
        onchange(number);
        const showValue = document.getElementById(name + '-value');
        showValue.innerHTML = `${number} ${units}`;
    });
};