import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/auth";
import patientCaseAPI from "../../../api/patientCaseAPI";
import { Card, Table } from "react-bootstrap";
import moment from "moment";
//import "./Appointment.css";

export default function Appointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [cases, setCases] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/appointment");
		// if (!(auth.isauth && auth.type === 0)) {
		// 	history.push("/home");
		// }

		//console.log(tokenNow);
		dispatch(setLoading({ loading: true }));
		patientCaseAPI({
			token: auth.token,
		}).then((res) => {
			console.log(res);
			if (res.success) {
				console.log(res.data.cases);
				setCases(res.data.cases);
			} else {
				// alert(res.data.msg + "\nYou will be redirected to Home.");
				setTimeout(history.push("/patient/appointment"), 0);
			}
			dispatch(setLoading({ loading: false }));
		});

		//setTimeout(patientFunc(), 100);
	}, []);

	return (
		<div>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<th>Case Description</th>
					<th>Latest Appointment</th>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{cases.map((c) => (
						<tr
							key={c.case_id}
							onClick={(e) => {
								console.log(e.target);
							}}
						>
							<td>{c.case_description}</td>
							<td>{moment(c.start_time).format("lll")}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div id='card'>
				<Card
					className='appointment-addcard'
					onClick={() => {
						history.push("/patient/new-case");
					}}
				>
					<Card.Body>
						<Card.Title style={{ fontSize: "140%" }}>
							Create New Case
						</Card.Title>
						<Card.Text></Card.Text>
					</Card.Body>
				</Card>
			</div>
			{cases.map((c) => (
				<div id='card' key={c.case_id}>
					<Card
						className='appointment'
						onClick={() => {
							history.push("/patient/myappointment", { case_details: c });
						}}
					>
						<Card.Body>
							<Card.Title>Case Id: {c.case_id}</Card.Title>
							<Card.Text>{c.case_description}</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	);
}
