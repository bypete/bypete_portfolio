import type { h } from "preact";
import { useState } from "preact/hooks";

export interface Props extends h.JSX.HTMLAttributes<HTMLElement> {
	theme?:
		| "primary"
		| "secondary"
		| "disco"
		| "whiteline"
		| "white"
		| "outline"
		| "quiet"
		| "link"
		| "disabled";
	class?: string;
	size?: "sm" | "md" | "lg";
	isIcon?: boolean;
	choices?: string[];
	type?: "button" | "submit" | "reset";
	href?: string;
	children?: h.JSX.Element | h.JSX.Element[] | string | number;
}

export default function Button({
	theme = "primary",
	class: className,
	size = "md",
	isIcon = false,
	href,
	choices = [],
	children,
	...rest
}: Props) {
	const [currentUrl, setCurrentUrl] = useState(
		choices.length > 0
			? choices[Math.floor(Math.random() * choices.length)]
			: href || "",
	);

	const baseClasses = [
		"btn",
		"inline-flex",
		"items-center",
		"rounded-full",
		"align-middle",
		"font-bold",
		"transition-colors",
		"text-shadow-none",
		"hover:shadow-inset",
		"hover:cursor-pointer",
	];

	const sizeClasses = {
		sm: [
			"h-fluid-m",
			"px-fluid-2xs",
			"py-0",
			"text-step--1",
			"leading-fluid-m!",
		],
		md: ["px-fluid-xs", "py-fluid-3xs", "text-step-0"],
		lg: ["px-fluid-sm", "py-fluid-2xs", "text-step-1"],
	};

	const themeClasses = {
		link: [],
		primary: [
			"bg-primary",
			"text-white",
			"hover:border-black/10",
			"hover:bg-primary-light",
		],
		secondary: ["bg-secondary", "text-white", "hover:bg-secondary-dark"],
		white: ["bg-content-light", "text-content-dark"],
		whiteline: [
			"bg-transparent",
			"text-white",
			"ring-2",
			"ring-inset",
			"ring-content-light",
		],
		outline: ["bg-transparent", "ring-2", "ring-inset", "ring-line"],
		disco: [
			"bg-linear-to-r",
			"from-indigo-900",
			"via-pink-500",
			"to-pink-700",
			"text-white",
			"hover:border-black/10",
			"hover:via-pink-700",
			"hover:to-pink-700",
		],
		quiet: [
			"bg-transparent",
			"text-content-quiet",
			"hover:border-line",
			"hover:bg-gray-600",
			"hover:text-white",
		],
		disabled: [
			"bg-transparent",
			"text-disabled",
			"ring-2",
			"ring-disabled",
			"hover:border-disabled",
			"hover:bg-transparent",
			"hover:text-disabled",
		],
	};

	const classResult = [
		...baseClasses,
		...sizeClasses[size],
		...themeClasses[theme],
		isIcon && "justify-between gap-x-fluid-3xs",
		className,
	].join(" ");

	const handleUrlChange = () => {
		if (choices.length > 0) {
			setCurrentUrl(choices[Math.floor(Math.random() * choices.length)]);
		}
	};

	// If href is present, render an anchor tag
	if (href || choices.length > 0) {
		return (
			<a
				href={currentUrl}
				className={["no-underline", classResult].join(" ")}
				{...(rest as h.JSX.HTMLAttributes<HTMLAnchorElement>)}
				onClick={choices.length > 0 ? handleUrlChange : undefined}
			>
				{children}
			</a>
		);
	}

	// Otherwise, render a button
	return (
		<button
			className={classResult}
			{...(rest as h.JSX.HTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	);
}
