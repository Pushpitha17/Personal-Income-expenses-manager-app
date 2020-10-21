import React, { useState, useEffect } from "react";
import DataTable from "../Components/Table";
import ExpenseHeader from "../Components/ExpenseHeader";
import Tabletitle from "../Components/TableTitle";
import TableSubtitle from "../Components/TableSubtitle";
const path = require("path");
import NetExpense from "../Components/NetExpense";
const fsPromises = require("fs").promises;
let filehandle;
const date = new Date(Date.now());
let month = date.toLocaleString("default", { month: "long" });
let year = date.getFullYear();

function calNetExpense(data) {
	let value = 0;
	for (const field in data) {
		value += data[field].reduce((a, b) => a + b.amount, 0);
	}
	return value;
}

function Expenses({ data }) {
	const [expensedata, setExpensedata] = useState(data);
	const [netExpense, setNetexpense] = useState(calNetExpense(data));

	useEffect(() => {
		setExpensedata(data);
		setNetexpense(calNetExpense(data));
	}, [data]);

	const addField = async (values) => {
		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"r"
		);
		let data = await filehandle.readFile({ encoding: "utf-8" });
		filehandle.close();

		data = JSON.parse(data);
		data.expenses[values.field] = [];

		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"w"
		);
		filehandle.write(JSON.stringify(data), 0, "utf-8");

		setExpensedata(data.expenses);
		filehandle.close();
	};

	const addExpense = async (values) => {
		let newExpense = {
			date: date.toLocaleDateString(),
			desc: values.desc,
			amount: parseFloat(values.amount),
		};
		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"r"
		);
		let data = await filehandle.readFile({ encoding: "utf-8" });
		filehandle.close();

		data = JSON.parse(data);
		data.expenses[values.field].push(newExpense);

		filehandle = await fsPromises.open(
			path.join(__dirname, `${month}-${year}.json`),
			"w"
		);
		filehandle.write(JSON.stringify(data), 0, "utf-8");

		setExpensedata(data.expenses);
		setNetexpense(calNetExpense(data.expenses));

		filehandle.close();
	};

	return (
		<div className="expenses">
			<ExpenseHeader
				data={expensedata}
				addfiled={addField}
				addexpense={addExpense}></ExpenseHeader>
			<Tabletitle></Tabletitle>
			{Object.keys(expensedata).map((item, index) => (
				<div key={index}>
					<TableSubtitle subtitle={`${item} Expenses`}></TableSubtitle>
					<DataTable
						data={expensedata[item]}
						color="green"
						header={`Net ${item} Expenses`}></DataTable>
				</div>
			))}
			<NetExpense netAmount={netExpense}></NetExpense>
		</div>
	);
}

export default Expenses;
