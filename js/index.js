btnLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Megakadályozza az űrlap elküldését
    login();
});
const btnReg = document.getElementById('btnRegi');

btnReg.addEventListener('click', () => {
    window.location.href = '../registration.html';
});

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;


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

   // Várunk, amíg a teljes oldal betöltődik
document.addEventListener('DOMContentLoaded', function() {
    // Jelszó láthatóság váltó gomb és mező kiválasztása
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('psw');
    
    // Ha megtaláltuk az elemeket
    if (passwordToggle && passwordInput) {
        // Kattintás esemény figyelése
        passwordToggle.addEventListener('click', function() {
            // Az ikon kiválasztása a gombon belül
            const icon = this.querySelector('i');
            
            // Jelszó láthatóság váltása
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

}