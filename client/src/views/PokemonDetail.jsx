/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PokemonDetail = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		const fetchPokemonDetail = async () => {
			try {
				const response = await axios.get(
					// `https://pokevault.ibnufajarweb.site/pokemons/${ id }`
					"http://localhost:3000/pokemons/${ id }"
				);
				setPokemon(response.data);
			} catch (error) {
				console.error("Failed to fetch Pokemon detail", error);
			}
		};

		fetchPokemonDetail();
	}, [id]);

	return (
		<>
			<Navbar />
			<div className='container mx-auto mt-8'>
				{pokemon ? (
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<img
							src={pokemon.image}
							alt={pokemon.name}
							className='w-full h-48 object-cover mb-4 rounded-md'
						/>
						<h2 className='text-2xl font-semibold mb-2'>{pokemon.name}</h2>
						<p className='text-gray-500 mb-2'>
							Type: {pokemon.type}, Rarity: {pokemon.rarity}
						</p>
						<p className='text-lg mb-4'>{pokemon.description}</p>
						<div>
							<h3 className='text-xl font-semibold mb-2'>Base Stats</h3>
							<ul>
								<li className='mb-1'>Attack: {pokemon.attack}</li>
								<li className='mb-1'>Defense: {pokemon.defense}</li>
								<li className='mb-1'>HP: {pokemon.hp}</li>
								<li className='mb-1'>Speed: {pokemon.speed}</li>
							</ul>
						</div>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<Footer />
		</>
	);
};

export default PokemonDetail;
