import {NextApiRequest, NextApiResponse} from "next";
import {scopus_client} from "@/lib";
import {ScopusSearch, SearchResults} from "@/utils/scopus_search";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const scopus_id = req.query.scopus_id;
    if(!scopus_id){
        res.status(404)
        return;
    }
    const allDocuments = [];
    let start = 0;
    let count = 25;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await scopus_client.get<ScopusSearch>(`/search/scopus?query=AU-ID(${scopus_id})&start=${start}&count=${count}`);
            console.log(response)
            // const response = await axios.get(`https://api.elsevier.com/content/search/scopus?query=${query}&start=${start}&count=${count}`);
            allDocuments.push(...response.data["search-results"].entry);
            start += count;
            hasMore = parseInt(response.data['search-results']['opensearch:itemsPerPage']) === count;
            // res.json(response)
        } catch (error) {
            console.error(error);
            hasMore = false;
        }
    }

    res.status(200).json(allDocuments);
}