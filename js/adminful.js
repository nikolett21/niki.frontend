const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName ('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnPic = document.getElementsByClassName('edit-pic')[0];
const fileUpload = document.getElementById('fileUpload');
let meme = null;
const btnUpload = document.getElementsByClassName ('edit-button')[0];


iconHome.addEventListener('click', () => {
    window.location.href = '../home.html';
});
iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);

btnPic.addEventListener('click', () => {
});

fileUpload.addEventListener('change', selectPic);
btnUpload.addEventListener('click', newMeme);
async function logout(){
    const res = await fetch ('http://127.0.0.1:3000/api/upload', {
        method : 'POST',
        credentials: 'include'
    });
    const data = await res.json();
    if (res.ok){
        alert(data.message);
        window.location.href = '../index.html';
    } else {
        alert ('hiba a kijelentkezéskor');
    }
}
ss