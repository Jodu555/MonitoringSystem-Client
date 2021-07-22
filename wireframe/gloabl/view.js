document.querySelectorAll('[data-collapse]').forEach(element => {
    const span = element.getElementsByTagName('span')[0];
    const target = document.getElementById(element.getAttribute("data-collapse"));
    // console.log(element);
    // console.log(target);
    Array.prototype.slice.call(target.getElementsByTagName('li')).forEach(element => {
        element.classList.add('collapsible-entity')
    });

    element.classList.add('collapsible');
    if (typeof element.getAttribute('expand') !== 'string') {
        target.style.display = 'none';
    } else {
        element.classList.add('expanded');
    }

    // target

    span.addEventListener('click', () => {
        element.classList.toggle('expanded');
        if (target.style.display === 'none') {
            target.style.display = '';
        } else {
            target.style.display = 'none';
        }
    });

});

let sec = 1;

let cpuChart;
let memoryChart;
setupChart();
setupKnob();

function setupKnob() {
    const defaultOptions = {
        'min': 0,
        'max': 100,
        'width': 100,
        'height': 100,
        'displayInput': true,
    };
    $(() => {
        $("#cpu").knob({
            ...defaultOptions,
            'fgColor': "#FF0000",
        });
        $("#memory").knob({
            ...defaultOptions,
            'fgColor': "#FF0000",
            'format': (value) => {
                return value + '%';
            },
        });
    });
}

function setupChart() {
    const scales = {
        y: {
            beginAtZero: true,
            userCallback: (label, index, labels) => {
                console.log(label);
                if (Math.floor(label) == label) {
                    return label;
                }
            }
        }
    };
    const datasetsDefault = {
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
        tension: 0.9,
        data: [0],
    }
    const primaryChart = {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
    }
    const dangerChart = {
        backgroundColor: 'rgba(239, 26, 58, 0.2)',
        borderColor: 'rgba(239, 26, 58, 1)',
    }

    var cpuctx = document.getElementById('cpuChart').getContext('2d');
    cpuChart = new Chart(cpuctx, {
        type: 'line',
        data: {
            labels: ['00:00'],
            datasets: [{
                label: 'Usage of CPU',
                ...primaryChart,
                ...datasetsDefault
            }]
        },
        options: {
            scales
        }
    });

    var memoryctx = document.getElementById('memoryChart').getContext('2d');
    memoryChart = new Chart(memoryctx, {
        type: 'line',
        data: {
            labels: ['00:00'],
            datasets: [{
                label: 'Usage of Memory',
                ...primaryChart,
                ...datasetsDefault
            },
            {
                label: 'Maximum of Memory',
                ...dangerChart,
                ...datasetsDefault,
                data: [1024],
            }]
        },
        options: {
            // animation: {
            //     duration: 0
            // },
            scales
        }
    });
}

setInterval(() => {
    //CPU / MEM
    animateKnob('#memory', getRandomInt(1, 100));
    animateKnob('#cpu', getRandomInt(1, 100));
    // chnageCurrentCPU();

    animateCPUChart();
    animateMemoryChart();


    //Uptime
    if (sec > 968000) {
        sec = 1;
    }
    document.querySelector('#uptime').innerText = secondsToTimeString(sec);
    sec = sec + getRandomInt(50, 150);
}, 1000);

//0 - 50: Grün | 50 - 80: Gelb | 80 - 90: Orange | 90 - 100: Red | 


function chnageCurrentCPU() {
    const cpu = getRandomInt(1, 100)
    $('#cpu')
        .val(cpu)
        .trigger('change').delay(2000);
    const color = valueToColor(cpu);
    $('#cpu').trigger('configure', { 'fgColor': color });
    document.querySelector('#cpu').style.color = color;
}

function animateKnob(selector, value) {
    let current = 0;
    if (document.querySelector(selector).getAttribute('data-value')) {
        current = document.querySelector(selector).getAttribute('data-value');
    }
    console.log(current);
    $({ value: current }).animate({ value }, {
        duration: 500,
        easing: 'swing',
        step: function () {
            $(selector).val(Math.ceil(this.value)).trigger('change');
        }
    })
    const color = valueToColor(value);
    $(selector).trigger('configure', { 'fgColor': color });
    document.querySelector(selector).style.color = color;
    document.querySelector(selector).setAttribute('data-value', value);
}

function valueToColor(value) {
    if (value <= 50) {
        return 'green';
    } else if (value > 50 && value <= 80) {
        return '#dde016';
    } else if (value > 80 && value <= 90) {
        return 'orange';
    } else if (value > 90) {
        return 'red';
    }
    return 'red';
}

function animateCPUChart(params) {
    const time = getRandomInt(1, 23) + ':' + (getRandomInt(1, 2) == 1 ? '30' : '00');
    if (cpuChart.data.labels.length == 24) {
        cpuChart.data.labels = [];
        cpuChart.data.datasets[0].data = [];
    }
    cpuChart.data.labels.push(time); //PUSH NEW TIME
    cpuChart.data.datasets[0].data.push(getRandomInt(3, 99)); //PUSH NEW VALUE
    cpuChart.update();
}

function animateMemoryChart(params) {
    const time = getRandomInt(1, 23) + ':' + (getRandomInt(1, 2) == 1 ? '30' : '00');
    if (memoryChart.data.labels.length == 24) {
        memoryChart.data.labels = [];
        memoryChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
    }
    memoryChart.data.labels.push(time); //PUSH NEW TIME
    const used = memoryChart.data.datasets[0].data;
    const max = memoryChart.data.datasets[1].data;

    const mem = getRandomInt(100, 1024)
    // console.log(mem);
    used.push(mem); //PUSH NEW USED MEMORY
    max.push(1024); //PUSH NEW MAX MEMORY
    memoryChart.update();
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