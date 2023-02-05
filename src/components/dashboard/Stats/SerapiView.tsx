import { DashboardCard } from "@/components/DashboardCard";
import { StatCard } from "@/components/StatCard";
import { useUser } from "@/contexts/UserProvider";
import { IScopusAuthorApiResponse } from "@/utils";
import { ISerapiAuthor } from "@/utils/serapi_author-api";
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
import { SiGooglescholar, SiScopus } from "react-icons/si";

export default function ScopusView() {
	const user = useUser();

	const { data, isFetched } = useQuery<ISerapiAuthor>({
		// enabled: !!user,
		queryKey: ["serapi-user"],
		queryFn: async () => {
			const { data } = await axios.get("/api/fetch-serapi-author", {
				params: {
					scholar_id: user.google_scholar_id,
					num: 100,
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
						<Box bgColor={"blue.300"} p={2} rounded='full'>
							<SiGooglescholar size={40} />
						</Box>
						<Heading
							textTransform='uppercase'
							letterSpacing={"wide"}
							size='xl'
						>
							Google Scholar
						</Heading>
					</Flex>
					<Box>
						{isFetched && (
							<>
								<Box pt={3}>
									<Heading fontSize={"xl"}>
										{data?.author.name}
									</Heading>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>Citations</StatLabel>
											<StatNumber>
												{
													data?.cited_by.table[0]
														.citations?.all
												}
											</StatNumber>
										</StatCard>
									</StatGroup>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>h-index</StatLabel>
											<StatNumber>
												{
													data?.cited_by.table[1]
														.h_index?.all
												}
											</StatNumber>
										</StatCard>
										<StatCard>
											<StatLabel>i10 index</StatLabel>
											<StatNumber>
												{
													data?.cited_by.table[2]
														.i10_index?.all
												}
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
