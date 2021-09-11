let sec = 1;

setupKnob();

function setupKnob() {
    const defaultOptions = {
        'min': 0,
        'max': 100,
        'width': 100,
        'height': 100,
        'displayInput': true,
        'fgColor': "blue",
        'format': (value) => {
            return value + '%';
        },
    };
    $(() => {
        $("#cpu").knob(defaultOptions);
        $("#memory").knob(defaultOptions);
    });
}

setInterval(() => {
    //CPU / MEM
    animateKnob('#memory', getRandomInt(1, 100));
    animateKnob('#cpu', getRandomInt(1, 100));

    animateCPUChart();
    animateMemoryChart();


    //Uptime
    // if (sec > 968000) {
    //     sec = 1;
    // }
    document.querySelector('#uptime').innerText = secondsToTimeString(sec);
    sec = sec + getRandomInt(50, 150);
}, 1500);

//0 - 50: Grün | 50 - 80: Orange | 80 - 100: Red | 

function animateKnob(selector, value) {
    let current = 0;
    if (document.querySelector(selector).getAttribute('data-value')) {
        current = document.querySelector(selector).getAttribute('data-value');
    }
    $({ value: current }).animate({ value }, {
        duration: 500,
        easing: 'swing',
        step: function () {
            $(selector).val(Math.ceil(this.value)).trigger('change');
        }
    })
    setTimeout(() => {
        const color = valueToColor(value);
        $(selector).trigger('configure', { 'fgColor': color });
        document.querySelector(selector).style.color = color;
    }, 250);
    document.querySelector(selector).setAttribute('data-value', value);
}

function valueToColor(value) {
    if (value <= 50) {
        return 'green';
    } else if (value > 50 && value <= 80) {
        return 'orange';
    } else if (value > 90) {
        return 'red';
    }
    return 'red';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function secondsToTimeString(seconds) {
    let days = Math.floor(seconds / 60 / 60 / 24);
    seconds = seconds - days * 60 * 60 * 24;
    let hours = Math.floor(seconds / 60 / 60);
    seconds = seconds - hours * 60 * 60;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    const output = '' + (days > 0 ? (days > 9 ? days : '0' + days) + ':' : '')
        + (hours > 9 ? hours : '0' + hours)
        + ':' + (minutes > 9 ? minutes : '0' + minutes)
        + ':' + (seconds > 9 ? seconds : '0' + seconds);
    return output;
}