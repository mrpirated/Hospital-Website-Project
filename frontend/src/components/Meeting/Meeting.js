import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../context/SocketContext";
import { setPeer } from "../../store/auth";
import user_pic from "./user.jpg";
import io from "socket.io-client";
import Peer from "simple-peer";

function Meeting() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const socketData = useSelector((state) => state.socket);
	const [peerId, setPeerId] = useState();
	const [socket, setSocket] = useContext(SocketContext);
	const [appDetails, setAppDetails] = useState();
	const [patientVideoOn, setPatientVideoOn] = useState(false);
	const [doctorVideoOn, setDoctorVideoOn] = useState(false);
	//const [peer, setPeer] = useState();
	const [stream, setStream] = useState();
	const [tracks, setTracks] = useState([]);
	const patientVideo = useRef();
	const doctorVideo = useRef();

	//const appDetails = location.state.app;
	console.log(appDetails);
	//console.log(location);
	useEffect(() => {
		if (location.state == null || !location.state.app) {
			return <Navigate to='/home' />;
		} else {
			setAppDetails(location.state.app);
		}
	}, []);
	const getMediaDevices = () => {
		return navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				setTracks(stream.getTracks());
				return stream;
			});
	};
	useEffect(() => {
		console.log(auth.peer);
		console.log(peerId);
	}, [auth.peer, peerId]);
	useEffect(() => {
		if (socket && auth.isauth && socketData.socketId && appDetails) {
			console.log(socket);
			console.log(socketData);

			socket.emit("getRoom", {
				token: "Bearer " + auth.token,
				appointment_id: appDetails.appointment_id,
				socketId: socketData.socketId,
			});
			socket.on("roomStatus", (response) => {
				console.log(response);
				if (response.success) {
					getMediaDevices().then((stream) => {
						//console.log(stream);
						if (auth.type === "patient") {
							console.log(patientVideo);
							console.log(doctorVideo);
							patientVideo.current.srcObject = stream;

							setPatientVideoOn(true);

							if (response.data.appointment.doctor_socketId) {
								setPeerId(response.data.appointment.doctor_socketId);
								const peer = new Peer({
									initiator: true,
									trickle: false,
									stream: stream,
								});
								callPeer(peer, response.data.appointment.doctor_socketId);
								dispatch(setPeer({ peer }));
							} else {
								const peer = new Peer({
									initiator: false,
									trickle: false,
									stream: stream,
								});
								// console.log(peer);
								dispatch(setPeer({ peer }));
								socket.on("peerCalling", (data) => {
									console.log(data);
									waitPeer(peer, data.from, data.signal);
								});
							}
						} else if (auth.type === "doctor") {
							doctorVideo.current.srcObject = stream;
							setDoctorVideoOn(true);
							if (response.data.appointment.patient_socketId) {
								setPeerId(response.data.appointment.patient_socketId);
								const peer = new Peer({
									initiator: true,
									trickle: false,
									stream: stream,
								});
								callPeer(peer, response.data.appointment.patient_socketId);
								dispatch(setPeer({ peer }));
							} else {
								const peer = new Peer({
									initiator: false,
									trickle: false,
									stream: stream,
								});
								dispatch(setPeer({ peer }));
								socket.on("peerCalling", (data) => {
									console.log(data);
									waitPeer(peer, data.from, data.signal);
								});
							}
						}
						//console.log(patientVideo);

						//console.log(peer);
						//setPeer(peer);
					});
				}
			});
			socket.on("peerDisconnected", () => {});
		}
	}, [socket, auth.isauth, socketData.socketId, appDetails]);

	const callPeer = (peer, peerId) => {
		console.log(peer);
		console.log(peerId);
		peer.on("connect", () => {
			//setDoctorPresent(true);
			console.log("connected");
		});
		peer.on("signal", (data) => {
			socket.emit("callPeer", {
				userToCall: peerId,
				signalData: data,
				from: socketData.socketId,
			});
		});
		peer.on("stream", (stream) => {
			if (auth.type === "doctor") {
				patientVideo.current.srcObject = stream;
				setPatientVideoOn(true);
			} else if (auth.type === "patient") {
				doctorVideo.current.srcObject = stream;
				setDoctorVideoOn(true);
			}
		});
		socket.on("peerHere", (signal) => {
			console.log(signal);
			//setPatientPresent(true);
			peer.signal(signal);
			//console.log("signal sent");
		});
	};
	const waitPeer = (peer, peerId, peerSignal) => {
		peer.on("connect", () => {
			console.log("connected");
		});
		peer.on("signal", (data) => {
			socket.emit("peerAccept", { signal: data, to: peerId });
		});
		peer.on("stream", (stream) => {
			console.log(stream);
			//console.log(doctorVideo.current);
			if (auth.type === "patient") {
				setDoctorVideoOn(true);
				doctorVideo.current.srcObject = stream;
			} else if (auth.type === "doctor") {
				patientVideo.current.srcObject = stream;
				setPatientVideoOn(true);
			}
		});
		peer.signal(peerSignal);
	};
	// if (location.state == null || !location.state.app) {
	// 	return <Navigate to='/home' />;
	// }

	return (
		<div>
			<div className='meeting'>
				<div
					className='big-video video'
					style={patientVideoOn ? {} : { display: "none" }}
				>
					{/* <PatientVideo /> */}
					<video playsInline muted={true} ref={patientVideo} autoPlay />
					{/* {patientVideo ? (
					<video playsInline muted={true} ref={patientVideo} autoPlay />
				) : (
					<img src={user_pic} />
				)} */}
				</div>
				<div
					className='big-video video'
					style={patientVideoOn ? { display: "none" } : {}}
				>
					<img src={user_pic} />
				</div>
				<div
					className='small-video video'
					style={doctorVideoOn ? {} : { display: "none" }}
				>
					<video playsInline muted={true} ref={doctorVideo} autoPlay />
				</div>
				<div
					className='small-video video'
					style={doctorVideoOn ? { display: "none" } : {}}
				>
					<img src={user_pic} />
				</div>
			</div>
			<div>
				<button
					onClick={() => {
						console.log(tracks);
						tracks[1].stop();
						setPatientVideoOn(false);
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
								setPatientVideoOn(true);
								setTracks(stream.getTracks());
								if (auth.type === "patient")
									patientVideo.current.srcObject = stream;
								else if (auth.type === "doctor")
									doctorVideo.current.srcObject = stream;
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
