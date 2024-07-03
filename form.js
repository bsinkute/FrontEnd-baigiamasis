document.addEventListener("DOMContentLoaded", function() {
    const createNewDayButton = document.querySelector("#create-day-button");

    createNewDayButton.addEventListener("click", () => {
        let form = document.querySelector("#form-container");
        form.style.display = 'block';
        clearForm();
    });

    const noteForm = document.getElementById("note-form");
    noteForm.addEventListener('submit', handleFormSubmit);

    let updateIndex = null;

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        const date = document.querySelector("#date").value;
        const events = document.querySelector("#event").value;

        if (updateIndex === null) {
            createNoteHTML(date, events);
            saveToLocalStorage(date, events);
        } else {
            updateNoteHTML(updateIndex, date, events);
            updateLocalStorage(updateIndex, date, events);
        }

        document.querySelector("#form-container").style.display = 'none';
        clearForm();
        updateIndex = null;
    }

    function createNoteHTML(date, events) {
        const formContent = document.getElementById("form-content");
        const dayNotesHTML = getNoteHTML(date, events);
        formContent.innerHTML += dayNotesHTML;
    }

    function updateNoteHTML(index, date, events) {
        const formContent = document.getElementById("form-content");
        const note = formContent.querySelectorAll('.day-notes')[index];
        note.setAttribute('data-date', date);
        note.setAttribute('data-events', events);
        note.querySelector('h2').textContent = date;
        note.querySelector('ul').innerHTML = getList(events);
    }

    function getNoteHTML(date, events) {
        return "<article class='day-notes' data-date='" + date + "' data-events='" + events + "'>" + 
               "<div class='day-header'>" + 
               "<h2>" + date + "</h2>" + 
               "<nav class= update><button class='update-btn'>Update</button></nav><nav class = delete><button class='delete-btn'>Delete</button></nav></div>" + 
               "<ul>" + getList(events) + "</ul></article>";
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
        } else if (event.target.classList.contains('update-btn')) { 
            const article = event.target.closest('.day-notes');
            if (article) {
                updateIndex = Array.from(document.querySelectorAll('.day-notes')).indexOf(article); 
                const date = article.getAttribute('data-date');
                const events = article.getAttribute('data-events');
                populateForm(date, events);
                document.querySelector("#form-container").style.display = 'block';
            }
        } else if (event.target.closest('.day-notes')) { 
            expandNoteView(event.target.closest('.day-notes'));
        } 
    });

    document.getElementById('close-expanded-view').addEventListener('click', function() {
        closeExpandedView();
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

    function updateLocalStorage(index, date, events) { 
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];
        notes[index] = { date: date, events: events };
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
            const dayNotesHTML = getNoteHTML(note.date, note.events);
            formContent.innerHTML += dayNotesHTML;
        });
    }

    function populateForm(date, events) {
        document.querySelector("#date").value = date;
        document.querySelector("#event").value = events;
    }

    function clearForm() {
        document.querySelector("#date").value = '';
        document.querySelector("#event").value = '';
    }

    function expandNoteView(note) {
        const expandedView = document.getElementById("expanded-view");
        const expandedNoteContent = document.getElementById("expanded-note-content");
        const date = note.getAttribute('data-date');
        const events = note.getAttribute('data-events');

        expandedNoteContent.innerHTML = getNoteHTML(date, events);
        document.getElementById("form-content").style.display = 'none';
        expandedView.style.display = 'block';
    }

    function closeExpandedView() {
        const expandedView = document.getElementById("expanded-view");
        expandedView.style.display = 'none';
        document.getElementById("form-content").style.display = 'block';
    }

    loadFromLocalStorage();
});
