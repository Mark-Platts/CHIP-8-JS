let memory = [];

for (let i=0; i < 0xfff; i++) {
    memory.push(0);
}


//store sprite for 0 at 0x0F0
const internalSprt0Loc = 0x0f0;
memory[internalSprt0Loc] = 0xf0;
memory[internalSprt0Loc + 1] = 0x90;
memory[internalSprt0Loc + 2] = 0x90;
memory[internalSprt0Loc + 3] = 0x90;
memory[internalSprt0Loc + 4] = 0xf0;

//store sprite for 1 at 0x0F0
const internalSprt1Loc = 0x0f0;
memory[internalSprt1Loc] = 0x20;
memory[internalSprt1Loc + 1] = 0x60;
memory[internalSprt1Loc + 2] = 0x20;
memory[internalSprt1Loc + 3] = 0x20;
memory[internalSprt1Loc + 4] = 0x70;

//store sprite for 2 at 0x0F0
const internalSprt2Loc = 0x0f0;
memory[internalSprt2Loc] = 0xf0;
memory[internalSprt2Loc + 1] = 0x10;
memory[internalSprt2Loc + 2] = 0xf0;
memory[internalSprt2Loc + 3] = 0x80;
memory[internalSprt2Loc + 4] = 0xf0;

//store sprite for 3 at 0x0F0
const internalSprt3Loc = 0x0f0;
memory[internalSprt3Loc] = 0xf0;
memory[internalSprt3Loc + 1] = 0x10;
memory[internalSprt3Loc + 2] = 0xf0;
memory[internalSprt3Loc + 3] = 0x10;
memory[internalSprt3Loc + 4] = 0xf0;

//store sprite for 4 at 0x0F0
const internalSprt4Loc = 0x0f0;
memory[internalSprt4Loc] = 0x90;
memory[internalSprt4Loc + 1] = 0x90;
memory[internalSprt4Loc + 2] = 0xf0;
memory[internalSprt4Loc + 3] = 0x10;
memory[internalSprt4Loc + 4] = 0x10;

//store sprite for 5 at 0x0F0
const internalSprt5Loc = 0x0f0;
memory[internalSprt5Loc] = 0xf0;
memory[internalSprt5Loc + 1] = 0x80;
memory[internalSprt5Loc + 2] = 0xf0;
memory[internalSprt5Loc + 3] = 0x10;
memory[internalSprt5Loc + 4] = 0xf0;

//store sprite for 6 at 0x0F0
const internalSprt6Loc = 0x0f0;
memory[internalSprt6Loc] = 0xf0;
memory[internalSprt6Loc + 1] = 0x80;
memory[internalSprt6Loc + 2] = 0xf0;
memory[internalSprt6Loc + 3] = 0x90;
memory[internalSprt6Loc + 4] = 0xf0;

//store sprite for 7 at 0x0F0
const internalSprt7Loc = 0x0f0;
memory[internalSprt7Loc] = 0xf0;
memory[internalSprt7Loc + 1] = 0x10;
memory[internalSprt7Loc + 2] = 0x20;
memory[internalSprt7Loc + 3] = 0x40;
memory[internalSprt7Loc + 4] = 0x40;

//store sprite for 8 at 0x0F0
const internalSprt8Loc = 0x0f0;
memory[internalSprt8Loc] = 0xf0;
memory[internalSprt8Loc + 1] = 0x90;
memory[internalSprt8Loc + 2] = 0xf0;
memory[internalSprt8Loc + 3] = 0x90;
memory[internalSprt8Loc + 4] = 0xf0;

//store sprite for 9 at 0x0F0
const internalSprt1Loc = 0x0f0;
memory[internalSprt1Loc] = 0xf0;
memory[internalSprt1Loc + 1] = 0x90;
memory[internalSprt1Loc + 2] = 0xf0;
memory[internalSprt1Loc + 3] = 0x10;
memory[internalSprt1Loc + 4] = 0xf0;

//store sprite for A at 0x0F0
const internalSprtALoc = 0x0f0;
memory[internalSprtALoc] = 0xf0;
memory[internalSprtALoc + 1] = 0x90;
memory[internalSprtALoc + 2] = 0xf0;
memory[internalSprtALoc + 3] = 0x90;
memory[internalSprtALoc + 4] = 0x90;

//store sprite for B at 0x0F0
const internalSprtBLoc = 0x0f0;
memory[internalSprtBLoc] = 0xe0;
memory[internalSprtBLoc + 1] = 0x90;
memory[internalSprtBLoc + 2] = 0xe0;
memory[internalSprtBLoc + 3] = 0x90;
memory[internalSprtBLoc + 4] = 0xe0;

//store sprite for C at 0x0F0
const internalSprtCLoc = 0x0f0;
memory[internalSprtCLoc] = 0xf0;
memory[internalSprtCLoc + 1] = 0x80;
memory[internalSprtCLoc + 2] = 0x80;
memory[internalSprtCLoc + 3] = 0x80;
memory[internalSprtCLoc + 4] = 0xf0;

//store sprite for D at 0x0F0
const internalSprtDLoc = 0x0f0;
memory[internalSprtDLoc] = 0xe0;
memory[internalSprtDLoc + 1] = 0x90;
memory[internalSprtDLoc + 2] = 0x90;
memory[internalSprtDLoc + 3] = 0x90;
memory[internalSprtDLoc + 4] = 0xe0;

//store sprite for E at 0x0F0
const internalSprtELoc = 0x0f0;
memory[internalSprtELoc] = 0xf0;
memory[internalSprtELoc + 1] = 0x80;
memory[internalSprtELoc + 2] = 0xf0;
memory[internalSprtELoc + 3] = 0x80;
memory[internalSprtELoc + 4] = 0xf0;

//store sprite for F at 0x0F0
const internalSprtFLoc = 0x0f0;
memory[internalSprtFLoc] = 0xf0;
memory[internalSprtFLoc + 1] = 0x80;
memory[internalSprtFLoc + 2] = 0xf0;
memory[internalSprtFLoc + 3] = 0x80;
memory[internalSprtFLoc + 4] = 0x80;