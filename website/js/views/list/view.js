import { View } from '../../../jwork/View.js';
const PERSISTENT_DATA = 'PERSISTENT_DATA';
const CHANGE_DATA = 'CHANGE_DATA';
const view = new View('list', {
    auth: false,
    servers: [],
    currentSelectedServer: null,

}, (view) => {

});

function getServerByName(name) {
    let out;
    view.variables.servers.forEach(server => {
        if (server.name === name)
            out = server;
    });
    return out;
}

view.defineFunction('selectServer', (event, name) => {
    console.log('Server selected: ' + name);
    const serverUUID = getServerByName(name).UUID;
    socket.emit('subscribe', { serverUUID });
});

const socket = io("http://localhost:3000");

socket.on('auth', (data) => {
    view.variables.auth = data;
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
        }
        if (dat.type == CHANGE_DATA) {
            const { cpu_usage, used_memory, max_memory } = dat;
            animateKnob('#cpu', cpu_usage);
            animateKnob('#memory', used_memory);
            // document.querySelector('#cpu').innerText = cpu_usage + '% CPU'
            // document.querySelector('#memory').innerText = used_memory + 'GB / ' + max_memory + 'GB';
        }
    });
})

socket.on('servers', (servers) => {
    console.log(servers);
    view.variables.servers = servers;
});

socket.on('connect', () => {
    socket.emit('type', { type: 'client' });
    socket.emit('auth', { token: view.app.getCookieManager().getCookie('auth-token') })
});

view.setHTMLFile('js/views/list/view.html');

export { view };