import { View } from '../../../jwork/View.js';
const view = new View('login', {
    loginError: false,
    registerError: false,
    loginErrorMessage: '',
    registerErrorMessage: '',
}, (view) => {

});

view.defineFunction('handleRegisterForm', async (event, data) => {
    const response = await window.post('/auth/register', data);
    if (!response.success) {
        view.variables.registerErrorMessage = response.message
        view.variables.registerError = true;
    } else {

    }

});

view.defineFunction('handleLoginForm', async (event, data) => {
    const response = await window.post('/auth/login', data);
    if (!response.success) {
        view.variables.loginErrorMessage = response.message
        view.variables.loginError = true;
    } else {
        // response.token
        view.app.getCookieManager().setCookie('auth-token', response.token, 15);
        view.app.route('/list');
    }
});

view.setHTMLFile('js/views/login/view.html');

export { view };