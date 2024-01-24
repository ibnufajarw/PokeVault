/** @format */

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const MyPokemonList = () => {
	const [myPokemonList, setMyPokemonList] = useState([]);

	useEffect(() => {
		fetchMyPokemonList();
	}, []);

	const fetchMyPokemonList = async () => {
		try {
			const response = await axios.get(
				// "https://pokevault.ibnufajarweb.site/mypokemons/",
				"http://localhost:3000/mypokemons",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			setMyPokemonList(response.data);
		} catch (error) {
			console.error("Failed to fetch my Pokemon list", error);
		}
	};

	const handleDeletePokemon = async (id) => {
		try {
			await axios.delete(
				`https://pokevault.ibnufajarweb.site/mypokemons/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			fetchMyPokemonList();
			Swal.fire("Success", "Pokemon deleted successfully", "success");
		} catch (error) {
			console.error("Failed to delete Pokemon", error);
		}
	};

	return (
		<>
			<Navbar />
			<div className='container mx-auto mt-8'>
				<h2 className='text-3xl font-bold mb-4 text-red-500'>
					My Pokemon List
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{myPokemonList.map((pokemon) => (
						<div
							key={pokemon.PokemonId}
							className='bg-white rounded-lg overflow-hidden shadow-md p-4'>
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
