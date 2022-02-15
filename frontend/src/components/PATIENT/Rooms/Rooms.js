import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getScheduledAppointmentsAPI from "../../../api/getScheduledAppointmentsAPI";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import moment from "moment";
function Rooms() {
	const auth = useSelector((state) => state.auth);
	const [appointments, setAppointments] = useState([]);
	const history = useHistory();
	useEffect(() => {
		console.log(auth.token);
		getScheduledAppointmentsAPI({ token: auth.token }).then((response) => {
			console.log(response);
			if (response.success) {
				setAppointments(response.data.appointments);
			} else {
				console.loh(response);
				alert(response.message);
			}
		});
	}, [auth.isauth]);
	return (
		<div>
			{appointments.map((app) => (
				<div key={app.appointment_id}>
					<Card className='room'>
						<Card.Body>
							<Card.Title>
								<div style={{ color: "#04009A" }}>
									{moment(app.start_time).format("LL")}
								</div>
								<span>{app.doctor_name}</span>
								<span style={{ float: "right", fontColor: "#04009A" }}>
									{app.case_description}
								</span>
							</Card.Title>
							<Card.Text>
								<span>From: {moment(app.start_time).format("hh:mm A")}</span>
								{"   "}
								<span>To: {moment(app.end_time).format("hh:mm A")}</span>
								<span style={{ float: "right" }}>
									<Button
										onClick={() => {
											history.push("/patient/meeting", { app });
										}}
									>
										Room
									</Button>
								</span>
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	);
}

export default Rooms;
