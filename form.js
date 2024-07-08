import { loadFooter } from './footerLoader.js';
loadFooter();

import { loadHeader, loadTheme } from './headerLoader.js';
loadHeader();
loadTheme();

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
            saveToLocalStorage(date, events);
            loadFromLocalStorage();
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
        return `
            <article class='day-notes' data-date='${date}' data-events='${events}'>
                <div class='day-header'>
                    <h2>${date}</h2>
                    <nav class='update'><button class='update-btn'>Update</button></nav>
                    <nav class='delete'><button class='delete-btn'>Delete</button></nav>
                </div>
                <ul>${getList(events, 3)}</ul>
                ${events.split('\n').length > 3 ? "<a href='#' class='read-more'>Read more</a>" : ""}
            </article>`;
    }

    document.getElementById('form-content').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const article = event.target.closest('.day-notes');
            if (article) {
                const date = article.getAttribute('data-date');
                const events = article.getAttribute('data-events');
                article.remove();
                removeFromLocalStorage(date, events);
                closeExpandedView();
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
        } else if (event.target.classList.contains('read-more')) {
            event.preventDefault();
            const article = event.target.closest('.day-notes');
            showSingleNoteView(article);
        } else if (event.target.classList.contains('close-btn')) {
            closeExpandedView();
        }
    });

    function getList(events, limit = null) {
        if (!events) return '';

        const eventsList = events.split('\n');
        let listItems = '';

        eventsList.forEach((event, index) => {
            if (event.trim() && (limit === null || index < limit)) {
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
        formContent.innerHTML = "";
        let notes = JSON.parse(localStorage.getItem("dayNotes")) || [];

        notes.sort((a, b) => new Date(b.date) - new Date(a.date));

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

    function showSingleNoteView(note) {
        const allNotes = document.querySelectorAll('.day-notes');
        allNotes.forEach(n => {
            if (n !== note) {
                n.style.display = 'none';
            }
        });

        note.querySelector('ul').innerHTML = getList(note.getAttribute('data-events'));
        note.querySelector('.read-more').style.display = 'none';
        note.insertAdjacentHTML('beforeend', "<button class='close-btn'>Close</button>");
        createNewDayButton.style.display = 'none';
    }

    function closeExpandedView() {
        const allNotes = document.querySelectorAll('.day-notes');
        allNotes.forEach(n => {
            n.style.display = 'block';
            n.querySelector('ul').innerHTML = getList(n.getAttribute('data-events'), 3);
            if (n.querySelector('.read-more')) {
                n.querySelector('.read-more').style.display = 'inline';
            }
            const closeButton = n.querySelector('.close-btn');
            if (closeButton) {
                closeButton.remove();
            }
        });
        createNewDayButton.style.display = 'block';
    }

    loadFromLocalStorage();
});
