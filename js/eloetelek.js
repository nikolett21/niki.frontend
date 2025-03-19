window.addEventListener('DOMContentLoaded', getFoodsByCategory);

async function getFoodsByCategory() {
    // Az aktuális URL-ből kinyerjük a kategória nevet
    const url = window.location.href;
    const match = url.match(/\/([^/]+)\.html/);

    if (!match) {
        console.error("Nem sikerült kinyerni a kategória ID-t az URL-ből.");
        return;
    }

    const kategoria_id = match[1]; // Például: "Előételek"
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
    const Előételek = document.getElementById('Előételek');
    Előételek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const ElőételekItemDiv = document.createElement('div');
        ElőételekItemDiv.classList.add('Előételek-item');

        const ElőételekItemDivImg = document.createElement('img');
        ElőételekItemDivImg.src = `/foods/${food.img}`;
        ElőételekItemDivImg.alt = `${food.name}`;

        const ElőételekItemDivP = document.createElement('p');
        ElőételekItemDivP.textContent = `${food.name}`;

        const ElőételekItemDivPSpan = document.createElement('span');
        ElőételekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const ElőételekItemDivLeiras = document.createElement('div');
        ElőételekItemDivLeiras.classList.add('leiras');

        const ElőételekItemDivLeirasP = document.createElement('p');
        ElőételekItemDivLeirasP.textContent = `${food.leiras}`;

        ElőételekItemDivLeiras.append(ElőételekItemDivLeirasP);
        ElőételekItemDivP.append(ElőételekItemDivPSpan);
        ElőételekItemDiv.append(ElőételekItemDivImg, ElőételekItemDivP, ElőételekItemDivLeiras);
        Előételek.append(ElőételekItemDiv);
    });
}