import React, { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Peer from "simple-peer";
import styled from "styled-components";
const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Row = styled.div`
	display: flex;
	width: 100%;
`;

const Video = styled.video`
	border: 1px solid blue;
	width: 50%;
	height: 50%;
`;
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
	const [doctorSignal, setDoctorSignal] = useState();
	const patientVideo = useRef();
	const doctorVideo = useRef();
	//console.log(socket);
	console.log(props.location.state);
	if (!props.location.state.app) {
		history.push("/home");
	}
	const appDetails = props.location.state.app;
	// useEffect(() => {
	// 	if (foundApp) {

	// 		console.log(tracks);
	// 		//stream.mediaDevices.stop();
	// 	}
	// 	return () => {
	// 		if (tracks) tracks.forEach((track) => track.stop());
	// 	};
	// }, [foundApp]);
	useEffect(() => {
		console.log(appDetails);
		console.log(socketData);
		socket.emit("getRoom", {
			token: "Bearer " + auth.token,
			appointment_id: appDetails.appointment_id,
			socketId: socketData.socketId,
		});
		socket.on("roomStatus", (response) => {
			console.log(response);
			if (response.success) {
				//setFoundApp(true);
				var streamtp;
				navigator.mediaDevices
					.getUserMedia({ video: true, audio: true })
					.then((stream) => {
						setStream(stream);
						streamtp = stream;
						console.log(stream);
						setTracks(stream.getTracks());
						console.log(stream.getTracks());
						if (patientVideo.current) patientVideo.current.srcObject = stream;
						if (response.data.appointment.doctor_socketId) {
							setDoctorSocketId(response.data.appointment.doctor_socketId);
							setDoctorPresent(true);
							callDoctor(response.data.appointment.doctor_socketId, streamtp);
						} else {
							socket.on("doctorCalling", (data) => {
								console.log(data);
								console.log("dc");
								setDoctorSocketId(data.from);
								setDoctorSignal(data.signal);
								waitForDoctor(data.from, data.signal, streamtp);
							});
						}
					});
			} else {
				alert(response.message);
				setTimeout(history.push("/patient"), 1000);
				//tracks[0].stop();
			}
		});
	}, []);
	//useEffect(() => {}, []);
	const callDoctor = (id, stream) => {
		console.log(stream);
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		console.log(peer);
		peer.on("connect", () => {
			setDoctorPresent(true);
			console.log("connected");
		});
		peer.on("signal", (data) => {
			socket.emit("callDoctor", {
				userToCall: id,
				signalData: data,
				from: socketData.socketId,
			});
		});
		peer.on("stream", (stream) => {
			console.log(stream);
			doctorVideo.current.srcObject = stream;
		});
		socket.on("doctorHere", (signal) => {
			console.log(signal);

			peer.signal(signal);
			console.log("signal sent");
		});
	};
	const waitForDoctor = (id, doctorSignal, stream) => {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		console.log(stream);
		//console.log("waiting for doctor");
		peer.on("connect", () => {
			console.log("connected");
		});
		peer.on("signal", (data) => {
			socket.emit("patientAccept", { signal: data, to: id });
		});
		peer.on("stream", (stream) => {
			console.log(stream);
			//console.log(doctorVideo.current);
			doctorVideo.current.srcObject = stream;
		});
		peer.signal(doctorSignal);
	};
	let PatientVideo;
	if (stream) {
		PatientVideo = <Video playsInline muted ref={patientVideo} autoPlay />;
	}
	let DoctorVideo;
	if (doctorPresent) {
		DoctorVideo = <Video playsInline muted ref={doctorVideo} autoPlay />;
	}
	return (
		// <div>
		// 	<button
		// 		onClick={() => {
		// 			tracks[1].stop();
		// 		}}
		// 	>
		// 		stop video
		// 	</button>
		// </div>
		<Container>
			<Row>
				{PatientVideo}
				{DoctorVideo}
			</Row>
			{doctorPresent && <div>Doctor is present</div>}
		</Container>
	);
}

export default Meeting;
