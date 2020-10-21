import React from "react";
import { Table } from "semantic-ui-react";

function TableSubtitle({ subtitle }) {
	return (
		<Table attached basic>
			<Table.Body>
				<Table.Row textAlign="center">
					<Table.Cell
						style={{ fontWeight: "500", textTransform: "capitalize" }}>
						{subtitle}
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default TableSubtitle;
