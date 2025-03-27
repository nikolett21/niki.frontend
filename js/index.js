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
    // DOM Elements
    const authForm = document.getElementById('authForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('psw');
    const rememberMe = document.getElementById('rememberMe');
    const btnLogin = document.getElementById('btnLogin');
    const btnReg = document.getElementById('btnReg');
    const btnGoogle = document.getElementById('btnGoogle');
    const passwordToggle = document.querySelector('.password-toggle');

    // Password toggle functionality
    if (passwordToggle) {
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

    // Form submission
    if (authForm) {
        authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleLogin();
        });
    }

    // Registration link
    if (btnReg) {
        btnReg.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = './registration.html';
        });
    }

    // Google login button
    if (btnGoogle) {
        btnGoogle.addEventListener('click', function() {
            // Implement Google login functionality here
            console.log('Google login clicked');
        });
    }

    // Login handler
    async function handleLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberMe.checked;

        // Basic validation
        if (!email || !password) {
            alert('Kérjük töltse ki mindkét mezőt!');
            return;
        }

        try {
            // Show loading state
            btnLogin.classList.add('loading');
            btnLogin.disabled = true;

            // API call
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, remember })
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                if (data.szerepkor === 0) {
                    window.location.href = '../home.html';
                } else if (data.szerepkor === 1) {
                    window.location.href = '../admin.html';
                }
            } else {
                // Handle errors
                if (data.errors) {
                    const errorMessages = data.errors.map(err => err.error).join('\n');
                    alert(errorMessages);
                } else if (data.error) {
                    alert(data.error);
                } else {
                    alert('Ismeretlen hiba történt');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Hálózati hiba történt. Kérjük próbálja újra később.');
        } finally {
            // Remove loading state
            btnLogin.classList.remove('loading');
            btnLogin.disabled = false;
        }
    }

    // Check for saved credentials
    function checkRememberMe() {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberMe.checked = true;
        }
    }

    // Initialize
    checkRememberMe();
});