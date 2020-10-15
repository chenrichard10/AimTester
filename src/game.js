// Simple Game Logic 
function checkScore(score) { 
    return score;
}


const gameOver =(score)=> {
   return score < 10 ? true : false; 
}


const generatePosition =(score)=> { 
    let x = Math.ceil(Math.random() * (6 + 6)) - 6;
    let y = Math.ceil(Math.random() * (2 + 1.1)) - 1.1;
    let z = Math.random();
    return [x,y,z];
}

export {gameOver, generatePosition, checkScore}
