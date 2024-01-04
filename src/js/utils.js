export function truncate(str, limit) {
    return str.split(' ').splice(0, limit).join(' ');
}

export function formatBlogPosts(
    posts,
    {
        filterOutDrafts = true,
        filterOutFuturePosts = true,
        sortByDate = true,
        limit = undefined,
    } = {},
) {
    const filteredPosts = posts.reduce((acc, post) => {
        const { date, draft } = post.data;
        // filterOutDrafts if true
        if (filterOutDrafts && draft) return acc;

        // filterOutFuturePosts if true
        if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

        // add post to acc
        acc.push(post);

        return acc;
    }, []);

    if (sortByDate) {
        filteredPosts.sort(
            (a, b) => Date.parse(b.data.date) - Date.parse(a.data.date),
        );
    } else {
        filteredPosts.sort(() => Math.random() - 0.5);
    }

    // Limit if number is passed
    if (typeof limit === 'number') {
        return filteredPosts.slice(0, limit);
    }
    return filteredPosts;
}
