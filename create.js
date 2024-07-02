document.addEventListener("DOMContentLoaded", function() {
    const createNewDayButton = document.querySelector("#create-day-button");

    createNewDayButton.addEventListener("click", () => {
        let form = document.querySelector("#form-container");
        form.style.display = 'block';
    });

    function closeForm(event) {
        event.preventDefault();
        const formContainer = event.target.closest('.form-container');
        const formContent = document.getElementById("form-content");
        const date = document.querySelector("#date").value;
        const events = document.querySelector("#event").value;

        if (!date || !events) {
            alert("Please fill in both the date and events.");
            return;
        }

        const dayNotesHTML = "<article class='day-notes'><div class='day-header'>" + 
                             "<h2>" + date + "</h2>" + 
                             "<nav><p>Update</p></nav><nav><p>Delete</p></nav></div>" + 
                             "<ul>" + getList(events) + "</ul></article>";

        formContent.innerHTML += dayNotesHTML;
        saveToLocalStorage(date, events);
        formContainer.style.display = 'none';
    }

    document.querySelector("#form-close-button").addEventListener("click", closeForm);

    function getList(events) {
        if (!events) return '';

        const eventsList = events.split('\n');
        let listItems = '';
        
        eventsList.forEach(event => {
            if (event.trim()) {
                listItems += "<li>" + event.trim() + "</li>";
            }
        });
        
        return listItems;
    }

    function saveToLocalStorage(date, events) {
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];
        notes.push({ date: date, events: events });
        localStorage.setItem("dayNotes", JSON.stringify(notes));
    }

    function loadFromLocalStorage() {
        const formContent = document.getElementById("form-content");
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];

        notes.forEach(note => {
            const dayNotesHTML = "<article class='day-notes'><div class='day-header'>" + 
                                 "<h2>" + (note.date || '') + "</h2>" + 
                                 "<nav><p>Update</p></nav><nav><p>Delete</p></nav></div>" + 
                                 "<ul>" + getList(note.events) + "</ul></article>";
            formContent.innerHTML += dayNotesHTML;
        });
    }

    loadFromLocalStorage();
});