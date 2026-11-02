
/* =====================================
   ROYALE – HOME MENÜ
   Datei: spielen.js
===================================== */

const homePage = document.getElementById("home");

homePage.innerHTML = `

    <div class="home-background"></div>

    <div class="home-content">

        <div class="home-season">
            ROYALE ORIGINAL
        </div>

        <h1 class="home-title">
            ROYALE
        </h1>

        <p class="home-subtitle">
            KÄMPFE. ÜBERLEBE. GEWINNE.
        </p>

        <button class="home-play-button" id="startGameButton">
            SPIELEN
        </button>

        <div class="home-mode">
            BATTLE ROYALE
        </div>

    </div>

    <div class="home-version">
        ROYALE • ALPHA
    </div>

`;


/* =====================================
   HOME MENÜ STYLING
===================================== */

const style = document.createElement("style");

style.textContent = `

#home {
    position: relative;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    background:
        radial-gradient(ellipse at 50% 85%,
        #65350e 0%,
        #291707 30%,
        #0c0c0c 75%);
}

.home-background {
    position: absolute;
    inset: 0;
    background:
        linear-gradient(
            180deg,
            transparent 30%,
            rgba(0,0,0,.5) 100%
        );
    pointer-events: none;
}

.home-content {
    position: relative;
    z-index: 2;
    animation: royaleIntro 0.8s ease;
}

.home-season {
    color: #ff9b28;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 5px;
    margin-bottom: 15px;
}

.home-title {
    font-size: clamp(65px, 11vw, 120px);
    font-weight: 1000;
    letter-spacing: 8px;
    color: white;
    text-shadow:
        0 5px 0 #a94f00,
        0 12px 30px #000;
}

.home-subtitle {
    margin-top: 12px;
    color: #c5c5c5;
    font-size: 14px;
    letter-spacing: 3px;
}

.home-play-button {
    margin-top: 45px;
    padding: 19px 75px;
    background: #ff9000;
    color: #111;
    border: none;
    border-radius: 4px;
    font-size: 19px;
    font-weight: 1000;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0 5px 25px #ff900044;
}

.home-play-button:hover {
    background: #ffb13b;
    transform: scale(1.06);
}

.home-play-button:active {
    transform: scale(.97);
}

.home-mode {
    margin-top: 22px;
    color: #888;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 4px;
}

.home-version {
    position: absolute;
    bottom: 20px;
    right: 25px;
    color: #666;
    font-size: 11px;
    letter-spacing: 2px;
}

@keyframes royaleIntro {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media(max-width:600px) {
    .home-title {
        letter-spacing: 4px;
    }

    .home-play-button {
        padding: 17px 55px;
    }
}

`;

document.head.appendChild(style);


/* =====================================
   SPIEL STARTEN
===================================== */

document.getElementById("startGameButton")
.addEventListener("click", () => {

    // Hier wird später die eigentliche Spielwelt geladen.
    alert("ROYALE – Die Spielwelt wird vorbereitet!");

});
