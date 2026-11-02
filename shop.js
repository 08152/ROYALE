// ROYALE – SHOP
// Erstellt das Shop-Fenster und zeigt die verfügbaren Artikel an.

(() => {
    const style = document.createElement("style");

    style.textContent = `
        #royale-shop-button {
            padding: 13px 28px;
            background: linear-gradient(135deg, #ffb900, #ff7800);
            color: white;
            border: none;
            border-radius: 7px;
            font-size: 17px;
            font-weight: 900;
            cursor: pointer;
            margin: 10px;
            transition: 0.2s;
        }

        #royale-shop-button:hover {
            transform: scale(1.05);
            filter: brightness(1.15);
        }

        #royale-shop-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(7px);
            padding: 20px;
        }

        #royale-shop-window {
            width: 900px;
            max-width: 100%;
            min-height: 420px;
            max-height: 85vh;
            overflow-y: auto;
            background: #17191f;
            border: 2px solid #343944;
            border-radius: 14px;
            padding: 25px;
            color: white;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        }

        .royale-shop-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #3b3f49;
            padding-bottom: 15px;
        }

        .royale-shop-header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 1000;
        }

        #royale-shop-close {
            background: #30343d;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 16px;
            font-size: 20px;
            cursor: pointer;
        }

        #royale-shop-content {
            min-height: 280px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .royale-shop-empty h2 {
            font-size: 27px;
            margin-bottom: 10px;
        }

        .royale-shop-empty p {
            color: #a9adb8;
            font-size: 15px;
        }

        .royale-shop-item {
            background: #242832;
            border: 1px solid #3a404d;
            border-radius: 10px;
            padding: 18px;
        }

        .royale-shop-item button {
            width: 100%;
            padding: 11px;
            background: #f5a900;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }

        .royale-shop-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            width: 100%;
            align-self: flex-start;
            margin-top: 20px;
        }
    `;

    document.head.appendChild(style);

    function createShop() {
        const home = document.getElementById("home");

        if (!home) {
            console.error("ROYALE: #home wurde nicht gefunden.");
            return;
        }

        if (document.getElementById("royale-shop-button")) return;

        const button = document.createElement("button");
        button.id = "royale-shop-button";
        button.textContent = "🛒 SHOP";

        button.addEventListener("click", openShop);

        home.appendChild(button);

        const overlay = document.createElement("div");
        overlay.id = "royale-shop-overlay";

        overlay.innerHTML = `
            <div id="royale-shop-window">
                <div class="royale-shop-header">
                    <h1>🛒 SHOP</h1>
                    <button id="royale-shop-close">✕</button>
                </div>

                <div id="royale-shop-content"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector("#royale-shop-close")
            .addEventListener("click", closeShop);

        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeShop();
        });
    }

    function openShop() {
        const overlay = document.getElementById("royale-shop-overlay");

        if (!overlay) return;

        overlay.style.display = "flex";
        renderShop();
    }

    function closeShop() {
        const overlay = document.getElementById("royale-shop-overlay");

        if (overlay) {
            overlay.style.display = "none";
        }
    }

    function renderShop() {
        const content = document.getElementById("royale-shop-content");
        const articles = window.ROYALE_ARTIKEL || [];

        if (!articles.length) {
            content.innerHTML = `
                <div class="royale-shop-empty">
                    <h2>Der Shop ist momentan leer.</h2>
                    <p>Neue Artikel werden bald verfügbar sein.</p>
                </div>
            `;
            return;
        }

        content.innerHTML = `
            <div class="royale-shop-grid">
                ${articles.map(article => `
                    <div class="royale-shop-item">
                        <div style="font-size:55px">${article.icon || "🎁"}</div>
                        <h3>${escapeHTML(article.name)}</h3>
                        <p>${escapeHTML(article.description || "")}</p>
                        <p>🪙 ${Number(article.price).toLocaleString("de-DE")}</p>
                        <button data-item="${escapeHTML(article.id)}">
                            KAUFEN
                        </button>
                    </div>
                `).join("")}
            </div>
        `;

        content.querySelectorAll("[data-item]").forEach(button => {
            button.addEventListener("click", () => {
                alert("Das Kaufsystem wird später eingerichtet.");
            });
        });
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createShop);
    } else {
        createShop();
    }
})();
