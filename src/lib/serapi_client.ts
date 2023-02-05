import axios from "axios";
export const serapi_client = axios.create({
	baseURL: process.env.SERAPI_URL,
});
