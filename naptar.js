document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.querySelectorAll('.dates div');
    const timeSlots = document.querySelectorAll('.times div');

    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            alert(`Kiválasztott dátum: ${this.textContent}`);
        });
    });

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            alert(`Kiválasztott időpont: ${this.textContent}`);
        });
    });
});