/** @format */

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const fetchData = useCallback(async () => {
		try {
			const params = {
				name: searchTerm,
				sort: "name",
				order: sortOrder,
				page: currentPage,
			};
			const response = await axios.get(
				// "https://pokevault.ibnufajarweb.site/pokemons",
				"http://localhost:3000/pokemons",
				{
					params,
				}
			);
			setPokemons(response.data.pokemons);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error(error);
		}
	}, [searchTerm, sortOrder, currentPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	const handleSortChange = (e) => {
		setSortOrder(e.target.value);
		setCurrentPage(1);
	};

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='mb-8'>
			<div className='mb-4 flex items-center'>
				<input
					type='text'
					placeholder='Search Pokemon...'
					value={searchTerm}
					onChange={handleSearchChange}
					className='p-2 border border-yellow-300 rounded-md flex-grow'
				/>
				<button
					onClick={() => fetchData()}
					className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline'>
					Search
				</button>
			</div>

			<div className='mb-4 flex items-center'>
				<label className='mr-2 text-yellow-600'>Sort by Name:</label>
				<select
					value={sortOrder}
					onChange={handleSortChange}
					className='p-2 border border-yellow-300 rounded-md'>
					<option value='asc'>Ascending</option>
					<option value='desc'>Descending</option>
				</select>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{pokemons.map((pokemon) => (
					<Link
						to={`/pokemons/${pokemon.id}`}
						key={pokemon.id}
						className='hover:no-underline'>
						<div className='bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105'>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-32 object-cover mb-2 rounded-md'
							/>
							<h3 className='text-lg font-semibold mb-1'>{pokemon.name}</h3>
							<p className='text-yellow-500 text-sm'>
								Type: {pokemon.type}, Rarity: {pokemon.rarity}
							</p>
						</div>
					</Link>
				))}
			</div>

			<div className='mt-4'>
				<ul className='flex space-x-2'>
					{Array.from({ length: totalPages }).map((_, index) => (
						<li
							key={index}
							className={`px-2 py-1 border ${
								currentPage === index + 1 ? "bg-red-500 text-white" : ""
							} cursor-pointer rounded-md`}
							onClick={() => paginate(index + 1)}>
							{index + 1}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PokemonList;
