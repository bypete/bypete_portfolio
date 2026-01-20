import { type CollectionEntry, getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";
import { generateOgImage } from "~/libs/opengraph";

export async function getStaticPaths() {
	const posts = await getCollection("work");

	return posts.map((post) => ({
		params: { id: post.id },
		props: { post },
	}));
}

export const GET: APIRoute<{ post: CollectionEntry<"work"> }> = async ({
	props,
}) => {
	const { post } = props;

	let backgroundBuffer: Buffer | undefined;

	if (post.data.og?.image?.originalSrc) {
		const filePath = path.resolve(
			process.cwd(),
			"src",
			post.data.og.image.originalSrc.replace(/^\//, ""),
		);

		try {
			backgroundBuffer = await fs.readFile(filePath);
		} catch (err) {
			console.error("Failed to load project image:", err);
		}
	}

	return generateOgImage({
		title: post.data.title,
		subTitle: post.data.excerpt,
		backgroundBuffer,
	});
};
