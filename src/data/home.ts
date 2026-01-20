import type { SvgComponent } from "astro/types";

export interface Caption {
	title?: string;
	copy?: string;
	label?: string;
}

export interface SwiperImage {
	src: ImageMetadata;
	bg?: SvgComponent;
	widths?: number[];
	sizes?: string;
	alt: string;
	url: string;
	wrapper?: string;
	class?: string;
	caption?: Caption;
}

import Halftone1x1B from "~/assets/svg/halftone_1x1_deathstar.svg";
import Halftone1x1A from "~/assets/svg/halftone_1x1_kidney.svg";
import Halftone4x3A from "~/assets/svg/halftone_4x3_glasses.svg";
import Halftone4x3B from "~/assets/svg/halftone_4x3_whale.svg";
import myKring from "~/assets/work/mykring/product_1x1_ipad_portrait_phone.png";
import myKringApp from "~/assets/work/mykringapp/product_1x1_3_isometric-mobile.png";
import onepay from "~/assets/work/onepay/product_1x1_ipad_landscape_phone.png";
import shirleyChauffuers from "~/assets/work/shirleychauffeurs/product_1x1_ipad_portrait_phone.png";

export const heroSlides: SwiperImage[] = [
	{
		src: shirleyChauffuers,
		bg: Halftone1x1B,
		alt: "laptop and mobile showing site in use",
		url: "/work/shirleychauffeurs/",
		caption: {
			title: "Shirley Chauffeurs",
			copy: "Branding and Online",
			label: "bottom-fluid-xl left-fluid-m  md:top-[40%] md:left-[14%]",
		},
	},
	{
		src: myKring,
		bg: Halftone1x1B,
		alt: "3 phones showing the myKRing app in use",
		url: "/work/mykring/",
		caption: {
			title: "K Ring",
			copy: "iOS + Android solution",
			label: "bottom-fluid-xl left-fluid-m  md:top-[84.5%] md:left-[14%]",
		},
	},
	{
		src: onepay,
		bg: Halftone4x3A,
		alt: "laptop and mobile",
		url: "/work/onepay/",
		caption: {
			title: "OnePay",
			copy: "Fast, easy, efficient wage payments",
			label: "bottom-fluid-xl left-fluid-m  md:top-[80%] md:left-[8%]",
		},
	},
	{
		src: myKringApp,
		bg: Halftone1x1B,
		alt: "3 phones showing the myKRing app in use",
		url: "/work/mykring-app/",
		caption: {
			title: "MyKRing app",
			copy: "iOS + Android solution",
			label: "bottom-fluid-xl left-fluid-m  md:top-[66%] md:left-[12%]",
		},
	},
];

export interface Activity {
	subject: string;
	preposition: string;
	role: string;
}

export const roles: Activity[] = [
	{ subject: "I'm an", preposition: "experienced", role: "Creative Developer" },
	{ subject: "I adopt a", preposition: "mobile first", role: "dev approach" },
	{ subject: "I build", preposition: "engaging", role: "landing pages" },
	{
		subject: "I like to",
		preposition: "work in",
		role: "FrontEnd Development",
	},
	{ subject: "I'm focused", preposition: "on", role: "Ui/UX Design" },
	{ subject: "I like to", preposition: "oversee", role: "Content management" },
];
