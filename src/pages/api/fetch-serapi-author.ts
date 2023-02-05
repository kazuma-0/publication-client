import { NextApiRequest, NextApiResponse } from "next";
import { scopus_client, serapi_client } from "@/lib";
interface FetchUserApiRequest extends NextApiRequest {
	query: {
		scholar_id: string;
	};
}

export default async function handler(
	req: FetchUserApiRequest,
	res: NextApiResponse
) {
	if (!req.query.scholar_id)
		res.status(404).json("google scholar id missing");

	const { data } = await serapi_client.get(``, {
		params: {
			author_id: req.query.scholar_id,
		},
	});

	res.status(200).json(data);
}
