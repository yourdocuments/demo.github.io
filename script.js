```javascript
/* =========================================================
   USHA.AI — SCRIPT.JS
   Form • Image Preview • AJAX • UX
========================================================= */


/* =========================================================
   1. GET ELEMENTS
========================================================= */

const form =
    document.getElementById("mainForm");

const submitButton =
    document.getElementById("submitButton");

const buttonIcon =
    submitButton
        ? submitButton.querySelector(".button-icon")
        : null;

const buttonText =
    submitButton
        ? submitButton.querySelector(".button-text")
        : null;

const statusBox =
    document.getElementById("status");

const imageInput =
    document.getElementById("image");

const preview =
    document.getElementById("preview");

const previewImage =
    document.getElementById("previewImage");

const removeImageButton =
    document.getElementById("removeImage");


/* =========================================================
   2. BASIC SAFETY CHECK
========================================================= */

if (!form) {

    console.error(
        "usha.ai: Form not found."
    );

}


/* =========================================================
   3. IMAGE PREVIEW
========================================================= */

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const file =
                this.files &&
                this.files[0];


            /* No file */

            if (!file) {

                clearImagePreview();

                return;

            }


            /* Check image */

            if (
                !file.type ||
                !file.type.startsWith("image/")
            ) {

                showStatus(
                    "Please select an image file.",
                    "error"
                );

                clearImagePreview();

                this.value = "";

                return;

            }


            /* Size check
               10 MB maximum
            */

            const maxSize =
                10 * 1024 * 1024;


            if (
                file.size > maxSize
            ) {

                showStatus(
                    "That image is a little too big. Please choose one under 10 MB.",
                    "error"
                );

                clearImagePreview();

                this.value = "";

                return;

            }


            /* FileReader */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    if (previewImage) {

                        previewImage.src =
                            event.target.result;

                        previewImage.alt =
                            file.name;

                    }


                    if (preview) {

                        preview.style.display =
                            "block";

                        preview.classList.add(
                            "show"
                        );

                    }


                    hideStatus();

                };


            reader.onerror =
                function () {

                    showStatus(
                        "We couldn't preview that image.",
                        "error"
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   4. REMOVE IMAGE
========================================================= */

if (removeImageButton) {

    removeImageButton.addEventListener(
        "click",
        function () {

            clearImagePreview();

            hideStatus();

        }
    );

}


/* =========================================================
   5. CLEAR IMAGE PREVIEW
========================================================= */

function clearImagePreview() {

    if (imageInput) {

        imageInput.value = "";

    }


    if (previewImage) {

        previewImage.src = "";

        previewImage.alt =
            "Selected image preview";

    }


    if (preview) {

        preview.style.display =
            "none";

        preview.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   6. STATUS MESSAGE
========================================================= */

function showStatus(
    message,
    type = "info"
) {

    if (!statusBox) {

        return;

    }


    statusBox.textContent =
        message;


    statusBox.className =
        "status show";


    if (type === "success") {

        statusBox.classList.add(
            "success"
        );

    }


    if (type === "error") {

        statusBox.classList.add(
            "error"
        );

    }

}


function hideStatus() {

    if (!statusBox) {

        return;

    }


    statusBox.textContent =
        "";

    statusBox.className =
        "status";

}


/* =========================================================
   7. BUTTON STATE
========================================================= */

function setButtonState(
    state
) {

    if (
        !submitButton ||
        !buttonIcon ||
        !buttonText
    ) {

        return;

    }


    switch (state) {


        /* -----------------------------------------
           DEFAULT
        ----------------------------------------- */

        case "default":

            submitButton.disabled =
                false;

            buttonIcon.textContent =
                "🚀";

            buttonText.textContent =
                "Coming Soon";

            break;



        /* -----------------------------------------
           SENDING
        ----------------------------------------- */

        case "sending":

            submitButton.disabled =
                true;

            buttonIcon.textContent =
                "⏳";

            buttonText.textContent =
                "Sending...";

            break;



        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        case "success":

            submitButton.disabled =
                true;

            buttonIcon.textContent =
                "✓";

            buttonText.textContent =
                "Sent Successfully";

            break;



        /* -----------------------------------------
           ERROR
        ----------------------------------------- */

        case "error":

            submitButton.disabled =
                false;

            buttonIcon.textContent =
                "↻";

            buttonText.textContent =
                "Try Again";

            break;

    }

}


/* =========================================================
   8. FORM VALIDATION
========================================================= */

function validateForm() {

    const name =
        document.getElementById("name");

    const number =
        document.getElementById("number");

    const message =
        document.getElementById("message");


    /* NAME */

    if (
        !name ||
        name.value.trim().length < 2
    ) {

        showStatus(
            "Please enter your name.",
            "error"
        );

        if (name) {

            name.focus();

        }

        return false;

    }


    /* NUMBER */

    if (
        !number ||
        number.value.trim().length < 3
    ) {

        showStatus(
            "Please enter your number.",
            "error"
        );

        if (number) {

            number.focus();

        }

        return false;

    }


    /* MESSAGE */

    if (
        !message ||
        message.value.trim().length < 2
    ) {

        showStatus(
            "Looks like the message box is feeling lonely. Write something first.",
            "error"
        );

        if (message) {

            message.focus();

        }

        return false;

    }


    return true;

}


/* =========================================================
   9. FORM SUBMISSION
========================================================= */

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            /*
             * IMPORTANT:
             * Stop normal FormSubmit page redirect.
             */

            event.preventDefault();


            /* -----------------------------------------
               VALIDATE
            ----------------------------------------- */

            if (!validateForm()) {

                return;

            }


            /* -----------------------------------------
               BUTTON
            ----------------------------------------- */

            setButtonState(
                "sending"
            );


            hideStatus();


            /* -----------------------------------------
               FORM DATA
            ----------------------------------------- */

            const formData =
                new FormData(form);


            /*
             * FormSubmit AJAX endpoint.
             *
             * IMPORTANT:
             * Replace the email below only if needed.
             */

            const endpoint =
                "https://formsubmit.co/ajax/documentsnk@protonmail.com";


            try {


                /* -----------------------------------------
                   SEND REQUEST
                ----------------------------------------- */

                const response =
                    await fetch(
                        endpoint,
                        {
                            method:
                                "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            body:
                                formData
                        }
                    );


                /* -----------------------------------------
                   READ RESPONSE
                ----------------------------------------- */

                let result = null;


                try {

                    result =
                        await response.json();

                }
                catch (
                    jsonError
                ) {

                    result = null;

                }


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (
                    response.ok &&
                    (
                        !result ||
                        result.success === true ||
                        result.success === "true"
                    )
                ) {


                    /* Button */

                    setButtonState(
                        "success"
                    );


                    /* Message */

                    showStatus(
                        "Done. Your little internet package has been sent. ✨",
                        "success"
                    );


                    /* Clear form */

                    form.reset();


                    /* Clear image */

                    clearImagePreview();


                    /*
                     * Give the user a moment
                     * to see success state.
                     */

                    setTimeout(
                        function () {

                            goHome();

                        },
                        1500
                    );


                    /*
                     * Restore button later.
                     */

                    setTimeout(
                        function () {

                            setButtonState(
                                "default"
                            );

                            hideStatus();

                        },
                        4000
                    );


                }

                else {


                    /*
                     * Server returned an error.
                     */

                    const serverMessage =
                        result &&
                        result.message
                            ? result.message
                            : "Submission could not be completed.";


                    throw new Error(
                        serverMessage
                    );

                }


            }
            catch (error) {


                console.error(
                    "usha.ai submission error:",
                    error
                );


                /* Button */

                setButtonState(
                    "error"
                );


                /* Message */

                showStatus(
                    "Hmm. The internet appears to be having a tiny existential crisis. Please try again.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   10. RETURN TO HOME
========================================================= */

function goHome() {

    /*
     * Update URL hash without
     * reloading the page.
     */

    try {

        history.replaceState(
            null,
            "",
            "#home"
        );

    }
    catch (
        historyError
    ) {

        window.location.hash =
            "home";

    }


    /* Scroll */

    const home =
        document.getElementById("home");


    if (home) {

        home.scrollIntoView({
            behavior:
                "smooth",
            block:
                "start"
        });

    }
    else {

        window.scrollTo({
            top: 0,
            behavior:
                "smooth"
        });

    }

}


/* =========================================================
   11. PREVENT DOUBLE SUBMISSION
========================================================= */

let pageLeaving =
    false;


window.addEventListener(
    "beforeunload",
    function () {

        pageLeaving =
            true;

    }
);


/* =========================================================
   12. KEYBOARD SHORTCUT
========================================================= */

/*
 * Escape closes image preview.
 */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            imageInput &&
            imageInput.value
        ) {

            clearImagePreview();

        }

    }
);


/* =========================================================
   13. NAVIGATION
========================================================= */

/*
 * Smoothly handle internal navigation
 * when browser behavior is inconsistent.
 */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    try {

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }
                    catch (
                        historyError
                    ) {

                        /* Ignore history errors */

                    }


                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }
            );

        }
    );


/* =========================================================
   14. INITIAL STATE
========================================================= */

setButtonState(
    "default"
);

hideStatus();

clearImagePreview();


/* =========================================================
   15. CONSOLE BRANDING
========================================================= */

console.log(
    "%c usha.ai ",
    "background:#171717;color:#c49b27;padding:8px 12px;border-radius:6px;font-weight:800;"
);

console.log(
    "Everything seems normal here. Probably. 👀"
);
```
