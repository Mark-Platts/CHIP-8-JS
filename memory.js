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

