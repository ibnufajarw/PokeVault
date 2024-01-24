/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
				const response = await axios.post(
					"http://localhost:3000/orders/pay",
					result,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
							"Content-Type": "application/json",
						},
					}
				);
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
				"http://localhost:3000/orders/topup",
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
		<form onSubmit={handleSubmit}>
			<input
				type='number'
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder='Enter amount'
			/>
			<button type='submit'>Top Up</button>
		</form>
	);
};

export default TopUpForm;
