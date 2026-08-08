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

/* ========================================
HTML要素
======================================== */

const rouletteList =
document.getElementById("roulette-list");

const result =
document.getElementById("result");

const remainingLabel =
document.getElementById("remaining");

const startBtn =
document.getElementById("startBtn");

const resetBtn =
document.getElementById("resetBtn");

const mapBtn =
document.getElementById("mapBtn");

const prefectureList =
document.getElementById("prefectureList");

/* ========================================
残り県数
======================================== */

function updateRemaining() {

```
remainingLabel.textContent =
    "残り：" +
    remaining.length +
    "都道府県";
```

}

/* ========================================
右側一覧作成
======================================== */

function createPrefectureList() {

```
prefectureList.innerHTML = "";

prefectures.forEach(prefecture => {

    const item =
        document.createElement("div");

    item.className =
        "prefecture-item";

    item.textContent =
        prefecture;

    item.dataset.prefecture =
        prefecture;

    prefectureList.appendChild(item);

});
```

}

/* ========================================
右側一覧更新
======================================== */

function updatePrefectureList() {

```
const items =
    document.querySelectorAll(
        ".prefecture-item"
    );

items.forEach(item => {

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

/* ========================================
ルーレット作成
======================================== */

function createRouletteItems() {

```
rouletteList.innerHTML = "";

const loopList = [
    ...prefectures,
    ...prefectures,
    ...prefectures
];

loopList.forEach(prefecture => {

    const div =
        document.createElement("div");

    div.className =
        "prefecture";

    div.textContent =
        prefecture;

    rouletteList.appendChild(div);

});
```

}

/* ========================================
初期化
======================================== */

createRouletteItems();

createPrefectureList();

updateRemaining();

updatePrefectureList();

/* ========================================
スタート
======================================== */

startBtn.addEventListener(
"click",
() => {

```
    if (spinning) {
        return;
    }


    if (remaining.length === 0) {

        result.textContent =
            "抽選終了！";

        return;
    }


    spinning = true;

    startBtn.disabled = true;


    /* --------------------------------
       当選県を決定
    -------------------------------- */

    const winnerIndex =
        Math.floor(
            Math.random() *
            remaining.length
        );

    const winner =
        remaining[winnerIndex];


    result.textContent = "";


    /* --------------------------------
       ルーレットを初期位置へ
    -------------------------------- */

    rouletteList.style.transition =
        "none";

    rouletteList.style.transform =
        "translateY(0px)";


    void rouletteList.offsetWidth;


    /* --------------------------------
       ルーレット位置
    -------------------------------- */

    const itemHeight = 140;

    const winnerPosition =
        prefectures.indexOf(
            winner
        );


    const spinLoops =
        8 +
        Math.floor(
            Math.random() * 5
        );


    const targetPosition =
        (
            spinLoops *
            prefectures.length
            +
            winnerPosition
        ) *
        itemHeight;


    /* --------------------------------
       回転時間
    -------------------------------- */

    const duration =
        3000 +
        Math.random() * 2000;


    /* --------------------------------
       アニメーション
    -------------------------------- */

    rouletteList.style.transition =
        "transform " +
        duration +
        "ms " +
        "cubic-bezier(0.08,0.95,0.15,1)";


    rouletteList.style.transform =
        "translateY(-" +
        targetPosition +
        "px)";


    /* --------------------------------
       抽選終了
    -------------------------------- */

    setTimeout(
        () => {

            result.textContent =
                winner;


            /*
             * 結果アニメーション
             */

            result.classList.remove(
                "result-show"
            );

            void result.offsetWidth;

            result.classList.add(
                "result-show"
            );


            /*
             * 当選県を削除
             */

            remaining.splice(
                winnerIndex,
                1
            );


            updateRemaining();

            updatePrefectureList();


            spinning = false;

            startBtn.disabled = false;

        },
        duration + 50
    );

}
```

);

/* ========================================
リセット
======================================== */

resetBtn.addEventListener(
"click",
() => {

```
    if (
        !confirm(
            "本当にリセットしますか？"
        )
    ) {
        return;
    }


    remaining =
        [...prefectures];


    updateRemaining();

    updatePrefectureList();


    result.textContent =
        "START";


    result.classList.remove(
        "result-show"
    );


    rouletteList.style.transition =
        "none";

    rouletteList.style.transform =
        "translateY(0px)";


    spinning = false;

    startBtn.disabled = false;

}
```

);

/* ========================================
地図ボタン
======================================== */

mapBtn.addEventListener(
"click",
() => {

```
    /*
     * 現在は地図未実装。
     * 第4弾で日本地図を追加する予定。
     */

    alert(
        "日本地図機能は今後追加予定です。"
    );

}
```

);
