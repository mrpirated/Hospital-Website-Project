import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/auth";
import patientCaseAPI from "../../../api/patientCaseAPI";
import {
	Card,
	Table,
	Button,
	ListGroup,
	ListGroupItem,
	Image,
} from "react-bootstrap";
import moment from "moment";
//import "./Appointment.css";

export default function Appointment(props) {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [cases, setCases] = useState([]);
	const [displayCases, setDisplayCases] = useState([]);
	const [pages, setPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const dataLimit = 10,
		pageLimit = 5;

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

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
				setDisplayCases(res.data.cases);
				setPages(Math.ceil(res.data.cases.length / dataLimit));
			} else {
				// alert(res.data.msg + "\nYou will be redirected to Home.");
				setTimeout(history.push("/patient/appointment"), 0);
			}
			sleep(1000).then(() => {
				dispatch(setLoading({ loading: false }));
			});
		});

		//setTimeout(patientFunc(), 100);
	}, [auth.isauth]);

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
		return displayCases.slice(startIndex, endIndex);
	};

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};

	return (
		<div>
			<div style={{ padding: "10px" }} className='text-center'>
				<Button
					variant='outline-dark'
					onClick={() => {
						history.push("/patient/new-case");
					}}
				>
					New Case
				</Button>
			</div>
			{/* <Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<th>Case Description</th>
					<th>Latest Appointment</th>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{cases.map((c) => (
						<tr
							key={c.case_id}
							onClick={() => {
								history.push("/patient/myappointment", { case_details: c });
							}}
						>
							<td>{c.case_description}</td>
							<td>
								{c.start_time ? moment(c.start_time).format("lll") : "NA"}
							</td>
						</tr>
					))}
				</tbody>
			</Table> */}
			{/* <div id='card'>
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
			</div> */}
			{/* {cases.map((c) => (
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
			))} */}
			<div>
				<div>
					{getPaginatedData().map((c) => (
						<div id='cardDiv' key={c.case_id}>
							<Card
								className='appointmentCard'
								onClick={() => {
									history.push("/patient/myappointment", { case_details: c });
								}}
							>
								<Card.Body>
									<Card.Title style={{ fontSize: "25px" }}>
										{c.case_description}
									</Card.Title>

									<Card.Text>
										<b>Latest Appointment:</b>{" "}
										{c.start_time ? moment(c.start_time).format("lll") : "NA"}
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					))}
				</div>
				<div
					className='pagination fixed-bottom'
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
