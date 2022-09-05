
// input
fs.createReadStream(__dirname+'/data/input/input_data.csv')
  .pipe(parse())
  .on("data", (data) => {
    result.push(data);
  })
  .on("end", () => {
    console.log(result);
  })
  .on("error", (err) => {
    console.log(err);
  });

  const output = () =>{
	const filename = __dirname+'/data/output/output_data1.csv';
	const writableStream = fs.createWriteStream(filename);
	const columns = [
		"first",
		"second",
	];
	const datas = [
		someObject,
		["2"]
	]
	const stringifier = stringify({ header: true, columns: columns });
	datas.forEach((data) => {
	  stringifier.write(data);
	});
	stringifier.pipe(writableStream);
	console.log("Finished writing data");
}