const token = 'SECRET-DEV-KEY';
const PERSISTENT_DATA = 'PERSISTENT_DATA';
const CHANGE_DATA = 'CHANGE_DATA';

const socket = io("http://localhost:3000");
let auth = false;

socket.on('auth', (data) => {
    console.log('Authentication:', data ? 'Success!' : 'Failed');
    auth = data;
});

document.querySelector('#subToServer').addEventListener('click', () => {
    if (auth)
        socket.emit('subscribe', { serverUUID: document.querySelector('#serverUUID').value });
});

socket.on('message', (data) => {
    console.log(data);
})

socket.on('change', ({ server, data }) => {
    console.log('Change', server, data);
    data.forEach(dat => {
        if (dat.type == PERSISTENT_DATA) {

        }
        if (dat.type == CHANGE_DATA) {

        }
    });
})

socket.on('connect', () => {
    socket.emit('type', { type: 'client' });
    socket.emit('auth', { token })
});


