const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];


iconLogout.addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', getpfp);

// logout
async function logout() {
    const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message);
        window.location.href = '../index.html';
    } else {
        alert('Hiba a kijelentkezéskor');
    }
}

// a profile kép megjelenítése
async function getpfp() {
    const res = await fetch('/api/getpfp', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        iconUser.style.backgroundImage = `url(/fotok/${data[0].pfp}')`; 
    }
}