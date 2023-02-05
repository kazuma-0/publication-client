import axios from "axios";
export const scopus_client = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		"X-ELS-APIKey": process.env.API_KEY,
		Accept: "application/json",
		"X-ELS-Insttoken": process.env.INSTTOKEN,
	},
});
