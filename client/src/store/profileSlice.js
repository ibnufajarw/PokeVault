/** @format */

import { createSlice } from "@reduxjs/toolkit";
import axios from "../components/instances/instance";

const initialState = {
	data: {},
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		getProfile: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export function fetchProfile() {
	return async (dispatch) => {
		console.log(dispatch, "dispatch");
		try {
			const { data } = await axios.get(`/players/profile`, {
				headers: {
					Authorization: `Bearer ` + localStorage.getItem("accessToken"),
				},
			});

			// console.log(dispatch, "<< data");
			dispatch(getProfile(data));
		} catch (error) {
			console.log(error);
		}
	};
}

export const { getProfile } = profileSlice.actions;

export default profileSlice.reducer;
