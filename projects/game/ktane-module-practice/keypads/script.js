const images = {
    copyright: "../assets/keypads/1-copyright.webp",
    filledstar: "../assets/keypads/2-filledstar.webp",
    hollowstar: "../assets/keypads/3-hollowstar.webp",
    smileyface: "../assets/keypads/4-smileyface.webp",
    doublek: "../assets/keypads/5-doublek.webp",
    omega: "../assets/keypads/6-omega.webp",
    squidknife: "../assets/keypads/7-squidknife.webp",
    pumpkin: "../assets/keypads/8-pumpkin.webp",
    hookn: "../assets/keypads/9-hookn.webp",
    six: "../assets/keypads/10-six.webp",
    squigglyn: "../assets/keypads/11-squigglyn.webp",
    at: "../assets/keypads/12-at.webp",
    ae: "../assets/keypads/13-ae.webp",
    meltedthree: "../assets/keypads/14-meltedthree.webp",
    euro: "../assets/keypads/15-euro.webp",
    nwithhat: "../assets/keypads/16-nwithhat.webp",
    dragon: "../assets/keypads/17-dragon.webp",
    questionmark: "../assets/keypads/18-questionmark.webp",
    paragraph: "../assets/keypads/19-paragraph.webp",
    rightc: "../assets/keypads/20-rightc.webp",
    leftc: "../assets/keypads/21-leftc.webp",
    pitchfork: "../assets/keypads/22-pitchfork.webp",
    cursive: "../assets/keypads/23-cursive.webp",
    tracks: "../assets/keypads/24-tracks.webp",
    balloon: "../assets/keypads/25-balloon.webp",
    upsidedowny: "../assets/keypads/26-upsidedowny.webp",
    bt: "../assets/keypads/27-bt.webp",
};

Object.values(images).forEach(src => {
    const img = new Image();
    img.src = src;
});

const columns = [
    ["balloon", "at", "upsidedowny", "squigglyn", "squidknife", "hookn", "leftc"],
    ["euro", "balloon", "leftc", "cursive", "hollowstar", "hookn", "questionmark"],
    ["copyright", "pumpkin", "cursive", "doublek", "meltedthree", "upsidedowny", "hollowstar"],
    ["six", "paragraph", "bt", "squidknife", "doublek", "questionmark", "smileyface"],
    ["pitchfork", "smileyface", "bt", "rightc", "paragraph", "dragon", "filledstar"],
    ["six", "euro", "tracks", "ae", "pitchfork", "nwithhat", "omega"]
];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateGame() {
    const column = columns[getRndInteger(0, columns.length - 1)];
    const shuffled = [...column].sort(() => Math.random() - 0.5);
    const keypadData = [];
    const keypadCount = 4;

    for (let i = 0; i < keypadCount; i++) {
        const symbol = shuffled[i];
        const keypad = document.getElementById(`keypad${i}`);

        keypad.style.maskImage = `url("${images[symbol]}")`;
        keypadData.push([symbol, keypad]);
    };
    return {
        keypadData,
        keypadCount,
        column
    };
};

let gameData;

function isGameWon(winState) {
    const overlay = document.getElementById("game-overlay");
    if (winState) {
        overlay.style.backgroundColor = "#8fc587"
    } else {
        overlay.style.backgroundColor = "#d95e59"
    }
    overlay.classList.remove("flash");

    void overlay.offsetWidth;
    overlay.classList.add("flash");

    setTimeout(() => {
        resetGame();
    }, 300);
};

let nextKeypad;
function resetGame() {
    gameData = generateGame();
    nextKeypad = 0;

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";

    for (let i = 0; i < gameData.keypadCount; i++) {
        const keypad = document.getElementById(`keypad${i}`);
        const container = keypad.parentElement;

        container.style.backgroundColor = "#363647";
    };

    gameData.keypadData.sort(
        (a, b) =>
            gameData.column.indexOf(a[0]) -
            gameData.column.indexOf(b[0])
    );
};

function gameLogic() {
    for (let i = 0; i < gameData.keypadCount; i++) {
        const keypad = document.getElementById(`keypad${i}`);
        const container = keypad.parentElement;

        keypad.addEventListener("click", () => {
            const expectedKeypad = gameData.keypadData[nextKeypad][1];

            if (keypad == expectedKeypad) {
                nextKeypad++
                container.style.backgroundColor = "#8fc587"

                if (nextKeypad == gameData.keypadCount) {
                    isGameWon(true)
                };
            } else {
                isGameWon(false)
                console.log(gameData)
            }
            console.log([keypad, expectedKeypad])
        });
    };
};

resetGame();
gameLogic();
