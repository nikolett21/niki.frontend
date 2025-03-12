/* const btnSave = document.getElementById('btnSave');


btnSave.addEventListener('click', save);

async function save() {
    const name = document.getElementById('name').value;
    const psw = document.getElementById('psw').value;
    const pfp = document.getElementById('file').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('psw', psw);
    if (pfp) {
        formData.append('file', pfp);
    }

    try {
        const res = await fetch('/api/editProfile', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const data = await res.json();
        console.log(data);
        
        if (res.ok) {
            alert(data.message);
            window.location.href = '../home.html';
        } else if (data.errors) {
            let errorMessage = '';
            for (let i = 0; i < data.errors.length; i++) {
                errorMessage += `${data.errors[i].error}\n`;
            }
            alert(errorMessage);
        } else if (data.error) {
            alert(data.error);
        } else {
            alert('Ismeretlen hiba');
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert('Hálózati hiba vagy szerverhiba történt.');
    }


}
*/
 /* CHATGPT kód */ 

 document.addEventListener('DOMContentLoaded', function () {
    const btnSave = document.getElementById('btnSave');

    if (btnSave) {
        btnSave.addEventListener('click', save);
    } else {
        console.error("A '#btnSave' azonosítójú gomb nem található.");
    }
});

async function save() {
    const nameInput = document.getElementById('name');
    const pswInput = document.getElementById('psw');
    const pfpInput = document.getElementById('pfp'); // Javítva az azonosító

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
        formData.append('file', pfp);
    }

    try {
        const res = await fetch('/api/editProfile', {
            method: 'POST',
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
