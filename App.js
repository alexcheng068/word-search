#!/usr/bin/env node

const { filler } = require('./data/input/input');
const { shuffle } = require('./util');
const { fillWords } = require('./word_search');


const fs = require('fs'); 
const { stringify } = require("csv-stringify");

const ROW_NUM = 11;
const COL_NUM = 11;

const result = [];


const initArray = () =>  {  
	for (var i=0;i<ROW_NUM;i++) {
		result[i] = [];
	}
}

const fillFiller = ()=>{
	const shuffledFiller = shuffle(filler);
	let index= 0;
	for (let row = 0; row < ROW_NUM; row++) {
		for (let col = 0; col < COL_NUM; col++) {
			result[row][col]= shuffledFiller[index];
			index ++;
		}
	}
}

const output = () =>{
	const filename = __dirname+'/data/output/output_data.csv';
	stringify(result,  (err, output) => {
		if (err) throw err;
		fs.writeFile(filename, output, (err) => {
		  if (err) throw err;
		  console.log('csv saved.');
		});
	  });
}


initArray();
fillFiller();
fillWords(result, ROW_NUM, COL_NUM );
output();