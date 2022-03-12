import React, { useState, useEffect } from "react";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import { useSelector, useDispatch } from "react-redux";
import { alertRemoved } from "../../../store/alert";
import { Nav, Col, Row, Tab, Alert } from "react-bootstrap";
import doctor_image from "../../../images/doctor.jpg";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router";
function EditDoctor() {
	const auth = useSelector((state) => state.auth);
	const alert = useSelector((state) => state.alert);
	const dispatch = useDispatch();
	const [profilePic, setProfilePic] = useState();
	const [profilePicChange, setProfilePicChange] = useState(false);
	const [eventKey, setEventKey] = useState("profile");
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		getProfilePicAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setProfilePic(response.data.image.data);
			}
			setProfilePicChange(false);
		});
	}, [profilePicChange, auth.isauth]);

	// console.log(location);
	// console.log(doctorDetails);
	if (location.state === null || !location.state.doctorDetails) {
		return <Navigate to='/admin/home' />;
	}
	const { doctorDetails } = location.state;
	return <div>EditDoctor</div>;
}

export default EditDoctor;
