 /* document.addEventListener('DOMContentLoaded', function () {
    const btnSave = document.getElementById('btnSave');

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

// a profile kép megjelenítése
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
*/ 
document.addEventListener('DOMContentLoaded', function () {
    const btnSave = document.getElementById('btnSave');

    if (btnSave) {
        btnSave.addEventListener('click', save);
    } else {
        console.error("A '#btnSave' azonosítójú gomb nem található.");
    }

    // 🟢 Meglévő profilkép lekérése betöltéskor
    getpfp();

    const btnCancel = document.getElementById('megse');

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            window.location.href = '../home.html';
        });
    } else {
        console.error("Hiba: A 'megse' ID-jű gomb nem található.");
    }

    // 🟢 Felhasználónév ellenőrző gomb eseménykezelője
    const checkUsernameBtn = document.querySelector("#name + .icon-button");
    const usernameInput = document.getElementById("name");

    if (checkUsernameBtn && usernameInput) {
        checkUsernameBtn.addEventListener("click", async () => {
            const username = usernameInput.value.trim();

            if (username === "") {
                showMessage("Kérlek, adj meg egy felhasználónevet!", "error");
                return;
            }

            try {
                const res = await fetch(`/api/check-username?name=${encodeURIComponent(username)}`);
                const data = await res.json();

                if (res.ok && data.available) {
                    showMessage("✅ Megfelelő felhasználónév!", "success");
                } else {
                    showMessage("❌ A megadott felhasználónév már foglalt!", "error");
                }
            } catch (error) {
                console.error("Hiba történt:", error);
                showMessage("⚠ Hálózati hiba történt!", "error");
            }
        });
    }
});

// 🟢 Profil adatok mentése
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

// 🟢 Profilkép megjelenítése
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
                if (data[0]?.pfp) {
                    iconUser.src = `/foods/${data[0].pfp}`;
                    iconUser.alt = data[0].pfp;
                } else {
                    console.log("Nincs profilkép az adatokban");
                    iconUser.src = "/fotok/logo.png";
                }
            }
        }
    } catch (error) {
        console.error('Hiba a profilkép betöltésekor:', error);
    }
}

// 🟢 Üzenet kiírása a felhasználónév ellenőrzéshez
function showMessage(message, type) {
    let messageBox = document.getElementById("username-message");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.id = "username-message";
        usernameInput.parentElement.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.style.color = type === "success" ? "green" : "red";
}
