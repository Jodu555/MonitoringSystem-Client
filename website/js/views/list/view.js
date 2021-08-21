import { View } from '../../../jwork/View.js';
const view = new View('list', {
    servers: [],
    currentSelectedServer: null,

}, (view) => {

});


view.setHTMLFile('js/views/list/view.html');

export { view };