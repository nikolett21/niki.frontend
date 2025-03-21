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


    const kategoria_id = match[1]; // Például: "kavek"
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
    const kavek = document.getElementById('kavek');
    kavek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const kavekItemDiv = document.createElement('div');
        kavekItemDiv.classList.add('kavek-item');

        const kavekItemDivImg = document.createElement('img');
        kavekItemDivImg.src = `/foods/${food.img}`;
        kavekItemDivImg.alt = `${food.name}`;

        const kavekItemDivP = document.createElement('p');
        kavekItemDivP.textContent = `${food.name}`;

        const kavekItemDivPSpan = document.createElement('span');
        kavekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const kavekItemDivLeiras = document.createElement('div');
        kavekItemDivLeiras.classList.add('leiras');

        const kavekItemDivLeirasP = document.createElement('p');
        kavekItemDivLeirasP.textContent = `${food.leiras}`;

        kavekItemDivLeiras.append(kavekItemDivLeirasP);
        kavekItemDivP.append(kavekItemDivPSpan);
        kavekItemDiv.append(kavekItemDivImg, kavekItemDivP, kavekItemDivLeiras);
        kavek.append(kavekItemDiv);
    });
}