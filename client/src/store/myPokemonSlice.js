/** @format */

import { createSlice } from "@reduxjs/toolkit";
import axios from "../components/instances/instance";

const initialState = {
	data: [],
};

export const myPokemonSlice = createSlice({
	name: "mypokemons",
	initialState,
	reducers: {
		getMyPokemons: (state, { payload }) => {
			state.data = payload;
		},
		deletePokemon: (state, { payload }) => {
			state.data = state.data.filter(
				(pokemon) => pokemon.PokemonId !== payload
			);
		},
	},
});

export function fetchMyPokemon() {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/mypokemons", {
				headers: {
					Authorization: `Bearer ` + localStorage.getItem("accessToken"),
				},
			});

			dispatch(getMyPokemons(data));
		} catch (error) {
			console.log(error);
		}
	};
}

export const { getMyPokemons, deletePokemon } = myPokemonSlice.actions;

export default myPokemonSlice.reducer;
