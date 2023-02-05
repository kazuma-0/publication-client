import { extendTheme } from "@chakra-ui/react";
import { Rubik } from "@next/font/google";
const rubik = Rubik({
	subsets: ["latin"],
	weight: "variable",
});
export const theme = extendTheme({
	fonts: {
		body: rubik.style.fontFamily,
	},
});
