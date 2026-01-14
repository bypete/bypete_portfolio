export interface NavItem {
	label: string;
	url: string;
	children?: NavItem[];
}

export const footerNavigation: NavItem[] = [
	{
		label: "Contact",
		url: "/connect/",
	},
	{
		label: "Legal notices",
		url: "/about/legal/",
	},
];
