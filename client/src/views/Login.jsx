/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setIsLoggedIn(true);
			const redirectPath = location.state?.from || "/";
			navigate(redirectPath);
		}
	}, [navigate, location]);

	const handleLogin = async (userData) => {
		try {
			const response = await axios.post(
				// "https://pokevault.ibnufajarweb.site/players/login",
				"http://localhost:3000/players/login",
				userData
			);
			setIsLoggedIn(true);
			localStorage.setItem("accessToken", response.data.accessToken);

			const redirectPath = location.state?.from || "/";
			Swal.fire({
				title: "Success!",
				text: "You are now logged in.",
				icon: "success",
				confirmButtonText: "OK",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(redirectPath);
				}
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error!",
				text: "Login failed. Please try again.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<div>
			<Navbar />
			{!isLoggedIn && <LoginForm onLogin={handleLogin} />}
		</div>
	);
};

export default Login;
