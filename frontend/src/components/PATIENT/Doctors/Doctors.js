import React, { useEffect, useState } from "react";
import getDoctorDetailsAPI from "../../../api/getDoctorDetailsAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Image,
	DropdownButton,
	Dropdown,
	Row,
	Col,
} from "react-bootstrap";
import { requirePropFactory } from "@material-ui/core";
import doctor_image from "./doctor.jpg";
import "./Doctors.css";
import doctorLogo from "./doctor.jpg";
import getSpecializationAPI from "../../../api/getSpecializationAPI";
import getDoctorsAPI from "../../../api/getDoctorsAPI";

function Doctors() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [doctorDetails, setDoctorDetails] = useState([]);
	const [displayDoctors, setDisplayDoctors] = useState([]);
	const [specialization, setSpecialization] = useState([]);
	const [speciality, setSpeciality] = useState("All");
	const [doctorName, setDoctorName] = useState("");
	const dataLimit = 10,
		pageLimit = 5;
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/doctors");

		getSpecializationAPI({
			token: auth.token,
		}).then((res) => {
			console.log(res);
			if (res.success) {
				console.log(res.data.specialization);
				setSpecialization(res.data.specialization);
			} else {
				console.log("No Specialization Recieved.");
			}
		});

		getDoctorsAPI({
			token: auth.token,
		}).then((res) => {
			if (res.success) {
				console.log(res.data.doctor);

				setDoctorDetails(res.data.doctor);
				setDisplayDoctors(res.data.doctor);
				setPages(Math.ceil(res.data.doctor.length / dataLimit));
				console.log(Math.ceil(res.data.doctor.length / dataLimit));
			} else {
				console.log("No Doctors Recieved.");
			}
		});
	}, []);

	const [pages, setPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	function goToNextPage() {
		setCurrentPage((page) => page + 1);
	}

	function goToPreviousPage() {
		setCurrentPage((page) => page - 1);
	}

	function changePage(event) {
		const pageNumber = Number(event.target.textContent);
		setCurrentPage(pageNumber);
	}

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return displayDoctors.slice(startIndex, endIndex);
	};

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};

	const handleSpecialityChange = (event) => {
		//console.log(event.target.value);
		setSpeciality(event.target.value);
		if (event.target.value === "All") {
			setDisplayDoctors(doctorDetails);
		} else {
			const tempDoctors = doctorDetails.filter((d) => {
				return d.specialization.includes(event.target.value);
			});
			setDisplayDoctors(tempDoctors);
		}
	};

	const handleNameChange = (event) => {
		console.log(event.target.value);
		setDoctorName(event.target.value);
		if (event.target.value === "") {
			setDisplayDoctors(doctorDetails);
		} else {
			const tempDoctors = doctorDetails.filter((d) => {
				return (
					d.first_name.includes(event.target.value) ||
					d.last_name.includes(event.target.value)
				);
			});
			setDisplayDoctors(tempDoctors);
		}
	};

	return (
		<div>
			<div className='search-container'>
				<div className='findDoctorDiv'>
					<h2 className='findDoctorHeader' style={{ color: "white" }}>
						Find a Doctor
					</h2>
					<p className='findDoctorParagraph'>
						Find the perfect specialist from our list of excellent doctors.
					</p>
					<select
						className='findDoctorDropdown'
						value={speciality}
						onChange={handleSpecialityChange}
					>
						<option value='All'>All</option>
						{specialization.map((s, index) => (
							<option value={s.name}>{s.name}</option>
						))}
					</select>
					<div style={{ display: "flex", marginTop: "2%" }}>
						<span className='fa-search-icon'>
							<i className='fa fa-search' />
						</span>
						<input
							value={doctorName}
							onChange={handleNameChange}
							className='search-box'
							type='search'
							placeholder='Search by name'
							id='search_doctor'
							name='search_doctor'
						></input>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: "3%" }}>
				<div className='all-doc-list'>
					<p>All Doctors</p>
				</div>
			</div>
			<div>
				<div>
					{getPaginatedData().map((d) => (
						<div id='cardDiv' key={d.doctor_id}>
							<Card className='doctorCard'>
								<Card.Body>
									<Card.Title>
										<span>
											<Image
												src={
													d.image
														? `data:image/jpeg;base64,${new Buffer.from(
																d.image.data
														  ).toString("base64")}`
														: doctor_image
												}
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
											<b>Specialization: </b>
											{/* <ListGroup style={{ marginTop: "3%", fontSize: "0.6rem" }}> */}
											{d.specialization.map((s) => (
												<p
													style={{
														display: "inline-block",
														margin: "0",
														padding: "5px",
														marginLeft: "5px",
														backgroundColor: "black",
														color: "white",
														borderRadius: "8px",
													}}
												>
													{s}
												</p>
											))}
											{/* </ListGroup> */}
										</ListGroupItem>
										<ListGroupItem>
											<b>Qualifications:</b> {"Temp Data"}
										</ListGroupItem>
										<ListGroupItem>
											<b>Contact Details:</b>
											<ListGroup
												style={{ marginTop: "3%", fontSize: "0.6rem" }}
											>
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
				<div
					className='pagination'
					style={{ paddingBottom: "20px", paddingTop: "20px" }}
				>
					{/* previous button */}
					<button
						onClick={goToPreviousPage}
						className={`prev ${currentPage === 1 ? "disabled" : ""}`}
						disabled={currentPage === 1}
					>
						prev
					</button>

					{/* show page numbers */}
					{getPaginationGroup().map((item, index) => (
						<button
							key={index}
							onClick={changePage}
							className={`${index >= pages ? "disabled" : ""} paginationItem ${
								currentPage === item ? "active" : null
							}`}
							disabled={index >= pages}
						>
							<span>{item}</span>
						</button>
					))}

					{/* next button */}
					<button
						onClick={goToNextPage}
						className={`next ${currentPage === pages ? "disabled" : ""}`}
						disabled={currentPage === pages}
					>
						next
					</button>
				</div>
			</div>
		</div>
	);
}

export default Doctors;
