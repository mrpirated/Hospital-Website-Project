import React from "react";
import { AppBar } from "@material-ui/core";
import VideoPlayer from "./VideoPlayer";
import Notefications from "./Notefications";
import Options from "./Options";
function Meeting() {
	return (
		<div>
			<AppBar position='static' color='inherit'>
				{/* <Topography variant='h2' align='center'>
					Video Chat
				</Topography> */}
			</AppBar>
			<VideoPlayer />
			<Options>
				<Notefications />
			</Options>
		</div>
	);
}

export default Meeting;
