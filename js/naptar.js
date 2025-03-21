import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

let currentYear = 2025;
let currentMonth = 2; // Március (0-indexelve: január = 0)
const today = new Date();
const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
let selectedDay = null; // A kiválasztott nap
let selectedTime = null; // A kiválasztott időpont

function generateCalendar() {
    const daysContainer = document.getElementById("calendar-days");
    daysContainer.innerHTML = "";
    document.getElementById("current-month").textContent = `${currentYear} ${monthNames[currentMonth]}`; 
    document.getElementById("prev-month").disabled = currentYear <= today.getFullYear() && currentMonth <= today.getMonth();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
   
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < offset; i++) {
        const emptyDay = document.createElement("div");
        daysContainer.appendChild(emptyDay);
    }
   
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
       
        const currentDate = new Date(currentYear, currentMonth, i);
        const isPast = currentDate < today.setHours(0, 0, 0, 0);
        const isSunday = currentDate.getDay() === 0;
       
        if (isPast) {
            dayElement.classList.add("inactive");
        } else if (isSunday) {
            dayElement.classList.add("sunday");
        } else {
            dayElement.onclick = () => selectDay(i);
        }
        daysContainer.appendChild(dayElement);
    }
}

function selectDay(day) {
    const dayElements = document.querySelectorAll(".day");
    const clickedDay = Array.from(dayElements).find(el => el.textContent == day);

    // Ha ugyanarra a napra kattintunk, eltávolítjuk a kijelölést és a nap nevét/dátumát
    if (clickedDay.classList.contains("selected")) {
        clickedDay.classList.remove("selected");
        document.getElementById("selected-date").style.display = 'none'; // A nap neve és dátuma eltűnik
        document.getElementById("selected-time").textContent = "";
        selectedDay = null; // Kijelölés törlése

        // Időpontok elrejtése és szöveg megjelenítése
        document.getElementById("time-slots").innerHTML = "<h3>Válassz egy napot!</h3>";
    } else {
        // Minden más nap kijelölését eltávolítjuk
        dayElements.forEach(el => el.classList.remove("selected"));
        clickedDay.classList.add("selected");

        // A kiválasztott nap nevét és dátumát megjelenítjük
        const selectedDate = new Date(currentYear, currentMonth, day);
        const dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        const dayName = dayNames[selectedDate.getDay()];

        document.getElementById("selected-date").style.display = 'block';
        document.getElementById("selected-date").textContent = `Kiválasztott nap: ${dayName}. ${selectedDate.getFullYear()}. ${monthNames[selectedDate.getMonth()]}. ${selectedDate.getDate()}.`;

        // Időpont kijelölés eltávolítása
        document.getElementById("selected-time").textContent = "";

        generateTimeSlots(day);
        selectedDay = day; // Kiválasztott nap elmentése
    }
}

function generateTimeSlots(day) {
    const timeContainer = document.getElementById("time-slots");
    timeContainer.innerHTML = ""; // Töröljük a korábbi tartalmat
    
    const timeSlots = ["12:00", "14:00", "15:00","17:00", "18:00", "19:00"];
    timeSlots.forEach(time => {
        const timeElement = document.createElement("button");
        timeElement.classList.add("time-button");
        timeElement.textContent = time;
        timeElement.onclick = () => bookTimeSlot(day, time, timeElement);
        timeContainer.appendChild(timeElement);
    });
}

function generateTimeSlots(day) {
    const timeContainer = document.getElementById("time-slots");
    timeContainer.innerHTML = "";
    
    const timeSlots = ["12:00", "14:00", "15:00","17:00", "18:00", "19:00"];
    timeSlots.forEach(time => {
        const timeElement = document.createElement("button");
        timeElement.classList.add("time-button");
        timeElement.textContent = time;
        timeElement.onclick = () => bookTimeSlot(day, time, timeElement);
        timeContainer.appendChild(timeElement);
    });
}

function bookTimeSlot(day, time, element) {
    element.classList.add("booked");
    element.textContent = `${time}  `;
    element.onclick = null;
    document.getElementById("selected-time").textContent = `Kiválasztott időpont: ${time}`;
    selectedTime = time; // Globális változó frissítése
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

document.addEventListener("DOMContentLoaded", generateCalendar);

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    document.getElementById("time-slots").innerHTML = "<h3>Válassz egy napot!</h3>";
});

async function foglalas() {
    if (!selectedDay || !selectedTime) {
        Swal.fire({
            title: "Hiba",
            text: "Kérjük, válassz ki egy napot és egy időpontot!",
            icon: "error",
        });
        return;
    }

    // Convert the selected date to YYYY-MM-DD format
    const selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const selectedTimeSlot = selectedTime;

    try {
        const response = await fetch('/api/foglalas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ datum: selectedDate, ido: selectedTimeSlot }),
        });

        if (!response.ok) {
            throw new Error('Hiba történt a foglalás során');
        }

        const data = await response.json();
        Swal.fire({
            title: `Sikeres foglalás: ${currentYear} ${monthNames[currentMonth]} ${selectedDay}. ${selectedTime}`,
            icon: "success",
        });
    } catch (error) {
        Swal.fire({
            title: "Hiba",
            text: error.message || "Hiba történt a foglalás során.",
            icon: "error",
        });
        console.error('Error:', error);
    }
}

// Eseményfigyelő hozzáadása a gombhoz
document.getElementById("foglalasGomb").addEventListener("click", foglalas);