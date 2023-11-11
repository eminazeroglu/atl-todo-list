const methods = document.querySelectorAll('[data-method]');

for(let event of methods) {
    event.addEventListener('click', function () {
        const name = event.getAttribute('data-method');
        const params = event.getAttribute('data-params');
        window[name](JSON.parse(params));
    })
}