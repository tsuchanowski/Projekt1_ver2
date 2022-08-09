const newUserValidation = () => {
    console.log('validation');

    const errors = document.getElementById('errors');
    errors.innerHTML = '';

    const password = document.getElementById('password');
    password.value = password.value.trim()

    const email = document.getElementById('email');
    email.value = email.value.trim()

    if (email.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  ! Podaj adres email do konta użytkownika !  **';
        errors.appendChild(liElement);

        return false;
    }

    if (password.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  !! Utwórz nowe hasło dostępu !!  **';
        errors.appendChild(liElement);

        return false;
    }

    return true;
};

