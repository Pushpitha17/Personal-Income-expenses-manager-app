import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";

const SummaryRow = ({ header, netAmount }) => {
	return (
		<Table celled attached>
			<Table.Body>
				<Table.Row textAlign="center" style={{ fontWeight: "500" }}>
					<Table.Cell width={7}>{header}</Table.Cell>
					<Table.Cell width={2}>{netAmount.toFixed(2)}</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};

const DataTable = ({ data, header, color = "grey" }) => {
	const [netAmount, setNetamount] = useState(0);

	const calnetAmount = (data) => {
		return data.reduce((a, b) => a + b.amount, 0);
	};

	useEffect(() => {
		setNetamount(calnetAmount(data));
	}, [data]);

	if (data.length == 0) {
		return (
			<Table attached>
				<Table.Body>
					<Table.Row textAlign="center">
						<Table.Cell
							style={{ fontWeight: "400", textTransform: "capitalize" }}>
							Add things to here using the add button
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	} else {
		return (
			<>
				<Table celled attached color={color}>
					<Table.Body>
						{data.map((item, index) => (
							<Table.Row key={index}>
								<Table.Cell textAlign="center" width={2}>
									{item.date}
								</Table.Cell>
								<Table.Cell
									textAlign="left"
									width={5}
									style={{ textTransform: "capitalize" }}>
									{item.desc}
								</Table.Cell>
								<Table.Cell textAlign="center" width={2}>
									{item.amount.toFixed(2)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<SummaryRow header={header} netAmount={netAmount}></SummaryRow>
			</>
		);
	}
};

export default DataTable;
