import React, { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import VideoComponent from "../../HOME/VideoComponent";
import Peer from "simple-peer";
import styled from "styled-components";

function Meeting() {
	const [socket, setSocket] = useContext(SocketContext);
	const navigate = useNavigate();
	const location = useLocation();
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
	const appDetails = location.state.app;
	//console.log(props.location.state);
	if (!appDetails) {
		navigate("/home");
	}

	// useEffect(() => {
	// 	if (foundApp) {
	// 		navigator.mediaDevices
	// 			.getUserMedia({ video: true, audio: true })
	// 			.then((stream) => {
	// 				setStream(stream);
	// 				console.log(stream);
	// 				setTracks(stream.getTracks());
	// 				//console.log(stream.getTracks());
	// 				if (doctorVideo.current) doctorVideo.current.srcObject = stream;
	// 			});
	// 		console.log(tracks);
	// 		//stream.mediaDevices.stop();
	// 	}
	// 	return () => {
	// 		if (tracks) tracks.forEach((track) => track.stop());
	// 	};
	// }, [foundApp]);
	useEffect(() => {
		//console.log(appDetails);
		if (socket) {
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

							if (doctorVideo.current) doctorVideo.current.srcObject = stream;
							console.log(doctorVideo);
							if (response.data.appointment.patient_socketId) {
								console.log(response.data.appointment.patient_socketId);
								setPatientSocketId(response.data.appointment.patient_socketId);
								setPatientPresent(true);
								console.log(streamtp);
								callPatient(
									response.data.appointment.patient_socketId,
									streamtp
								);
							} else {
								socket.on("patientCalling", (data) => {
									console.log(data);
									setPatientSocketId(data.from);
									setPatientSignal(data.signal);
									waitForPatient(data.from, data.signal, streamtp);
								});
							}
						});
				} else {
					// alert(response.message);
					// setTimeout(navigate("/doctor"), 1000);
					//tracks[0].stop();
				}
			});
		}
	}, [socket, auth.isauth]);

	const callPatient = (id, stream) => {
		console.log(stream);
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on("connect", () => {
			console.log("connected");
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
			console.log(patientVideo.current);
			patientVideo.current.srcObject = stream;
		});
		socket.on("patientHere", (signal) => {
			console.log(signal);
			setPatientPresent(true);
			peer.signal(signal);
			//console.log("signal sent");
		});
	};
	const waitForPatient = (id, patientSignal, stream) => {
		console.log(stream);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		console.log(peer);
		//console.log("waiting for patient");
		peer.on("connect", () => {
			console.log("connected");
		});
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
	// let DoctorVideo;
	// if (stream) {
	// 	console.log(stream);
	// 	DoctorVideo = <Video playsInline muted ref={doctorVideo} autoPlay />;
	// }
	// let PatientVideo;
	// if (patientPresent) {
	// 	PatientVideo = <Video playsInline muted ref={patientVideo} autoPlay />;
	// }

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
		<div>
			<div className='meeting'>
				<VideoComponent muted={true} videoRef={patientVideo} type='big' />
				<VideoComponent muted={true} videoRef={doctorVideo} type='small' />
			</div>
			<div>
				<button
					onClick={() => {
						console.log(tracks);
						tracks.forEach((track) => track.stop());
					}}
				>
					Camera off
				</button>
				<button
					onClick={() => {
						navigator.mediaDevices
							.getUserMedia({ video: true, audio: true })
							.then((stream) => {
								setStream(stream);
								setTracks(stream.getTracks());
								if (doctorVideo.current) doctorVideo.current.srcObject = stream;
							});
					}}
				>
					Camera on
				</button>
			</div>
		</div>
	);
}

export default Meeting;
