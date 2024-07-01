const noteeForm = document.querySelector("#notee-form");
const noteeFormSubmitBtn = document.querySelector("#notee-form-submit");

function sendData() {
  let data = new FormData(noteeForm);
  let obj = {};

  data.forEach((value, key) => {
    obj[key] = value;
  });

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify(obj),
  };

  fetch("https://testapi.io/api/Bronislava/resource/animals", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

noteeFormSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendData();
});