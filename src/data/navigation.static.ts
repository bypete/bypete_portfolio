export interface NavItem {
	label: string;
	url: string;
	children?: NavItem[];
}

export const footerNavigation: NavItem[] = [
	{ label: "Privacy", url: "/privacy/" },
	{ label: "Terms", url: "/terms/" },
];
