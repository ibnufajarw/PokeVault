/** @format */
import axios from "axios";

const instance = axios.create({
	baseURL: "https://pokevault-v2.ibnufajarweb.site",
	// baseURL: "http://localhost:3000",
});

export default instance;
