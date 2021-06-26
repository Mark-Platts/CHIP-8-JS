
//returns an array with 32 zeros
function arr32(){
    let hold = [];
    for (let i = 0; i < 32; i++) {
        hold.push(0);
    }
    return(hold);
}

//returns a 2D array with 64 columns and 32 rows
function createState(){
    let hold = [];
    for (let i = 0; i < 64; i++) {
        hold.push(arr32());
    }
    return(hold);
}
