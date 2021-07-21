document.querySelectorAll('[data-collapse]').forEach(element => {
    const span = element.getElementsByTagName('span')[0];
    const target = document.getElementById(element.getAttribute("data-collapse"));
    // console.log(element);
    // console.log(target);
    Array.prototype.slice.call(target.getElementsByTagName('li')).forEach(element => {
        element.classList.add('collapsible-entity')
    });

    element.classList.add('collapsible');
    if (typeof element.getAttribute('expand') !== 'string') {
        target.style.display = 'none';
    } else {
        element.classList.add('expanded');
    }

    // target

    span.addEventListener('click', () => {
        element.classList.toggle('expanded');
        if (target.style.display === 'none') {
            target.style.display = '';
        } else {
            target.style.display = 'none';
        }
    });

});

let sec = 1;

setInterval(() => {
    //CPU / MEM
    $('#cpu')
        .val(getRandomInt(10, 100))
        .trigger('change');

    $('#memory')
        .val(getRandomInt(10, 100))
        .trigger('change');

    //Uptime
    if (sec > 968000) {
        sec = 1;
    }
    document.querySelector('#uptime').innerText = secondsToTimeString(sec);
    sec = sec + getRandomInt(50, 150);
}, 1000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function secondsToTimeString(seconds) {
    let days = Math.floor(seconds / 60 / 60 / 24);
    seconds = seconds - days * 60 * 60 * 24;
    let hours = Math.floor(seconds / 60 / 60);
    seconds = seconds - hours * 60 * 60;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    const output = '' + (days > 0 ? (days > 9 ? days : '0' + days) + ':' : '')
        + (hours > 9 ? hours : '0' + hours)
        + ':' + (minutes > 9 ? minutes : '0' + minutes)
        + ':' + (seconds > 9 ? seconds : '0' + seconds);
    return output;
}