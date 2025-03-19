window.addEventListener('DOMContentLoaded', getFoodsByCategory);

async function getFoodsByCategory() {
    // Az aktuális URL-ből kinyerjük a kategória nevet
    const url = window.location.href;
    const match = url.match(/\/([^/]+)\.html/);

    if (!match) {
        console.error("Nem sikerült kinyerni a kategória ID-t az URL-ből.");
        return;
    }

    const kategoria_id = match[1]; // Például: "savanyusagok"
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
    const savanyusagok = document.getElementById('savanyusagok');
    savanyusagok.innerHTML = '';

    foodsByCategory.forEach(food => {
        const savanyusagokItemDiv = document.createElement('div');
        savanyusagokItemDiv.classList.add('savanyusagok-item');

        const savanyusagokItemDivImg = document.createElement('img');
        savanyusagokItemDivImg.src = `/foods/${food.img}`;
        savanyusagokItemDivImg.alt = `${food.name}`;

        const savanyusagokItemDivP = document.createElement('p');
        savanyusagokItemDivP.textContent = `${food.name}`;

        const savanyusagokItemDivPSpan = document.createElement('span');
        savanyusagokItemDivPSpan.textContent = ` ${food.price} Ft`;

        const savanyusagokItemDivLeiras = document.createElement('div');
        savanyusagokItemDivLeiras.classList.add('leiras');

        const savanyusagokItemDivLeirasP = document.createElement('p');
        savanyusagokItemDivLeirasP.textContent = `${food.leiras}`;

        savanyusagokItemDivLeiras.append(savanyusagokItemDivLeirasP);
        savanyusagokItemDivP.append(savanyusagokItemDivPSpan);
        savanyusagokItemDiv.append(savanyusagokItemDivImg, savanyusagokItemDivP, savanyusagokItemDivLeiras);
        savanyusagok.append(savanyusagokItemDiv);
    });
}