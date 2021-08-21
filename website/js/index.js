window.API_URL = 'http://localhost:3100';
window.post = async (route, body) => {
    const response = await fetch(window.API_URL + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const json = await response.json();
    return json;
}
import { App } from '../jwork/App.js';

import { view as login } from './views/login/view.js';

const app = new App(document.querySelector('#app'), [
    login
]);

app.setRouter({
    default: 'login',
    'login': {
        route: '/login'
    }
});

app.init();