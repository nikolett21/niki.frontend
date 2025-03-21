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
    const foetelek = document.getElementById('foetelek');
    foetelek.innerHTML = '';

    foodsByCategory.forEach(food => {
        const foetelekItemDiv = document.createElement('div');
        foetelekItemDiv.classList.add('foetelek-item');

        const foetelekItemDivImg = document.createElement('img');
        foetelekItemDivImg.src = `/foods/${food.img}`;
        foetelekItemDivImg.alt = `${food.name}`;

        const foetelekItemDivP = document.createElement('p');
        foetelekItemDivP.textContent = `${food.name}`;

        const foetelekItemDivPSpan = document.createElement('span');
        foetelekItemDivPSpan.textContent = ` ${food.price} Ft`;

        const foetelekItemDivLeiras = document.createElement('div');
        foetelekItemDivLeiras.classList.add('leiras');

        const foetelekItemDivLeirasP = document.createElement('p');
        foetelekItemDivLeirasP.textContent = `${food.leiras}`;

        foetelekItemDivLeiras.append(foetelekItemDivLeirasP);
        foetelekItemDivP.append(foetelekItemDivPSpan);
        foetelekItemDiv.append(foetelekItemDivImg, foetelekItemDivP, foetelekItemDivLeiras);
        foetelek.append(foetelekItemDiv);
    });
}

document.querySelectorAll('.desszertek-item').forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('active'); 
    });
});