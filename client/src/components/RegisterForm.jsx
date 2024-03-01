/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RegisterForm = ({ onRegister }) => {
	const [formData, setFormData] = useState({
		username: "",
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
		onRegister(formData);
	};

	return (
		<div className='login-form-container flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-400 via-red-600 to-red-400'>
			<form
				onSubmit={handleSubmit}
				className='login-form bg-white p-20 rounded shadow-xl bg-opacity-20 backdrop-blur-md'>
				<h2 className='text-2xl font-bold mb-4 text-white text-center'>
					Register
				</h2>
				<div className='mb-4'>
					<label
						htmlFor='username'
						className='block text-gray-700 text-sm font-bold mb-2'>
						Username
					</label>
					<input
						type='text'
						id='username'
						name='username'
						value={formData.username}
						onChange={handleChange}
						className='border rounded w-full py-2 px-3 text-gray-700'
						required
					/>
				</div>
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
						value={formData.email}
						onChange={handleChange}
						className='border rounded w-full py-2 px-3 text-gray-700'
						required
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
						value={formData.password}
						onChange={handleChange}
						className='border rounded w-full py-2 px-3 text-gray-700'
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-red-500 hover:bg-amber-400 hover:text-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300'>
					Register
				</button>
				<p className='text-center text-gray-900 text-sm mt-4'>
					Already have an account?{" "}
					<Link
						to='/players/login'
						className='text-black hover:text-white rounded font-bold text-md'>
						Login here.
					</Link>
				</p>
			</form>
		</div>
	);
};

RegisterForm.propTypes = {
	onRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
