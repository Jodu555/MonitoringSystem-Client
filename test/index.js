const token = 'SECRET-DEV-KEY';
const PERSISTENT_DATA = 'PERSISTENT_DATA';
const CHANGE_DATA = 'CHANGE_DATA';

const socket = io("http://localhost:3000");
let auth = false;

socket.on('auth', (data) => {
    auth = data;
});

document.querySelector('#subToServer').addEventListener('click', () => {
    if (auth)
        socket.emit('subscribe', { serverUUID: document.querySelector('#serverUUID').value });
});

socket.on('message', (data) => {
    if (data.type == 'error') {
        console.error('Error: ' + data.msg);
    } else {
        console.log('Success: ' + data.msg);
    }
})

socket.on('change', ({ server, data }) => {
    console.log('Change', server, data);
    data.forEach(dat => {
        if (dat.type == PERSISTENT_DATA) {
            document.querySelector('#uptime').innerText = secondsToTimeString(dat.uptime);
            document.querySelector('#address').innerText = JSON.parse(dat.ips)[0].address;
        }
        if (dat.type == CHANGE_DATA) {
            const { cpu_usage, used_memory, max_memory } = dat;
            document.querySelector('#cpu').innerText = cpu_usage + '% CPU'
            document.querySelector('#mem').innerText = used_memory + 'GB / ' + max_memory + 'GB';
        }
    });
})

socket.on('servers', (servers) => {
    console.log(servers);
});

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

socket.on('connect', () => {
    socket.emit('type', { type: 'client' });
    socket.emit('auth', { token })
});


