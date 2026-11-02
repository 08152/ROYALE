
/* =========================================
   ROYALE – COIN-CODE-SYSTEM
   Datei: einloesen.js
========================================= */

const redeemPage = document.getElementById("redeem");

redeemPage.innerHTML = `
    <div class="panel">

        <h1>COIN-KARTE EINLÖSEN</h1>

        <p>
            Gib den Code deiner ROYALE-Coin-Karte ein.
            Wir überprüfen ihn automatisch.
        </p>

        <input
            class="code-input"
            id="coinCodeInput"
            type="text"
            maxlength="40"
            placeholder="COIN-CODE"
            autocomplete="off"
        >

        <button class="action-button" id="redeemCoinButton">
            CODE ÜBERPRÜFEN
        </button>

        <div id="redeemResult" class="result">
            Warte auf deinen Code ...
        </div>

        <div class="coin-balance">
            <span>DEIN KONTOSTAND</span>
            <strong id="coinBalance">0</strong>
            <span>COINS</span>
        </div>

    </div>
`;


// =========================================
// DESIGN
// =========================================

const redeemStyle = document.createElement("style");

redeemStyle.textContent = `
.coin-balance {
    margin-top: 25px;
    padding: 18px;
    background: #202020;
    border: 1px solid #393939;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
}

.coin-balance span {
    color: #999;
    font-size: 11px;
    letter-spacing: 2px;
}

.coin-balance strong {
    color: #ffae22;
    font-size: 35px;
}

#redeemResult.success {
    color: #75e59a;
}

#redeemResult.error {
    color: #ff6666;
}

#redeemCoinButton:disabled {
    opacity: .5;
    cursor: wait;
}
`;

document.head.appendChild(redeemStyle);


// =========================================
// COIN-KONTO
// =========================================

function getCoinBalance() {
    return Number(localStorage.getItem("royaleCoins") || 0);
}

function updateCoinBalance() {
    document.getElementById("coinBalance").textContent =
        getCoinBalance().toLocaleString("de-DE");
}

updateCoinBalance();


// =========================================
// CODE EINLÖSEN
// =========================================

async function redeemCoinCode() {

    const input = document.getElementById("coinCodeInput");
    const button = document.getElementById("redeemCoinButton");
    const result = document.getElementById("redeemResult");

    const code = input.value.trim().toUpperCase();

    if (!code) {
        showResult("Bitte gib einen Code ein.", "error");
        return;
    }

    button.disabled = true;
    showResult("Code wird überprüft ...", "");

    try {

        // Erlaubte Codes aus pin.html laden
        const response = await fetch("pin.html", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("PIN-Datei konnte nicht geladen werden.");
        }

        const html = await response.text();

        const documentHTML = new DOMParser().parseFromString(
            html,
            "text/html"
        );

        const codeElement = documentHTML.getElementById("royale-codes");

        if (!codeElement) {
            throw new Error("Keine Code-Liste in pin.html gefunden.");
        }

        const acceptedCodes = JSON.parse(codeElement.textContent);

        // Code suchen
        const coinAmount = acceptedCodes[code];

        if (typeof coinAmount !== "number" || coinAmount <= 0) {
            showResult("CODE ABGELEHNT – Dieser Code ist ungültig.", "error");
            return;
        }

        // Bereits eingelöste Codes prüfen
        const usedCodes = JSON.parse(
            localStorage.getItem("royaleUsedCodes") || "[]"
        );

        if (usedCodes.includes(code)) {
            showResult("CODE GESPERRT – Dieser Code wurde bereits eingelöst.", "error");
            return;
        }

        // Coins gutschreiben
        const newBalance = getCoinBalance() + coinAmount;

        localStorage.setItem("royaleCoins", String(newBalance));

        // Code als eingelöst markieren
        usedCodes.push(code);

        localStorage.setItem(
            "royaleUsedCodes",
            JSON.stringify(usedCodes)
        );

        updateCoinBalance();

        showResult(
            "CODE GENEHMIGT! +" +
            coinAmount.toLocaleString("de-DE") +
            " COINS",
            "success"
        );

        input.value = "";

    } catch (error) {

        console.error(error);

        showResult(
            "ÜBERPRÜFUNG NICHT MÖGLICH – Bitte später erneut versuchen.",
            "error"
        );

    } finally {

        button.disabled = false;

    }
}


// =========================================
// ERGEBNIS ANZEIGEN
// =========================================

function showResult(message, type) {

    const result = document.getElementById("redeemResult");

    result.textContent = message;
    result.className = "result " + type;
}


// =========================================
// BUTTON
// =========================================

document.getElementById("redeemCoinButton")
    .addEventListener("click", redeemCoinCode);

document.getElementById("coinCodeInput")
    .addEventListener("keydown", event => {

        if (event.key === "Enter") {
            redeemCoinCode();
        }

    });
