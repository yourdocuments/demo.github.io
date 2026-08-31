```javascript
const form = document.getElementById("mainForm");
const button = document.getElementById("submitButton");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Sending...";

    try {

        const formData = new FormData(form);

        const response = await fetch(
            "https://formsubmit.co/ajax/documentsnk@protonmail.com",
            {
                method: "POST",

                headers: {
                    "Accept": "application/json"
                },

                body: formData
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {

            button.textContent = "Coming Soon ✓";

            form.reset();

            document.getElementById("preview").style.display = "none";

            alert(
                "Done! Your information has been submitted successfully."
            );

            setTimeout(function () {
                button.disabled = false;
                button.textContent = originalText;
            }, 3000);

        } else {

            throw new Error(
                result.message || "Submission failed."
            );

        }

    } catch (error) {

        console.error("Form error:", error);

        button.disabled = false;
        button.textContent = "Try Again";

        alert(
            "Something went wrong. Please try again."
        );
    }

});
```
