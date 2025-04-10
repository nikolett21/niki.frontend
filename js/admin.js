const btnLogin = document.getElementsByClassName('login')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];

btnLogin.addEventListener('click', login);
window.addEventListener('DOMContentLoaded', getpfp);

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;
    console.log(email, psw, );
    
    const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, psw, szerepkor: 1}),
        credentials: 'include'
    });
}
    async function getpfp() {
        const res = await fetch('/api/getpfp', {
            method: 'GET',
            credentials: 'include'
        });
    
        const data = await res.json();
        console.log(data);
        
        if (res.ok) {
            console.log(`${data[0].pfp}`)
            iconUser.innerHTML = `<img src='/foods/${data[0].pfp}' alt='${data[0].pfp}'>`; 
        }
    }

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message);
        window.location.href = "../home_admin.html";
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
