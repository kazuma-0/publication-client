import { NextApiRequest, NextApiResponse } from "next";
import { scopus_client } from "@/lib";
interface FetchUserApiRequest extends NextApiRequest {
	query: {
		scopus_id: string;
	};
}

export default async function handler(
	req: FetchUserApiRequest,
	res: NextApiResponse
) {
	if (!req.query.scopus_id) res.status(404).json("scopus id missing");

	const { data } = await scopus_client.get(
		`/author?author_id=${req.query.scopus_id}&view=ENHANCED`
	);
	// const { data } = await scopus_client.get(
	// 	`/author/author_id/${req.query.scopus_id}&view=ENHANCED`
	// );
	console.log(data);
	res.status(200).json(data);
}
