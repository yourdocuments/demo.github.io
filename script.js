/* =========================================================
   USHA.AI — COMPLETE SCRIPT.JS
   FormSubmit + Image Preview + Background Animation
   Mouse Glow + Particles + Smooth UX
========================================================= */

"use strict";


/* =========================================================
   1. CONFIGURATION
========================================================= */

const FORM_ENDPOINT =
    "https://formsubmit.co/ajax/documentsnk@protonmail.com";

const MAX_IMAGE_SIZE =
    10 * 1024 * 1024;


/* =========================================================
   2. GET ELEMENTS
========================================================= */

const form =
    document.getElementById("mainForm");

const nameInput =
    document.getElementById("name");

const numberInput =
    document.getElementById("number");

const messageInput =
    document.getElementById("message");

const imageInput =
    document.getElementById("image");

const preview =
    document.getElementById("preview");

const previewImage =
    document.getElementById("previewImage");

const removeImage =
    document.getElementById("removeImage");

const statusBox =
    document.getElementById("status");

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


/* =========================================================
   3. STATUS SYSTEM
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
   4. BUTTON STATES
========================================================= */

function setButton(
    state
) {

    if (!submitButton) {
        return;
    }


    if (state === "default") {

        submitButton.disabled =
            false;

        if (buttonIcon) {
            buttonIcon.textContent =
                "🚀";
        }

        if (buttonText) {
            buttonText.textContent =
                "Coming Soon";
        }

    }


    if (state === "sending") {

        submitButton.disabled =
            true;

        if (buttonIcon) {
            buttonIcon.textContent =
                "⏳";
        }

        if (buttonText) {
            buttonText.textContent =
                "Sending...";
        }

    }


    if (state === "success") {

        submitButton.disabled =
            true;

        if (buttonIcon) {
            buttonIcon.textContent =
                "✓";
        }

        if (buttonText) {
            buttonText.textContent =
                "Sent Successfully";
        }

    }


    if (state === "error") {

        submitButton.disabled =
            false;

        if (buttonIcon) {
            buttonIcon.textContent =
                "↻";
        }

        if (buttonText) {
            buttonText.textContent =
                "Try Again";
        }

    }

}


/* =========================================================
   5. IMAGE PREVIEW
========================================================= */

function clearImage() {

    if (imageInput) {

        imageInput.value =
            "";

    }


    if (previewImage) {

        previewImage.src =
            "";

    }


    if (preview) {

        preview.style.display =
            "none";

        preview.classList.remove(
            "show"
        );

    }

}


