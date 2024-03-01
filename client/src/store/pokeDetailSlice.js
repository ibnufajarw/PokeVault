/** @format */

import { createSlice } from "@reduxjs/toolkit";
import axios from "../components/instances/instance";

const initialState = {
	data: {},
};

export const pokeDetailSlice = createSlice({
	name: "pokeDetail",
	initialState,
	reducers: {
		pokeDetail: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export function fetchDetail(id) {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/pokemons/${id}`);

			dispatch(pokeDetail(data));
		} catch (error) {
			console.log(error);
		}
	};
}

export const { pokeDetail } = pokeDetailSlice.actions;

export default pokeDetailSlice.reducer;
