#!/usr/bin/env node

const { filler } = require('./data/input/input');
const { shuffle } = require('./util');
const fs = require('fs'); 
const { stringify } = require("csv-stringify");

const ROW_NUM = 11;
const COL_NUM = 11;

const result = [];


const initArray = (rows) =>  {  
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

const output2 = () =>{
	const filename = __dirname+'/data/output/output_data2.csv';

	let columns = {
	  id: 'id',
	  name: 'Name'
	};
	


	const data = [
		result,
		["2"]
	];

	options = { header: true, columns: columns };
	stringify(result,  (err, output) => {
		if (err) throw err;
		fs.writeFile(filename, output, (err) => {
		  if (err) throw err;
		  console.log('my.csv saved.');
		});
	  });
}

initArray();
fillFiller();
output2();