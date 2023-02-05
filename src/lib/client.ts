import axios from "axios";
export const client = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:3001/api"
			: "https://publication-server.thewired.agency/api",
});
