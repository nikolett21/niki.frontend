const btnLogin = document.getElementsByClassName('login')[0];
const btnReg = document.getElementsByClassName('reg')[0];
const btnAdmin = document.getElementsByClassName('admin')[0];

btnReg.addEventListener('click', () => {
    event.preventDefault(); 
    window.location.href = '/frontend/registration.html';
});

btnLogin.addEventListener('click', login);

btnAdmin.addEventListener('click', () => {
    event.preventDefault(); 
    window.location.href = '/frontend/Admin.html';
});

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    console.log(email, psw);
    
    const res = await fetch('http://127.0.0.1:2000/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, psw }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = '/frontend/home.html';
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