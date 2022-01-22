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
	const [patientPresent, setPatientPresent] = useState(false);
	const [patientSocketId, setPatientSocketId] = useState(null);
	const [patientSignal, setPatientSignal] = useState();
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
					console.log(stream.getTracks());
					if (doctorVideo.current) doctorVideo.current.srcObject = stream;
				});
			console.log(tracks);
			//stream.mediaDevices.stop();
		}
		return () => {
			if (tracks) tracks.forEach((track) => track.stop());
		};
	}, [foundApp]);
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
				setFoundApp(true);
				if (response.data.appointment.patient_socketId) {
					console.log(response.data.appointment.patient_socketId);
					setPatientSocketId(response.data.appointment.patient_socketId);
					setPatientPresent(true);
					callPatient(response.data.appointment.patient_socketId);
				} else {
				}
			} else {
				alert(response.message);
				setTimeout(history.push("/doctor"), 1000);
				//tracks[0].stop();
			}
		});
	}, []);
	useEffect(() => {
		socket.on("patientCalling", (data) => {
			console.log(data);
			setPatientSocketId(data.from);
			setPatientSignal(data.signal);
			waitForPatient(data.from, data.signal);
		});
	}, []);
	const callPatient = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			console.log("here");
			socket.emit("callPatient", {
				userToCall: id,
				signalData: data,
				from: socketData.socketId,
			});
		});
		peer.on("stream", (stream) => {
			console.log(stream);
			patientVideo.current.srcObject = stream;
		});
		socket.on("patientHere", (signal) => {
			console.log(signal);
			setPatientPresent(true);
			peer.signal(signal);
		});
	};
	const waitForPatient = (id, patientSignal) => {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		console.log("waiting for patient");
		peer.on("signal", (data) => {
			console.log(data);
			socket.emit("doctorAccept", { signal: data, to: id });
		});
		peer.on("stream", (stream) => {
			console.log(stream);
			patientVideo.current.srcObject = stream;
		});
		peer.signal(patientSignal);
	};
	let PatientVideo;
	if (patientPresent) {
		PatientVideo = <Video playsInline ref={patientVideo} autoPlay />;
	}
	let DoctorVideo;
	if (stream) {
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
				{DoctorVideo}
				{PatientVideo}
			</Row>
		</Container>
	);
}

export default Meeting;
