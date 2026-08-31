
const form = document.getElementById("documentForm");
const button = document.getElementById("submitButton");

form.addEventListener("submit", function () {

    button.disabled = true;

    button.textContent = "Coming Soon...";

});
