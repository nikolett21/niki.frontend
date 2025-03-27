const btnLogin = document.getElementById('btnLogin')[0];
const btnReg = document.getElementsById('btnReg')[0];

btnReg.addEventListener('click', () => {
    window.location.href = '../registration.html';
});

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    console.log(email, psw);
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
}