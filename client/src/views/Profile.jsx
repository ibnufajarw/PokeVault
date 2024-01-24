/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const PlayerProfile = () => {
	const [player, setPlayer] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlayerProfile = async () => {
			try {
				const response = await axios.get(
					// "https://pokevault.ibnufajarweb.site/players/profile",
					"http://localhost:3000/players/profile",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);

				setPlayer(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch player profile", error);
				setLoading(false);
			}
		};

		fetchPlayerProfile();
	}, []);

	return (
		<>
			<Navbar />
			<div className='container mx-auto mt-8'>
				<h2 className='text-3xl font-bold mb-4 text-red-500'>Player Profile</h2>
				{loading && <p>Loading...</p>}
				{!loading && player && (
					<table className='table-auto'>
						<tbody>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>ID:</td>
								<td>{player.id}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Username:</td>
								<td>{player.username}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Email:</td>
								<td>{player.email}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Balance:</td>
								<td>{player.balance} coins</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default PlayerProfile;
