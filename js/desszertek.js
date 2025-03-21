window.addEventListener('DOMContentLoaded', getFoodsByCategory);

async function getFoodsByCategory() {
    // Az aktuális URL-ből kinyerjük a kategória nevet
    const url = window.location.href;
    const match = url.match(/\/([^/]+)(?:\.html)?$/);

    if (match) {
        console.log(match[1]);
    } else {
        return console.log("Nincs találat");
    }


    const kategoria_id = match[1];
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
    const desszertek = document.getElementById('desszertek');
    desszertek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const desszertekItemDiv = document.createElement('div');
        desszertekItemDiv.classList.add('desszertek-item');

        const desszertekItemDivImg = document.createElement('img');
        desszertekItemDivImg.src = `/foods/${food.img}`;
        desszertekItemDivImg.alt = `${food.name}`;

        const desszertekItemDivP = document.createElement('p');
        desszertekItemDivP.textContent = `${food.name}`;

        const desszertekItemDivPSpan = document.createElement('span');
        desszertekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const desszertekItemDivLeiras = document.createElement('div');
        desszertekItemDivLeiras.classList.add('leiras');

        const desszertekItemDivLeirasP = document.createElement('p');
        desszertekItemDivLeirasP.textContent = `${food.leiras}`;

        desszertekItemDivLeiras.append(desszertekItemDivLeirasP);
        desszertekItemDivP.append(desszertekItemDivPSpan);
        desszertekItemDiv.append(desszertekItemDivImg, desszertekItemDivP, desszertekItemDivLeiras);
        desszertek.append(desszertekItemDiv);
    });
}
