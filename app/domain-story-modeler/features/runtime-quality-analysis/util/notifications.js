

export const createToastNotification = (message, type) => {
    let notification__container = document.getElementById('notification__container');
    notification__container.style.minHeight = '200px';

    if (type === 'success') {
        let toastBase__container = document.createElement('div');
        toastBase__container.classList.add('toast');
        toastBase__container.id = `toastBase__container_success`;
        toastBase__container.setAttribute('role', 'alert');
        toastBase__container.setAttribute('aria-live', 'assertive');
        toastBase__container.setAttribute('aria-atomic', 'true');
        toastBase__container.setAttribute('data-delay', '1000ms');

        let toastHeader__container = document.createElement('div');
        toastHeader__container.classList.add('toast-header');

        let toastHeader__text = document.createElement('strong');
        toastHeader__text.classList.add('mr-auto');
        toastHeader__text.innerText = type;

        let toastHeaderButton__close = document.createElement('button');
        toastHeaderButton__close.type = 'button';
        toastHeaderButton__close.classList.add('ml-2');
        toastHeaderButton__close.classList.add('mb-1');
        toastHeaderButton__close.classList.add('btn-close');
        toastHeaderButton__close.setAttribute('data-dismiss', 'toast');
        toastHeaderButton__close.setAttribute('aria-label', 'close');

        let toastHeaderButtonClose__icon = document.createElement('span');
        toastHeaderButtonClose__icon.setAttribute('aria-hidden', 'false');
        toastHeaderButtonClose__icon.innerHTML = '&times';

        let toastBody__container = document.createElement('div');
        toastBody__container.classList.add('toast-body');
        toastBody__container.innerText = message;

        toastHeader__container.appendChild(toastHeader__text);
        toastHeader__container.appendChild(toastHeaderButton__close);

        toastBase__container.appendChild(toastHeader__container);
        toastBase__container.appendChild(toastBody__container); ``

        notification__container.appendChild(toastBase__container);
        $(`#toastBase__container_success`).toast("show");

        $('#toastBase__container_success').on('hidden.bs.toast', function () {
            toastBase__container_success.remove();
        })
    } else if (type === 'failure') {
        let toastBase__container = document.createElement('div');
        toastBase__container.classList.add('toast');
        toastBase__container.id = `toastBase__container_failure`;
        toastBase__container.setAttribute('role', 'alert');
        toastBase__container.setAttribute('aria-live', 'assertive');
        toastBase__container.setAttribute('aria-atomic', 'true');
        toastBase__container.setAttribute('data-delay', '1000ms');

        let toastHeader__container = document.createElement('div');
        toastHeader__container.classList.add('toast-header');

        let toastHeader__text = document.createElement('strong');
        toastHeader__text.classList.add('mr-auto');
        toastHeader__text.innerText = type;

        let toastHeaderButton__close = document.createElement('button');
        toastHeaderButton__close.type = 'button';
        toastHeaderButton__close.classList.add('ml-2');
        toastHeaderButton__close.classList.add('mb-1');
        toastHeaderButton__close.classList.add('btn-close');
        toastHeaderButton__close.setAttribute('data-dismiss', 'toast');
        toastHeaderButton__close.setAttribute('aria-label', 'close');

        let toastHeaderButtonClose__icon = document.createElement('span');
        toastHeaderButtonClose__icon.setAttribute('aria-hidden', 'false');
        toastHeaderButtonClose__icon.innerHTML = '&times';

        let toastBody__container = document.createElement('div');
        toastBody__container.classList.add('toast-body');
        toastBody__container.innerText = message;

        toastHeader__container.appendChild(toastHeader__text);
        toastHeader__container.appendChild(toastHeaderButton__close);

        toastBase__container.appendChild(toastHeader__container);
        toastBase__container.appendChild(toastBody__container); ``

        notification__container.appendChild(toastBase__container);
        $(`#toastBase__container_failure`).toast("show");

        $('#toastBase__container_failure').on('hidden.bs.toast', function () {
            toastBase__container.remove();
        })
    }
}

export const createToastNotificationTemplate = (message, templateType) => {

    let notification__container = document.getElementById('notification__container');
    notification__container.style.minHeight = '200px';

    let toastBase__container = document.createElement('div');
    toastBase__container.classList.add('toast');
    toastBase__container.id = `toastBase__container`;
    toastBase__container.setAttribute('role', 'alert');
    toastBase__container.setAttribute('aria-live', 'assertive');
    toastBase__container.setAttribute('aria-atomic', 'true');
    toastBase__container.setAttribute('data-delay', '1000ms');

    let toastHeader__container = document.createElement('div');
    toastHeader__container.classList.add('toast-header');

    let toastHeader__text = document.createElement('strong');
    toastHeader__text.classList.add('mr-auto');
    toastHeader__text.innerText = templateType;

    let toastHeaderButton__close = document.createElement('button');
    toastHeaderButton__close.type = 'button';
    toastHeaderButton__close.classList.add('ml-2');
    toastHeaderButton__close.classList.add('mb-1');
    toastHeaderButton__close.classList.add('btn-close');
    toastHeaderButton__close.setAttribute('data-dismiss', 'toast');
    toastHeaderButton__close.setAttribute('aria-label', 'close');

    let toastHeaderButtonClose__icon = document.createElement('span');
    toastHeaderButtonClose__icon.setAttribute('aria-hidden', 'false');
    toastHeaderButtonClose__icon.innerHTML = '&times';

    let toastBody__container = document.createElement('div');
    toastBody__container.classList.add('toast-body');
    toastBody__container.innerText = message;

    toastHeader__container.appendChild(toastHeader__text);
    toastHeader__container.appendChild(toastHeaderButton__close);

    toastBase__container.appendChild(toastHeader__container);
    toastBase__container.appendChild(toastBody__container); ``

    notification__container.appendChild(toastBase__container);
    $(`#toastBase__container`).toast("show");

    $('#toastBase__container').on('hidden.bs.toast', function () {
        toastBase__container.remove();
    })

}