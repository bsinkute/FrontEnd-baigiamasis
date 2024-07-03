document.addEventListener("DOMContentLoaded", function() {
    const createNewDayButton = document.querySelector("#create-day-button");

    createNewDayButton.addEventListener("click", () => {
        let form = document.querySelector("#form-container");
        form.style.display = 'block';
    });

    const noteForm = document.getElementById("note-form");

    noteForm.addEventListener('submit', closeForm);

    function closeForm(event) {
        if(!this.checkValidity()){
            event.preventDefault();
            this.reportValidity();
        }


        const formContainer = event.target.closest('.form-container');
        const formContent = document.getElementById("form-content");
        const date = document.querySelector("#date").value;
        const events = document.querySelector("#event").value;

        const dayNotesHTML = "<article class='day-notes' data-date='" + date + "' data-events='" + events + "'>" + 
                             "<div class='day-header'>" + 
                             "<h2>" + date + "</h2>" + 
                             "<nav><p>Update</p></nav><nav><button class='delete-btn'>Delete</button></nav></div>" + 
                             "<ul>" + getList(events) + "</ul></article>";

        formContent.innerHTML += dayNotesHTML;

        saveToLocalStorage(date, events);
        formContainer.style.display = 'none';
    }

    document.getElementById('form-content').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const article = event.target.closest('.day-notes');
            if (article) {
                const date = article.getAttribute('data-date');
                const events = article.getAttribute('data-events');
                article.remove();
                removeFromLocalStorage(date, events);
            }
        }
    });

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

    function removeFromLocalStorage(date, events) {
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];
        notes = notes.filter(note => note.date !== date || note.events !== events);
        localStorage.setItem("dayNotes", JSON.stringify(notes));
    }

    function loadFromLocalStorage() {
        const formContent = document.getElementById("form-content");
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];

        notes.forEach(note => {
            const dayNotesHTML = "<article class='day-notes' data-date='" + note.date + "' data-events='" + note.events + "'>" + 
                                 "<div class='day-header'>" + 
                                 "<h2>" + note.date + "</h2>" + 
                                 "<nav><p>Update</p></nav><nav><button class='delete-btn'>Delete</button></nav></div>" + 
                                 "<ul>" + getList(note.events) + "</ul></article>";
            formContent.innerHTML += dayNotesHTML;
        });
    }

    loadFromLocalStorage();
});