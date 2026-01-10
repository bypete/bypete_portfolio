export type SocialLink = {
	platform: string;
	url: string;
	icon: string;
	footerOnly?: boolean;
};

export type SiteInfo = {
	name: string;
	title: string;
	description: string;
	url: string;
	domain: {
		live: string;
		staging: string;
	};
	root: string;
	available: boolean;
	og: {
		image: {
			src: ImageMetadata;
			alt: string;
		};
		title: string;
		description: string;
	};
	icon: string;
	socials: SocialLink[];
	feed: {
		subtitle: string;
		filename: string;
		path: string;
		id: string;
	};
	jsonfeed: {
		path: string;
		url: string;
	};
	author: {
		name: string;
		email: string;
		url: string;
	};
};

import ogDefaultImage from "~/assets/og/og__default.jpg";

const siteInfo: SiteInfo = {
	name: "byPete",
	title: "byPete | Portfolio Site",
	description:
		"Pete Wallace is an experienced Front-End developer based in Surrey, UK.",
	url: "https://bypete.uk",
	root: "https://bypete.uk/",
	domain: {
		live: "bypete.uk",
		staging: "staging.bypete.uk",
	},
	available: true,
	og: {
		title: "Portfolio Site",
		description:
			"Pete Wallace is an experienced Front-End developer based in Surrey, UK.",
		image: {
			src: ogDefaultImage,
			alt: "Portfolio Site",
		},
	},
	icon: "/favicon.ico",
	socials: [
		{
			platform: "linkedin",
			url: "https://www.linkedin.com/in/peter-wallace-a5002a7a/",
			icon: "icon-[tabler--brand-linkedin-filled]",
		},
		{
			platform: "github",
			url: "https://github.com/bypete-io",
			icon: "icon-[tabler--brand-github-filled]",
		},
		{
			platform: "instagram",
			url: "https://www.instagram.com/bypete.uk/",
			icon: "icon-[tabler--brand-instagram-filled]",
		},
	],
	feed: {
		subtitle: "Portfolio site",
		filename: "feed.xml",
		path: "/feed/feed.xml",
		id: "https://byPete.uk/",
	},
	jsonfeed: {
		path: "/feed/feed.json",
		url: "https://byPete.uk/feed/feed.json",
	},
	author: {
		name: "Peter Wallace",
		email: "hello@byPete.uk",
		url: "https://byPete.uk/about/",
	},
};

export default siteInfo;
