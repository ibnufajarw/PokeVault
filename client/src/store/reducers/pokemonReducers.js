/** @format */

const initialState = {
	pokemons: [],
	searchTerm: "",
	sortOrder: "asc",
	currentPage: 1,
	totalPages: 0,
};

const pokemonReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_POKEMONS_SUCCESS":
			return {
				...state,
				pokemons: action.payload.pokemons,
				totalPages: action.payload.totalPages,
			};
		case "UPDATE_SEARCH_TERM":
			return { ...state, searchTerm: action.payload, currentPage: 1 };
		case "UPDATE_SORT_ORDER":
			return { ...state, sortOrder: action.payload, currentPage: 1 };
		case "UPDATE_CURRENT_PAGE":
			return { ...state, currentPage: action.payload };
		default:
			return state;
	}
};

export default pokemonReducer;
