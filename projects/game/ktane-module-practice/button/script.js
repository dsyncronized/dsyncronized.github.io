const whiteText = "#c6d0e9";
const blackText = "#20202a";

const stripColors = {
    blue: "#4a83c3",
    red: "#d95e59",
    white: "#c6d0e9",
    yellow: "#ffcf85",
};

const buttonColors = {
    blue: {
        idle: "#4a83c3",
        held: "#37699f",
        text: whiteText
    },
    red: {
        idle: "#d95e59",
        held: "#b84743",
        text: whiteText
    },
    white: {
        idle: "#c6d0e9",
        held: "#9fa9c0",
        text: blackText
    },
    yellow: {
        idle: "#ffcf85",
        held: "#d6a85f",
        text: blackText
    },
    black: {
        idle: "#17171f",
        held: "#0f0f15",
        text: whiteText
    }
};

const buttonTexts = {
    abort: "ABORT",
    detonate: "DETONATE",
    hold: "HOLD",
    press: "PRESS"
};

const button = document.getElementById("button");
const strip = document.getElementById("strip");

const edgeworkSlots = {
    slot1: "slot1",
    slot2: "slot2",
    slot3: "slot3",
    slot4: "slot4",
    slot5: "slot5",
    slot6: "slot6",
    slot7: "slot7"
};

const edgeworkWidgets = {
    batteryAA: "../assets/BatteryAA.png",
    batteryD: "../assets/BatteryD.png",
    unlitIndicator: "../assets/UnlitIndicator.png",
    litIndicator: "../assets/LitIndicator.png"
};

const indicatorLabels = {
    SND: "SND",
    CLR: "CLR",
    CAR: "CAR",
    IND: "IND",
    FRQ: "FRQ",
    SIG: "SIG",
    NSA: "NSA",
    MSA: "MSA",
    TRN: "TRN",
    BOB: "BOB",
    FRK: "FRK"
};

let holding = false;
let holdStart = 0;



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

function setButtonColor(key) {
    if (holding == false) {
        button.style.backgroundColor = buttonColors[key].idle;
    } else {
        button.style.backgroundColor = buttonColors[key].held;
    }
    button.style.color = buttonColors[key].text;
};

function setButtonText(key) {
    button.innerHTML = buttonTexts[key];

    const baseSize = 40;
    const scale = Math.min(1, 6 / buttonTexts[key].length);

    button.style.fontSize = `${baseSize * scale}px`;
};

function setStripColor(key) {
    strip.style.backgroundColor = stripColors[key];
};

const edgework = document.getElementById("edgework");

function renderEdgework(widget, label = null) {
    const slot = document.createElement("div");
    slot.classList.add("edgework-slot");

    const img = document.createElement("img");
    img.src = edgeworkWidgets[widget];
    slot.appendChild(img);

    if (widget == "litIndicator" || widget == "unlitIndicator") {
        const labelElement = document.createElement("span");
        labelElement.classList.add("indicator-label");
        labelElement.textContent = label;
        slot.appendChild(labelElement);
    };
    edgework.appendChild(slot);
};

function randomizeEdgework() {
    edgework.innerHTML = "";

    const widgetCount = getRndInteger(0, 7);
    const usedLabels = [];
    const widgets = [];

    for (let i = 0; i < widgetCount; i++) {
        const widget = randomKey(edgeworkWidgets);
        let label = null;

        if (widget == "litIndicator" || widget == "unlitIndicator") {
            const availableLabels = Object.keys(indicatorLabels)
                .filter(key => !usedLabels.includes(key));

            if (availableLabels.length > 0) {
                label = randomItem(availableLabels);
                usedLabels.push(label);
            }
        }
        widgets.push([widget, label]);
        renderEdgework(widget, label);
    }
    return widgets
};

function setButtonData() {
    const buttonColor = randomKey(buttonColors);
    const stripColor = randomKey(stripColors);
    const buttonText = randomKey(buttonTexts);

    setButtonColor(buttonColor);
    setButtonText(buttonText);

    return {
        buttonColor,
        stripColor,
        buttonText
    };
};

let gameData;
let holdTriggered;

let timerInterval = null;

