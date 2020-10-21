import React, { useState, useEffect } from "react";
import TableHeader from "../Components/TableHeader";
import DataTable from "../Components/Table";
import Tabletitle from "../Components/TableTitle";
const fsPromises = require("fs").promises;
let filehandle;
const path = require("path");
const date = new Date(Date.now());
let month = date.toLocaleString("default", { month: "long" });
let year = date.getFullYear();

function Income({ data }) {
	const [incomedata, setIncomedata] = useState(data);

	useEffect(() => {
		setIncomedata(data);
	}, [data]);

	const addIncome = async (values) => {
		values = {
			date: date.toLocaleDateString(),
			...values,
			amount: parseFloat(values.amount),
		};

		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"r"
		);
		let data = await filehandle.readFile({ encoding: "utf-8" });
		filehandle.close();

		data = JSON.parse(data);
		data.income.push(values);

		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"w"
		);
		filehandle.write(JSON.stringify(data), 0, "utf-8");

		setIncomedata(data.income);
		filehandle.close();
	};

	return (
		<div className="income">
			<TableHeader header="Income" submitHandler={addIncome}></TableHeader>
			<Tabletitle></Tabletitle>
			<DataTable data={incomedata} header="Net Income"></DataTable>
		</div>
	);
}

export default Income;
