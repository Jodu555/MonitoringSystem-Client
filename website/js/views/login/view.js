import { View } from '../../../jwork/View.js';
const view = new View('login', {
    username: '',
}, (view) => {

});

view.defineFunction('handleForm', (event, data) => {
    console.log(data);
});

view.setHTMLFile('js/views/login/view.html');

export { view };