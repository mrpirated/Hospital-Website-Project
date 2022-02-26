import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../context/SocketContext";
import getScheduledAppointmentsAPI from "../../../api/getScheduledAppointmentsAPI";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";
function Rooms() {
	const auth = useSelector((state) => state.auth);
	const socketId = useSelector((state) => state.socket.socketId);
	const [appointments, setAppointments] = useState([]);
	const [socket, setSocket] = useContext(SocketContext);
	const navigate = useNavigate();
	useEffect(() => {
		//console.log(auth.token);
		if (socketId) {
			socket.emit("getAppointments", { token: "Bearer " + auth.token });
			socket.on("appointments", (response) => {
				//console.log(response);
				if (response.success) {
					setAppointments(response.data.appointments);
				}
			});
		}
		// getScheduledAppointmentsAPI({ token: auth.token }).then((response) => {
		// 	console.log(response);
		// 	if (response.success) {
		// 		setAppointments(response.data.appointments);
		// 	} else {
		// 		console.log(response);
		// 		alert(response.message);
		// 	}
		// });
	}, [socketId]);
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
								<span>{app.patient_name}</span>
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
											navigate("/doctor/meeting", { state: { app } });
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
