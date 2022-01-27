import React, { useState, useEffect } from "react";
import uploadProfilePicAPI from "../../../api/uploadProfilePicAPI";
import getProfilePicAPI from "../../../api/getProfilePicAPI";
import { useSelector } from "react-redux";
import styled from "styled-components";
import doctor_image from "./doctor.jpg";
const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const SidebarMenu = styled.nav`
	width: 20%;
	height: 90vh;
	background-color: rgb(99, 226, 243);
	position: relative;
	top: 0;
	float: left;
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
		// var selectedFile = e.target.files[0];
		// var reader = new FileReader();

		// var imgtag = document.getElementById("profile_pic");
		// imgtag.title = selectedFile.name;

		// reader.onload = function (e) {
		// 	imgtag.src = e.target.result;
		// };

		// reader.readAsDataURL(selectedFile);
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
				<div style={{ width: "100%", overflow: "hidden" }}>
					<SidebarMenu>
						<div style={{ margin: "5%" }}>
							<img
								src={
									profilePic
										? `data:image/jpeg;base64,${new Buffer.from(
												profilePic
										  ).toString("base64")}`
										: doctor_image
								}
								position='relative'
								width='100%'
								alt='profile_pic'
							/>
						</div>
					</SidebarMenu>
					<div style={{ float: "right", width: "80%" }}>
						<label for='myfile'>Select a file:</label>
						<input type='file' onChange={handleFileInput} />
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Profile;
