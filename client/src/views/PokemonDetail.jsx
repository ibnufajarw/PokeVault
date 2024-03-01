/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail } from "../store/pokeDetailSlice";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const PokemonDetail = () => {
	const { id } = useParams();
	const pokeDetail = useSelector((state) => {
		return state.pokedetails.data;
	});
	console.log(pokeDetail, "<<poke");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDetail(id));
	}, [id]);

	return (
		<>
			<Navbar />
			<div className='container mx-auto mt-8 flex'>
				{pokeDetail ? (
					<div className='bg-white p-4 rounded-lg shadow-md flex'>
						<img
							src={pokeDetail.image}
							alt={pokeDetail.name}
							className='w-64 h-100 object-cover mb-4 rounded-md mr-4'
						/>
						<div>
							<h1 className='text-4xl font-bold mb-2'>{pokeDetail.name}</h1>
							<h2 className='text-xl font-semibold mb-2 text-red-500'>
								Type:{pokeDetail.type}
							</h2>
							<h2 className='text-lg font-semibold mb-2 text-amber-400'>
								Rarity: {pokeDetail.rarity}
							</h2>
							<p className='text-lg mb-4'>{pokeDetail.description}</p>
							<div>
								<h3 className='text-xl font-semibold mb-2'>Base Stats</h3>
								<div className='grid grid-cols-2 gap-2'>
									<div className='bg-gray-500 p-2 rounded-md hover:scale-105 transition duration-300'>
										<p className='text-lg font-semibold mb-1 text-white'>
											Attack :
										</p>
										<p className='text-xl text-white'>{pokeDetail.attack}</p>
									</div>
									<div className='bg-green-500 p-2 rounded-md hover:scale-105 transition duration-300'>
										<p className='text-lg font-semibold mb-1'>Defense :</p>
										<p className='text-xl'>{pokeDetail.defense}</p>
									</div>
									<div className='bg-red-500 p-2 rounded-md text-white hover:scale-105 transition duration-300'>
										<p className='text-lg font-semibold mb-1'>HP :</p>
										<p className='text-xl'>{pokeDetail.hp}</p>
									</div>
									<div className='bg-amber-400 p-2 rounded-md hover:scale-105 transition duration-300'>
										<p className='text-lg font-semibold mb-1'>Speed :</p>
										<p className='text-xl'>{pokeDetail.speed}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
};

export default PokemonDetail;
