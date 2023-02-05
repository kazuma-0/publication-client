import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const req1 = await axios.get("https://scopus.com");
	res.json(req1.headers["set-cookie"]);
}
