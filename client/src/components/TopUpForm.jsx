/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../components/instances/instance";

const TopUpForm = () => {
	const [amount, setAmount] = useState("");
	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate("/players/profile");
	};

	const handlePayment = (token) => {
		window.snap.pay(token, {
			onSuccess: async function (result) {
				console.log("Payment Success:", result);
				const response = await axios.post(`/orders/pay`, result, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				});
				console.log(response.data);
				navigateToProfile();
			},
			onPending: function (result) {
				console.log("Payment Pending:", result);
				navigateToProfile();
			},
			onError: function (result) {
				console.log("Payment Error:", result);
			},
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`/orders/topup`,
				{
					amount: amount,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						"Content-Type": "application/json",
					},
				}
			);
			handlePayment(response.data.token, navigate);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='bg-gradient-to-r from-amber-400 via-red-600 to-red-400 flex items-center justify-center h-screen'>
				<div className='bg-white w-full max-w-md p-8 rounded-lg shadow-md'>
					<h1 className='text-3xl font-semibold text-center mb-8'>
						Top Up Balance
					</h1>
					<form onSubmit={handleSubmit}>
						<div className='flex items-center border-b border-b-2 border-blue-500 py-2'>
							<input
								className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-3xl'
								type='number'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder='Enter amount'
								required
							/>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								type='submit'>
								Top Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default TopUpForm;
