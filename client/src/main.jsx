/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<GoogleOAuthProvider clientId='511330639928-qo2jmbbitgfc29s9g5rv1m99dc5oepo6.apps.googleusercontent.com'>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</GoogleOAuthProvider>
);
