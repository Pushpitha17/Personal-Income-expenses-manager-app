import React from "react";
import { Table } from "semantic-ui-react";

function TableTitle() {
	return (
		<Table celled attached>
			<Table.Header>
				<Table.Row textAlign="center">
					<Table.HeaderCell width={2}>Date</Table.HeaderCell>
					<Table.HeaderCell width={5}>Description</Table.HeaderCell>
					<Table.HeaderCell width={2}>Amount</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
		</Table>
	);
}

export default TableTitle;
