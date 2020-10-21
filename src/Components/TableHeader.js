import React, { useState } from "react";
import { Button, Icon, Modal, Header, Form } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";

function TableHeader({ header, submitHandler }) {
	const [openModal, setOpenModal] = useState(false);
	let date = new Date(Date.now()).toDateString();

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				margin: "20px 0",
			}}>
			<h2 style={{ textTransform: "uppercase" }}>{header}</h2>
			<Button
				icon
				labelPosition="left"
				style={{ height: "80%", margin: "auto 0" }}
				onClick={() => setOpenModal(!openModal)}>
				<Icon name="plus" />
				Add Income
			</Button>
			<Modal
				closeIcon
				open={openModal}
				onClose={() => setOpenModal(false)}
				onOpen={() => setOpenModal(true)}>
				<Header content={`Add New ${header}`} />
				<Modal.Content>
					<p>Date : {date}</p>
					<Formik
						initialValues={{ desc: "", amount: "" }}
						validationSchema={Yup.object({
							desc: Yup.string().required("Required"),
							amount: Yup.number().required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setOpenModal(!openModal);
							submitHandler(values);
						}}>
						{(formik) => (
							<Form onSubmit={formik.handleSubmit}>
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
