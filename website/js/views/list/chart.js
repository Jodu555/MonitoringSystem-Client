let cpuChart;
let memoryChart;

setupChart();

function setupChart() {
    if (!localStorage.getItem('chartTimePeriod')) {
        localStorage.setItem('chartTimePeriod', 'day');
    }

    document.getElementById(localStorage.getItem('chartTimePeriod')).classList.add('active');

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                userCallback: (label, index, labels) => {
                    console.log(label);
                    if (Math.floor(label) == label) {
                        return label;
                    }
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

    const cpuctx = document.getElementById('cpuChart').getContext('2d');
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
        options
    });

    const memoryctx = document.getElementById('memoryChart').getContext('2d');
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
        options
    });
}

function changeChartView(type) {
    const current = localStorage.getItem('chartTimePeriod');
    document.getElementById(current).classList.remove('active');
    document.getElementById(type).classList.add('active');

    clearChart(cpuChart);
    clearChart(memoryChart);
    localStorage.setItem('chartTimePeriod', type);
}

function animateCPUChart(params) {
    const time = getRandomInt(1, 23) + ':' + (getRandomInt(1, 2) == 1 ? '30' : '00');
    if (cpuChart.data.labels.length == 24) {
        clearChart(cpuChart);
    }
    cpuChart.data.labels.push(time); //PUSH NEW TIME
    cpuChart.data.datasets[0].data.push(getRandomInt(3, 99)); //PUSH NEW VALUE
    cpuChart.update();
}

function clearChart(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach(dataset => {
        dataset.data = [];
    });
    chart.update();
}

function animateMemoryChart(params) {
    const time = getRandomInt(1, 23) + ':' + (getRandomInt(1, 2) == 1 ? '30' : '00');
    if (memoryChart.data.labels.length == 24) {
        clearChart(memoryChart);
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