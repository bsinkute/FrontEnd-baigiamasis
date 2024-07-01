const createNewDayButton = document.querySelector("#create-day-button");

createNewDayButton.addEventListener("click", () => {
    let form = document.querySelector("#form-container");
    form.style.display = 'block';
});

function closeForm(event) {
    event.preventDefault();
    const formContainer = event.target.closest('.form-container');
    const formContent = document.getElementById("form-content");
    const firstName = document.querySelector("#firstName");
    formContent.innerHTML += "<p class='day-notes'>" + firstName.value + "</p>";
    formContainer.style.display = 'none';
}