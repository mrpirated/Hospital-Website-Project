import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import { columns } from "./TableColumns";
import DataTable from "../../DataTable";

export default function Appointment() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selecteddate, setselecteddate] = useState(new Date());
	useEffect(() => {
		doctorAppointmentsAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				console.log(response);
			}
		});
	}, []);

	return (
		<div>
			{/* <h5 style={{ margin: "2rem 2rem" }}>
				{"Date: " + selecteddate.toString().slice(0, 10)}
			</h5>
			<DatePicker
				selected={selecteddate}
				onChange={(date) => {
					setselecteddate(date);
				}}
			/>
			<DataTable
				columns={columns}
				data={data}
				isLoading={isLoading}
				onclicklink='/doctor/appointment-details'
			/> */}
		</div>
	);
}
