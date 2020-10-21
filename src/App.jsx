import React, { useState, useEffect } from "react";
import MainHeader from "./Components/MainHeader";
import { ReadIncomes } from "./Models/ReadIncomes";
import Expenses from "./Views/expenses";
import Income from "./Views/income";

function App() {
	const [data, setData] = useState({ income: [], expenses: { general: [] } });

	useEffect(() => {
		(async () => {
			await ReadIncomes().then((Data) => {
				setData(Data);
			});
		})();
	}, []);

	return (
		<div className="App">
			<MainHeader></MainHeader>
			<Income data={data.income}></Income>
			<Expenses data={data.expenses}></Expenses>
		</div>
	);
}

export default App;
