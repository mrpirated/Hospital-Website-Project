import React, { useState } from "react";
import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import cancelAppointmentAPI from "../../../api/cancelAppointmentAPI";
import moment from "moment";
function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	const auth = useSelector((state) => state.auth);
	const setAppChange = props.setAppChange;
	const onCancelAppointment = (appointment) => {
		console.log(appointment);
		cancelAppointmentAPI({
			token: auth.token,
			appointment_id: appointment.appointment_id,
		}).then((response) => {
			if (response.success) {
				setAppChange(true);
			}
			console.log(response);
		});
	};
	return (
		<div>
			<Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
				{props.tabList.map((item) => (
					<Tab eventKey={item.eventKey} title={item.title}>
						<Table striped bordered hover responsive='lg'>
							<thead style={{ textAlign: "center" }}>
								<th>Patient Name</th>
								<th>Case Description</th>
								<th>Date</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Duration</th>
								{item.eventKey === "future" && <th>Cancel</th>}
							</thead>
							<tbody style={{ textAlign: "center" }}>
								{(item.eventKey === "all"
									? props.all
									: item.eventKey === "future"
									? props.future
									: props.past
								).map((c) => (
									<tr key={c.appointment_id}>
										<td>{c.patient_name}</td>
										<td>{c.case_description}</td>
										<td>{moment(c.start_time).format("ll")}</td>
										<td>{moment(c.start_time).format("HH:mm A")}</td>
										<td>{moment(c.end_time).format("HH:mm A")}</td>
										<td>
											{moment(c.end_time).diff(moment(c.start_time), "minutes")}{" "}
											min
										</td>
										{item.eventKey === "future" && (
											<td>
												<button
													onClick={() => {
														onCancelAppointment(c);
													}}
												>
													Cancel
												</button>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</Table>
					</Tab>
				))}
				<Tab eventKey='unset' title='Pending Appointment'>
					<Table striped bordered hover responsive='lg'>
						<thead style={{ textAlign: "center" }}>
							<th>Patient Name</th>
							<th>Case Description</th>
							<th>Preferred Date</th>
							<th>Cancel</th>
						</thead>
						<tbody style={{ textAlign: "center" }}>
							{props.unset.map((c) => (
								<tr key={c.appointment_id}>
									<td>{c.patient_name}</td>
									<td>{c.case_description}</td>
									<td>{moment(c.preferred_date).format("ll")}</td>
									<td>
										<button
											onClick={() => {
												onCancelAppointment(c);
											}}
										>
											Cancel
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
			</Tabs>
		</div>
	);
}

export default TabComponent;
