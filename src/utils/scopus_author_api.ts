export interface IScopusAuthorApiResponse {
	"author-retrieval-response": AuthorRetrievalResponse[];
}

export interface AuthorRetrievalResponse {
	"@status": string;
	"@_fa": string;
	coredata: Coredata;
	"h-index": string;
	"coauthor-count": string;
	"affiliation-current": AffiliationCurrent;
	"affiliation-history": AffiliationHistory;
	"subject-areas": SubjectAreas;
	"author-profile": AuthorProfile;
}

export interface Coredata {
	"prism:url": string;
	"dc:identifier": string;
	"historical-identifier": HistoricalIdentifier[];
	eid: string;
	orcid: string;
	"document-count": string;
	"cited-by-count": string;
	"citation-count": string;
	link: Link[];
}

export interface HistoricalIdentifier {
	"@_fa": string;
	$: string;
}

export interface Link {
	"@href": string;
	"@rel": string;
	"@_fa": string;
}

export interface AffiliationCurrent {
	"@id": string;
	"@href": string;
}

export interface AffiliationHistory {
	affiliation: Affiliation[];
}

export interface Affiliation {
	"@_fa": string;
	"@id": string;
	"@href": string;
}

export interface SubjectAreas {
	"subject-area": SubjectArea[];
}

export interface SubjectArea {
	"@_fa": string;
	"@abbrev": string;
	"@code": string;
	$: string;
}

export interface AuthorProfile {
	status: string;
	"date-created": DateCreated;
	"preferred-name": PreferredName;
	"name-variant": NameVariant[];
	classificationgroup: Classificationgroup;
	"publication-range": PublicationRange;
	"affiliation-current": AffiliationCurrent2;
	"affiliation-history": AffiliationHistory2;
}

export interface DateCreated {
	"@day": string;
	"@month": string;
	"@year": string;
}

export interface PreferredName {
	"@date-locked": string;
	"@source": string;
	initials: string;
	"indexed-name": string;
	surname: string;
	"given-name": string;
}

export interface NameVariant {
	"@doc-count": string;
	"@source": string;
	initials: string;
	"indexed-name": string;
	surname: string;
	"given-name": string;
}

export interface Classificationgroup {
	classifications: Classifications;
}

export interface Classifications {
	"@type": string;
	classification: Classification[];
}

export interface Classification {
	"@frequency": string;
	$: string;
}

export interface PublicationRange {
	"@end": string;
	"@start": string;
}

export interface AffiliationCurrent2 {
	affiliation: Affiliation2;
}

export interface Affiliation2 {
	"@affiliation-id": string;
	"@source": string;
	"ip-doc": IpDoc;
}

export interface IpDoc {
	"@id": string;
	"@type": string;
	"@relationship": string;
	afnameid: string;
	afdispname: string;
	"preferred-name": PreferredName2;
	"sort-name": string;
	address: Address;
	"org-domain": string;
	"org-URL": string;
}

export interface PreferredName2 {
	"@source": string;
	$: string;
}

export interface Address {
	"@country": string;
	"address-part": string;
	city: string;
	state: string;
	"postal-code": string;
	country: string;
}

export interface AffiliationHistory2 {
	affiliation: Affiliation3[];
}

export interface Affiliation3 {
	"@affiliation-id": string;
	"@parent"?: string;
	"@source": string;
	"ip-doc": IpDoc2;
}

export interface IpDoc2 {
	"@id": string;
	"@type": string;
	"@relationship": string;
	afdispname: string;
	"preferred-name": PreferredName3;
	"parent-preferred-name"?: ParentPreferredName;
	"sort-name": string;
	address: Address2;
	"org-domain": string;
	"org-URL": string;
	afnameid?: string;
}

export interface PreferredName3 {
	"@source": string;
	$: string;
}

export interface ParentPreferredName {
	"@source": string;
	$: string;
	"@date-locked"?: string;
}

export interface Address2 {
	"@country": string;
	"address-part": string;
	city: string;
	state?: string;
	"postal-code": string;
	country: string;
}
