const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];

window.addEventListener('DOMContentLoaded', getFoods);

iconUser.addEventListener('click', () => {
    window.location.href = '../profile.html';
});

iconLogout.addEventListener('click', logout);


async function getFoods() {
    const res = await fetch('/api/food', {
        method: 'GET',
        credentials: 'include'
    });

    const foods = await res.json();
    console.log(foods);
    renderfoods(foods);
}

function renderfoods(foods) {
    console.log(`renderfoodson belüli foods: ${foods}`);
    
}