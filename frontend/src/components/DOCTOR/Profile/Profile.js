import React, { useState, useEffect } from "react";
import uploadProfilePicAPI from "../../../api/uploadProfilePicAPI";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import { useSelector } from "react-redux";
import styled from "styled-components";
import doctor_image from "./doctor.jpg";
const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`;
function Profile() {
	const [profilepic, setProfilepic] = useState();
	const auth = useSelector((state) => state.auth);
	const [profilePic, setProfilePic] = useState();
	useEffect(() => {
		getProfilePicAPI({ token: auth.token }).then((response) => {
			if (response.success) {
				setProfilePic(response.data.image.data);
			}
		});
	}, []);
	const handleFileInput = (e) => {
		setProfilepic(e.target.files[0]);
		var selectedFile = e.target.files[0];
		var reader = new FileReader();

		var imgtag = document.getElementById("profile_pic");
		imgtag.title = selectedFile.name;

		reader.onload = function (e) {
			imgtag.src = e.target.result;
		};

		reader.readAsDataURL(selectedFile);
	};
	const handleSubmit = async () => {
		var formdata = new FormData();
		formdata.append("avatar", profilepic);
		await uploadProfilePicAPI({ token: auth.token, formdata: formdata }).then(
			(res) => {
				console.log(res.message);
			}
		);
	};
	return (
		<div>
			<Container>
				<img
					src={
						profilePic
							? `data:image/jpeg;base64,${new Buffer.from(profilePic).toString(
									"base64"
							  )}`
							: doctor_image
					}
					variant='left'
					width='100'
					alt='profile_pic'
				/>
				<label for='myfile'>Select a file:</label>
				<input type='file' onChange={handleFileInput} />
				<button onClick={handleSubmit}>Submit</button>
			</Container>
		</div>
	);
}

export default Profile;
