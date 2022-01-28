import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { BeatLoader } from "react-spinners";
const LoadingProvider = (props) => (
	<LoadingOverlay
		{...props}
		spinner={<BeatLoader />}
		styles={{
			overlay: (base) => ({
				...base,
				background: "rgba(255, 255, 255, 0.7)",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
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
