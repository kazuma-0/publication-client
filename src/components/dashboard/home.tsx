import { useUser } from "@/contexts/UserProvider";
import Dashboard from "@/pages/dashboard/[component]";
import { IScopusAuthorApiResponse } from "@/utils";
import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	chakra,
	Flex,
	Grid,
	GridItem,
	Heading,
	Stat,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { SiGooglescholar, SiScopus } from "react-icons/si";
import ScopusView from "./Stats/ScopusView";
import SerApiView from "./Stats/SerapiView";
import ClativateView from "@/components/dashboard/Stats/ClativateView";
const DashboardCard = chakra(GridItem, {
	baseStyle: {
		rounded: "lg",
		p: "2",
	},
});
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

const StatCard = chakra(Stat, {
	baseStyle: {
		border: " solid 1px",
		borderColor: "gray.400",
		p: "2",
		rounded: "lg",
	},
});

const options = {
	yaxis: {
		title: {
			text: "Number of Citations",
		},
	},
	stroke: {
		curve: "smooth",
	},
};
export default function DashboardHome() {
	const user = useUser();
	const [graph, setGraphData] = useState([]);
	const { data, isFetched } = useQuery<any>({
		// enabled: !!user,
		queryKey: ["scopus-graph-user"],
		queryFn: async () => {
			const { data } = await axios.get("/api/fetch-scopus-graph", {
				params: {
					scopus_id: user.scopus_id,
				},
			});
			return data;
		},
		cacheTime: 100,
		retryOnMount: false,
		// retry: false,
		onSuccess(data: any) {
			console.log(data);
			const citationsPerYear: Record<string, any> = {};

			data.forEach((doc: any) => {
				const publicationYear = doc["prism:coverDate"].split("-")[0];
				citationsPerYear[publicationYear] =
					(parseInt(citationsPerYear[publicationYear]) || 0) +
					parseInt(doc["citedby-count"]);
			});
			setGraphData(
				// @ts-ignore
				Object.entries(citationsPerYear).map(([year, count]) => ({
					x: year,
					y: count,
				}))
			);
		},
	});
	console.log(graph);

	return (
		<Grid
			w='calc(100vw - 300px)'
			// bgColor='red'
			h='full'
			gridTemplateColumns={"repeat(6, 1fr)"}
			gridTemplateRows={"repeat(5, 1fr)"}
			p='10'
			gap={10}
		>
			{/* SCOPUS */}
			<ScopusView />
			{/*  */}
			{/* Google Scholar */}
			<SerApiView />
			{/*  */}
			<ClativateView />
			<DashboardCard colSpan={3} rowSpan={5}>
				<Chart
					// @ts-ignore
					options={options}
					series={[
						{
							data: graph,
							type: "line",
							name: "Citations",
						},
						{
							data: graph,
							type: "bar",
							name: "citations",
						},
					]}
				></Chart>
			</DashboardCard>
		</Grid>
	);
}
