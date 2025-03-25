const btnReg = document.getElementById('registration');

btnReg.addEventListener('submit', register);

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

document.querySelectorAll('.desszertek-item').forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('active'); 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the password input field (previous sibling of the button's parent)
            const passwordInput = this.parentNode.querySelector('input[type="password"], input[type="text"]');
            const eyeIcon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Form submission handling
    const registrationForm = document.getElementById('registration');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('psw').value;
            const confirmPassword = document.getElementById('psw2').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('A jelszavak nem egyeznek!');
                return;
            }
            
            // Here you would typically send the data to your server
            console.log('Registration data:', {
                username,
                email,
                password
            });
            
            // For demo purposes, we'll just show a success message
            alert('Sikeres regisztráció!');
            // window.location.href = 'login.html'; // Redirect to login page
        });
    }
});