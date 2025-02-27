const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];

iconLogout.addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', getpfp);

// logout
async function logout() {
    const res = await fetch('http://127.0.0.1:2000/api/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message);
        window.location.href = '/frontend/login.html';
    } else {
        alert('Hiba a kijelentkezéskor');
    }
}

// a profile kép megjelenítése
async function getpfp() {
    const res = await fetch('http://127.0.0.1:2000/api/getpfp', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        btnPic.style.backgroundImage = `url('http://127.0.0.1:2000/uploads/${data[0].pfp}')`;
    }
}