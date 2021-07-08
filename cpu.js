
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
    SNEVxVy(x,y) {
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
    ANDVx(x, y) {
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
    }
}









