import { chakra, Stat } from "@chakra-ui/react";

export const StatCard = chakra(Stat, {
	baseStyle: {
		border: " solid 1px",
		borderColor: "gray.400",
		p: "2",
		rounded: "lg",
	},
});
