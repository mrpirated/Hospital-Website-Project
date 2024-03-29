import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
