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
    "残り：" + remaining.length + "県";
```

}

/* ========================================
都道府県一覧を作成
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

    /*
     * 都道府県名を後から検索できるようにする
     */
    item.dataset.prefecture =
        prefecture;

    prefectureList.appendChild(item);
});
```

}

/* ========================================
抽選済み県をグレーアウト
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

function buildRoulette() {

```
rouletteList.innerHTML = "";

/*
 * 十分な回転距離を確保
 */
for (let loop = 0; loop < 20; loop++) {

    prefectures.forEach(prefecture => {

        const div =
            document.createElement("div");

        div.className =
            "prefecture";

        div.textContent =
            prefecture;

        rouletteList.appendChild(div);

    });

}
```

}

/* ========================================
初期化
======================================== */

buildRoulette();

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


    /*
     * 残っている県からランダム選択
     */
    const winnerIndex =
        Math.floor(
            Math.random() *
            remaining.length
        );

    const winner =
        remaining[winnerIndex];


    result.textContent = "";


    /*
     * ルーレットを先頭へ戻す
     */
    rouletteList.style.transition =
        "none";

    rouletteList.style.transform =
        "translateY(0px)";


    /*
     * ブラウザに一度描画させる
     */
    void rouletteList.offsetWidth;


    const itemHeight = 140;


    /*
     * 何周するか
     */
    const spinLoops =
        10 +
        Math.floor(
            Math.random() * 6
        );


    /*
     * 当選県の位置
     */
    const winnerPosition =
        prefectures.indexOf(
            winner
        );


    const targetPosition =
        (
            spinLoops *
            prefectures.length
            +
            winnerPosition
        ) *
        itemHeight;


    /*
     * 3〜6秒
     */
    const duration =
        3000 +
        Math.random() * 3000;


    /*
     * 徐々に減速
     */
    rouletteList.style.transition =
        "transform " +
        duration +
        "ms " +
        "cubic-bezier(0.08,0.95,0.15,1)";


    rouletteList.style.transform =
        "translateY(-" +
        targetPosition +
        "px)";


    /*
     * 抽選終了
     */
    setTimeout(
        () => {

            result.textContent =
                winner;


            result.classList.remove(
                "show"
            );

            void result.offsetWidth;

            result.classList.add(
                "show"
            );


            /*
             * 当選県を削除
             */
            remaining.splice(
                winnerIndex,
                1
            );


            updateRemaining();

            /*
             * 右側一覧を更新
             */
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


    /*
     * 47県を復活
     */
    remaining =
        [...prefectures];


    updateRemaining();

    updatePrefectureList();


    result.textContent =
        "START";


    /*
     * ルーレットを初期位置へ
     */
    rouletteList.style.transition =
        "none";

    rouletteList.style.transform =
        "translateY(0px)";

}
```

);

/* ========================================
地図表示 ON / OFF
======================================== */

mapBtn.addEventListener(
"click",
() => {

```
    const mapArea =
        document.getElementById(
            "mapArea"
        );

    mapArea.classList.toggle(
        "hidden"
    );

}
```

);

console.log(
"47都道府県ルーレット Loaded"
);
