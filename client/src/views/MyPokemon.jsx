/** @format */

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../components/instances/instance";
import { fetchMyPokemon, deletePokemon } from "../store/myPokemonSlice";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const MyPokemonList = () => {
	const myPokemonList = useSelector((state) => {
		return state.mypokemons.data;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMyPokemon());
	}, []);

	const handleDeletePokemon = async (id) => {
		try {
			await axios.delete(`/mypokemons/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});

			dispatch(deletePokemon(id));
			Swal.fire("Success", "Pokemon deleted successfully", "success");
		} catch (error) {
			console.error("Failed to delete Pokemon", error);
			Swal.fire("Error", "Failed to delete Pokemon", "error");
		}
	};

	return (
		<>
			<Navbar />
			<div className='container mx-auto mt-8 p-4'>
				<h2 className='text-3xl font-bold mb-6 text-red-500 text-center'>
					My Pokemon List
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{myPokemonList.map((pokemon) => (
						<div
							key={pokemon.PokemonId}
							className='bg-white rounded-xl overflow-hidden shadow-lg p-6 transform hover:scale-105 transition-transform'>
							<img
								src={pokemon.Pokemon.image}
								alt={pokemon.Pokemon.name}
								className='w-full h-40 object-cover mb-4 rounded-md'
							/>
							<h3 className='text-xl font-bold mb-2'>{pokemon.Pokemon.name}</h3>
							<p>ID: {pokemon.PokemonId}</p>
							<p>Type: {pokemon.Pokemon.type}</p>
							<p>Level: {pokemon.Pokemon.level}</p>
							<p>Attack: {pokemon.Pokemon.attack}</p>
							<p>Defense: {pokemon.Pokemon.defense}</p>
							<p>HP: {pokemon.Pokemon.hp}</p>
							<p>Speed: {pokemon.Pokemon.speed}</p>
							<p>Rarity: {pokemon.Pokemon.rarity}</p>
							<button
								onClick={() => handleDeletePokemon(pokemon.PokemonId)}
								className='bg-red-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline'>
								Delete
							</button>
						</div>
					))}
				</div>
				<Link to='/mypokemons/gacha'>
					<button className='bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline'>
						Gacha Pokemon
					</button>
				</Link>
			</div>
		</>
	);
};

export default MyPokemonList;
