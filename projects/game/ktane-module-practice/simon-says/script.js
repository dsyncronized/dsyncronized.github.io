function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateString(length) {
    const characters = "abcdefghijklmnpqrstuvwxz0123456789";
    let result;

    while (true) {
        result = "";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (/[a-z]/.test(result) && /[0-9]/.test(result)) {
            return result;
        }
    };
};

function generateStrikes() {
    const int = getRndInteger(0, 5)
    let strikeString;
    let strikeCount;
    if (int == 0 || int == 1 || int == 2) {
        strikeString = ""
        strikeCount = 0
    } else if (int == 3 || int == 4) {
        strikeString = "X"
        strikeCount = 1
    } else {
        strikeString = "X X"
        strikeCount = 2
    }
    return {
        strikeString: strikeString,
        strikeCount: strikeCount
    }
}

function getSolution(x, strikes, serialNumber) {
    if (["a", "i", "u", "e", "o"].some(vowel =>
        serialNumber.includes(vowel)
    )) {
        console.log("a vowel")
        if (strikes == 0) {
            if (x == 0) {
                return x = 1;
            } else if (x == 1) {
                return x = 0;
            } else if (x == 2) {
                return x = 3;
            } else {
                return x = 2;
            };
        } else if (strikes == 1) {
            if (x == 0) {
                return x = 2;
            } else if (x == 1) {
                return x = 3;
            } else if (x == 2) {
                return x = 0;
            } else {
                return x = 1;
            };
        } else {
            if (x == 0) {
                return x = 1;
            } else if (x == 1) {
                return x = 2;
            } else if (x == 2) {
                return x = 3;
            } else {
                return x = 0;
            };
        }
    } else {
        if (strikes == 0) {
            if (x == 0) {
                return x = 3;
            } else if (x == 1) {
                return x = 0;
            } else if (x == 2) {
                return x = 2;
            } else {
                return x = 1;
            };
        } else if (strikes == 1) {
            if (x == 0) {
                return x = 0;
            } else if (x == 1) {
                return x = 1;
            } else if (x == 2) {
                return x = 3;
            } else {
                return x = 2;
            };
        } else {
            if (x == 0) {
                return x = 2;
            } else if (x == 1) {
                return x = 3;
            } else if (x == 2) {
                return x = 0;
            } else {
                return x = 1;
            };
        };
    };
};

let nextButton;
let gameData;

function generateGame() {
    const sequence = []
    for (let i = 0; i < getRndInteger(3, 5); i++) {
        sequence.push(getRndInteger(0, 3));
    }

    const strikes = generateStrikes();
    const serialNumber = generateString(6);
    const solution = sequence.map(x => getSolution(x, strikes.strikeCount, serialNumber));
    const buttonCount = 4

    return {
        buttonCount,
        sequence,
        strikes,
        serialNumber,
        solution
    };
}

let sequenceTimers = [];
let sequenceRunning = false;

function stopSequence() {
    sequenceRunning = false;

    sequenceTimers.forEach(timer => clearTimeout(timer));
    sequenceTimers = [];

    document.querySelectorAll(".active").forEach(button => {
        button.classList.remove("active");
    });
}

function resetGame() {
    gameData = generateGame()
    nextButton = 0;
    console.log(gameData.solution)

    const overlay = document.getElementById("game-overlay");
    overlay.classList.remove("flash");
    overlay.classList.add("hidden");
    overlay.style.backgroundColor = "#17171f";

    document.getElementById("serial-number").innerHTML = gameData.serialNumber;
    document.getElementById("strikes").innerHTML = gameData.strikes.strikeString;

    setTimeout(() => {
        playSequence();
    }, 1000);
}

function isGameWon(winState) {
    stopSequence();

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

function gameLogic() {
    for (let i = 0; i < gameData.buttonCount; i++) {
        const keypad = document.getElementById(`button${i}`);

        keypad.addEventListener("click", () => {
            const expectedButton = gameData.solution[nextButton];

            if (i == expectedButton) {
                nextButton++

                if (nextButton == gameData.solution.length) {
                    isGameWon(true)
                };
            } else {
                isGameWon(false)
            }
            console.log(nextButton)
        });
    };
};

function playSequence() {
    sequenceRunning = true;

    gameData.sequence.forEach((key, i) => {
        const timer = setTimeout(() => {
            if (!sequenceRunning) return;

            const button = document.getElementById(`button${key}`);
            button.classList.add("active");
            const removeTimer = setTimeout(() => {
                button.classList.remove("active");
            }, 500);
            sequenceTimers.push(removeTimer);
        }, i * 700);

        sequenceTimers.push(timer);
    });

    const loopTimer = setTimeout(() => {
        if (sequenceRunning) {
            playSequence();
        }
    }, gameData.sequence.length * 700 + 1500);
    sequenceTimers.push(loopTimer);
}

resetGame();
gameLogic();
