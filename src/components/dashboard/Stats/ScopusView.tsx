import { DashboardCard } from "@/components/DashboardCard";
import { StatCard } from "@/components/StatCard";
import { useUser } from "@/contexts/UserProvider";
import { IScopusAuthorApiResponse } from "@/utils";
import {
	Box,
	Text,
	Flex,
	Heading,
	StatGroup,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SiScopus } from "react-icons/si";

export default function ScopusView() {
	const user = useUser();

	const { data, isFetched } = useQuery<IScopusAuthorApiResponse>({
		enabled: !!user,
		queryKey: ["socpus-user"],
		queryFn: async () => {
			const { data } = await axios.get("/api/fetch-scopus-author", {
				params: {
					scopus_id: user.scopus_id,
				},
			});
			return data;
		},
		cacheTime: 100,
		retryOnMount: false,
		retry: false,
	});
	return (
		<>
			<DashboardCard colSpan={2}>
				<Box>
					<Flex
						gap={5}
						// justifyContent='space-between'
						alignItems='center'
					>
						<Box bgColor={"rgb(243, 109, 33)"} p={2} rounded='full'>
							<SiScopus size={40} />
						</Box>
						<Heading
							textTransform='uppercase'
							letterSpacing={"wide"}
							size='xl'
						>
							Scopus
						</Heading>
					</Flex>
					<Box>
						{isFetched && (
							<>
								<Box pt={3}>
									<Heading fontSize={"xl"}>
										{data?.["author-retrieval-response"][0][
											"author-profile"
										]["preferred-name"]["surname"] +
											", " +
											data?.[
												"author-retrieval-response"
											][0]["author-profile"][
												"preferred-name"
											]["given-name"]}{" "}
									</Heading>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>
												Total documents
											</StatLabel>
											<StatNumber>
												{
													data?.[
														"author-retrieval-response"
													][0].coredata[
														"document-count"
													]
												}
											</StatNumber>
										</StatCard>
										<StatCard>
											<StatLabel>Citations</StatLabel>
											<StatNumber>
												{
													data?.[
														"author-retrieval-response"
													][0].coredata[
														"citation-count"
													]
												}
											</StatNumber>
										</StatCard>
									</StatGroup>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>h-index</StatLabel>
											<StatNumber>
												{
													data?.[
														"author-retrieval-response"
													][0]["h-index"]
												}
											</StatNumber>
										</StatCard>
										<StatCard>
											<StatLabel>Cited by</StatLabel>
											<StatNumber>
												{
													data?.[
														"author-retrieval-response"
													][0].coredata[
														"cited-by-count"
													]
												}
												<Text
													pl={3}
													as='span'
													fontSize={"sm"}
												>
													documents
												</Text>
											</StatNumber>
										</StatCard>
									</StatGroup>
								</Box>
							</>
						)}
					</Box>
				</Box>
			</DashboardCard>
		</>
	);
}
