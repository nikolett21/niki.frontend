// Jelszó láthatóság váltó funkció
function setupPasswordToggle() {
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('psw');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
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
}

// Bejelentkezési függvény
async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    try {
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
            let errorMessage = data.errors.map(error => error.error).join('\n');
            alert(errorMessage);
        } else if (data.error) {
            alert(data.error);
        } else {
            alert('Ismeretlen hiba');
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert('Hiba történt a kérés során');
    }
}

// Eseménykezelők beállítása az oldal betöltődése után
document.addEventListener('DOMContentLoaded', function() {
    // Jelszó váltó beállítása
    setupPasswordToggle();
    
    // Bejelentkezés gomb
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', (event) => {
            event.preventDefault();
            login();
        });
    }
    
    // Regisztráció gomb
    const btnReg = document.getElementById('btnRegi');
    if (btnReg) {
        btnReg.addEventListener('click', () => {
            window.location.href = '../registration.html';
        });
    }
});