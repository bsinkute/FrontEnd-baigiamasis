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
        const date = document.querySelector("#date");

        formContent.innerHTML += "<article class='day-notes'><div class='day-header'>" + 
                                 "<h2>" + date.value + "</h2>" + 
                                 "<nav><p>Update</p></nav><nav><p>Delete</p></nav></div>" + 
                                 "<ul>" + getList() + "</ul></div></article>";
        formContainer.style.display = 'none';
    }

    document.querySelector("#form-close-button").addEventListener("click", closeForm);

    function getList() {
        const events = document.querySelector("#event").value;
        const eventsList = events.split('\n');
        let listItems = '';
        
        eventsList.forEach(event => {
            if (event.trim()) {
                listItems += "<li>" + event.trim() + "</li>";
            }
        });
        
        return listItems;
    }
});