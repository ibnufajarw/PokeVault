/** @format */

import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import myPokemonSlice from "./myPokemonSlice";
import profileSlice from "./profileSlice";
import pokeDetailSlice from "./pokeDetailSlice";

export const store = configureStore({
	reducer: {
		profile: profileSlice,
		pokemons: pokemonSlice,
		pokedetails: pokeDetailSlice,
		mypokemons: myPokemonSlice,
	},
});
