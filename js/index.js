/* const btnLogin = document.getElementsByClassName('login')[0];
const btnReg = document.getElementsByClassName('reg')[0];
const btnAdmin = document.getElementsByClassName('admin')[0];

document.getElementById('psw').addEventListener('input', checkPasswordStrength);

document.getElementById('psw').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        login();
    }
});
btnReg.addEventListener('click', () => {
    window.location.href = '../registration.html';
});

btnLogin.addEventListener('click', login);

btnAdmin.addEventListener('click', () => {
    window.location.href = '../Admin.html';
});

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    console.log(email, psw);
    //
    const res = await fetch('/api/index', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, psw })
    });

    const data = await res.json();
    console.log(data);

    if (res.ok && data.szerepkor === 0) {
        alert(data.message);
        window.location.href = '../home.html';
    } else if (res.ok && data.szerepkor === 1) {
        window.location.href = '../adminful.html';
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
} */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Helyes elemek kiválasztása - az HTML-ben nincs 'login', 'reg' vagy 'admin' osztályú elem
    // Az ID-k alapján válasszuk ki a gombokat
    const btnLogin = document.getElementById('btnLogin'); // Bejelentkezés gomb
    const btnReg = document.getElementById('btnReg');     // Regisztráció link
    // const btnAdmin = document.getElementById('btnAdmin'); // Nincs ilyen az HTML-ben

    // 2. Ellenőrizzük, hogy léteznek-e az elemek
    if (!btnLogin) console.error('btnLogin nem található');
    if (!btnReg) console.error('btnReg nem található');
    
    // 3. Eseményfigyelők hozzáadása
    if (btnReg) {
        btnReg.addEventListener('click', (e) => {
            e.preventDefault(); // Megakadályozzuk az alapértelmezett link viselkedést
            window.location.href = './registration.html'; // Relatív útvonal javítva
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', async (e) => {
            e.preventDefault(); // Megakadályozzuk az űrlap alapértelmezett beküldését
            await login();      // Meghívjuk a login függvényt
        });
    }

    // 4. Jelszó láthatóságának váltása
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('psw');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
});

async function login() {
    try {
        const email = document.getElementById('email').value;
        const psw = document.getElementById('psw').value;

        if (!email || !psw) {
            alert('Kérjük töltse ki mindkét mezőt!');
            return;
        }

        const res = await fetch('/api/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, psw })
        });

        const data = await res.json();

        if (res.ok) {
            if (data.szerepkor === 0) {
                window.location.href = '../home.html'; // Útvonal javítva
            } else if (data.szerepkor === 1) {
                window.location.href = '../adminful.html'; // Útvonal javítva
            }
        } else {
            handleErrors(data);
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert('Hálózati hiba történt. Kérjük próbálja újra később.');
    }
}

function handleErrors(data) {
    if (data.errors) {
        const errorMessage = data.errors.map(err => err.error).join('\n');
        alert(errorMessage);
    } else if (data.error) {
        alert(data.error);
    } else {
        alert('Ismeretlen hiba történt');
    }
}