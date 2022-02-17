import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import TabComponent from "./TabComponent";
import { TabNav } from "./TabNav";
import getAllPatientAppointmentsAPI from "../../../api/getAllPatientAppointmentsAPI";
function Appointment() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [past, setPast] = useState([]);
	const [all, setAll] = useState([]);
	const [future, setFuture] = useState([]);
	const [unset, setUnset] = useState([]);
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		getAllPatientAppointmentsAPI({ token: auth.token })
			.then((response) => {
				if (response.success) {
					var now = new Date();
					console.log(response.data.appointments);
					var tmp1 = response.data.appointments.filter(
						(item) =>
							item.start_time !== null && new Date(item.start_time) >= now
					);
					//console.log(tmp1);
					var tmp2 = response.data.appointments.filter(
						(item) =>
							item.start_time !== null && new Date(item.start_time) < now
					);
					var tmp3 = response.data.appointments.filter(
						(item) => item.start_time === null
					);
					var tmp4 = response.data.appointments.filter(
						(item) => item.start_time !== null
					);
					setPast(tmp2);
					setFuture(tmp1);
					setUnset(tmp3);
					setAll(tmp4);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);
	return (
		<div>
			<TabComponent
				tabList={TabNav}
				selectedKey='future'
				all={all}
				past={past}
				future={future}
				unset={unset}
			/>
		</div>
	);
}

export default Appointment;
