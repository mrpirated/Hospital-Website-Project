import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import doctorAppointmentsAPI from "../../../api/doctorAppointmentsAPI";
import { columns } from "./TableColumns";
import DataTable from "../../DataTable";
import format from "date-fns/format";
export default function Appointment() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			if (!(auth.isauth && auth.type === 1)) {
				history.push("/home");
			} else {
				const today = new Date();
				const nextDay = new Date(new Date().valueOf() + 1000 * 3600 * 24);
				const start_date = format(today, "yyyy-MM-dd");
				const end_date = format(nextDay, "yyyy-MM-dd");
				const start_time = start_date + " " + "00:00:00";
				const end_time = end_date + " " + "00:00:00";
				console.log(start_time);
				console.log(end_time);

				await doctorAppointmentsAPI({
					token: auth.token,
					start_time: start_time,
					end_time: end_time,
				}).then((res) => {
					if (res.reply) {
						//console.log(res.appointments);
						setData(res.appointments);
					} else {
						alert(res.data.msg + "\nYou will be redirected to Home.");
						setTimeout(history.push("/home"), 4000);
					}
				});
			}
		};
		fetchData();
		console.log(data);
		setIsLoading(false);
	}, []);

	return (
		<div>
			<h5 style={{ margin: "2rem 2rem" }}>
				{"Date: " + new Date().toString().slice(0, 10)}
			</h5>
			<DataTable
				columns={columns}
				data={data}
				isLoading={isLoading}
				onclicklink='/doctor/appointment-details'
			/>
		</div>
	);
}
