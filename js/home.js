const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];


iconLogout.addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', getpfp);
window.addEventListener('DOMContentLoaded', getCategories);

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

// ételek lekérdezése
async function getPics() {
    const res = await fetch('/api/getFoods', {
        methot: 'GET',
        credentials: 'include'
    });
    const foods = await res.json();
    console.log(foods);
    //renderfoods(foods);
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
        console.log(`${data[0].pfp}`)
        iconUser.innerHTML = `<img src='/foods/${data[0].pfp}' alt='${data[0].pfp}'>)`; 
    }
}

async function getCategories() {
    const res = await fetch('/api/getCategories', {
        method: 'GET',
        credentials: 'include'
    });

    const foodCategories = await res.json();
    renderCategories(foodCategories);
}

function renderCategories(foodCategories) {
    const categories = document.getElementById('categories');
    categories.innerHTML = '';
    
    foodCategories.forEach(category => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');

        const menuItemImg = document.createElement('img');
        menuItemImg.src = `/foods/${category.category_img}`;
        menuItemImg.alt = `${category.nev}`;

        const menuItemP = document.createElement('p');
        menuItemP.textContent = `${category.nev}`;

        const menuItemA = document.createElement('a');
        menuItemA.href = `${category.nev}.html`;

        const menuItemAButton = document.createElement('button');
        menuItemAButton.classList.add('button');
        menuItemAButton.style = 'vertical-align: middle';

        const menuItemAButtonSpan = document.createElement('span');
        menuItemAButtonSpan.textContent = 'Részletek';

        menuItemAButton.append(menuItemAButtonSpan);
        menuItemA.append(menuItemAButton);
        menuItemDiv.append(menuItemImg, menuItemP, menuItemA);
        categories.append(menuItemDiv);
    });
}