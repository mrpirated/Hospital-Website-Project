import React, { useState } from "react";
import { Tabs, Tab, Table, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import cancelAppointmentAPI from "../../../api/cancelAppointmentAPI";
import rescheduleAppointmentAPI from "../../../api/rescheduleAppointmentAPI";
import moment from "moment";
function TabComponent(props) {
	const [key, setKey] = useState(props.selectedKey);
	const [showPopup, setShowPopup] = useState(false);
	const auth = useSelector((state) => state.auth);
	const [pd, setPd] = useState(new Date());
	const setAppChange = props.setAppChange;
	const [app, setApp] = useState({});
	const onEditAppointment = (appointment) => {
		console.log(appointment);
		setApp(appointment);
		setShowPopup(true);
		setAppChange(true);
		setPd(appointment.preferred_date);
		// cancelAppointmentAPI({
		// 	token: auth.token,
		// 	appointment_id: appointment.appointment_id,
		// }).then((response) => {
		// 	if (response.success) {
		// 		setAppChange(true);
		// 	}
		// 	console.log(response);
		// });
	};
	const onCancelAppointment = (appointment) => {
		cancelAppointmentAPI({
			token: auth.token,
			appointment_id: appointment.appointment_id,
		}).then((response) => {
			if (response.success) {
				setAppChange(true);
			}
			console.log(response);
		});
		setShowPopup(false);
	};
	const onRescheduleAppointment = (appointment) => {
		if (new Date(pd) != new Date(appointment.preferred_date)) {
			rescheduleAppointmentAPI({
				token: auth.token,
				appointment_id: appointment.appointment_id,
				preferred_date: moment(pd).format("YYYY-MM-DD"),
			}).then((response) => {
				if (response.success) {
					setAppChange(true);
				}
				console.log(response);
			});
		}
		setShowPopup(false);
	};
	return (
		<div>
			<Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
				{props.tabList.map((item) => (
					<Tab eventKey={item.eventKey} title={item.title} key={item.eventKey}>
						<Table striped bordered hover responsive='lg'>
							<thead style={{ textAlign: "center" }}>
								<tr>
									<th>Doctor Name</th>
									<th>Case Description</th>
									<th>Date</th>
									<th>From</th>
									<th>To</th>
									<th>Duration</th>
									<th>Preferred Date</th>
									{item.eventKey === "future" && <th>Edit</th>}
								</tr>
							</thead>
							<tbody style={{ textAlign: "center" }}>
								{(item.eventKey === "all"
									? props.all
									: item.eventKey === "future"
									? props.future
									: props.past
								).map((c) => (
									<tr key={c.appointment_id}>
										<td>{c.doctor_name}</td>
										<td>{c.case_description}</td>
										<td>{moment(c.start_time).format("ll")}</td>
										<td>{moment(c.start_time).format("hh:mm A")}</td>
										<td>{moment(c.end_time).format("hh:mm A")}</td>
										<td>
											{moment(c.end_time).diff(moment(c.start_time), "minutes")}{" "}
											min
										</td>
										<td>{moment(c.preferred_date).format("ll")}</td>
										{item.eventKey === "future" && (
											<td>
												<button
													onClick={() => {
														onEditAppointment(c);
													}}
												>
													Edit
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
							<tr>
								<th>Doctor Name</th>
								<th>Case Description</th>
								<th>Preferred Date</th>
								<th>Edit</th>
							</tr>
						</thead>
						<tbody style={{ textAlign: "center" }}>
							{props.unset.map((c) => (
								<tr key={c.appointment_id}>
									<td>{c.doctor_name}</td>
									<td>{c.case_description}</td>
									<td>{moment(c.preferred_date).format("ll")}</td>
									<td>
										<button
											onClick={() => {
												onEditAppointment(c);
											}}
										>
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
				<Tab eventKey='cancelled' title='Cancelled Appointment'>
					<Table striped bordered hover responsive='lg'>
						<thead style={{ textAlign: "center" }}>
							<tr>
								<th>Doctor Name</th>
								<th>Case Description</th>
								<th>Date</th>
								<th>From</th>
								<th>To</th>
								<th>Duration</th>
								<th>Preferred Date</th>
							</tr>
						</thead>
						<tbody style={{ textAlign: "center" }}>
							{props.cancelled.map((c) => (
								<tr key={c.appointment_id}>
									<td>{c.doctor_name}</td>
									<td>{c.case_description}</td>
									<td>
										{c.start_time ? moment(c.start_time).format("ll") : "NA"}
									</td>
									<td>
										{c.start_time
											? moment(c.start_time).format("hh:mm A")
											: "NA"}
									</td>
									<td>
										{c.end_time ? moment(c.end_time).format("hh:mm A") : "NA"}
									</td>
									<td>
										{c.start_time
											? moment(c.end_time).diff(
													moment(c.start_time),
													"minutes"
											  ) + " min"
											: "NA"}
									</td>
									<td>{moment(c.preferred_date).format("ll")}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
			</Tabs>
			<Modal
				show={showPopup}
				onHide={() => {
					setShowPopup(false);
				}}
			>
				<Modal.Header closeButton>Edit Appointment</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<label>
							<b>DoctorName:</b> {app.doctor_name}
						</label>
						<label>
							<b>Case Description:</b> {app.case_description}
						</label>
						<label>
							<b>Date:</b>{" "}
							{app.start_time ? moment(app.start_time).format("ll") : "NA"}
						</label>
						<label>
							<b>From:</b>{" "}
							{app.start_time ? moment(app.start_time).format("hh:mm A") : "NA"}
						</label>
						<label>
							<b>To:</b>{" "}
							{app.start_time ? moment(app.end_time).format("hh:mm A") : "NA"}
						</label>
					</div>
					<div className='row'>
						<label>
							<b>Preferred Date:</b>
						</label>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								style={{ width: "73%", alignItems: "center" }}
								variant='inline'
								inputVariant='outlined'
								format='dd/MM/yyyy'
								value={pd}
								onChange={(date) => setPd(date)}
								InputAdornmentProps={{ position: "start" }}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className='row'>
						<button
							onClick={() => {
								onRescheduleAppointment(app);
							}}
						>
							Reschedule
						</button>
					</div>
					<div className='row'>
						<button
							style={{ backgroundColor: "red" }}
							onClick={() => {
								onCancelAppointment(app);
							}}
						>
							Cancel
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default TabComponent;
