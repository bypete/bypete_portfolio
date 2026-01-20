import { getCollection } from "astro:content";
import type { NavItem } from "~/data/navigation.static";
import { formatBlogPosts } from "~/libs";

// Main navigation — async because Work is dynamic
export async function getMainNavigation(): Promise<NavItem[]> {
	const workEntries = await getCollection("work");

	const formatted = formatBlogPosts(workEntries, {
		filterOutDrafts: true,
		filterOutFuturePosts: true,
		sortByDate: true,
		limit: undefined,
	});

	const workChildren: NavItem[] = formatted.map((entry) => ({
		label: entry.data.title || entry.id,
		url: `/work/${entry.id}/`,
	}));

	return [
		{
			label: "About",
			url: "/about/",
		},
		{
			label: "Work",
			url: "/work/",
			children: workChildren,
		},
		{
			label: "Connect",
			url: "/connect/",
		},
	];
}
