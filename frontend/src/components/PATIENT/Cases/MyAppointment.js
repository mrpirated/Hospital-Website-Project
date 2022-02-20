import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { setLoading } from "../../../store/auth";
import { Card, Form, Modal, Row, Col, Button, Table } from "react-bootstrap";
import patientMyAppointmentAPI from "../../../api/patientMyAppointmentAPI";
export default function MyAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [appointments, setAppointments] = useState([]);
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	const case_details = props.location.state.case_details;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		console.log(case_details);
		patientMyAppointmentAPI({
			token: auth.token,
			case_id: case_details.case_id,
		})
			.then((res) => {
				console.log(res);
				if (res.success) {
					console.log(res.data.appointments);
					setAppointments(res.data.appointments);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);
	const onSelectAppointment = async (app) => {};
	return (
		<div>
			<div style={{ padding: "10px" }} className='text-center'>
				<Button
					variant='outline-dark'
					onClick={() => {
						history.push("/patient/new-appointment", {
							case_details: case_details,
						});
					}}
				>
					New Appointment
				</Button>
			</div>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<th>Doctor</th>
					<th>Start Time</th>
					<th>End Time</th>
					<th>Duration</th>
					<th>Preferred Date</th>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{appointments.map((a) => (
						<tr key={a.appointment_id} onClick={() => onSelectAppointment(a)}>
							<td>{a.doctor_name}</td>
							<td>
								{a.start_time ? moment(a.start_time).format("lll") : "NA"}
							</td>
							<td>{a.end_time ? moment(a.end_time).format("lll") : "NA"}</td>
							<td>
								{a.end_time
									? moment(a.end_time).diff(moment(a.start_time), "minutes") +
									  " min"
									: "NA"}
							</td>
							<td>{moment(a.preferred_date).format("ll")}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{/* <div id='card'>
				<Card
					className='appointment-addcard'
					onClick={() => {
						history.push("/patient/new-appointment", {
							case_details: case_details,
						});
					}}
				>
					<Card.Body>
						<Card.Title>Create New Appointment</Card.Title>
					</Card.Body>
				</Card>
			</div>
			{appointments.map((c) => (
				<div id='card'>
					<Card className='appointment' onClick={() => onSelectAppointment(c)}>
						<Card.Body>
							<Card.Text>Doctor: {c.doctor_name}</Card.Text>
							<Card.Text>
								Date:{" "}
								{c.start_time !== null
									? new Date(c.start_time).toString().slice(0, 15)
									: "Not Yet Appointed"}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))} */}

			<Modal
				aria-labelledby='example-custom-modal-styling-title'
				show={openPopup}
				onHide={() => setopenPopup(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-custom-modal-styling-title'>
						Appointment Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Doctor: </span>
						<span style={{ fontSize: "22px" }}>{selectedAP.doctor_name}</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>
							Descrption:{" "}
						</span>
						<span style={{ fontSize: "18px" }}>
							{case_details.case_description}
						</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Date: </span>
						<span style={{ fontSize: "18px" }}>
							{selectedAP.start_time !== null
								? new Date(selectedAP.start_time).toString().slice(0, 15)
								: "NA"}
						</span>
					</div>

					<div>
						<span style={{ fontSize: "20px" }}>
							From:{" "}
							{selectedAP.start_time !== null
								? moment(selectedAP.start_time).format("hh:mm A")
								: "NA"}
						</span>

						<span style={{ fontSize: "20px", float: "right" }}>
							To:{" "}
							{selectedAP.end_time !== null
								? moment(selectedAP.end_time).format("hh:mm A")
								: "NA"}
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
