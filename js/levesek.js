window.addEventListener('DOMContentLoaded', getFoodsByCategory);

async function getFoodsByCategory() {
    // Az aktuális URL-ből kinyerjük a kategória nevet
    const url = window.location.href;
    const match = url.match(/\/([^/]+)\.html/);

    if (!match) {
        console.error("Nem sikerült kinyerni a kategória ID-t az URL-ből.");
        return;
    }

    const kategoria_id = match[1]; // Például: "levesek"
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
    const levesek = document.getElementById('leves');
    levesek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const levesekItemDiv = document.createElement('div');
        levesekItemDiv.classList.add('leves-item');

        const levesekItemDivImg = document.createElement('img');
        levesekItemDivImg.src = `/foods/${food.img}`;
        levesekItemDivImg.alt = `${food.name}`;

        const levesekItemDivP = document.createElement('p');
        levesekItemDivP.textContent = `${food.name}`;

        const levesekItemDivPSpan = document.createElement('span');
        levesekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const levesekItemDivLeiras = document.createElement('div');
        levesekItemDivLeiras.classList.add('leiras');

        const levesekItemDivLeirasP = document.createElement('p');
        levesekItemDivLeirasP.textContent = `${food.leiras}`;

        levesekItemDivLeiras.append(levesekItemDivLeirasP);
        levesekItemDivP.append(levesekItemDivPSpan);
        levesekItemDiv.append(levesekItemDivImg, levesekItemDivP, levesekItemDivLeiras);
        levesek.append(levesekItemDiv);
    });
}