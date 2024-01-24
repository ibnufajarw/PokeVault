/** @format */

import { createBrowserRouter, redirect } from "react-router-dom";

import Home from "../views/Home";
import Register from "../views/Register";
import Login from "../views/Login";
import Profile from "../views/Profile";
import MyPokemon from "../views/MyPokemon";
import Gacha from "../views/Gacha";
import PokemonDetail from "../views/PokemonDetail";
import TopUp from "../views/TopUp";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Home />
			</>
		),
	},
	{
		path: "/pokemons/:id",
		element: (
			<>
				<PokemonDetail />
			</>
		),
	},
	{
		path: "/players/register",
		element: (
			<>
				<Register />
			</>
		),
	},
	{
		path: "/players/login",
		element: (
			<>
				<Login />
			</>
		),
		loader: () => {
			if (localStorage.accessToken) {
				return redirect("/");
			}
			return null;
		},
	},
	{
		path: "/players/profile",
		element: (
			<>
				<Profile />
			</>
		),
		loader: () => {
			if (!localStorage.accessToken) {
				return redirect("/players/login");
			}
			return null;
		},
	},
	{
		path: "/mypokemons",
		element: (
			<>
				<MyPokemon />
			</>
		),
		loader: () => {
			if (!localStorage.accessToken) {
				return redirect("/players/login");
			}
			return null;
		},
	},
	{
		path: "/mypokemons/gacha",
		element: (
			<>
				<Gacha />
			</>
		),
		loader: () => {
			if (!localStorage.accessToken) {
				return redirect("/players/login");
			}
			return null;
		},
	},
	{
		path: "/orders/topup",
		element: <TopUp />,
		loader: () => {
			if (!localStorage.accessToken) {
				return redirect("/players/login");
			}
			return null;
		},
	},
]);

export default router;
