/** @format */

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
	const navigate = useNavigate();

	const handleRegister = async (formData) => {
		try {
			const response = await axios.post(
				// "https://pokevault.ibnufajarweb.site/players/register",
				"http://localhost:3000/players/register",
				formData
			);

			console.log(response.data);
			Swal.fire({
				title: "Registered!",
				text: "Registration successful.",
				icon: "success",
				confirmButtonText: "OK",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/players/login");
				}
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error!",
				text: "Registration failed. Please try again.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<div>
			<Navbar />
			<RegisterForm onRegister={handleRegister} />
		</div>
	);
};

export default Register;
