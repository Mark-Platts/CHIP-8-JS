
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
    }
}









