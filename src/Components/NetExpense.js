import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";

function NetExpense({ netAmount }) {
	return (
		<Table celled>
			<Table.Body>
				<Table.Row textAlign="center" style={{ fontWeight: "500" }}>
					<Table.Cell width={7}>Net Expenses</Table.Cell>
					<Table.Cell width={2}>{netAmount.toFixed(2)}</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default NetExpense;
