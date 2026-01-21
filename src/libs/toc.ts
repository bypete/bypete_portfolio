// toc.ts
import type { MarkdownHeading } from "astro";

export interface NestedHeading extends MarkdownHeading {
	subheadings: NestedHeading[];
}

export function buildToc(headings: MarkdownHeading[]): NestedHeading[] {
	const toc: NestedHeading[] = [];
	const parentHeadings = new Map<number, NestedHeading>();

	for (const h of headings) {
		const heading: NestedHeading = { ...h, subheadings: [] };

		if (heading.depth === 2) {
			toc.push(heading);
		} else if (heading.depth > 2) {
			const parent = parentHeadings.get(heading.depth - 1);
			if (parent) {
				parent.subheadings.push(heading);
			}
			// Optional: handle depth jumps / missing parents (common issue)
			// else console.warn(`No parent found for heading: ${heading.text} (depth ${heading.depth})`);
		}

		parentHeadings.set(heading.depth, heading);
	}

	return toc;
}
