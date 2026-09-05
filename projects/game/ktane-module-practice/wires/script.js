const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const squareSize = canvas.height;

const wireHeight = squareSize * 0.048;
const wireWidth = wireHeight * 22.75;

const getWireY = (position, baseY, baseHeight) => {
    const spacing =  canvas.height * baseHeight / 6;
    return canvas.height * baseY + spacing * (position - 0.5);
};

function renderBackground() {
    // base for the wires
    ctx.fillStyle = "#434359";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#afb8ce";
    ctx.fillRect(
        canvas.width * 0.10,
        canvas.height * 0.10,
        canvas.width * 0.05,
        canvas.height * 0.75
    );

    ctx.fillRect(
        canvas.width * 0.85,
        canvas.height * 0.10,
        canvas.width * 0.05,
        canvas.height * 0.75
    );

    const slotSize = squareSize * 0.06;

    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = "#3a3a4c";
        ctx.fillRect(
            canvas.width * 0.1025,
            getWireY(i, 0.225, 0.75) - slotSize / 2,
            slotSize,
            slotSize
        );

        ctx.fillRect(
            canvas.width * 0.8535,
            getWireY(i, 0.225, 0.75) - slotSize / 2,
            slotSize,
            slotSize
        );
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function initializeGame() {
//    const wireAmount = getRndInteger(3, 6);
    const wireAmount = 3
    let wirePosition;
    const wireData = []
    const availablePositions = [0, 1, 2, 3, 4, 5]

    for (let i = 0; i < wireAmount; i++) {
        while (true) {
            wirePosition = getRndInteger(0, 5);
            if (availablePositions.includes(wirePosition)) {
                availablePositions.splice(availablePositions.indexOf(wirePosition), 1);
                break
            }
        }

        let wireColor = getRndInteger(1, 5);
        wireData.push([wirePosition, wireColor]);
    }

    return {
        wireData: wireData,
        wireAmount: wireAmount
    };
}

const wires = initializeGame()

function renderGame() {
    const wireColors = {
        1: "#d95e59",
        2: "#4a83c3",
        3: "#ffcf85",
        4: "#c6d0e9",
        5: "#22222d"
    };

    for (let i = 0; i < wires.wireData.length; i++) {
        let wireColor = wires.wireData[i][1]
        let wirePosition = wires.wireData[i][0]

        ctx.fillStyle = wireColors[wireColor];
        ctx.fillRect(
            canvas.width * 0.1075,
            getWireY(wirePosition + 1, 0.10, 0.75) - wireHeight / 2,
            wireWidth,
            wireHeight
        );
    }
}

function getWiresInOrder() {
    return [...wires.wireData].sort((a, b) => a[0] - b[0]);
}

function getWireAtOrder(order) {
    return getWiresInOrder()[order];
}

function getColorCount(color) {
    return getWiresInOrder().filter(wire => wire[1] === color).length;
}

function getLastWireOfColor(color) {
    const sortedWires = getWiresInOrder();

    for (let i = sortedWires.length - 1; i >= 0; i--) {
        if (sortedWires[i][1] === color) {
            return i;
        }
    }

    return -1;
}

// if wire amount {
//  if wire conditions {
//      if correct wire pressed {
//          greenFlash
//      } else {
//          redFlash
//      }
//  }
// }
// 1 = red, 2 = blue, 3 = yellow, 4 = white, 5 = black

function validateWire(wireIndex) {
    if (wires.wireAmount == 3) {

        if (getColorCount(1) == 0) {
            if (wireIndex == 1) {
                greenFlash()
            } else {
                redFlash()
                console.log(wireIndex)
            }

        } else if (getWireAtOrder(2)[1] == 4) {
            if (wireIndex == 2) {
                greenFlash()
            }
            else {
                redFlash()
            }
        } else if (getColorCount(2) > 1) {
            if (wireIndex == getLastWireOfColor(2)) {
                greenFlash()
            }
            else {
                redFlash()
            }
        } else {
            if (wireIndex == 2) {
                greenFlash()
            }
            else {
                redFlash()
            }
        }
    }

    if (wires.wireAmount == 4) {

    }

    if (wires.wireAmount == 5) {

    }
}

function clickableArea(mouseX, mouseY) {
    const wireX = canvas.width * 0.1075;
    const sortedWires = getWiresInOrder();

    for (let i = 0; i < sortedWires.length; i++) {
        const wirePosition = sortedWires[i][0];
        const wireY = getWireY(wirePosition + 1, 0.10, 0.75);

        if (
            mouseX >= wireX &&
            mouseX <= wireX + wireWidth &&
            mouseY >= wireY - wireHeight / 2 &&
            mouseY <= wireY + wireHeight / 2
        ) {
                validateWire(i)
        }
    }
}

function greenFlash() {
    ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        renderGame();
    }, 150);
}

function redFlash() {
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        renderGame();
    }, 150);
}

renderBackground()
renderGame()
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    clickableArea(mouseX, mouseY);
});
