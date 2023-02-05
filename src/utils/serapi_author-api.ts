export interface ISerapiAuthor {
	search_metadata: SearchMetadata;
	search_parameters: SearchParameters;
	author: Author;
	articles: Article[];
	cited_by: CitedBy2;
	public_access: PublicAccess;
	co_authors: CoAuthor[];
	serpapi_pagination: SerpapiPagination;
}

export interface SearchMetadata {
	id: string;
	status: string;
	json_endpoint: string;
	created_at: string;
	processed_at: string;
	google_scholar_author_url: string;
	raw_html_file: string;
	total_time_taken: number;
}

export interface SearchParameters {
	engine: string;
	author_id: string;
	hl: string;
}

export interface Author {
	name: string;
	affiliations: string;
	email: string;
	website: string;
	interests: Interest[];
	thumbnail: string;
}

export interface Interest {
	title: string;
	link: string;
	serpapi_link: string;
}

export interface Article {
	title: string;
	link: string;
	citation_id: string;
	authors: string;
	publication?: string;
	cited_by: CitedBy;
	year: string;
}

export interface CitedBy {
	value: number;
	link: string;
	serpapi_link: string;
	cites_id: string;
}

export interface CitedBy2 {
	table: Table[];
	graph: Graph[];
}

export interface Table {
	citations?: Citations;
	h_index?: HIndex;
	i10_index?: I10Index;
}

export interface Citations {
	all: number;
	since_2018: number;
}

export interface HIndex {
	all: number;
	since_2018: number;
}

export interface I10Index {
	all: number;
	since_2018: number;
}

export interface Graph {
	year: number;
	citations: number;
}

export interface PublicAccess {
	link: string;
	available: number;
	not_available: number;
}

export interface CoAuthor {
	name: string;
	link: string;
	serpapi_link: string;
	author_id: string;
	affiliations: string;
	email?: string;
	thumbnail: string;
}

export interface SerpapiPagination {
	next: string;
}
