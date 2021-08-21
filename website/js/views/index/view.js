import { View } from '../../../jwork/View.js';
const view = new View('list', {
    servers: [],
    currentSelectedServer: null,

}, (view) => {

});

view.defineFunction('handleRegisterForm', (event, data) => {
    console.log(data);
    console.log(window.app);
});

view.defineFunction('handleLoginForm', (event, data) => {
    console.log(data);
});

view.setHTMLFile('js/views/login/view.html');

export { view };