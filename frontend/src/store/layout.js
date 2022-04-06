import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	title: "Ayurveda",
};
const slice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		titleChanged: (layout, action) => {
			layout.title = action.payload.title;
		},
	},
});
export const { titleChanged } = slice.actions;
export default slice.reducer;
