import { navigationItems } from "@/lib";
import {
	Box,
	Image,
	Text,
	Center,
	Flex,
	Heading,
	Avatar,
} from "@chakra-ui/react";
import { IconHome } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Poppins, Rubik } from "@next/font/google";
import Head from "next/head";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";
import UserProvider, { useUser } from "@/contexts/UserProvider";
export default function Dashboard() {
	const [ActiveComponent, setActiveComponent] = useState<any>(
		navigationItems[0]
	);
	const router = useRouter();
	const user = useUser();
	console.log(user);
	useEffect(() => {
		const { component } = router.query;
		if (component) {
			setActiveComponent(
				navigationItems.filter((item) => item.url === component)[0]
			);
		}
	}, [router.query]);
	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>

			<Flex h='100vh' transition={"all 300ms"}>
				<Box>
					<Flex
						flexDir={"column"}
						w='300px'
						h='full'
						bgColor={"gray.200"}
					>
						{/* User Card */}

						<Box p={3}>
							<Flex
								w='full'
								rounded='lg'
								p={2}
								bgColor='#33a1fd'
								shadow={"md"}
							>
								<Avatar />{" "}
								<Flex
									pl={3}
									flexDir={"column"}
									cursor='pointer'
								>
									<Text fontSize={"lg"}>{user?.name}</Text>
									<Text fontWeight={"bold"} fontSize='sm'>
										{user?.staff_id}
									</Text>
								</Flex>
							</Flex>
						</Box>
						{/*  */}
						{/* Navigation Items */}
						<Flex pt={8} userSelect='none' flexDir='column'>
							{navigationItems.map((item) => (
								<Flex
									onClick={() => {
										router.push(`/dashboard/${item.url}`);
									}}
									alignItems='center'
									gap={3}
									p={3}
									cursor='pointer'
									key={item.label}
									transition='all 300ms'
									bgColor={
										ActiveComponent.url === item.url
											? "#fff"
											: ""
									}
									pointerEvents={
										ActiveComponent.url === item.url
											? "none"
											: "initial"
									}
								>
									{item.icon}
									<Text fontSize={"lg"} letterSpacing='wide'>
										{item.label}
									</Text>
								</Flex>
							))}
						</Flex>
						{/*  */}
					</Flex>
				</Box>
				<ActiveComponent.component></ActiveComponent.component>
			</Flex>
		</>
	);
}
