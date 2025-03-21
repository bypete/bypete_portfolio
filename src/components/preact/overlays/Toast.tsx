import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { animate } from "motion";
import { showOverlay, hideOverlay } from "~/stores/layersStore";

interface Props {
	id: string;
	isOpen: boolean;
	onClose?: () => void;
	bg?: string;
	theme?: "plain" | "settings" | "info" | "warning" | "success";
	children: ComponentChildren;
}

const themeSet = {
	settings: {
		icon: "i-hugeicons-configuration-01",
		bg: "bg-gray-800 text-white",
		border: "border-gray-600",
		stroke: "text-content-light",
	},
	info: {
		icon: "i-lucide-info",
		bg: "bg-blue-500 text-white",
		border: "border-blue-400",
		stroke: "text-content-light",
	},
	plain: {
		icon: null,
	},
};

export default function Toast({
	id,
	isOpen,
	onClose,
	bg = "from-surface-overlay to-surface bg-linear-to-b",
	theme = "plain",
	children,
}: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(isOpen);
	const hasShownOverlay = useRef(false);

	useEffect(() => {
		if (isOpen && !hasShownOverlay.current) {
			showOverlay();
			hasShownOverlay.current = true;
			setMounted(true);
			requestAnimationFrame(() => {
				if (ref.current) {
					animate(
						ref.current,
						{ opacity: [0, 1], scale: [0.9, 1] },
						{ duration: 0.5 },
					);
				}
			});
		} else if (!isOpen && hasShownOverlay.current) {
			if (ref.current) {
				animate(
					ref.current,
					{ opacity: 0, scale: 0.9 },
					{ duration: 0.3 },
				).then(() => {
					setMounted(false);
					hideOverlay();
					hasShownOverlay.current = false;
				});
			}
		}
	}, [isOpen]); // Run when `isOpen` changes

	if (!mounted) return null; // Don't render if it shouldn't be shown

	return (
		<div
			id={id}
			ref={ref}
			class={`text-step--1 rounded-tight shadow-overlay pointer-events-auto relative w-full ${bg}`}
			style={{ opacity: 0 }}
		>
			{theme === "plain" ? (
				<div class="gap-y-fluid-xs p-fluid-xs grid items-start">{children}</div>
			) : (
				<div class="grid grid-cols-[auto_1fr]">
					<div
						class={`${themeSet[theme]?.bg} ${themeSet[theme]?.stroke} ${themeSet[theme]?.border} rounded-bl-tight rounded-tl-tight overflow-hidden border-r`}
					>
						<span
							class={`${themeSet[theme].icon} m-fluid-2xs-xs w-fluid-s-m h-fluid-s-m block`}
						/>
					</div>
					<div class="gap-y-fluid-xs p-fluid-xs grid items-start">
						{children}
					</div>
				</div>
			)}

			<button
				aria-label="hide notice"
				type="button"
				onClick={() => onClose?.()}
				class="bg-warning p-fluid-3xs shadow-floated hover:bg-warning-shade absolute top-0 right-0 -mt-2 -mr-2 rounded-full text-white hover:cursor-pointer"
			>
				<span class="i-mdi-hide block h-4 w-4" />
			</button>
		</div>
	);
}
