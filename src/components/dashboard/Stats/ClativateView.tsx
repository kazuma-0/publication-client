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
	Image,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SiClaris, SiScopus } from "react-icons/si";
import { GiClarinet } from "react-icons/all";
import { Alfred_data, dummies } from "@/utils/clarivate_dummy_data";
import ClarivateLogo from "../../clarivate-logo";
export default function ClativateView() {
	const user = useUser();

	const { data, isFetched } = useQuery<typeof Alfred_data | null>({
		enabled: !!user,
		queryKey: ["clarivate-user"],
		queryFn: () => {
			// const { data } = await axios.get("/api/fetch-scopus-author", {
			// 	params: {
			// 		scopus_id: user.scopus_id,
			// 	},
			// });
			// return data;

			const filtered = dummies.filter((s) => s.id === user.clarivate_id);
			console.log(dummies);
			console.log(user?.clarivate_id);
			if (filtered.length > 0) {
				return filtered[0];
			} else {
				return null;
			}
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
							<Image
								src='/clarivate.png'
								h={"40px"}
								w='40px'
							></Image>
						</Box>
						<Heading
							textTransform='uppercase'
							letterSpacing={"wide"}
							size='xl'
						>
							Clarivate
						</Heading>
					</Flex>
					<Box>
						{isFetched && (
							<>
								<Box pt={3}>
									<Heading fontSize={"xl"}>
										{user.name}
									</Heading>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>
												Total documents
											</StatLabel>
											<StatNumber>
												{data?.publications}
											</StatNumber>
										</StatCard>
										<StatCard>
											<StatLabel>Citations</StatLabel>
											<StatNumber>
												{data?.citations}
											</StatNumber>
										</StatCard>
									</StatGroup>
									<StatGroup pt={4} gap={3}>
										<StatCard>
											<StatLabel>h-index</StatLabel>
											<StatNumber>
												{data?.h_index}
											</StatNumber>
										</StatCard>
										<StatCard>
											<StatLabel>Cited by</StatLabel>
											<StatNumber>
												{data?.citing_articles}
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
