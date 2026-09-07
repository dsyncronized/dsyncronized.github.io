const topDisplayWords = {
    blank: "BLANK",
    c: "C",
    cee: "CEE",
    display: "DISPLAY",
    first: "FIRST",
    holdOn: "HOLD ON",
    lead: "LEAD",
    led: "LED",
    leed: "LEED",
    no: "NO",
    nothing: "NOTHING",
    okay: "OKAY",
    read: "READ",
    red: "RED",
    reed: "REED",
    says: "SAYS",
    see: "SEE",
    their: "THEIR",
    there: "THERE",
    theyAre: "THEY ARE",
    theyre: "THEY'RE",
    ur: "UR",
    yes: "YES",
    youAre: "YOU ARE",
    your: "YOUR",
    youre: "YOU'RE",
    empty: "",
};

const words = ["READY", "YES", "OKAY", "WHAT", "MIDDLE", "LEFT", "PRESS", "RIGHT", "BLANK", "FIRST", "NO", "NOTHING", "UHHH", "WAIT", "YOU", "SURE", "YOU ARE", "YOUR", "YOU'RE", "NEXT", "UH HUH", "UR", "HOLD", "WHAT?", "DONE", "LIKE", "UH UH", "U"]

const wordSequence = {
    "READY": ["YES", "OKAY", "WHAT", "MIDDLE", "LEFT", "PRESS", "RIGHT", "BLANK", "READY"],
    "FIRST": ["LEFT", "OKAY", "YES", "MIDDLE", "NO", "RIGHT", "NOTHING", "UHHH", "WAIT", "READY", "BLANK", "WHAT", "PRESS", "FIRST"],
    "NO": ["BLANK", "UHHH", "WAIT", "FIRST", "WHAT", "READY", "RIGHT", "YES", "NOTHING", "LEFT", "PRESS", "OKAY", "NO"],
    "BLANK": ["WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK"],
    "NOTHING": ["UHHH", "RIGHT", "OKAY", "MIDDLE", "YES", "BLANK", "NO", "PRESS", "LEFT", "WHAT", "WAIT", "FIRST", "NOTHING"],
    "YES": ["OKAY", "RIGHT", "UHHH", "MIDDLE", "FIRST", "WHAT", "PRESS", "READY", "NOTHING", "YES"],
    "WHAT": ["UHHH", "WHAT"],
    "UHHH": ["READY", "NOTHING", "LEFT", "WHAT", "OKAY", "YES", "RIGHT", "NO", "PRESS", "BLANK", "UHHH"],
    "LEFT": ["RIGHT", "LEFT"],
    "RIGHT": ["YES", "NOTHING", "READY", "PRESS", "NO", "WAIT", "WHAT", "RIGHT"],
    "MIDDLE": ["BLANK", "READY", "OKAY", "WHAT", "NOTHING", "PRESS", "NO", "WAIT", "LEFT", "MIDDLE"],
    "OKAY": ["MIDDLE", "NO", "FIRST", "YES", "UHHH", "NOTHING", "WAIT", "OKAY"],
    "WAIT": ["UHHH", "NO", "BLANK", "OKAY", "YES", "LEFT", "FIRST", "PRESS", "WHAT", "WAIT"],
    "PRESS": ["RIGHT", "MIDDLE", "YES", "READY", "PRESS"],
    "YOU": ["SURE", "YOU ARE", "YOUR", "YOU'RE", "NEXT", "UH HUH", "UR", "HOLD", "WHAT?", "YOU"],
    "YOU ARE": ["YOUR", "NEXT", "LIKE", "UH HUH", "WHAT?", "DONE", "UH UH", "HOLD", "YOU", "U", "YOU'RE", "SURE", "UR", "YOU ARE"],
    "YOUR": ["UH UH", "YOU ARE", "UH HUH", "YOUR"],
    "YOU'RE": ["YOU", "YOU'RE"],
    "UR": ["DONE", "U", "UR"],
    "U": ["UH HUH", "SURE", "NEXT", "WHAT?", "YOU'RE", "UR", "UH UH", "DONE", "U"],
    "UH HUH": ["UH HUH"],
    "UH UH": ["UR", "U", "YOU ARE", "YOU'RE", "NEXT", "UH UH"],
    "WHAT?": ["YOU", "HOLD", "YOU'RE", "YOUR", "U", "DONE", "UH UH", "LIKE", "YOU ARE", "UH HUH", "UR", "NEXT", "WHAT?"],
    "DONE": ["SURE", "UH HUH", "NEXT", "WHAT?", "YOUR", "UR", "YOU'RE", "HOLD", "LIKE", "YOU", "U", "YOU ARE", "UH UH", "DONE"],
    "NEXT": ["WHAT?", "UH HUH", "UH UH", "YOUR", "HOLD", "SURE", "NEXT"],
    "HOLD": ["YOU ARE", "U", "DONE", "UH UH", "YOU", "UR", "SURE", "WHAT?", "YOU'RE", "NEXT", "HOLD"],
    "SURE": ["YOU ARE", "DONE", "LIKE", "YOU'RE", "YOU", "HOLD", "UH HUH", "UR", "SURE"],
    "LIKE": ["YOU'RE", "NEXT", "U", "UR", "HOLD", "DONE", "UH UH", "WHAT?", "UH HUH", "YOU", "LIKE"],
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomKey(object) {
    const keys = Object.keys(object);
    return keys[getRndInteger(0, keys.length - 1)];
};

function randomItem(array) {
    return array[getRndInteger(0, array.length - 1)];
};

function getCheckedButtonCoordinate(topDisplay) {
    const topLeft = ["ur"]
    const middleLeft = ["yes", "nothing", "led", "theyAre"]
    const bottomLeft = ["empty", "reed", "leed", "theyre"]
    const topRight = ["first", "okay", "c"]
    const middleRight = ["blank", "read", "red", "you", "your", "youre", "their"]
    const bottomRight = ["display", "says", "no", "lead", "holdOn", "youAre", "there", "see", "cee"]

    if (topLeft.includes(topDisplay)) {
        return {
            x: 1,
            y: 1
        }
    } else if (middleLeft.includes(topDisplay)) {
        return {
            x: 1,
            y: 2
        }
    } else if (bottomLeft.includes(topDisplay)) {
        return {
            x: 1,
            y: 3
        }
    } else if (topRight.includes(topDisplay)) {
        return {
            x: 2,
            y: 1
        }
    } else if (middleRight.includes(topDisplay)) {
        return {
            x: 2,
            y: 2
        }
    } else if (bottomRight.includes(topDisplay)) {
        return {
            x: 2,
            y: 3
        }
    }
}

function setButtonText(button, word) {
    button.innerHTML = word;

    const baseSize = 22;
    const scale = Math.min(1, 6 / word.length);

    button.style.fontSize = `${baseSize * scale}px`;
}

function randomizeButtons(buttonData, buttonCount) {
    for (let i = 0; i < buttonCount; i++) {
        let word;

        do {
            word = randomItem(words);
        } while (Object.hasOwn(buttonData, word));

        const button = document.getElementById(`button${i}`);

        setButtonText(button, word)
        buttonData[word] = {
            x: (i % 2) + 1,
            y: Math.floor(i / 2) + 1,
        };
    }
}

function generateGame() {
    const topDisplayWord = randomKey(topDisplayWords)
    const buttonData = {};
    const buttonCount = 6;

    randomizeButtons(buttonData, buttonCount)

    const correctButton = getCorrectButton(topDisplayWord, buttonData)

    return {
        correctButton,
        topDisplayWord,
        buttonData
    };
};

let gameData;
let nextKeypad;

function resetGame() {
    gameData = generateGame();
    nextKeypad = 0;

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";
    const topDisplay = document.getElementById("top-display");
    topDisplay.innerHTML = topDisplayWords[gameData.topDisplayWord];
    console.log(gameData.buttonData)
};

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

function getCorrectButton(topDisplayWord, buttonData) {
    const { x, y } = getCheckedButtonCoordinate(topDisplayWord);
    const word = Object.keys(buttonData).find(word =>
        buttonData[word].x === x && buttonData[word].y === y
    );

    const sequence = wordSequence[word];

    const correctWord = sequence.find(word =>
        Object.hasOwn(buttonData, word)
    );

    const { x: correctX, y: correctY } = buttonData[correctWord];
    const correctIndex = (correctY - 1) * 2 + (correctX - 1);

    return document.getElementById(`button${correctIndex}`);
}

function gameLogic() {
    for (let i = 0; i < 6; i++) {
        const button = document.getElementById(`button${i}`);

        button.addEventListener("click", () => {
            console.log(button)

            if (button == gameData.correctButton) {
                isGameWon(true)
            } else {
                isGameWon(false)
                console.log(gameData)
            }
        });
    };
};

resetGame();
gameLogic();

//i did not enjoy making this module, it's such a snoozer. gonna do memory tomorrow and hopefully morse code too
