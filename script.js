```javascript
const form = document.getElementById("mainForm");
const button = document.getElementById("submitButton");

const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");
const previewImage = document.getElementById("previewImage");

const statusBox = document.getElementById("status");


/* =====================================
   IMAGE PREVIEW
===================================== */

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        preview.style.display = "none";
        previewImage.src = "";
        return;
    }

    if (!file.type.startsWith("image/")) {
        preview.style.display = "none";
        previewImage.src = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        previewImage.src = event.target.result;

        preview.style.display = "block";
    };

    reader.readAsDataURL(file);

});


/* =====================================
   FORM SUBMISSION
===================================== */

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    button.disabled = true;
    button.textContent = "Coming Soon...";

    statusBox.className = "status";
    statusBox.textContent = "";


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


        if (
            response.ok &&
            (
                result.success === true ||
                result.success === "true"
            )
        ) {

            /* Success message */

            statusBox.textContent =
                "Your submission was sent successfully. ✓";

            statusBox.className =
                "status show";


            /* Reset form */

            form.reset();

            preview.style.display = "none";
            previewImage.src = "";


            /* Button */

            button.textContent =
                "Coming Soon ✓";


            /*
             * Return to Home
             * after successful submission
             */

            setTimeout(function () {

                window.location.hash = "home";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 1500);


            /*
             * Restore button
             */

            setTimeout(function () {

                button.disabled = false;

                button.textContent =
                    "Coming Soon";

            }, 3500);


        } else {

            throw new Error(
                result.message ||
                "Submission failed."
            );

        }


    } catch (error) {

        console.error(
            "Submission error:",
            error
        );


        statusBox.textContent =
            "Something went wrong. Please try again.";

        statusBox.className =
            "status show";


        button.disabled = false;

        button.textContent =
            "Try Again";

    }

});
```
