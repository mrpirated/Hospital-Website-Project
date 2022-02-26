import React, { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import VideoComponent from "../../HOME/VideoComponent";
import Peer from "simple-peer";
import user_pic from "../../HOME/user.jpg";
function Meeting(props) {
	const [socket, setSocket] = useContext(SocketContext);
	const navigate = useNavigate();
	const location = useLocation();
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
	const appDetails = location.state.app;
	//console.log(props.location.state);
	if (!appDetails) {
		navigate("/home");
	}
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
		if (socket) {
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
							//console.log(stream);
							setTracks(stream.getTracks());
							//console.log(stream.getTracks());
							// if (patientVideo.current) patientVideo.current.srcObject = stream;
							if (doctorVideo.current) doctorVideo.current.srcObject = stream;
							console.log(patientVideo);
							console.log(doctorVideo);
							if (response.data.appointment.doctor_socketId) {
								setDoctorSocketId(response.data.appointment.doctor_socketId);
								setDoctorPresent(true);
								//callDoctor(response.data.appointment.doctor_socketId, streamtp);
							} else {
								socket.on("doctorCalling", (data) => {
									console.log(data);
									console.log("dc");
									setDoctorSocketId(data.from);
									setDoctorSignal(data.signal);
									//waitForDoctor(data.from, data.signal, streamtp);
								});
							}
						});
				} else {
					// alert(response.message);
					// setTimeout(navigate("/patient"), 1000);
					//tracks[0].stop();
				}
			});
		}
	}, [socket, auth.isauth]);
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
		<div className='meeting'>
			<div className='big-video video'>
				{patientVideo !== undefined ? (
					<video playsInline muted={true} ref={patientVideo} autoPlay />
				) : (
					<img src={user_pic} />
				)}
			</div>
			<div className='small-video video'>
				{doctorVideo !== undefined ? (
					<video playsInline muted={true} ref={doctorVideo} autoPlay />
				) : (
					<img src={user_pic} />
				)}
			</div>
			{/* <VideoComponent muted={true} videoRef={patientVideo} />

			<VideoComponent muted={true} videoRef={doctorVideo} /> */}
		</div>
	);
}

export default Meeting;