if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const file =
                this.files &&
                this.files[0];


            if (!file) {

                clearImage();

                return;

            }


            /* Check file type */

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                showStatus(
                    "That doesn't look like an image. Nice try though. 😄",
                    "error"
                );

                clearImage();

                return;

            }


            /* Check size */

            if (
                file.size >
                MAX_IMAGE_SIZE
            ) {

                showStatus(
                    "That image is too big. Please keep it under 10 MB.",
                    "error"
                );

                clearImage();

                return;

            }


            /* Read image */

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    if (previewImage) {

                        previewImage.src =
                            event.target.result;

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
                        "The image preview had a tiny existential crisis.",
                        "error"
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   6. REMOVE IMAGE
========================================================= */

if (removeImage) {

    removeImage.addEventListener(
        "click",
        function () {

            clearImage();

            hideStatus();

        }
    );

}


/* =========================================================
   7. VALIDATION
========================================================= */

function validateForm() {


    /* Name */

    if (
        !nameInput ||
        nameInput.value.trim().length < 2
    ) {

        showStatus(
            "Please enter your name.",
            "error"
        );

        nameInput?.focus();

        return false;

    }


    /* Number */

    if (
        !numberInput ||
        numberInput.value.trim().length < 3
    ) {

        showStatus(
            "Please enter your number.",
            "error"
        );

        numberInput?.focus();

        return false;

    }


    /* Message */

    if (
        !messageInput ||
        messageInput.value.trim().length < 2
    ) {

        showStatus(
            "Write something first. The box is lonely. 🥲",
            "error"
        );

        messageInput?.focus();

        return false;

    }


    return true;

}


/* =========================================================
   8. FORM SUBMISSION
========================================================= */

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Prevent empty submit */

            if (!validateForm()) {

                return;

            }


            /* Change button */

            setButton(
                "sending"
            );

            hideStatus();


            /* Build FormData */

            const formData =
                new FormData(form);


            /*
             * Add current page URL.
             */

            formData.set(
                "_url",
                window.location.href
            );


            /*
             * Make sure FormSubmit
             * doesn't redirect.
             */

            formData.set(
                "_captcha",
                "false"
            );


            try {

                const response =
                    await fetch(
                        FORM_ENDPOINT,
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


                let data =
                    null;


                const contentType =
                    response.headers.get(
                        "content-type"
                    );


                if (
                    contentType &&
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    data =
                        await response.json();

                }
                else {

                    const text =
                        await response.text();

                    data = {
                        success:
                            response.ok,

                        message:
                            text
                    };

                }


                console.log(
                    "usha.ai response:",
                    data
                );


                /* Successful request */

                if (
                    response.ok
                ) {

                    setButton(
                        "success"
                    );


                    showStatus(
                        "Sent. The internet has received your tiny message. ✨",
                        "success"
                    );


                    /* Reset */

                    form.reset();

                    clearImage();


                    /*
                     * Go home automatically.
                     */

                    setTimeout(
                        function () {

                            goHome();

                        },
                        1600
                    );


                    /*
                     * Reset button.
                     */

                    setTimeout(
                        function () {

                            setButton(
                                "default"
                            );

                            hideStatus();

                        },
                        4500
                    );

                }
                else {

                    throw new Error(
                        data?.message ||
                        "Form submission failed."
                    );

                }

            }
            catch (error) {

                console.error(
                    "FormSubmit error:",
                    error
                );


                setButton(
                    "error"
                );


                showStatus(
                    "Oops. The internet tripped over a cable. Please try again.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   9. GO HOME
========================================================= */

function goHome() {

    try {

        history.replaceState(
            null,
            "",
            "#home"
        );

    }
    catch (error) {

        window.location.hash =
            "home";

    }


    const home =
        document.getElementById(
            "home"
        );


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
            top:
                0,

            behavior:
                "smooth"
        });

    }

}


/* =========================================================
   10. SMOOTH NAVIGATION
========================================================= */

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
                        link.getAttribute(
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
                    catch (error) {

                        /* Ignore */

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
   11. MOUSE FOLLOW GLOW
========================================================= */

function createMouseGlow() {

    /*
     * Don't run on touch-only devices.
     */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    const glow =
        document.createElement(
            "div"
        );


    glow.className =
        "mouse-glow";


    glow.style.position =
        "fixed";

    glow.style.width =
        "260px";

    glow.style.height =
        "260px";

    glow.style.borderRadius =
        "50%";

    glow.style.pointerEvents =
        "none";

    glow.style.zIndex =
        "-1";

    glow.style.opacity =
        "0";

    glow.style.filter =
        "blur(70px)";

    glow.style.background =
        "rgba(196,155,39,.10)";

    glow.style.transform =
        "translate(-50%,-50%)";

    glow.style.transition =
        "opacity .4s ease";


    document.body.appendChild(
        glow
    );


    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let currentX =
        mouseX;

    let currentY =
        mouseY;


    window.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            glow.style.opacity =
                "1";

        },
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "mouseleave",
        function () {

            glow.style.opacity =
                "0";

        }
    );


    function animateGlow() {

        currentX +=
            (mouseX - currentX) *
            .08;

        currentY +=
            (mouseY - currentY) *
            .08;


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


/* =========================================================
   12. FLOATING PARTICLES
========================================================= */

function createParticles() {

    /*
     * Respect reduced motion.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "usha-particles";


    container.style.position =
        "fixed";

    container.style.inset =
        "0";

    container.style.pointerEvents =
        "none";

    container.style.overflow =
        "hidden";

    container.style.zIndex =
        "-1";


    document.body.appendChild(
        container
    );


    const particleCount =
        window.innerWidth < 700
            ? 10
            : 18;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        const size =
            Math.random() * 4 + 2;


        const startX =
            Math.random() * 100;


        const startY =
            Math.random() * 100;


        const duration =
            Math.random() * 15 + 12;


        const delay =
            Math.random() * -15;


        particle.style.position =
            "absolute";

        particle.style.left =
            startX + "%";

        particle.style.top =
            startY + "%";

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "rgba(196,155,39,.25)";

        particle.style.boxShadow =
            "0 0 14px rgba(196,155,39,.12)";


        particle.animate(
            [
                {
                    transform:
                        "translate3d(0,0,0) scale(.7)",

                    opacity:
                        0
                },

                {
                    transform:
                        "translate3d(30px,-50px,0) scale(1)",

                    opacity:
                        .7
                },

                {
                    transform:
                        "translate3d(-20px,-120px,0) scale(.5)",

                    opacity:
                        0
                }
            ],
            {
                duration:
                    duration * 1000,

                delay:
                    delay * 1000,

                iterations:
                    Infinity,

                easing:
                    "ease-in-out"
            }
        );


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   13. BUTTON MICRO INTERACTION
========================================================= */

if (submitButton) {

    submitButton.addEventListener(
        "mouseenter",
        function () {

            if (
                submitButton.disabled
            ) {

                return;

            }


            submitButton.style.transform =
                "translateY(-3px)";

        }
    );


    submitButton.addEventListener(
        "mouseleave",
        function () {

            if (
                submitButton.disabled
            ) {

                return;

            }


            submitButton.style.transform =
                "";

        }
    );

}


/* =========================================================
   14. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            if (
                imageInput &&
                imageInput.files &&
                imageInput.files.length
            ) {

                clearImage();

            }

        }

    }
);


/* =========================================================
   15. INITIALIZE
========================================================= */

setButton(
    "default"
);

hideStatus();

clearImage();

createMouseGlow();

createParticles();


/* =========================================================
   16. CONSOLE
========================================================= */

console.log(
    "%c usha.ai ",
    "background:#171717;color:#c49b27;padding:8px 14px;border-radius:7px;font-weight:800;"
);

console.log(
    "Everything is suspiciously normal. 👀"
);
 
