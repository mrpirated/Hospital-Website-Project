import React from "react";
import user_pic from "./user.jpg";
function VideoComponent({ videoRef, muted, type }) {
	console.log(videoRef);
	return (
		<div className={"video " + type + "-video"}>
			{videoRef !== undefined ? (
				<video
					playsInline
					muted={muted}
					onCanPlay={() => {
						videoRef.current.play();
					}}
					ref={videoRef}
					autoPlay
				/>
			) : (
				<img src={user_pic} />
			)}
		</div>
	);
}

export default VideoComponent;
