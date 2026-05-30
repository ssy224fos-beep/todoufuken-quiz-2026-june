```javascript
const prefectures = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県",
    "岐阜県","静岡県","愛知県","三重県",
    "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
    "鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県",
    "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県",
    "沖縄県"
];

let remaining = [...prefectures];
let spinning = false;

const rouletteList = document.getElementById("roulette-list");
const result = document.getElementById("result");
const remainingLabel = document.getElementById("remaining");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const mapBtn = document.getElementById("mapBtn");

function updateRemaining() {
    remainingLabel.textContent = "残り：" + remaining.length + "県";
}

function createRouletteItems() {

    rouletteList.innerHTML = "";

    const displayList = [...prefectures, ...prefectures, ...prefectures];

    displayList.forEach(pref => {
        const div = document.createElement("div");
        div.className = "prefecture";
        div.textContent = pref;
        rouletteList.appendChild(div);
    });
}

createRouletteItems();
updateRemaining();

startBtn.addEventListener("click", () => {

    if (spinning) {
        return;
    }

    if (remaining.length === 0) {
        result.textContent = "抽選終了！";
        return;
    }

    spinning = true;

    startBtn.disabled = true;

    const winnerIndex = Math.floor(Math.random() * remaining.length);
    const winner = remaining[winnerIndex];

    result.textContent = "";

    rouletteList.style.transition = "none";
    rouletteList.style.transform = "translateY(0px)";

    void rouletteList.offsetWidth;

    const duration = 3000 + Math.random() * 3000;

    const itemHeight = 140;

    const visualIndex =
        prefectures.length +
        prefectures.indexOf(winner);

    const targetY = visualIndex * itemHeight;

    rouletteList.style.transition =
        "transform " + duration + "ms cubic-bezier(0.15,0.85,0.15,1)";

    rouletteList.style.transform =
        "translateY(-" + targetY + "px)";

    setTimeout(() => {

        result.textContent = winner;

        result.classList.remove("show");
        void result.offsetWidth;
        result.classList.add("show");

        remaining.splice(winnerIndex, 1);

        updateRemaining();

        spinning = false;
        startBtn.disabled = false;

    }, duration + 100);

});

resetBtn.addEventListener("click", () => {

    const ok = confirm("本当にリセットしますか？");

    if (!ok) {
        return;
    }

    remaining = [...prefectures];

    updateRemaining();

    result.textContent = "START";

    rouletteList.style.transition = "none";
    rouletteList.style.transform = "translateY(0px)";

});

mapBtn.addEventListener("click", () => {

    const mapArea = document.getElementById("mapArea");

    mapArea.classList.toggle("hidden");

});

console.log("Roulette Loaded");
```
