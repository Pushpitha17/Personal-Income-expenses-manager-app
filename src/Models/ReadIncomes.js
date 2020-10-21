const fsPromises = require("fs").promises;
const path = require("path");

const ReadIncomes = async () => {
	const date = new Date(Date.now());
	let month = date.toLocaleString("default", { month: "long" });
	let year = date.getFullYear();
	let filehandle;
	let data;
	try {
		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"r"
		);
		data = await filehandle.readFile({ encoding: "utf-8" });
		return await JSON.parse(data);
	} catch {
		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"w+"
		);
		await filehandle.writeFile('{"income":[] , "expenses" : { "general":[]}}', {
			encoding: "utf-8",
		});
		data = await filehandle.readFile({ encoding: "utf-8" });
		return await JSON.parse(data);
	} finally {
		filehandle.close();
	}
};

export { ReadIncomes };
