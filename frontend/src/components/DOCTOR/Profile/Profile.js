import React, { useState } from "react";
import uploadProfilePicAPI from "../../../api/uploadProfilePicAPI";
import { useSelector } from "react-redux";
function Profile() {
	const [profilepic, setProfilepic] = useState();
	const auth = useSelector((state) => state.auth);
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
			<img id='profile_pic' variant='left' width='100' />
			<label for='myfile'>Select a file:</label>
			<input type='file' onChange={handleFileInput} />
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default Profile;
