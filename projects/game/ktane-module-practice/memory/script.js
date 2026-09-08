function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateGame() {
    const topDisplayLabels = ["1", "2", "3", "4"]
    const positions = [0, 1, 2, 3];
    const labels = ["1", "2", "3", "4"];
    const buttonData = [];
    const buttonCount = 4;
    const stageCount = 5;

    const topDisplayLabel = topDisplayLabels[getRndInteger(0, topDisplayLabels.length - 1)]
    const topDisplay = document.getElementById("top-display")
    topDisplay.innerHTML = topDisplayLabel

    for (let i = 0; i < buttonCount; i++) {
        const label = labels[getRndInteger(0, labels.length - 1)];
        const labelIndex = labels.indexOf(label);
        const position = positions[getRndInteger(0, positions.length - 1)];
        const positionIndex = positions.indexOf(position)
        labels.splice(labelIndex, 1);
        positions.splice(positionIndex, 1);

        console.log(position)
        const button = document.getElementById(`button${position}`);

        button.innerHTML = label
        buttonData.push([label, position, button]);
    };
    return {
        buttonData,
        topDisplayLabel,
        stageCount,
        buttonCount
    };
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

let stage;
let pressedButtons;
let gameData;

function resetGame() {
    gameData = generateGame();
    stage = 0;
    pressedButtons = []

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";

    for (let i = 0; i < gameData.stageCount; i++) {
        const pip = document.getElementById(`stage${i}`)
        pip.style.backgroundColor = "#20202a"
    }
};

function getExpectedButton() {
    if (stage == 0) {
        if (gameData.topDisplayLabel == "1") {
            const position = 1;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const position = 1;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const position = 2;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const position = 3;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 1) {
        if (gameData.topDisplayLabel == "1") {
            label = "4";
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const position = pressedButtons[0][1];
            const button = gameData.buttonData.find(item => item[1] === position);

            pressedButtons.push(button);
            return button[2];

        } else if (gameData.topDisplayLabel == "3") {
            const position = 0;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const position = pressedButtons[0][1];
            const button = gameData.buttonData.find(item => item[1] === position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 2) {
        if (gameData.topDisplayLabel == "1") {
            const label = pressedButtons[1][0];
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const label = pressedButtons[0][0];
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const position = 2;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const label = "4";
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        };

    } else if (stage == 3) {
        if (gameData.topDisplayLabel == "1") {
            const position = pressedButtons[0][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "2") {
            const position = 0
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "3") {
            const position = pressedButtons[1][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "4") {
            const position = pressedButtons[1][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 4) {
        if (gameData.topDisplayLabel == "1") {
            const label = pressedButtons[0][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const label = pressedButtons[1][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const label = pressedButtons[3][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const label = pressedButtons[2][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]
        };
    };
};

function updatePipCounter() {
    if (stage >= 1) {
        pip = document.getElementById("stage0");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 2) {
        pip = document.getElementById("stage1");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 3) {
        pip = document.getElementById("stage2");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 4) {
        pip = document.getElementById("stage3");
        pip.style.backgroundColor = "#8fc587";

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateGame() {
    const topDisplayLabels = ["1", "2", "3", "4"]
    const positions = [0, 1, 2, 3];
    const labels = ["1", "2", "3", "4"];
    const buttonData = [];
    const buttonCount = 4;
    const stageCount = 5;

    const topDisplayLabel = topDisplayLabels[getRndInteger(0, topDisplayLabels.length - 1)]
    const topDisplay = document.getElementById("top-display")
    topDisplay.innerHTML = topDisplayLabel

    for (let i = 0; i < buttonCount; i++) {
        const label = labels[getRndInteger(0, labels.length - 1)];
        const labelIndex = labels.indexOf(label);
        const position = positions[getRndInteger(0, positions.length - 1)];
        const positionIndex = positions.indexOf(position)
        labels.splice(labelIndex, 1);
        positions.splice(positionIndex, 1);

        console.log(position)
        const button = document.getElementById(`button${position}`);

        button.innerHTML = label
        buttonData.push([label, position, button]);
    };
    return {
        buttonData,
        topDisplayLabel,
        stageCount,
        buttonCount
    };
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

let stage;
let pressedButtons;
let gameData;

function resetGame() {
    gameData = generateGame();
    stage = 0;
    pressedButtons = []

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";

    for (let i = 0; i < gameData.stageCount; i++) {
        pip = document.getElementById(`stage${i}`)
        pip.style.backgroundColor = "#20202a"
    }
};

function getExpectedButton() {
    if (stage == 0) {
        if (gameData.topDisplayLabel == "1") {
            const position = 1;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const position = 1;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const position = 2;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const position = 3;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 1) {
        if (gameData.topDisplayLabel == "1") {
            const label = "4";
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const position = pressedButtons[0][1];
            const button = gameData.buttonData.find(item => item[1] === position);

            pressedButtons.push(button);
            return button[2];

        } else if (gameData.topDisplayLabel == "3") {
            const position = 0;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const position = pressedButtons[0][1];
            const button = gameData.buttonData.find(item => item[1] === position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 2) {
        if (gameData.topDisplayLabel == "1") {
            const label = pressedButtons[1][0];
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const label = pressedButtons[0][0];
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const position = 2;
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const label = "4";
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        };

    } else if (stage == 3) {
        if (gameData.topDisplayLabel == "1") {
            const position = pressedButtons[0][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "2") {
            const position = 0
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "3") {
            const position = pressedButtons[1][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        } else if (gameData.topDisplayLabel == "4") {
            const position = pressedButtons[1][1]
            const button = gameData.buttonData.find(item => item[1] == position);

            pressedButtons.push(button)
            return button[2]
        };

    } else if (stage == 4) {
        if (gameData.topDisplayLabel == "1") {
            const label = pressedButtons[0][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "2") {
            const label = pressedButtons[1][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "3") {
            const label = pressedButtons[3][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]

        } else if (gameData.topDisplayLabel == "4") {
            const label = pressedButtons[2][0]
            const button = gameData.buttonData.find(item => item[0] == label);

            pressedButtons.push(button)
            return button[2]
        };
    };
};

function updatePipCounter() {
    if (stage >= 1) {
        pip = document.getElementById("stage0");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 2) {
        pip = document.getElementById("stage1");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 3) {
        pip = document.getElementById("stage2");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 4) {
        pip = document.getElementById("stage3");
        pip.style.backgroundColor = "#8fc587";
    } if (stage >= 5) {
        pip = document.getElementById("stage4");
        pip.style.backgroundColor = "#8fc587";
    }
}

function gameLogic() {
    for (let i = 0; i < gameData.buttonCount; i++) {
        const button = document.getElementById(`button${i}`);

        button.addEventListener("click", () => {
            const expectedButton = getExpectedButton();

            if (button == expectedButton) {
                stage++;
                console.log(stage)
                generateGame();

                if (stage == gameData.stageCount) {
                    isGameWon(true);
                };
            } else {
                isGameWon(false);
                console.log(gameData);
            }
            updatePipCounter();
        });
    };
};

resetGame();
console.log(gameData.buttonData)
gameLogic();
    } if (stage >= 5) {
        pip = document.getElementById("stage4");
        pip.style.backgroundColor = "#8fc587";
    }
}

function gameLogic() {
    for (let i = 0; i < gameData.buttonCount; i++) {
        const button = document.getElementById(`button${i}`);

        button.addEventListener("click", () => {
            const expectedButton = getExpectedButton();

            if (button == expectedButton) {
                stage++;
                console.log(stage)
                gameData = generateGame();

                if (stage == gameData.stageCount) {
                    isGameWon(true);
                };
            } else {
                isGameWon(false);
                console.log(gameData);
            }
            updatePipCounter();
        });
    };
};

resetGame();
console.log(gameData.buttonData)
gameLogic();
