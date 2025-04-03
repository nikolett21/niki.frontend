// Az ikonUser elem referenciáját szerezzük meg
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];

iconLogout.addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', getpfp);
window.addEventListener('DOMContentLoaded', getCategories);

// Kijelentkezés funkció
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

// Ételek lekérdezése
async function getPics() {
    const res = await fetch('/api/getFoods', {
        methot: 'GET', // HIBA: methot -> helyesen: method
        credentials: 'include'
    });

    const foods = await res.json();
    console.log(foods);
}

// Profilkép és felhasználónév megjelenítése
async function getpfp() {
    try {
        const res = await fetch('/api/getpfp', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data);
        
        if (res.ok && data.length > 0) {
            const { pfp, name } = data[0]; // Kivesszük a szükséges adatokat

            // Profilkép beállítása
            iconUser.innerHTML = `
                <img src='/foods/${pfp}' alt='${pfp}' style='display: block; margin: 0 auto; border-radius: 50%; width: 50px; height: 50px;'>
                <p style='text-align: center; font-size: 14px; color: white; margin-top: 5px;'>${name}</p>
            `;
        } else {
            console.error("Nem sikerült betölteni a profilt.");
        }
    } catch (error) {
        console.error("Hiba történt a profilkép betöltésekor:", error);
    }
}

// Kategóriák lekérdezése
async function getCategories() {
    const res = await fetch('/api/getCategories', {
        method: 'GET',
        credentials: 'include'
    });

    const foodCategories = await res.json();
    renderCategories(foodCategories);
}

// Kategóriák megjelenítése
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
