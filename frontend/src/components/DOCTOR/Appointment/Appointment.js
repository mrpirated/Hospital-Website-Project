import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import DatePicker from "react-datepicker";
import { Button, Card } from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import { TabNav } from "./TabNav";
import TabComponent from "./TabComponent";
// import DataTable from "../../DataTable";

export default function Appointment() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [appChange, setAppChange] = useState(false);
	const [past, setPast] = useState([]);
	const [all, setAll] = useState([]);
	const [future, setFuture] = useState([]);
	const [unset, setUnset] = useState([]);
	const [cancelled, setCancelled] = useState([]);
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		doctorAppointmentsAPI({ token: auth.token })
			.then((response) => {
				if (response.success) {
					var now = new Date();
					console.log(response.data.appointments);

					var tmp1 = response.data.appointments.filter(
						(item) =>
							item.state !== "cancelled" &&
							item.start_time !== null &&
							new Date(item.start_time) >= now
					);
					//console.log(tmp1);
					var tmp2 = response.data.appointments.filter(
						(item) =>
							item.state !== "cancelled" &&
							item.start_time !== null &&
							new Date(item.start_time) < now
					);
					var tmp3 = response.data.appointments.filter(
						(item) => item.state !== "cancelled" && item.start_time === null
					);
					var tmp4 = response.data.appointments.filter(
						(item) => item.state !== "cancelled" && item.start_time !== null
					);
					var tmp5 = response.data.appointments.filter(
						(item) => item.state === "cancelled"
					);
					setPast(tmp2);
					setFuture(tmp1);
					setUnset(tmp3);
					setAll(tmp4);
					setCancelled(tmp5);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
				setAppChange(false);
			});
	}, [auth.isauth, appChange]);

	return (
		<div>
			<TabComponent
				tabList={TabNav}
				selectedKey='future'
				all={all}
				past={past}
				future={future}
				unset={unset}
				cancelled={cancelled}
				setAppChange={setAppChange}
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
