/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../components/instances/instance";

export const fetchPokemon = createAsyncThunk(
	"pokemons/fetchPokemon",
	async ({ searchTerm, sortOrder, currentPage }) => {
		const response = await axios.get("/pokemons", {
			params: {
				name: searchTerm,
				sort: "name",
				order: sortOrder,
				page: currentPage,
			},
		});
		return response.data;
	}
);

const initialState = {
	data: [],
	totalPages: 0,
	loading: false,
	error: null,
};

export const pokemonSlice = createSlice({
	name: "pokemons",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// eslint-disable-next-line no-unused-vars
		builder.addCase(fetchPokemon.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		});

		builder.addCase(fetchPokemon.fulfilled, (state, action) => {
			state.data = action.payload.pokemons;
			state.totalPages = action.payload.totalPages;
			state.loading = false;
		});

		builder.addCase(fetchPokemon.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		});
	},
});

export default pokemonSlice.reducer;
