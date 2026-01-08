import { useEffect } from "preact/hooks";

/**
 * Removes the cloak from all elements with [data-cloak] or .cloak
 * after the component mounts on the client.
 * Prevents FOUC when using opacity-0 hiding technique.
 */
export function useCloak(): void {
	useEffect(() => {
		const elements = document.querySelectorAll<HTMLElement>("[data-cloaked]");

		for (const el of elements) {
			el.removeAttribute("data-cloaked");
		}
	}, []);
}
