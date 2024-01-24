/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

const LoginForm = ({ onLogin }) => {
	const CLIENT_ID =
		"511330639928-qo2jmbbitgfc29s9g5rv1m99dc5oepo6.apps.googleusercontent.com";
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin(formData);
	};

	const responseGoogle = (response) => {
		if (response.tokenId) {
			console.log("Login Success: currentUser:", response.data);
			setFormData(response.data);
			Swal.fire({
				title: "Login Successful!",
				text: `Welcome, ${response.data.name}!`,
				icon: "success",
				confirmButtonText: "Ok",
			});
		} else {
			console.log("Login failed: res:", response);
			Swal.fire({
				title: "Login Failed",
				text: "Please try again.",
				icon: "error",
				confirmButtonText: "Ok",
			});
		}
	};

	return (
		<div className='login-form-container flex items-center justify-center min-h-screen'>
			<form
				onSubmit={handleSubmit}
				className='login-form bg-white p-8 rounded shadow-md'>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-700 text-sm font-bold mb-2'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={handleChange}
						value={formData.email}
						className='border rounded w-full py-2 px-3 text-gray-700'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-700 text-sm font-bold mb-2'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						onChange={handleChange}
						value={formData.password}
						className='border rounded w-full py-2 px-3 text-gray-700'
					/>
				</div>
				<button
					type='submit'
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
					Login
				</button>
				<p className='text-center text-gray-600 text-sm mt-4'>
					Dont have an account?{" "}
					<Link
						to='/players/register'
						className='text-red-500 hover:text-red-700 rounded'>
						Register
					</Link>
				</p>
				<GoogleLogin
					clientId={CLIENT_ID}
					buttonText='Login with Google'
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
