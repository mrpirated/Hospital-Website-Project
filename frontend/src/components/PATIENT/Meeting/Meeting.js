import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import VideoChat from "./VideoChat";
function Meeting() {
	//const auth = useSelector((state) => state.auth);

	return (
		<div>
			<VideoChat />
		</div>
	);
}

export default Meeting;
