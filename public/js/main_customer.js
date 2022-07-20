const customerValidation = () => {
    console.log('validation');

    const errors = document.getElementById('errors');
    errors.innerHTML = '';

    const name = document.getElementById('name');
    name.value = name.value.trim()

    const address = document.getElementById('address');
    address.value = address.value.trim()

    const company = document.getElementById('company');
    company.value = company.value.trim()

    const nipnumber = document.getElementById('nipnumber');
    nipnumber.value = nipnumber.value.trim()

    if (name.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  Podaj nazwę użytkownika!  **';
        errors.appendChild(liElement);

        return false;
    }

    if (address.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  Podaj adres!  **';
        errors.appendChild(liElement);

        return false;
    }

    if (company.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  Podaj nazwę firmy/osoby!  **';
        errors.appendChild(liElement);

        return false;
    }

    if (nipnumber.value === '') {
        const liElement = document.createElement('li');
        liElement.innerText = '**  Podaj numer NIP!  **';
        errors.appendChild(liElement);

        return false;
    }

    return true;
};

