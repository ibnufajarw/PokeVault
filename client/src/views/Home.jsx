/** @format */

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PokemonList from "../components/PokemonList";

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className='container mx-auto p-4'>
				<HeroSection />
				<PokemonList />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
