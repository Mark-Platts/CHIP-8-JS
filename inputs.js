keyboard = {
    keysToHex: {
        49: 0x1, // 1
        50: 0x2, // 2
        51: 0x3, // 3
        52: 0xc, // 4
        81: 0x4, // Q
        87: 0x5, // W
        69: 0x6, // E
        82: 0xD, // R
        65: 0x7, // A
        83: 0x8, // S
        68: 0x9, // D
        70: 0xE, // F
        90: 0xA, // Z
        88: 0x0, // X
        67: 0xB, // C
        86: 0xF  // V
    },

    pressedKeys: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //stores the keys that are currently pressed

    awaitKey: false  //a flag for whether the emulator should await a key press before continuing
}

//checks if a key is pressed and returns bool
function checkKey(keyboard, key) {
    return (keyboard.pressedKeys[key] == 1);
}

