/** @format */

import axios from "../components/instances/instance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GachaPokemon = () => {
	const navigate = useNavigate();
	const handleGacha = async () => {
		try {
			const response = await axios.post(`/mypokemons/gacha`, null, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			});

			Swal.fire({
				title: "Gacha Successful",
				html: `You got a new Pokemon: ${response.data.acquiredPokemon.name}`,
				icon: "success",
			});

			navigate("/mypokemons");
		} catch (error) {
			console.error("Failed to perform Pokemon Gacha", error);
			Swal.fire({
				title: "Gacha Failed",
				text: "Failed to get a new Pokemon. Please try again.",
				icon: "error",
			});
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-400 via-red-600 to-red-400'>
			<div className='bg-white p-10 rounded shadow-md bg-opacity-20 backdrop-blur-md max-w-md mx-auto text-center'>
				<h2 className='text-3xl font-bold mb-4 text-white'>Pokemon Gacha</h2>
				<p className='text-white text-sm mb-4'>1 kali gacha = 5000 coins</p>
				<button
					onClick={handleGacha}
					className='bg-red-500 hover:bg-amber-400 hover:text-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300'>
					Gacha Pokemon
				</button>
			</div>
		</div>
	);
};

export default GachaPokemon;
