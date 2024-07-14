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

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        const id = document.querySelector("#id").value;
        const date = document.querySelector("#date").value;
        const events = document.querySelector("#event").value;

        if (!id) {
            createNote(date, events);
        } else {
            updateNote(id, date, events);
        }

        document.querySelector("#form-container").style.display = 'none';
        clearForm();
    }


    function getNoteHTML(id, date, events) {
        return `
            <article class='day-notes' data-id='${id}' data-date='${date}' data-events='${events}'>
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
                const id = article.getAttribute('data-id');
                removeNote(id);
                closeExpandedView();
            }
        } else if (event.target.classList.contains('update-btn')) {
            const article = event.target.closest('.day-notes');
            if (article) {
                const id = article.getAttribute('data-id');
                const date = article.getAttribute('data-date');
                const events = article.getAttribute('data-events');
                populateForm(id, date, events);
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

    function populateForm(id, date, events) {
        document.querySelector("#id").value = id;
        document.querySelector("#date").value = date;
        document.querySelector("#event").value = events;
    }

    function clearForm() {
        document.querySelector("#id").value = '';
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

    function fetchNotes() {
        const url = 'http://localhost:5082/api/notes';
        const formContent = document.getElementById("form-content");
        formContent.innerHTML = "";
    
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(notes => {
                if (notes) {
                    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
                    notes.forEach(note => {
                        const dayNotesHTML = getNoteHTML(note.id, note.date, note.events);
                        formContent.innerHTML += dayNotesHTML;
                    });
                } else {
                    formContent.innerHTML = "<p>Failed to load notes.</p>";
                }
            })
            .catch(error => {
                console.error('Failed to fetch notes:', error);
                formContent.innerHTML = "<p>Failed to load notes.</p>";
            });
    }

    function createNote (date, events) {
        return fetch('http://localhost:5082/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: 0, date: date, events: events })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            return fetchNotes();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function updateNote(id, date, events) {
        return fetch(`http://localhost:5082/api/notes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, date: date, events: events })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return fetchNotes();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function removeNote(id) {
        return fetch(`http://localhost:5082/api/notes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(() => {
            return fetchNotes();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    fetchNotes();
});
