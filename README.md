# Awesome Beskid Camera ⛰️📷

**Awesome Beskid Camera** to lekka, otwarta strona agregująca **kamery na żywo z Beskidu Śląskiego i Beskidu Żywieckiego** — w jednym miejscu, bez reklam, bez śledzenia, bez zbędnego balastu.

Projekt powstał na prywatny użytek:
- MTB / Enduro 🚵
- narty i snowboard 🎿
- turystyka górska

---

## 🚀 Demo ;)
👉 **[maxbmx.github.io/awesome-beskid-camera](https://maxbmx.github.io/awesome-beskid-camera/)**

---

## 🛠️ Jak to działa

Strona statyczna bez budowania: `index.html`, `app.css`, `app.js`, `service-worker.js`.

**Dodanie kamery:** jedna linia w tablicy `CAMERAS` na górze `app.js`
(`cat`: `bike` / `snow` / `weather`, `region`: jak w filtrach miejsca albo `''`).
Kafel i lista dla wyszukiwarek powstają z niej same.

**Podgląd lokalnie:** `python3 -m http.server 8765`

**Lint (wymaga Node.js):** `npx @biomejs/biome check app.js app.css service-worker.js manifest.json`

---

## 💬 Dyskusje i pomysły
👉 **Otwórz Issue**
👉 **Zaproponuj zmianę w PR (Pull Request)**
👉 **Dyskutujmy na GitHubie**

---

## ⚖️ Prawa autorskie

Wszystkie obrazy pochodzą z kamer należących do **podmiotów trzecich** są jedynie podlinkowane.
Projekt:
- **nie kopiuje**
- **nie zapisuje**
- **nie retransmituje**
- **nie monetyzuje** transmisji

Strona działa wyłącznie jako **agregator embedów** na użytek prywatny.

---

## 👤 Autor

**Maksymilian Śleziak**
📧 maksymilian.sleziak@ageno.pl

Projekt tworzony z pasji do gór.
