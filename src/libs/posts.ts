interface FormatBlogPostsOptions {
	filterOutDrafts?: boolean;
	filterOutFuturePosts?: boolean;
	sortByTitle?: boolean;
	sortByDate?: boolean;
	sortByOrder?: boolean;
	limit?: number;
}

export function formatBlogPosts<T extends { data: any }>(
	posts: T[],
	{
		filterOutDrafts = true,
		filterOutFuturePosts = true,
		sortByTitle = false,
		sortByDate = true,
		sortByOrder = false,
		limit = 0,
	}: FormatBlogPostsOptions = {},
): T[] {
	const filteredPosts = posts.reduce<T[]>((acc, post) => {
		const { pubDate, modDate, draft } = post.data;

		if (filterOutDrafts && draft) return acc;
		if (filterOutFuturePosts && new Date(pubDate) > new Date()) return acc;

		acc.push(post);
		return acc;
	}, []);

	if (sortByTitle) {
		filteredPosts.sort((a, b) =>
			String(a.data.title).localeCompare(String(b.data.title)),
		);
	} else if (sortByOrder) {
		filteredPosts.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
	} else if (sortByDate) {
		filteredPosts.sort(
			(a, b) =>
				Date.parse(b.data.modDate || b.data.pubDate) -
				Date.parse(a.data.modDate || a.data.pubDate),
		);
	} else {
		filteredPosts.sort(() => Math.random() - 0.5);
	}

	if (limit && limit > 0) {
		return filteredPosts.slice(0, limit);
	}

	return filteredPosts;
}
