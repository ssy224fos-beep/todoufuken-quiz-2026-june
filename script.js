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
const prefectureList = document.getElementById("prefectureList");

function updateRemaining() {
    remainingLabel.textContent =
        "残り：" + remaining.length + "都道府県";
}

function createPrefectureList() {
    prefectureList.innerHTML = "";

    prefectures.forEach(function(prefecture) {
        const item = document.createElement("div");

        item.className = "prefecture-item";
        item.textContent = prefecture;
        item.dataset.prefecture = prefecture;

        prefectureList.appendChild(item);
    });
}

function updatePrefectureList() {
    const items =
        document.querySelectorAll(".prefecture-item");

    items.forEach(function(item) {
        const prefecture =
            item.dataset.prefecture;

        if (remaining.includes(prefecture)) {
            item.classList.remove("used");
        } else {
            item.classList.add("used");
        }
    });
}

function createRouletteItems() {
    rouletteList.innerHTML = "";

    const loopList = [];

    for (let i = 0; i < 8; i++) {
        prefectures.forEach(function(prefecture) {
            loopList.push(prefecture);
        });
    }

    loopList.forEach(function(prefecture) {
        const div = document.createElement("div");

        div.className = "prefecture";
        div.textContent = prefecture;

        rouletteList.appendChild(div);
    });
}

createRouletteItems();
createPrefectureList();
updateRemaining();
updatePrefectureList();

startBtn.addEventListener("click", function() {

    if (spinning) {
        return;
    }

    if (remaining.length === 0) {
        result.textContent = "抽選終了！";
        return;
    }

    spinning = true;
    startBtn.disabled = true;

    result.classList.remove("result-show");

    const winnerIndex =
        Math.floor(
            Math.random() * remaining.length
        );

    const winner =
        remaining[winnerIndex];

    const item =
        document.querySelector(".prefecture");

    const itemHeight =
        item.offsetHeight;

    const winnerPosition =
        prefectures.indexOf(winner);

    const listLength =
        prefectures.length;

    const spinLoops =
        5 + Math.floor(Math.random() * 3);

    const targetIndex =
        spinLoops * listLength +
        winnerPosition;

    const targetPosition =
        targetIndex * itemHeight;

    const duration =
        4500 + Math.random() * 1500;

    rouletteList.style.transition = "none";

    rouletteList.style.transform =
        "translateY(0px)";

    void rouletteList.offsetWidth;

    rouletteList.style.transition =
        "transform " +
        duration +
        "ms " +
        "cubic-bezier(0.12, 0.85, 0.18, 1)";

    rouletteList.style.transform =
        "translateY(-" +
        targetPosition +
        "px)";

    setTimeout(function() {

        result.textContent = winner;

        result.classList.remove("result-show");

        void result.offsetWidth;

        result.classList.add("result-show");

        remaining.splice(
            winnerIndex,
            1
        );

        updateRemaining();
        updatePrefectureList();

        spinning = false;
        startBtn.disabled = false;

    }, duration + 100);
});

resetBtn.addEventListener("click", function() {

    if (!confirm("本当にリセットしますか？")) {
        return;
    }

    remaining = [...prefectures];

    updateRemaining();
    updatePrefectureList();

    result.textContent = "START";

    result.classList.remove("result-show");

    rouletteList.style.transition = "none";

    rouletteList.style.transform =
        "translateY(0px)";

    spinning = false;
    startBtn.disabled = false;
});

mapBtn.addEventListener("click", function() {

    alert("日本地図機能は今後追加予定です。");

});