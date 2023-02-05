import { client } from "@/lib";
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	const [staff_id, setStaffId] = useState("");
	const [password, setPassword] = useState("");
	const toast = useToast({
		position: "top-right",
		variant: "subtle",
	});
	const mutation = useMutation(
		async () => {
			const { data } = await client.post("/user/login", {
				staff_id,
				password,
			});

			return data;
		},
		{
			onSuccess(data) {
				// @ts-ignore
				localStorage.setItem("token", data["access_token"]);
				toast({
					title: "Login successfull",
					status: "success",
				});
				// setTimeout(() => {
				router.push("/dashboard/home");
				// }, 2e3);
			},
			onError(e) {
				toast({
					title: "Login failed",
					status: "error",
				});
			},
		}
	);
	console.log(mutation.data);
	return (
		<Center h='100vh' w='100vw' flexDir={"column"}>
			<Box w={"xl"}>
				<Heading textAlign={"center"}>Login to continue</Heading>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						mutation.mutate();
					}}
				>
					<FormControl pt={5}>
						<FormLabel>Staff Id</FormLabel>
						<Input
							onChange={(e) => setStaffId(e.target.value)}
							placeholder='Enter your staff id'
						></Input>
					</FormControl>
					<FormControl pt={5}>
						<FormLabel>Password</FormLabel>
						<Input
							type='password'
							placeholder='Enter your password'
							onChange={(e) => setPassword(e.target.value)}
						></Input>
					</FormControl>
					<Flex justifyContent={"center"}>
						<Button type='submit' mt={1} colorScheme='green'>
							Login
						</Button>
					</Flex>
				</form>
			</Box>
			<Box pos={'fixed'} bottom={0} right={0} p={3}>
				<Link href={'/sign-up'}>Sign-up</Link>
			</Box>
		</Center>
	);
}
