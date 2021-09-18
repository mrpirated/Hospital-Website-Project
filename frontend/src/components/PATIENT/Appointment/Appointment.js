import React, {useState, useEffect} from "react";
import { Route } from "react-router-dom";
import {Switch, useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import patientCaseAPI from "../../../api/patientCaseAPI";
import {Card} from "react-bootstrap";
import "./Appointment.css";

export default function Appointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [cases, setCases] = useState([]);
	
	useEffect(() => {
		if (!(auth.isauth && auth.type === 0)) {
			history.push("/home");
		}

		patientCaseAPI({
			token: auth.token
		}).then((res) => {
			if(res.reply){
				setCases(res.cases);
			}
			else{
				alert(res.data.msg + "\nYou will be redirected to Home.");
				setTimeout(history.push("/home"), 4000);
			}
		})
	}, []);

	return (
		<div>
			<Card className="Appointment-AddCard" onClick={()=>{history.push("/patient/new-case")}} bg="dark" text="white" style={{ width : "20rem", margin: "2rem", display:"inline-grid"}}>
				<Card.Body>
					<Card.Title>Create New Case</Card.Title>
					<Card.Text>
					Some quick example text to build on the card title and make up the bulk of
					the card's content.
					</Card.Text>
				</Card.Body>
			</Card>
			{
				cases.map((c) => (
					<Card className="Appointment-Card" onClick={()=>{history.push("/patient/myappointment", {case_details: c})}} bg="dark" text="white" style={{ width : "20rem", margin: "2rem", display:"inline-grid"}}>
						<Card.Body>
							<Card.Title>Case Id: {c.case_id}</Card.Title>
							<Card.Text>
							Some quick example text to build on the card title and make up the bulk of
							the card's content.
							</Card.Text>
						</Card.Body>
					</Card>
				))
			}
		</div>
	)
}

