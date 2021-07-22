document.querySelectorAll('[data-collapse]').forEach(element => {
    const span = element.getElementsByTagName('span')[0];
    const target = document.getElementById(element.getAttribute("data-collapse"));
    Array.prototype.slice.call(target.getElementsByTagName('li')).forEach(element => {
        element.classList.add('collapsible-entity')
    });
    element.classList.add('collapsible');
    if (typeof element.getAttribute('expand') !== 'string') {
        target.style.display = 'none';
    } else {
        element.classList.add('expanded');
    }
    span.addEventListener('click', () => {
        element.classList.toggle('expanded');
        if (target.style.display === 'none') {
            target.style.display = '';
        } else {
            target.style.display = 'none';
        }
    });

});