/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<GoogleOAuthProvider clientId='511330639928-qo2jmbbitgfc29s9g5rv1m99dc5oepo6.apps.googleusercontent.com'>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</GoogleOAuthProvider>
);
