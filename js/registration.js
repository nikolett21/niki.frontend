const btnReg = document.getElementById('registration');

btnReg.addEventListener('click', register);

async function register(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;

    console.log(email, name, psw, psw2); //
    if (psw !== psw2) {
        return alert('A két jelszó nem egyezik!');
    }

    const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, name, psw })
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '../index.html';
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
        }
        alert(errorMessage);
    } else if (data.error) {
        alert(data.error);
    } else {
        alert('Ismeretlen hiba');
    }
}