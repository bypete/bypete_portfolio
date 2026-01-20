export function splitText(element: HTMLElement): HTMLSpanElement[] {
	const spans: HTMLSpanElement[] = [];

	[...element.childNodes].forEach((node) => {
		if (node.nodeType !== Node.TEXT_NODE || !node.textContent) return;

		const wrapper = document.createElement("span");
		wrapper.dataset.title = "true";
		wrapper.className = "leading-[inherit] not-rte";

		const words = node.textContent.split(" ");

		words.forEach((word, wordIndex) => {
			const wordSpan = document.createElement("span");
			wordSpan.dataset.word = "true";
			wordSpan.className = "inline-block whitespace-nowrap";

			[...word].forEach((char) => {
				const charSpan = document.createElement("span");
				charSpan.dataset.char = "true";
				charSpan.className = "inline-block";
				charSpan.textContent = char;
				wordSpan.appendChild(charSpan);
				spans.push(charSpan);
			});

			wrapper.appendChild(wordSpan);

			if (wordIndex < words.length - 1) {
				wrapper.appendChild(document.createTextNode("\u00A0"));
			}
		});

		element.replaceChild(wrapper, node);
	});

	return spans;
}
