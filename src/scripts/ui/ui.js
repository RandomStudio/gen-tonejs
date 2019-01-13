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

export const createRangeSlider = (name, options, onchange, parent = document.body) => {
    const { min, max, initValues = [0,1], units = '', labelValues = [], labelRange = []  } = options;
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

    slider.noUiSlider.on('update', values => { 
        const numbers = values.map(v => parseFloat(v));
        onchange(numbers);
        const showValue = document.getElementById(name + '-value');
        if (labelRange.length === numbers.length) {
            showValue.innerHTML = numbers.map((n, i) => 
                ` ${labelRange[i]} ${n} ${units}`
            );
        } else {
            showValue.innerHTML = numbers.map((n, i) => 
                ` ${n} ${units}`
            );
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

export const createDynamicLabel = (name, label, updater, parent) => {

    const div = document.createElement('div');
    div.appendChild(document.createTextNode(label + ': '));
    const valueSpan = document.createElement('span');
    div.appendChild(valueSpan);
    div.id = name;
    parent.appendChild(div);

    const intervalUpdate = setInterval(() => {
        const value = updater.apply();
        valueSpan.textContent = value;        
    }, 60);

    return div;
};

export const createHorizontalMeter = (name, label, updater, parent) => {
    const container = document.createElement('div');
    container.classList.add('horizontal-meter');
    container.id = name;
    const barEmpty = document.createElement('div');
    barEmpty.classList.add('bar-empty');
    const barFill = document.createElement('div');
    barFill.classList.add('bar-fill');
    barEmpty.appendChild(barFill);
    
    const meterLabel = document.createElement('div');
    meterLabel.classList.add('label');
    meterLabel.textContent = label;
    barEmpty.appendChild(meterLabel);

    container.appendChild(barEmpty);

    parent.appendChild(container);

    const intervalUpdate = setInterval(() => {
        const value = updater.apply();
        if (value !== null) {
            barFill.style.width = value * 100 + '%';
        }
    }, 60);

    return container;
};

export const createBandedMeter = (name, label, channelCount, updater, parent) => {
    const container = document.createElement('div');
    container.classList.add('banded-meter');
    container.id = name;

    const drawingArea = document.createElement('div');
    drawingArea.classList.add('drawing-area');

    const meterLabel = document.createElement('div');
    meterLabel.classList.add('label');
    meterLabel.textContent = label;
    drawingArea.appendChild(meterLabel);

    const canvas = document.createElement('canvas');

    const updateCanvas = canvas => {

        const values = updater.apply();

        const { width, height } = canvas.getBoundingClientRect();
        const channelWidth = width / channelCount;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, width, height);

            for (var c = 0; c < channelCount; c++) {
                const x = c * channelWidth;
                const channelHeight = values[c] * height;
                ctx.strokeStyle = '#eee';
                ctx.strokeRect(x, 0, x + channelWidth, height);

                ctx.fillStyle = 'lightgreen';
                ctx.fillRect(x, height, x + channelWidth, -channelHeight);
            }
            // ctx.fillStyle = 'rgb(255,0,0)';
            // ctx.fillRect(0, 0, width, height);
            
        }

    };

    drawingArea.appendChild(canvas);
    container.appendChild(drawingArea);

    const intervalUpdate = setInterval(() => {
        updateCanvas(canvas);
    }, 60);


    parent.appendChild(container);
    return container;
};

export const createToggle = (name, label, onUpdate, parent, initState = false) => {
    const container = document.createElement('div');
    container.classList.add('toggle');
    container.id = name;

    container.appendChild(document.createTextNode(label + '? '));
    
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = initState;
    const handler = (e) => {
        const state = e.target.checked;
        console.log('toggle state:', state);
        onUpdate(state);
    };
    checkbox.addEventListener('change', handler);

    container.appendChild(checkbox);

    parent.appendChild(container);
    return container;
};