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
    formContent.innerHTML += "<h2 class='day-notes'>" + date.value + "</h2>";
    formContainer.style.display = 'none';
}