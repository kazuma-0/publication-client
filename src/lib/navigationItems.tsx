import dynamic from "next/dynamic";
import { IconHome, IconSettings2, IconUser } from "@tabler/icons-react";
import { MdSpaceDashboard } from "react-icons/md";
interface INavigationItem {
	label: string;
	icon: React.ReactElement;
	component: any;
	url: string;
}

export const navigationItems: INavigationItem[] = [
	{
		label: "Home",
		component: dynamic(
			() =>
				import("../components/dashboard/home").then(
					(mod) => mod.default
				),
			{
				ssr: false,
			}
		),
		icon: <IconHome size={32} />,
		url: "home",
	},
	{
		label: "Profile",
		component: dynamic(() =>
			import("../components/dashboard/profile").then((mod) => mod.default)
		),
		icon: <MdSpaceDashboard size={32} />,
		url: "profile",
	},
];
