import React, { useEffect, useState } from "react";
import getDoctorDetailsAPI from "../../../api/getDoctorDetailsAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card, ListGroup, ListGroupItem, Image, DropdownButton, Dropdown } from "react-bootstrap";
import { requirePropFactory } from "@material-ui/core";
import doctor_image from "./doctor.jpg";
import "./Doctors.css";

function Doctors() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [doctorDetails, setDoctorDetails] = useState([]);
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/doctors");

		getDoctorDetailsAPI({
			token: auth.token,
		}).then((res) => {
			if (res.reply) {
				console.log(res.doctors);
				setDoctorDetails(res.doctors);
			} else {
				setTimeout(history.push("/patient/doctors"), 0);
			}
		});
	}, []);

	return (
		<div>
			<div className="search-container">
				<div className="findDoctorDiv">
					<h2 className="findDoctorHeader" style={{color: "white"}}>Find a Doctor</h2>
					<p className="findDoctorParagraph">Find the perfect specialist from our list of excellent doctors.</p>
					<select className="findDoctorDropdown" name="cars" id="cars">
						<option value="volvo">Volvo</option>
						<option value="saab">Saab</option>
						<option value="mercedes">Mercedes</option>
						<option value="audi">Audi</option>
					</select>
					<div style={{display: "flex", marginTop: "2%"}}>
						<span className="fa-search-icon">
							<i className="fa fa-search"/>
						</span>
						<input className="search-box" type="search" placeholder="Search by name" id="search_doctor" name="search_doctor"></input>
					</div>
				</div>
			</div>
			<div>
			{doctorDetails.map((d) => (
				<div id='card'>
					<Card
						className='doctor'

						// style={{
						// 	width: "18rem",
						// 	margin: "2rem",
						// 	display: "inline-grid",
						// 	backgroundColor: "#5CDB95",
						// }}
					>
						<Card.Body>
							{/* <div style={{ display: "inline" }}>
							<img src={bird} alt='Bird' width='100' height='100' />
						</div> */}

							<Card.Title>
								<span>
									<Card.Img
										as={Image}
										src={doctor_image}
										variant='left'
										width='50'
										roundedCircle
									/>{" "}
								</span>
								<span>{d.first_name + " " + d.last_name}</span>
							</Card.Title>

							<ListGroup
								style={{
									fontSize: "0.8rem",
								}}
							>
								<ListGroupItem>
									<b>Specialization:</b> {"Temp Data"}
								</ListGroupItem>
								<ListGroupItem>
									<b>Qualifications:</b> {"Temp Data"}
								</ListGroupItem>
								<ListGroupItem>
									<b>Contact Details:</b>
									<ListGroup style={{ marginTop: "3%", fontSize: "0.6rem" }}>
										<ListGroupItem>
											<b>Phone Number:</b> {d.phone}
										</ListGroupItem>
										<ListGroupItem>
											<b>Address:</b> {d.address}
										</ListGroupItem>
										<ListGroupItem>
											<b>Email ID:</b> {d.email}
										</ListGroupItem>
									</ListGroup>
								</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
		</div>
	);
}

export default Doctors;
