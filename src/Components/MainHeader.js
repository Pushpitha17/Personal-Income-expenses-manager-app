import React from "react";
import { Header } from "semantic-ui-react";

function MainHeader() {
	const date = new Date(Date.now());
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	return (
		<Header as="h1" style={{ textAlign: "center" }}>
			Incomes and Expenses <br></br> {month} {year}
		</Header>
	);
}

export default MainHeader;
