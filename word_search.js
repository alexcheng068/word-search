const { words } = require('./data/input/input');
const { shuffle } = require('./util');

const WORD_NUM = 18;


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

const fillWords = (result, maxRow, maxCol)=>{
	const words = getWordsArray();

    const fillVerticle = (word, spot)=>{
        for (let i = 0; i < word.length; i++ ) {
            result[spot.rol + i][spot.col] = word[i];
        }
    }
    
    const fillHorizontal = (word, spot)=>{
        for (let i = 0; i < word.length; i++ ) {
            result[spot.rol][spot.col + i] = word[i];
        }
    }

	for (let word of words) {
        const direction = getDirection();
        let spot = {};
        let isValid = false;
        while (!isValid){
            spot = { rol: getRandomNumber(maxRow), col: getRandomNumber(maxCol) }
            if (direction === "verticle" && spot.rol + word.length <= maxRow) isValid = true;
            if (direction === "horizontal" && spot.col + word.length <= maxCol) isValid = true;
            // TODO: check for overlap with other words
        }

        direction  === "verticle" ? fillVerticle(word, spot) : fillHorizontal(word, spot)
	}
}

module.exports = { fillWords };
