import { useUser } from "@/contexts/UserProvider";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { IconSettings2, IconUser } from "@tabler/icons-react";
import { useEffect, useReducer, useState } from "react";
const profile_form_reducer = (state: any, action: any) => {
	return { ...state, [action.type]: action.payload };
};

// const initialForm = {
// 	name: "",
// 	scopus_id: "",
// 	google_scholar_id: "",
// 	email: "",
// };
export default function DashboardSettings() {
	// const [state, dispatch] = useReducer(profile_form_reducer, initialForm);
	const user = useUser();
	console.log(Object.keys(user));
	useEffect(() => {}, []);
	return (
		<Box p={5}>
			<Box pb={5}>
				<Heading>Author Profile</Heading>
			</Box>
			<Flex flexDir={"column"}>
				{Object.keys(user).map((key) => (
					<FormControl key={key}>
						<FormLabel textTransform={"capitalize"}>
							{key.replaceAll("_", " ")}
						</FormLabel>
						{/* @ts-ignore */}
						<Input value={user[key]}></Input>
					</FormControl>
				))}
			</Flex>
		</Box>
	);
}
