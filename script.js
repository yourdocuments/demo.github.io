if (
    response.ok &&
    (
        result.success === true ||
        result.success === "true"
    )
) {
    statusBox.textContent =
        "Your submission was sent successfully.";

    statusBox.className = "status show";

    form.reset();

    preview.style.display = "none";
    previewImage.src = "";

    button.textContent = "Coming Soon ✓";

    setTimeout(function () {
        window.location.href = "#home";
    }, 1500);

}
