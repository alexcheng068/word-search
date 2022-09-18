const { words } = require('./data/input/input');
const { shuffle } = require('./util');

const WORD_NUM = 20;
const spotsTaken = [];

const getWordsArray = () => {
	const shuffledWords = shuffle(words);
    return shuffledWords.slice(0, WORD_NUM);
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

const getDirection = () => {
    const number = Math.floor(Math.random() * 10);
    const isEven = number % 2 === 0;
    return isEven ? "horizontal" : "verticle";
}

const getSpotId = (row, col) =>{
    return `${row},${col}`;
}

const isSpotTaken = (row, col, length, direction) =>{
    const IsTakenFound = (row, col)=> {
        const spotId = getSpotId(row, col);
        return spotsTaken.includes(spotId);
    }

    if (direction  === "verticle"){
        for (let i = 0; i < length; i++ ) {
            if(IsTakenFound(row+i, col)){
                return true;
            }
        }
    }

    if (direction  === "horizontal"){
        for (let i = 0; i < length; i++ ) {
            if(IsTakenFound(row, col+i)){
                return true
            }
        }
    }

    return false;
}

const addToTaken = (row, col) => {
    const id = getSpotId(row, col)
    spotsTaken.push(id)
}

const fillWords = (result, maxRow, maxCol)=>{
	const words = getWordsArray();

    const fillVerticle = (word, spot)=>{
        for (let i = 0; i < word.length; i++ ) {
            result[spot.rol + i][spot.col] = word[i];
            addToTaken(spot.rol + i, spot.col );
        }
    }
    
    const fillHorizontal = (word, spot)=>{
        for (let i = 0; i < word.length; i++ ) {
            result[spot.rol][spot.col + i] = word[i];
            addToTaken(spot.rol, spot.col + i );
        }
    }

	for (let word of words) {
        const direction = getDirection();
        let spot = {};
        let isValid = false;

        while (!isValid){
            spot = { rol: getRandomNumber(maxRow), col: getRandomNumber(maxCol) }

            const isWithinBound = (direction === "verticle" && spot.rol + word.length <= maxRow) ||
                                  (direction === "horizontal" && spot.col + word.length <= maxCol);

            const noOverLap = !isSpotTaken(spot.rol, spot.col, word.length, direction);

            
            isValid = isWithinBound && noOverLap;
            
        }

        direction  === "verticle" ? fillVerticle(word, spot) : fillHorizontal(word, spot)
	}
}

module.exports = { fillWords };