function resetGame() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    holding = false;
    holdStart = 0;

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";

    const buttonData = setButtonData();
    const widgets = randomizeEdgework();

    gameData = {
        buttonData,
        widgets
    };

    setButtonColor(gameData.buttonData.buttonColor);
    setButtonText(gameData.buttonData.buttonText);

    countdownTimer();

    hideStrip();
}

button.addEventListener("pointerdown", () => {
    holding = true;
    holdStart = Date.now();
    holdTriggered = false;
});

button.addEventListener("pointerup", () => {
    if (!holding) return;

    holding = false;
    let quickPressed = false;

    const holdTime = Date.now() - holdStart;

    if (holdTime <= 1000) {
        quickPressed = true
    };

    gameRules(quickPressed);
});

button.addEventListener("pointercancel", () => {
    holding = false;
});

let currentMinutes = 0;
let currentSeconds = 0;

function countdownTimer() {
    const duration = 60;
    const startTime = Date.now();

    function updateCountdown() {
        const elapsedSeconds = Math.floor(
            (Date.now() - startTime) / 1000
        );

        const remainingSeconds = duration - elapsedSeconds;

        if (remainingSeconds <= 0) {
            currentMinutes = 0;
            currentSeconds = 0;

            document.getElementById("countdown").textContent = "0:00";

            clearInterval(timerInterval);
            timerInterval = null;
            return;
        }

        currentMinutes = Math.floor(remainingSeconds / 60);
        currentSeconds = remainingSeconds % 60;

        const displaySeconds = String(currentSeconds).padStart(2, "0");

        document.getElementById("countdown").textContent =
            currentMinutes + ":" + displaySeconds;
    }

    updateCountdown();

    timerInterval = setInterval(updateCountdown, 100);
}

function hasLitIndicator(label) {
    return gameData.widgets.some(
        widget => widget[0] == "litIndicator" && widget[1] == label
    );
};

function hideStrip() {
    strip.style.backgroundColor = "transparent";
}

function isStripCorrect() {
    const stripColor = gameData.buttonData.stripColor;
    const timer = currentMinutes + ":" + currentSeconds;

    if (stripColor == "blue") {
        return timer.includes("4");
    }

    if (stripColor == "yellow") {
        return timer.includes("5");
    }

    return timer.includes("1");
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

function gameRules(quickPressed) {
    const buttonColor = gameData.buttonData.buttonColor;
    const buttonText = gameData.buttonData.buttonText;
    const widgets = gameData.widgets;
    const batteryCount =
        widgets.filter(widget => widget[0] == "batteryAA").length * 2 +
        widgets.filter(widget => widget[0] == "batteryD").length;

    if (buttonColor == "blue" && buttonText == "abort") {
        if (quickPressed) {
            isGameWon(false)
        } else if (isStripCorrect()) {
            isGameWon(true)
        };
    } else if (batteryCount > 1 && buttonText == "detonate") {
        if (quickPressed) {
            isGameWon(true)
        } else {
            isGameWon(false)
        };
    } else if (buttonColor == "white" && hasLitIndicator("CAR")) {
        if (quickPressed) {
            isGameWon(false)
        } else if (isStripCorrect()) {
            isGameWon(true)
        } else {
            isGameWon(false)
        };
    } else if (batteryCount > 2 && hasLitIndicator("FRK")) {
        if (quickPressed) {
            isGameWon(true)
        } else {
            isGameWon(false)
        };
    } else if (buttonColor == "yellow") {
        if (quickPressed) {
            isGameWon(false)
        } else if (isStripCorrect()) {
            isGameWon(true)
        } else {
            isGameWon(false)
        };
    } else if (buttonColor == "red" && buttonText == "hold") {
        if (quickPressed) {
            isGameWon(true)
        } else if (isStripCorrect()) {
            isGameWon(false)
        };
    } else {
        if (quickPressed) {
            isGameWon(false)
        } else if (isStripCorrect()) {
            isGameWon(true)
        } else {
            isGameWon(false)
        };
    };
};

function gameLogic() {
    const holdTime = Date.now() - holdStart;

    setButtonColor(gameData.buttonData.buttonColor);
    if (holding && holdTime >= 1000 && !holdTriggered) {
        setStripColor(gameData.buttonData.stripColor);
        holdTriggered = true;
    };
    requestAnimationFrame(gameLogic);
};

resetGame();
gameLogic();
