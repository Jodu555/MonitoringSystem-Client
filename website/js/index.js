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