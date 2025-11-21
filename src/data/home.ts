import type { ComponentType } from 'astro';

export interface Caption {
	title?: string;
	copy?: string;
	label?: string;
}

export interface SwiperImage {
	src: ImageMetadata;
	svgBg?: ComponentType;
	widths?: number[];
	sizes?: string;
	alt: string;
	url: string;
	wrapper?: string;
	class?: string;
	caption?: Caption;
}

import one from "~/assets/home/mykring__phone-isometric.png";
import two from "~/assets/home/shirleychauffeurs__ipad.png";
import three from "~/assets/home/onepay__laptop-phone.png";

import HalftoneA from "~/assets/svg/halftone_1x1_kidney.svg";
import HalftoneB from "~/assets/svg/halftone_1x1_deathstar.svg";
import HalftoneC from "~/assets/svg/halftone_4x3_glasses.svg";

export const heroSlides: SwiperImage[] = [
	{
		src: one,
		svgBg: <HalftoneA />,
		alt: "3 phones showing the myKRing app in use",
		url: "/work/mykring-app/",
		caption: {
			title: "MyKRing app",
			copy: "iOS + Android solution",
			label:
				"bottom-fluid-xl left-0 md:left-auto md:bottom-[20%] md:right-[15%]",
		},
	},
	{
		src: two,
		svgBg: HalftoneB,
		alt: "laptop and mobile showing site in use",
		url: "/work/shirleychauffeurs/",
		caption: {
			title: "Shirley Chauffeurs",
			copy: "Branding and Online",
			label:
				"bottom-fluid-xl left-0 md:left-auto md:bottom-[15%] md:right-[45%]",
		},
	},
	{
		src: three,
		svgBg: HalftoneC,
		alt: "laptop and mobile",
		url: "/work/onepay/",
		caption: {
			title: "OnePay",
			copy: "Fast, easy, efficient wage payments",
			label:
				"bottom-fluid-xl left-0 md:left-auto md:bottom-[15%] md:left-[40%]",
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
