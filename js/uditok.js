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


    const kategoria_id = match[1]; // Például: "uditok"
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
    const uditok = document.getElementById('uditok');
    uditok.innerHTML = '';

    foodsByCategory.forEach(food => {
        const uditokItemDiv = document.createElement('div');
        uditokItemDiv.classList.add('uditok-item');

        const uditokItemDivImg = document.createElement('img');
        uditokItemDivImg.src = `/foods/${food.img}`;
        uditokItemDivImg.alt = `${food.name}`;

        const uditokItemDivP = document.createElement('p');
        uditokItemDivP.textContent = `${food.name}`;

        const uditokItemDivPSpan = document.createElement('span');
        uditokItemDivPSpan.textContent = ` ${food.price} Ft`;

        const uditokItemDivLeiras = document.createElement('div');
        uditokItemDivLeiras.classList.add('leiras');

        const uditokItemDivLeirasP = document.createElement('p');
        uditokItemDivLeirasP.textContent = `${food.leiras}`;

        uditokItemDivLeiras.append(uditokItemDivLeirasP);
        uditokItemDivP.append(uditokItemDivPSpan);
        uditokItemDiv.append(uditokItemDivImg, uditokItemDivP, uditokItemDivLeiras);
        uditok.append(uditokItemDiv);
    });
}