
//cpu object
cpu = {
    //16 general purpose registers
    genReg: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    //I register
    IReg: 0,

    //delay register
    delReg: 0,

    //sound register
    soundReg: 0,

    //program counter
    PC: 0,

    //stack pointer
    SP: 0,

    //stack
    stack: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    //storage for cpu interval
    intervalStore: null,

    //operations

    //00e0 clears the display
    CLS() {
        canvasClear(canvasStore);
    },

    //00ee return from subroutine
    RET() {
        this.PC = this.stack[SP];
        this.SP--;
    },

    //1nnn jump to nnn
    JP(addr) {
        this.PC = addr;
    },

    //2nnn call subroutine to nnn
    CALL(addr) {
        this.SP++;
        this.stack[SP] = PC;
        this.PC = addr;
    },

    //3xkk skip next instr if Vx = kk
    SEVx(x, byte) {
        if (this.genReg[x] == byte) {
            this.PC = this.PC + 2;
        }
    },

    //4xkk skip next instr if Vx != kk
    SNEVx(x, byte) {
        if (this.genReg[x] != byte) {
            this.PC = this.PC + 2;
        }
    },

    //5xy0 skip next instr if Vx == Vy
    SEVxVy(x,y) {
        if (this.genReg[x] == this.genReg[y]) {
            this.PC = this.PC + 2;
        }
    },

    //6xkk set Vx = kk
    LDVx(x, byte) {
        this.genReg[x] = byte;
    },

    //7xkk add kk to current Vx value
    ADDVx(x, byte) {
        this.genReg[x] += byte;
    },

    //8xy0 sets Vx = Vy
    LDVxVy(x, y) {
        this.genReg[x] = this.genReg[y];
    },

    //8xy1 sets Vx = Vx OR Vy
    ORVx(x, y) {
        this.genReg[x] = this.genReg[x] | this.genReg[y];
    },

    //8xy2 sets Vx = Vx AND Vy
    ANDVx(x, y) {
        this.genReg[x] = this.genReg[x] & this.genReg[y];
    },

    //8xy3 sets Vx = Vx XOR Vy
    XORVx(x, y) {
        this.genReg[x] = this.genReg[x] ^ this.genReg[y];
    },

    //8xy4 sets Vx = Vx + Vy
    ANDVxVy(x, y) {
        this.genReg[x] = this.genReg[x] + this.genReg[y];
        if (this.genReg[x] > 255) {     //if result is over 8 bits, set carry flag VF, reduce result to lower 8 bits.
            this.gen[0xF] = 1;
            this.genReg[x] = this.genReg[x] & 0b11111111;
        }
    },

    //8xy5 sets Vx = Vx - Vy        //check this one
    SUBVx(x, y) {
        this.genReg[0xF] = 0;
        if (this.genReg[x] > this.genReg[y]) {
            this.genReg[0xF] = 1;
        }
        this.genReg[x] = math.abs(this.genReg[x] - this.genReg[y]);
    },

    //8xy6 stores lowest bit and shifts one to the right
    SHR(x) {
        this.genReg[0xF] = this.genReg[x] & 0b1;
        this.genReg[x] = this.genReg[x] >> 1;
    },

    //8xy7 sets Vx = Vy - Vx        //check this one
    SUBN(x, y) {
        this.genReg[0xF] = 0;
        if (this.genReg[y] > this.genReg[x]) {
            this.genReg[0xF] = 1;
        }
        this.genReg[x] = math.abs(this.genReg[y] - this.genReg[x]);
    },

    //8xyE stores highest bit and shifts one to the left
    SHL(x) {
        this.genReg[0xF] = this.genReg[x] & 0b10000000;
        this.genReg[x] = this.genReg[x] << 1;
    },

    //9xy0 skip next instruction if Vx != Vy
    SNE(x, y) {
        if (this.genReg[x] != this.genReg[y]) {
            this.PC = this.PC + 2;
        }
    },

    //Annn set I register equal to nnn
    LDI(addr) {
        this.IReg = addr;
    },

    //Bnnn jump to addr + V0
    JPV0(addr) {
        this.PC = this.genReg[0] + addr;
    },

    //Cxkk sets Vx equal to (random 8-bit number AND kk)
    RNDVx(x, kk) {
        this.genReg[x] = Math.floor(Math.random() * 255) & kk;
    },

    //Dxyn draw sprite that I points to at coordinate (Vx, Vy), set VF = collision. n = amount of bytes, sprite needs
    DRW(x, y, n) {
        const spriteLoc = this.IReg;
        this.genReg[0xF] = 0; //presets the collision detection
        for (let i=0; i < n; i++) {
            const spriteLine = (memory[spriteLoc + i]).toString(2); //get nth byte of sprite and turn into binary string
            for (let j=0; j < spriteLine.length; j++) {
                if (spriteLine[j] == "1") { //if bit is 1, toggle pixel
                    const collisionCheck = pixelToggle(x + j, y + i, canvasStore);
                    if (collisionCheck) {
                        this.genReg[0xF] = 1; //sets collision detect to 1 if any pixel collides
                    }
                }
            }
        }
        stateRender(canvasStore);
    },

    //Ex9E skip next instruction if Vx = a pressed key
    SKPVx(x) {
        if (keyboard.pressedKeys[x]) {
            this.PC++;
            this.PC++;
        }
    },

    //ExA1 skip next instruction if Vx != a pressed key
    SKPNVx(x) {
        if (!keyboard.pressedKeys[x]) {
            this.PC++;
            this.PC++;
        }
    },

    //Fx07 set Vx = current deley timer value
    LDVxDT(x) {
        this.genReg[x] = this.delReg;
    },

    //Fx0A COME BACK once cpu timer is done

    //Fx15 set delay timer = Vx
    LDDTVx(x) {
        this.delReg = this.genReg[x];
    },

    //Fx18 set sound timer = Vx
    LDDTVx(x) {
        this.soundReg = this.genReg[x];
    },

    //Fx1E add Vx to I
    ADDIVx(x) {
        this.IReg += this.genReg[x];
    },

    //Fx29  COME BACK once sprites are in memory

    //Fx33  store BCD representation of current Vx in I, I+1, and I+2 (huns, tens, ones)
    LDBVx(x) {
        const BCD = (this.genReg[x]).toString(10);
        memory[this.IReg] = BCD[0];
        memory[this.IReg + 1] = BCD[1];
        memory[this.IReg + 2] = BCD[2];
    },

    //Fx55 store registers V0 to Vx in memory starting at location I
    LDIVx(x){
        memory[this.IReg] = this.genReg[0];
        if (x < 0) {
            for (let i=0; i<x; i++) {
                memory[this.IReg + i] = this.genReg[i];
            }
        }
    },

    //Fx65 read registers V0 to Vx from memory starting at location I
    LDVxI(x){
        this.genReg[0] = memory[this.IReg];
        if (x < 0) {
            for (let i=0; i<x; i++) {
                this.genReg[i] = memory[this.IReg + i];
            }
        }
    },

    opStart0ToFunction(opString) {
        if (opString == '00e0'){
            this.CLS();
        }
        else if (opString == '00ee'){
            this.RET();
        }
        else {
            console.log(opString + ' not recognised opcode');
        }
    },

    opStart8ToFunction(opString) {
        const x = parseInt(opString[1], 16);
        const y = parseInt(opString[2], 16);
        switch(opString[3]) {
            case '0':
                this.LDVxVy(x, y);
                break;
            case '1':
                this.ORVx(x, y);
                break;
            case '2':
                this.ANDVx(x, y);
                break;
            case '3':
                this.XORVx(x, y);
                break;
            case '4':
                this.ANDVxVy(x, y);
                break;
            case '5':
                this.SUBVx(x, y);
                break;
            case '6':
                this.SHR(x);
                break;
            case '7':
                this.SUBN(x, y);
                break;
            case 'E':
                this.SHL(x);
                break;
            default:
                console.log(opString + ' not recognised opcode');
        }
    },

    opStartEToFunction(opString) {
        const reg = parseInt(opString[1], 16);
        if (opString[2] == '9') {
            this.SKPVx(reg);
        }
        else if (opString[2] == 'a') {
            this.SKPNVx(reg);
        }
        else {
            console.log(opString + ' not recognised opcode');
        }
    },

    opStartFToFunction(opString) {

    },

    opcodeToFunction(opCode) {
        const opString = opCode.toString(16);
        const addr = parseInt(opString.slice(1,4), 16);
        const reg = parseInt(opString[1], 16);
        const reg2 = parseInt(opString[2], 16);
        const byte = parseInt(opString.slice(2,4), 16);
        switch (opString[0]) {
            case '0':
                opStart0ToFunction(opString);
                break;
            case '1':
                this.JP(addr);
                break;
            case '2':
                this.CALL(addr);
                break;
            case '3':
                this.SEVx(reg, byte);
                break;
            case '4':
                this.SNEVx(reg, byte);
                break;
            case '5':
                this.SEVxVy(reg, reg2);
                break;
            case '6':
                this.LDVx(x, byte);
                break;
            case '7':
                this.ADDVx(x, byte);
                break;
            case '8':
                opStart8ToFunction(opString);
                break;
            case '9':
                this.SNE(reg, reg2);
                break;
            case 'a':
                this.LDI(addr);
                break;
            case 'b':
                this.JPV0(addr);
                break;
            case 'c':
                this.RNDVx(reg, byte);
            case 'd':
                const num = parseInt(opString[3], 16);
                this.DRW(reg, reg2, num);
                break;
            case 'e':
                opStartEToFunction(opString);
                break;
            case 'f':
                opStartFToFunction(opString);
                break;
            default:
                console.log(opString + ' not recognised opcode');
        }
    },

    doCycle() {
        const mem1 = memory[this.PC];
        this.PC++;
        const mem2 = memory[this.PC];
        this.PC++;
        const opCode = (mem1 << 8) | mem2;
        console.log((this.PC).toString(16));
        console.log(opCode.toString(16));
        this.opcodeToFunction(opCode);
    }
}









