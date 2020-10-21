import React, { useState } from "react";
import { Button, Icon, Modal, Header, Form } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";

function TableHeader({ data, addfiled, addexpense }) {
	const [openModal, setOpenModal] = useState(false);
	const [openFieldModal, setOpenFieldModal] = useState(false);
	let date = new Date(Date.now()).toDateString();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				margin: "20px 0",
			}}>
			<h2 style={{ textTransform: "uppercase" }}>Expenses</h2>
			<div>
				<Button
					icon
					labelPosition="left"
					style={{ height: "80%", margin: "auto 30px 0" }}
					onClick={() => setOpenFieldModal(!openFieldModal)}>
					<Icon name="plus" />
					Add Expnense Field
				</Button>
				<Button
					icon
					labelPosition="left"
					style={{ height: "80%", margin: "auto 0" }}
					onClick={() => setOpenModal(!openModal)}>
					<Icon name="plus" />
					Add Expense
				</Button>
			</div>
			<Modal
				id="1"
				closeIcon
				open={openFieldModal}
				onClose={() => setOpenFieldModal(false)}
				onOpen={() => setOpenFieldModal(true)}>
				<Header content={`Add New`} />
				<Modal.Content>
					<p>Date : {date}</p>
					<Formik
						initialValues={{ field: "" }}
						validationSchema={Yup.object({
							field: Yup.string().required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setOpenFieldModal(!openFieldModal);
							addfiled(values);
							console.log(values);
						}}>
						{(formik) => (
							<Form onSubmit={formik.handleSubmit}>
								{formik.touched.field && formik.errors.field ? (
									<Form.Input
										id="field"
										label="Add New Expense Field"
										type="text"
										error={{
											content: "Required",
										}}
										{...formik.getFieldProps("field")}
									/>
								) : (
									<Form.Input
										id="field"
										label="Add New Expense Field"
										type="text"
										{...formik.getFieldProps("field")}
									/>
								)}
								<Button type="submit" style={{ marginLeft: "85%" }}>
									Add
								</Button>
							</Form>
						)}
					</Formik>
				</Modal.Content>
			</Modal>
			<Modal
				id="2"
				closeIcon
				open={openModal}
				onClose={() => setOpenModal(false)}
				onOpen={() => setOpenModal(true)}>
				<Header content={`Add New Expense`} />
				<Modal.Content>
					<p>Date : {date}</p>
					<Formik
						initialValues={{ field: "general", desc: "", amount: "" }}
						validationSchema={Yup.object({
							desc: Yup.string().required("Required"),
							amount: Yup.number().required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setOpenModal(!openModal);
							addexpense(values);
						}}>
						{(formik) => (
							<Form onSubmit={formik.handleSubmit}>
								<Form.Field
									id="field"
									label="Select Expense Field"
									control="select"
									{...formik.getFieldProps("field")}
									// onChange={formik.handleChange}
									// value={formik.values.field}
									style={{
										textTransform: "capitalize",
										fontWeight: "500",
									}}>
									{Object.keys(data).map((item, index) => (
										<option value={item} key={index}>
											{item}
										</option>
									))}
								</Form.Field>
								{formik.touched.desc && formik.errors.desc ? (
									<Form.Input
										id="desc"
										label="Description"
										type="text"
										error={{
											content: "Required",
										}}
										{...formik.getFieldProps("desc")}
									/>
								) : (
									<Form.Input
										id="desc"
										label="Description"
										type="text"
										{...formik.getFieldProps("desc")}
									/>
								)}
								{formik.touched.amount && formik.errors.amount ? (
									<Form.Input
										id="amount"
										type="text"
										label="Amount"
										error={{
											content: "Required a number",
										}}
										{...formik.getFieldProps("amount")}
									/>
								) : (
									<Form.Input
										id="amount"
										type="text"
										label="Amount"
										{...formik.getFieldProps("amount")}
									/>
								)}
								<Button type="submit" style={{ marginLeft: "85%" }}>
									Add
								</Button>
							</Form>
						)}
					</Formik>
				</Modal.Content>
			</Modal>
		</div>
	);
}

export default TableHeader;
