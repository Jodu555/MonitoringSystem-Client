const PERSISTENT_DATA = 'PERSISTENT_DATA';
const CHANGE_DATA = 'CHANGE_DATA';

const socket = io("http://localhost:3000");

socket.on('auth', (data) => {
    console.log('Authentication:', data ? 'Success!' : 'Failed');
    if (data) {
        socket.emit('subscribe', { serverUUID: 'jogfndsoignsofnsofndogfnsopf' });
    }
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
    socket.emit('auth', { token: 'SECRET-DEV-KEY' })
});


