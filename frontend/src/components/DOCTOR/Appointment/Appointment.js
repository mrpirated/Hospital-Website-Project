import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { Button, Card } from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import { TabNav } from "./TabNav";
import TabComponent from "./TabComponent";
import { columns } from "./TableColumns";
// import DataTable from "../../DataTable";

export default function Appointment() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [data, setData] = useState([]);
	const [past, setPast] = useState([]);
	const [all, setAll] = useState([]);
	const [future, setFuture] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selecteddate, setselecteddate] = useState(new Date());
	useEffect(() => {
		doctorAppointmentsAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				var now = new Date();
				console.log(response.data.appointments);
				setAll(response.data.appointments);
				var tmp1 = response.data.appointments.filter(
					(item) => new Date(item.start_time) >= now || item.start_time === null
				);
				//console.log(tmp1);
				var tmp2 = response.data.appointments.filter(
					(item) => item.start_time !== null && new Date(item.start_time) < now
				);
				setPast(tmp2);
				setFuture(tmp1);
			}
		});
	}, []);

	return (
		<div>
			<TabComponent
				tabList={TabNav}
				selectedKey='future'
				all={all}
				past={past}
				future={future}
			/>
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
