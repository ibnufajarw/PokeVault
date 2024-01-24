/** @format */

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GachaPokemon = () => {
	const navigate = useNavigate();
	const handleGacha = async () => {
		try {
			const response = await axios.post(
				// "https://pokevault.ibnufajarweb.site/mypokemons/gacha",
				"http://localhost:3000/mypokemons/gacha",
				null,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

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
		<div className='max-w-md mx-auto p-4 bg-white rounded shadow-md text-center'>
			<h2 className='text-2xl font-bold mb-4 text-yellow-500'>Pokemon Gacha</h2>
			<button
				onClick={handleGacha}
				className='bg-yellow-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline'>
				Gacha Pokemon
			</button>
		</div>
	);
};

export default GachaPokemon;
