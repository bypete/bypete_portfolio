export interface Image {
	src: ImageMetadata;
	alt: string;
}

export interface Certificate {
	title: string;
	issuer: string;
	platform?: string;
	issued: string;
	expires?: string;
	url?: string;
	pdf?: string;
	alt?: string;
	id?: string;
	image?: Image;
}

import ga4 from "~/assets/certificates/59aeafcd-4a9f-4ebe-9101-d8da708b9dab.png";

export const certificates: Certificate[] = [
	{
		title: "Google Analytics Certification",
		issuer: "Google",
		platform: "Skillshop",
		issued: "2026-05-03",
		expires: "2027-05-03",
		url: "https://skillshop.credential.net/4c25a256-cda9-45b6-8bac-b35e0ca3dfea#acc.pmRyksCl",
		pdf: "/certificates/kddoytoy_1772725231508.pdf",
		image: { src: ga4, alt: "Google Analytics Certification" },
	},
	{
		title: "Digital Skills: Web Analytics",
		issuer: "Accenture",
		platform: "FutureLearn",
		issued: "2026-02-11",
		url: "https://futurelearn.com/certificates/rcromiq",
		pdf: "/certificates/digital-skill-web-analytics_certificate_of_achievement_rcromiq.pdf",
		image: { src: ga4, alt: "Google Analytics Certification" },
	},
	{
		title: "Digital Skills: User Experience",
		issuer: "Accenture",
		platform: "FutureLearn",
		issued: "2026-02-03",
		url: "https://futurelearn.com/certificates/di7csl1",
		pdf: "/certificates/digital-skills-user-experience_certificate_of_achievement_di7csl1.pdf",
		image: { src: ga4, alt: "Google Analytics Certification" },
	},
];
