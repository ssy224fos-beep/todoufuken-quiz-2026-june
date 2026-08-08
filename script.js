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

/* ================================
HTML要素
================================ */

const rouletteList = document.getElementById("roulette-list");
const result = document.getElementById("result");
const remainingLabel = document.getElementById("remaining");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const mapBtn = document.getElementById("mapBtn");
const prefectureList = document.getElementById("prefectureList");

/* ================================
残り都道府県数
================================ */

function updateRemaining() {
remainingLabel.textContent =
"残り：" + remaining.length + "都道府県";
}

/* ================================
右側の都道府県一覧
================================ */

function createPrefectureList() {

```
prefectureList.innerHTML = "";

prefectures.forEach(function(prefecture) {

    const item = document.createElement("div");

    item.className = "prefecture-item";

    item.textContent = prefecture;

    item.dataset.prefecture = prefecture;

    prefectureList.appendChild(item);
});
```

}

/* ================================
抽選済み表示
================================ */

function updatePrefectureList() {

```
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
```

}

/* ================================
ルーレット項目作成
================================ */

function createRouletteItems() {

```
rouletteList.innerHTML = "";

const loopList = [
    ...prefectures,
    ...prefectures,
    ...prefectures,
    ...prefectures
];

loopList.forEach(function(prefecture) {

    const div = document.createElement("div");

    div.className = "prefecture";

    div.textContent = prefecture;

    rouletteList.appendChild(div);
});
```

}

/* ================================
初期表示
================================ */

createRouletteItems();

createPrefectureList();

updateRemaining();

updatePrefectureList();

/* ================================
スタート
================================ */

startBtn.addEventListener("click", function() {

```
if (spinning) {
    return;
}

if (remaining.length === 0) {

    result.textContent = "抽選終了！";

    return;
}

spinning = true;

startBtn.disabled = true;


/* 当選する都道府県を決定 */

const winnerIndex =
    Math.floor(
        Math.random() * remaining.length
    );

const winner =
    remaining[winnerIndex];


/* ルーレットを初期位置へ */

rouletteList.style.transition = "none";

rouletteList.style.transform =
    "translateY(0px)";


/* ブラウザに初期状態を反映させる */

void rouletteList.offsetWidth;


/* 1県あたりの高さ */

const itemHeight = 140;


/* 当選県の位置 */

const winnerPosition =
    prefectures.indexOf(winner);


/* 何周するか */

const spinLoops =
    8 + Math.floor(Math.random() * 5);


/* 最終位置 */

const targetPosition =
    (
        spinLoops * prefectures.length
        + winnerPosition
    ) * itemHeight;


/* 回転時間 */

const duration =
    3500 + Math.random() * 1500;


/* ルーレット開始 */

rouletteList.style.transition =
    "transform " +
    duration +
    "ms " +
    "cubic-bezier(0.08, 0.95, 0.15, 1)";

rouletteList.style.transform =
    "translateY(-" +
    targetPosition +
    "px)";


/* 回転終了 */

setTimeout(function() {

    result.textContent = winner;


    /* 当選県をremainingから削除 */

    remaining.splice(winnerIndex, 1);


    /* 表示更新 */

    updateRemaining();

    updatePrefectureList();


    spinning = false;

    startBtn.disabled = false;

}, duration + 100);
```

});

/* ================================
リセット
================================ */

resetBtn.addEventListener("click", function() {

```
if (!confirm("本当にリセットしますか？")) {
    return;
}

remaining = [...prefectures];

updateRemaining();

updatePrefectureList();

result.textContent = "START";

rouletteList.style.transition = "none";

rouletteList.style.transform =
    "translateY(0px)";

spinning = false;

startBtn.disabled = false;
```

});

/* ================================
地図表示ボタン
================================ */

mapBtn.addEventListener("click", function() {

```
/*
 * 日本地図は現在未実装。
 * 第4弾で実装予定。
 */

alert("日本地図機能は今後追加予定です。");
```

});
