interface TocHeading {
	depth: number;
	slug: string;
	text: string;
}

export function buildToc(headings: TocHeading[]) {
	const toc: (TocHeading & { subheadings: TocHeading[] })[] = [];
	const parentHeadings = new Map<
		number,
		TocHeading & { subheadings: TocHeading[] }
	>();

	for (const h of headings) {
		const heading = { ...h, subheadings: [] as TocHeading[] };

		if (heading.depth === 2) {
			toc.push(heading);
		} else {
			const parent = parentHeadings.get(heading.depth - 1);
			if (parent) {
				parent.subheadings.push(heading);
			}
		}

		parentHeadings.set(heading.depth, heading);
	}

	return toc;
}
