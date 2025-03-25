document.addEventListener('DOMContentLoaded', function () {
    const btnSave = document.getElementById('btnSave');
    const iconUser = document.getElementsByClassName('icon-user')[0];

window.addEventListener('DOMContentLoaded', getpfp);

    if (btnSave) {
        btnSave.addEventListener('click', save);
    } else {
        console.error("A '#btnSave' azonosítójú gomb nem található.");
    }
});

async function save() {
    const nameInput = document.getElementById('name');
    const pswInput = document.getElementById('psw');
    const pfpInput = document.getElementById('pfp');

    if (!nameInput || !pswInput || !pfpInput) {
        console.error("Nem található az egyik input elem.");
        return;
    }

    const name = nameInput.value;
    const psw = pswInput.value;
    const pfp = pfpInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('psw', psw);
    if (pfp) {
        formData.append('pfp', pfp);
    }

    try {
        const res = await fetch('/api/editProfile', {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });

        const text = await res.text();
        console.log("Szerver válasza:", text);

        try {
            const data = JSON.parse(text);

            if (res.ok) {
                alert(data.message);
                window.location.href = '../home.html';
            } else if (data.errors) {
                let errorMessage = data.errors.map(err => err.error).join('\n');
                alert(errorMessage);
            } else if (data.error) {
                alert(data.error);
            } else {
                alert('Ismeretlen hiba');
            }
        } catch (jsonError) {
            console.error("Nem JSON választ kaptunk:", text);
            alert("Hibás válasz érkezett a szervertől.");
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert('Hálózati hiba vagy szerverhiba történt.');
    }
}
// ételek lekérdezése
async function getPics() {
    const res = await fetch('/api/getFoods', {
        methot: 'GET',
        credentials: 'include'
    });
    const foods = await res.json();
    console.log(foods);
}

// a profile kép megjelenítése
async function getpfp() {
    const res = await fetch('/api/getpfp', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        console.log(`${data[0].pfp}`)
        iconUser.innerHTML = `<img src='/foods/${data[0].pfp}' alt='${data[0].pfp}'>`; 
    }
}