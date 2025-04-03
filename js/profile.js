document.addEventListener('DOMContentLoaded', function () {
    const btnSave = document.getElementById('btnSave');
    const pfpInput = document.getElementById('pfp');
    const iconUser = document.getElementById('usericon');

    if (btnSave) {
        btnSave.addEventListener('click', save);
    } else {
        console.error("A '#btnSave' azonosítójú gomb nem található.");
    }

    // Itt hívjuk meg a getpfp függvényt, mivel már betöltődött a DOM
    getpfp();

    const btnCancel = document.getElementById('megse');

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            window.location.href = '../home.html';
        });
    } else {
        console.error("Hiba: A 'megse' ID-jű gomb nem található.");
    }

    // 🔹 ÚJ FUNKCIÓ: Profilkép előnézet megjelenítése azonnal a fájl kiválasztása után
    if (pfpInput) {
        pfpInput.addEventListener('change', function (event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    iconUser.src = e.target.result; // Beállítja az új képet az <img> elemre
                };

                reader.readAsDataURL(file); // Fájl olvasása és előnézet generálása
            }
        });
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

    const name = nameInput.value.trim();
    const psw = pswInput.value;
    const pfp = pfpInput.files[0];

    // 🔹 HIBAÜZENET HOZZÁADÁSA: Ha a felhasználónév üres, figyelmeztetés jelenjen meg
    if (name === "") {
        alert("Hiba: A felhasználónév nem lehet üres!");
        return;
    }

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

// 🔹 A PROFILKÉP MEGJELENÍTÉSE AZ OLDALON
async function getpfp() {
    try {
        const res = await fetch('/api/getpfp', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data);
        
        if (res.ok) {
            const iconUser = document.getElementById('usericon');
            if (iconUser) {
                // Ellenőrizzük, hogy van-e pfp az adatokban
                if (data[0]?.pfp) {
                    iconUser.src = `/foods/${data[0].pfp}`;
                    iconUser.alt = data[0].pfp;
                } else {
                    console.log("Nincs profilkép az adatokban");
                    // Itt beállíthatunk egy alapértelmezett képet
                    iconUser.src = "/fotok/logo.png";
                }
            }
        }
    } catch (error) {
        console.error('Hiba a profilkép betöltésekor:', error);
    }
}
