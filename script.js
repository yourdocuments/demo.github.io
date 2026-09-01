```javascript
"use strict";

/* =========================================
   USHA.AI — CLEAN FINAL SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("mainForm");
    const imageInput = document.getElementById("image");
    const preview = document.getElementById("preview");
    const previewImage = document.getElementById("previewImage");
    const removeImage = document.getElementById("removeImage");
    const statusBox = document.getElementById("status");

    const submitButton =
        document.getElementById("submitButton");

    const buttonText =
        submitButton
            ? submitButton.querySelector(".button-text")
            : null;

    const buttonIcon =
        submitButton
            ? submitButton.querySelector(".button-icon")
            : null;


    /* =========================================
       STATUS
    ========================================= */

    function showStatus(message, type) {

        if (!statusBox) return;

        statusBox.textContent = message;
        statusBox.className = "status show";

        if (type === "success") {
            statusBox.classList.add("success");
        }

        if (type === "error") {
            statusBox.classList.add("error");
        }
    }


    function hideStatus() {

        if (!statusBox) return;

        statusBox.textContent = "";
        statusBox.className = "status";
    }


    /* =========================================
       BUTTON
    ========================================= */

    function buttonState(state) {

        if (!submitButton) return;

        if (state === "normal") {

            submitButton.disabled = false;

            if (buttonIcon) {
                buttonIcon.textContent = "🚀";
            }

            if (buttonText) {
                buttonText.textContent = "Coming Soon";
            }
        }


        if (state === "sending") {

            submitButton.disabled = true;

            if (buttonIcon) {
                buttonIcon.textContent = "⏳";
            }

            if (buttonText) {
                buttonText.textContent = "Sending...";
            }
        }


        if (state === "success") {

            submitButton.disabled = true;

            if (buttonIcon) {
                buttonIcon.textContent = "✓";
            }

            if (buttonText) {
                buttonText.textContent = "Sent!";
            }
        }


        if (state === "error") {

            submitButton.disabled = false;

            if (buttonIcon) {
                buttonIcon.textContent = "↻";
            }

            if (buttonText) {
                buttonText.textContent = "Try Again";
            }
        }
    }


    /* =========================================
       IMAGE PREVIEW
    ========================================= */

    function clearImage() {

        if (imageInput) {
            imageInput.value = "";
        }

        if (previewImage) {
            previewImage.src = "";
        }

        if (preview) {
            preview.style.display = "none";
            preview.classList.remove("show");
        }
    }


    if (imageInput) {

        imageInput.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                clearImage();
                return;
            }


            if (!file.type.startsWith("image/")) {

                clearImage();

                showStatus(
                    "Please choose an image file. 🖼️",
                    "error"
                );

                return;
            }


            if (file.size > 10 * 1024 * 1024) {

                clearImage();

                showStatus(
                    "Image must be smaller than 10 MB.",
                    "error"
                );

                return;
            }


            const reader = new FileReader();


            reader.onload = function (event) {

                if (previewImage) {
                    previewImage.src =
                        event.target.result;
                }

                if (preview) {

                    preview.style.display = "block";

                    preview.classList.add("show");
                }

                hideStatus();
            };


            reader.onerror = function () {

                showStatus(
                    "Could not read that image.",
                    "error"
                );
            };


            reader.readAsDataURL(file);

        });
    }


    /* =========================================
       REMOVE IMAGE
    ========================================= */

    if (removeImage) {

        removeImage.addEventListener(
            "click",
            function () {

                clearImage();
                hideStatus();

            }
        );
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name");

                const number =
                    document.getElementById("number");

                const message =
                    document.getElementById("message");


                /* Validation */

                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    showStatus(
                        "Please enter your name.",
                        "error"
                    );

                    if (name) name.focus();

                    return;
                }


                if (
                    !number ||
                    number.value.trim().length < 3
                ) {

                    showStatus(
                        "Please enter your number.",
                        "error"
                    );

                    if (number) number.focus();

                    return;
                }


                if (
                    !message ||
                    message.value.trim().length < 2
                ) {

                    showStatus(
                        "Write something first. 😄",
                        "error"
                    );

                    if (message) message.focus();

                    return;
                }


                /* Sending */

                buttonState("sending");
                hideStatus();


                const formData =
                    new FormData(form);


                /*
                 * IMPORTANT:
                 * Your FormSubmit email.
                 */

                const endpoint =
                    "https://formsubmit.co/ajax/documentsnk@protonmail.com";


                try {

                    const response =
                        await fetch(
                            endpoint,
                            {
                                method: "POST",

                                headers: {
                                    "Accept":
                                        "application/json"
                                },

                                body: formData
                            }
                        );


                    const text =
                        await response.text();


                    console.log(
                        "FormSubmit response:",
                        text
                    );


                    if (!response.ok) {

                        throw new Error(
                            "Server returned " +
                            response.status
                        );
                    }


                    /* Success */

                    buttonState("success");


                    showStatus(
                        "Sent successfully. ✨",
                        "success"
                    );


                    form.reset();

                    clearImage();


                    /*
                     * Return home after success.
                     */

                    setTimeout(
                        function () {

                            const home =
                                document.getElementById(
                                    "home"
                                );

                            if (home) {

                                home.scrollIntoView({
                                    behavior:
                                        "smooth"
                                });

                            } else {

                                window.scrollTo({
                                    top: 0,
                                    behavior:
                                        "smooth"
                                });

                            }

                        },
                        1400
                    );


                    setTimeout(
                        function () {

                            buttonState("normal");
                            hideStatus();

                        },
                        4000
                    );

                }
                catch (error) {

                    console.error(
                        "USHA.AI FORM ERROR:",
                        error
                    );


                    buttonState("error");


                    showStatus(
                        "Something went wrong. Please try again. 😅",
                        "error"
                    );
                }

            }
        );
    }


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute("href");

                    if (!id || id === "#") {
                        return;
                    }


                    const target =
                        document.querySelector(id);

                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =========================================
       MOUSE GLOW
    ========================================= */

    if (
        !window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        const glow =
            document.createElement("div");

        glow.className = "mouse-glow";

        document.body.appendChild(glow);


        let x =
            window.innerWidth / 2;

        let y =
            window.innerHeight / 2;

        let currentX = x;
        let currentY = y;


        window.addEventListener(
            "mousemove",
            function (event) {

                x = event.clientX;
                y = event.clientY;

                glow.style.opacity = "1";

            },
            {
                passive: true
            }
        );


        window.addEventListener(
            "mouseleave",
            function () {

                glow.style.opacity = "0";

            }
        );


        function animateGlow() {

            currentX +=
                (x - currentX) * 0.08;

            currentY +=
                (y - currentY) * 0.08;


            glow.style.left =
                currentX + "px";

            glow.style.top =
                currentY + "px";


            requestAnimationFrame(
                animateGlow
            );
        }


        animateGlow();
    }


    /* =========================================
       FLOATING PARTICLES
    ========================================= */

    const particleContainer =
        document.getElementById("particles");


    if (
        particleContainer &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const amount =
            window.innerWidth < 700
                ? 8
                : 16;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const particle =
                document.createElement("span");


            const size =
                Math.random() * 4 + 2;


            particle.style.position =
                "absolute";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.width =
                size + "px";

            particle.style.height =
                size + "px";

            particle.style.borderRadius =
                "50%";

            particle.style.background =
                "rgba(196,155,39,.28)";


            particle.animate(
                [
                    {
                        transform:
                            "translate(0,0)",
                        opacity: 0
                    },
                    {
                        transform:
                            "translate(25px,-60px)",
                        opacity: .65
                    },
                    {
                        transform:
                            "translate(-20px,-120px)",
                        opacity: 0
                    }
                ],
                {
                    duration:
                        (12 + Math.random() * 10) *
                        1000,

                    delay:
                        Math.random() *
                        -12000,

                    iterations:
                        Infinity,

                    easing:
                        "ease-in-out"
                }
            );


            particleContainer.appendChild(
                particle
            );
        }
    }


    /* =========================================
       INITIAL STATE
    ========================================= */

    buttonState("normal");

    hideStatus();

    clearImage();


    console.log(
        "usha.ai loaded successfully. 👀"
    );

});
```
