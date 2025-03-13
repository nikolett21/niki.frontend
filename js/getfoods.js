async function getPics() {
    const res = await fetch('/api/getFoods', {
        methot: 'GET',
        credentials: 'include'
    });
    const foods = await res.json();
    console.log(foods);
    renderfoods(foods);
}
