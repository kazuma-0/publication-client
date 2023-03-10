import { User } from "@/lib";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

// @ts-ignore
const UserContext = React.createContext<User>();

export const useUser = () => {
	return useContext(UserContext);
};

export default function UserProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [user, setUser] = useState<User>();
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token && router.pathname.includes("dashboard")) {
			// @ts-ignore
			setUser(jwtDecode(token));
		}
	}, [router, token]);
	console.log(user);
	// @ts-ignore
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
