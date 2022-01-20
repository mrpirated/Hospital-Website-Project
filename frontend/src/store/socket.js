import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	socketId: null,
};
const slice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		setSocketId: (socket, action) => {
			socket.socketId = action.payload.socketId;
		},
		deleteSocketId: (socket, action) => {
			socket.socketId = null;
		},
	},
});
export const { setSocketId, deleteSocketId } = slice.actions;
export default slice.reducer;
