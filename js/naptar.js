let currentYear = 2025;
        let currentMonth = 2; // Március (0-indexelve: január = 0)
        const today = new Date();
        const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

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
            document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
            event.target.classList.add("selected");
            document.getElementById("selected-date").textContent = `${currentYear} ${monthNames[currentMonth]} ${day}.`;
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