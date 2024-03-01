/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/profileSlice";
import Navbar from "../components/Navbar";

const PlayerProfile = () => {
	const myProfile = useSelector((state) => {
		return state.profile.data;
	});
	// console.log(myProfile, "<< myProfile");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProfile());
	}, []);

	return (
		<>
			<Navbar />
			<div className='min-h-screen bg-gradient-to-r from-amber-400 via-red-600 to-red-400 pt-8'>
				<div className='container mx-auto bg-white p-8 rounded shadow-md bg-opacity-20 backdrop-blur-md'>
					<h2 className='text-3xl font-bold mb-6 text-white text-center'>
						Player Profile
					</h2>
					<div className='overflow-x-auto'>
						<table className='table-auto w-full text-left whitespace-no-wrap'>
							<tbody>
								<tr>
									<td className='font-bold pr-4 text-yellow-600'>ID:</td>
									<td>{myProfile.id}</td>
								</tr>
								<tr>
									<td className='font-bold pr-4 text-yellow-600'>Username:</td>
									<td>{myProfile.username}</td>
								</tr>
								<tr>
									<td className='font-bold pr-4 text-yellow-600'>Email:</td>
									<td>{myProfile.email}</td>
								</tr>
								<tr>
									<td className='font-bold pr-4 text-yellow-600'>Balance:</td>
									<td>{myProfile.balance} coins</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlayerProfile;
