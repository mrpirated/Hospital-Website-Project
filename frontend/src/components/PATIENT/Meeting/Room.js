import React, { useEffect, useState } from "react";
//import Controls from "./Controls/Controls";
//import TopHeader from "./TopHeader/TopHeader";

import Participant from "./Participant";
//import Details from "./Details/Details";
import { useSelector } from "react-redux";

const Room = ({ roomName, room, handleLogout }) => {
	const [participants, setParticipants] = useState([]);
	//const { videoON, audioON } = useRoomContext();
	const videoOn = useSelector((state) => state.video.videoOn);
	const audioOn = useSelector((state) => state.video.audioOn);

	console.log(participants);
	useEffect(() => {
		const participantConnected = (participant) => {
			setParticipants((prevParticipants) => [...prevParticipants, participant]);
		};

		const participantDisconnected = (participant) => {
			setParticipants((prevParticipants) =>
				prevParticipants.filter((p) => p !== participant)
			);
		};

		room.on("participantConnected", participantConnected);
		room.on("participantDisconnected", participantDisconnected);
		room.participants.forEach(participantConnected);
		return () => {
			room.off("participantConnected", participantConnected);
			room.off("participantDisconnected", participantDisconnected);
		};
	}, [room]);

	const remoteParticipants = participants.map((participant) => (
		<Participant key={participant.sid} participant={participant} />
	));

	const muteParticipant = () => {
		if (audioOn) {
			room.localParticipant.audioTracks.forEach((publication) => {
				publication.track.enable();
			});
		} else {
			room.localParticipant.audioTracks.forEach((publication) => {
				publication.track.disable();
			});
		}
	};

	const enableVideo = () => {
		if (videoOn) {
			room.localParticipant.videoTracks.forEach((publication) => {
				publication.track.disable();
			});
		} else {
			room.localParticipant.videoTracks.forEach((publication) => {
				publication.track.enable();
			});
		}
	};

	return (
		<main className='room'>
			<h2>Room: {roomName}</h2>
			<button onClick={handleLogout}>Leave Meeting </button>
			<button onClick={muteParticipant}> Mute </button>
			{/* <TopHeader
				participants={participants}
				participant={room.localParticipant}
			/> */}
			<div className='all-participants'>
				{room ? (
					<Participant
						totalParticipant={participants}
						key={room.localParticipant.sid}
						participant={room.localParticipant}
					/>
				) : (
					""
				)}
				{remoteParticipants}
			</div>
			{/* <Controls
				handleLogout={handleLogout}
				muteParticipant={muteParticipant}
				enableVideo={enableVideo}
				roomName={roomName}
				participants={participants}
				participant={room.localParticipant}
			/>

			<Details
				participants={participants}
				roomName={roomName}
				participant={room.localParticipant}
			/> */}
		</main>
	);
};

export default Room;
