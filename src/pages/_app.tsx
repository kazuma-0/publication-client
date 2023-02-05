import { theme } from "@/lib";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const UserProvider = dynamic(
	() => import("../contexts/UserProvider").then((mod) => mod.default),
	{ ssr: false }
);
export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	return (
		<>
			<ChakraProvider resetCSS theme={theme}>
				<QueryClientProvider client={queryClient}>
					<UserProvider>
						<Component {...pageProps} />
					</UserProvider>
				</QueryClientProvider>
			</ChakraProvider>
		</>
	);
}
