import { DateTime } from "luxon";

export const htmlDateString = (dateObj, format, zone) => {
	return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
		format || "yyyy-LL-dd",
	);
};

export const readableDate = (dateObj, format, zone) => {
	return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
		format || "d LLLL, yyyy",
	);
};

export function truncate(str, limit) {
	return str.split(" ").splice(0, limit).join(" ");
}

export function formatBlogPosts(
	posts,
	{
		filterOutDrafts = true,
		filterOutFuturePosts = true,
		sortByTitle = false,
		sortByDate = true,
		sortByOrder = false,
		limit = 0, // Default to 0 for unlimited
	} = {},
) {
	const filteredPosts = posts.reduce((acc, post) => {
		const { pubDate, modDate, draft } = post.data;
		// filterOutDrafts if true
		if (filterOutDrafts && draft) return acc;

		// filterOutFuturePosts if true
		if (filterOutFuturePosts && new Date(pubDate) > new Date()) return acc;

		// add post to acc
		acc.push(post);
		return acc;
	}, []);

	if (sortByTitle) {
		filteredPosts.sort((a, b) => a.data.title - b.data.title);
	} else if (sortByOrder) {
		filteredPosts.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
	} else if (sortByDate) {
		filteredPosts.sort(
			(a, b) =>
				Date.parse(b.data.modDate || b.data.pubDate) -
				Date.parse(a.data.modDate || a.data.pubDate),
		); // use modDate if present
	} else {
		filteredPosts.sort(() => Math.random() - 0.5);
	}

	// If limit is defined and valid, slice the array
	if (limit !== undefined && typeof limit === "number" && limit > 0) {
		return filteredPosts.slice(0, limit);
	}

	// If limit is not provided or invalid, return all posts (unlimited)
	return filteredPosts;
}

export function buildToc(headings) {
	const toc = []; // This will hold the final Table of Contents
	const parentHeadings = new Map(); // To track parent headings based on their depth

	// Use for...of loop to iterate over each heading
	for (const h of headings) {
		const heading = { ...h, subheadings: [] }; // Make a copy of the heading with a subheadings array

		// If it's a top-level heading (e.g., depth 2)
		if (heading.depth === 2) {
			toc.push(heading); // Add to the top level of the TOC
		} else {
			// Find the parent of the current heading by looking one level above in depth
			const parent = parentHeadings.get(heading.depth - 1);
			if (parent) {
				parent.subheadings.push(heading); // Add it as a subheading to the parent
			}
		}

		// Always update the parent map with the current heading, whether it's a parent or a subheading
		parentHeadings.set(heading.depth, heading);
	}

	return toc; // Return the fully constructed TOC
}
