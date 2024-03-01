/** @format */

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		navigate("/");
	};

	return (
		<nav className='bg-gradient-to-r from-amber-400 via-red-600 to-red-400 p-6 shadow-md rounded'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-white font-bold text-xl hover:text-yellow-200'>
					PokeVault
				</Link>
				<div className='flex items-center space-x-5'>
					<Link
						to='/mypokemons'
						className='text-white hover:text-yellow-300 rounded'>
						My Pokemon
					</Link>
					<Link
						to='/orders/topup'
						className='text-white hover:text-yellow-300 rounded'>
						Top Up
					</Link>
					<Link
						to='/players/profile'
						className='text-white hover:text-yellow-300 rounded'>
						Profile
					</Link>
					{!isLoggedIn && (
						<Link
							to='/players/login'
							className='text-white hover:text-yellow-300 rounded'>
							Login
						</Link>
					)}
					{isLoggedIn && (
						<button
							onClick={handleLogout}
							className='text-white hover:text-yellow-300 rounded cursor-pointer'>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
