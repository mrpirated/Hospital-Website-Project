import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { RingLoader } from "react-spinners";
const LoadingProvider = (props) => (
	<LoadingOverlay
		{...props}
		spinner={<RingLoader color='white' speedMultiplier='1.5' />}
		//text='Loading...'
		fadeSpeed={500}
		styles={{
			overlay: (base) => ({
				...base,
				background: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				position: "fixed",
			}),
			content: (base) => ({
				...base,
				marginTop: props.marginTop,
			}),
		}}
	>
		{props.children}
	</LoadingOverlay>
);

export default LoadingProvider;
