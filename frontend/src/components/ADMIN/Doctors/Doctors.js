import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/auth";
import { Table, Image } from "react-bootstrap";
import getDoctorsAPI from "../../../api/getDoctorsAPI";
import getDoctorProfilePicsAPI from "../../../api/getDoctorProfilePicsAPI";
import { useNavigate } from "react-router";
import doctor_image from "../../../images/doctor.jpg";
function Doctors() {
	const auth = useSelector((state) => state.auth);
	//const history = useHistory();
	const dispatch = useDispatch();
	const [doctorDetails, setDoctorDetails] = useState([]);
	const [profilePics, setProfilePics] = useState({});
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		getDoctorsAPI({ token: auth.token })
			.then((response) => {
				if (response.success) {
					console.log(response.data.doctor);
					setDoctorDetails(response.data.doctor);
					//setDisplayDoctors(res.data.doctor);
					//setPages(Math.ceil(res.data.doctor.length / dataLimit));
					//console.log(Math.ceil(res.data.doctor.length / dataLimit));
				}
				dispatch(setLoading({ loading: false }));
				return getDoctorProfilePicsAPI({ token: auth.token });
			})
			.then((response) => {
				if (response.success) {
					//console.log(response.data.doctor);
					var tp = {};
					response.data.doctor.forEach((d) => {
						if (d.image) tp[d.doctor_id] = d.image;
					});
					setProfilePics(tp);
				}
			})
			.finally(() => {
				dispatch(setLoading({ loading: false }));
			});
	}, [auth.isauth]);

	return (
		<div>
			<Table striped bordered hover responsive='lg'>
				<thead style={{ textAlign: "center" }}>
					<tr>
						<th>Doctor Id</th>
						<th>Doctor</th>
						<th>Email Id</th>
						<th>Phone No</th>
						<th>Change Details</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: "center" }}>
					{doctorDetails.map((dd) => (
						<tr>
							<td>{dd.doctor_id}</td>
							<td>
								<span style={{ float: "left" }}>
									<Image
										src={
											profilePics[dd.doctor_id]
												? `data:image/jpeg;base64,${new Buffer.from(
														profilePics[dd.doctor_id].data
												  ).toString("base64")}`
												: doctor_image
										}
										variant='left'
										roundedCircle
										width={50}
										height={50}
									/>{" "}
								</span>
								{dd.first_name} {dd.last_name}
							</td>
							<td>{dd.email}</td>
							<td>{dd.phone}</td>
							<td
								onClick={() => {
									console.log(dd);
									navigate("/admin/edit-doctor", {
										state: { doctorDetails: dd },
									});
								}}
							>
								<button>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Doctors;
