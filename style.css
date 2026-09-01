```css
/* =========================================================
   USHA.AI — SUBTLE BACKGROUND ANIMATION
========================================================= */

body {
    position: relative;
    isolation: isolate;
}


/* Soft animated glow */

body::before,
body::after {
    content: "";
    position: fixed;

    width: 420px;
    height: 420px;

    border-radius: 50%;

    pointer-events: none;

    z-index: -1;

    filter: blur(90px);

    opacity: .14;
}


/* Golden glow */

body::before {
    top: -180px;
    right: -120px;

    background: #c49b27;

    animation:
        floatingGlowOne
        14s
        ease-in-out
        infinite alternate;
}


/* Soft neutral glow */

body::after {
    bottom: -180px;
    left: -120px;

    background: #d8d2c3;

    animation:
        floatingGlowTwo
        18s
        ease-in-out
        infinite alternate;
}


/* First movement */

@keyframes floatingGlowOne {

    0% {
        transform:
            translate3d(
                0,
                0,
                0
            )
            scale(1);
    }

    50% {
        transform:
            translate3d(
                -80px,
                90px,
                0
            )
            scale(1.15);
    }

    100% {
        transform:
            translate3d(
                -30px,
                160px,
                0
            )
            scale(.92);
    }

}


/* Second movement */

@keyframes floatingGlowTwo {

    0% {
        transform:
            translate3d(
                0,
                0,
                0
            )
            scale(1);
    }

    50% {
        transform:
            translate3d(
                90px,
                -70px,
                0
            )
            scale(1.12);
    }

    100% {
        transform:
            translate3d(
                150px,
                -130px,
                0
            )
            scale(.9);
    }

}


/* =========================================================
   FLOATING GOLD DOTS
========================================================= */

.hero {
    position: relative;
    overflow: hidden;
}


.hero::before {
    content: "";

    position: absolute;

    width: 6px;
    height: 6px;

    top: 23%;
    right: 16%;

    border-radius: 50%;

    background: #c49b27;

    opacity: .5;

    box-shadow:
        120px 80px 0 rgba(196,155,39,.28),
        -180px 180px 0 rgba(196,155,39,.18),
        250px -100px 0 rgba(196,155,39,.22),
        -300px -60px 0 rgba(196,155,39,.14);

    animation:
        floatingDots
        9s
        ease-in-out
        infinite alternate;
}


@keyframes floatingDots {

    0% {
        transform:
            translateY(0)
            rotate(0deg);
        opacity: .3;
    }

    50% {
        transform:
            translateY(-20px)
            rotate(8deg);
        opacity: .6;
    }

    100% {
        transform:
            translateY(15px)
            rotate(-5deg);
        opacity: .35;
    }

}


/* =========================================================
   VERY SUBTLE GRID
========================================================= */

.hero-inner {
    position: relative;
}


.hero-inner::before {
    content: "";

    position: absolute;

    inset:
        -80px -20px;

    z-index: -1;

    pointer-events: none;

    background-image:
        linear-gradient(
            rgba(196,155,39,.045) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(196,155,39,.045) 1px,
            transparent 1px
        );

    background-size:
        55px 55px;

    mask-image:
        radial-gradient(
            ellipse at center,
            black 0%,
            transparent 70%
        );

    -webkit-mask-image:
        radial-gradient(
            ellipse at center,
            black 0%,
            transparent 70%
        );

    animation:
        gridMove
        25s
        linear
        infinite;
}


@keyframes gridMove {

    from {
        transform:
            translate3d(
                0,
                0,
                0
            );
    }

    to {
        transform:
            translate3d(
                55px,
                55px,
                0
            );
    }

}


/* =========================================================
   MOBILE OPTIMIZATION
========================================================= */

@media (max-width: 680px) {

    body::before,
    body::after {

        width: 280px;
        height: 280px;

        filter: blur(70px);

        opacity: .10;

    }


    .hero-inner::before {

        background-size:
            42px 42px;

    }

}


/* =========================================================
   ACCESSIBILITY
========================================================= */

@media (prefers-reduced-motion: reduce) {

    body::before,
    body::after,
    .hero::before,
    .hero-inner::before {

        animation: none;

    }

}
```
