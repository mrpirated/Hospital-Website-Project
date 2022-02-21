import React from "react";
import user_pic from "./user.jpg";
function VideoComponent({ videoRef, muted }) {
	return (
		<div>
			{videoRef ? (
				<video playsInline muted={muted} ref={videoRef} autoPlay />
			) : (
				<img src={user_pic} />
			)}
		</div>
	);
}

export default VideoComponent;
