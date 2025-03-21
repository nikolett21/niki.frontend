window.addEventListener('DOMContentLoaded', getFoodsByCategory);

async function getFoodsByCategory() {
    // Az aktuális URL-ből kinyerjük a kategória nevet
    const url = window.location.href;
    const match = url.match(/\/([^/]+)\.html/) || [];

    if (match) {
        console.log(match[1]);
    } else {
        return console.log("Nincs találat");
    }


    const kategoria_id = match[1]; // Például: "eloetelek"
    console.log(kategoria_id);
    
    try {
        const res = await fetch(`/api/getFoodsByCategory/${kategoria_id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(`Hiba a fetch során: ${res.status}`);
        }

        const foodsByCategory = await res.json();
        console.log(foodsByCategory);

        renderFoodsByCategory(foodsByCategory);
    } catch (error) {
        console.error("Hiba történt:", error);
    }
}

function renderFoodsByCategory(foodsByCategory) {
    const eloetelek = document.getElementById('eloetelek');
    eloetelek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const eloetelekItemDiv = document.createElement('div');
        eloetelekItemDiv.classList.add('eloetelek-item');

        const eloetelekItemDivImg = document.createElement('img');
        eloetelekItemDivImg.src = `/foods/${food.img}`;
        eloetelekItemDivImg.alt = `${food.name}`;

        const eloetelekItemDivP = document.createElement('p');
        eloetelekItemDivP.textContent = `${food.name}`;

        const eloetelekItemDivPSpan = document.createElement('span');
        eloetelekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const eloetelekItemDivLeiras = document.createElement('div');
        eloetelekItemDivLeiras.classList.add('leiras');

        const eloetelekItemDivLeirasP = document.createElement('p');
        eloetelekItemDivLeirasP.textContent = `${food.leiras}`;

        eloetelekItemDivLeiras.append(eloetelekItemDivLeirasP);
        eloetelekItemDivP.append(eloetelekItemDivPSpan);
        eloetelekItemDiv.append(eloetelekItemDivImg, eloetelekItemDivP, eloetelekItemDivLeiras);
        eloetelek.append(eloetelekItemDiv);
    });
}
