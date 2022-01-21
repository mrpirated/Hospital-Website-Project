import React, { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Peer from "simple-peer";
function Meeting(props) {
	const [socket, setSocket] = useContext(SocketContext);
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	const socketData = useSelector((state) => state.socket);
	const [stream, setStream] = useState();
	const [tracks, setTracks] = useState();
	const [foundApp, setFoundApp] = useState(false);
	const [doctorPresent, setDoctorPresent] = useState(false);
	const [doctorSocketId, setDoctorSocketId] = useState(null);
	const patientVideo = useRef();
	const doctorVideo = useRef();
	console.log(props.location.state);
	if (!props.location.state.app) {
		history.push("/home");
	}
	const appDetails = props.location.state.app;
	useEffect(() => {
		if (foundApp) {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					setStream(stream);
					console.log(stream);
					setTracks(stream.getTracks());
					if (patientVideo.current) patientVideo.current.srcObject = stream;
				});

			//stream.mediaDevices.stop();
		}
	}, [foundApp]);
	useEffect(() => {
		console.log(appDetails);

		socket.emit("getRoom", {
			token: "Bearer " + auth.token,
			appointment_id: appDetails.appointment_id,
			socketId: socketData.socketId,
		});
		socket.on("roomStatus", (response) => {
			console.log(response);
			if (response.success) {
				setFoundApp(true);
				if (response.data.doctor_socketId) {
					setDoctorSocketId(response.data.doctor_socketId);
					setDoctorPresent(true);
				}
			} else {
				alert(response.message);
				setTimeout(history.push("/patient"), 1000);
				//tracks[0].stop();
			}
		});
	}, []);
	const callDoctor = () => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
	};
	return <div>Hello</div>;
}

export default Meeting;
