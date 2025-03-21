import { useEffect, useRef, useState } from "preact/hooks";
import { animate } from "motion";
import { hideUnderlay, showUnderlay } from "~/stores/layersStore";
import clsx from "clsx";

interface DropdownMenuProps {
	items: Array<{ url: string; label: string }>;
	currentPath: string;
	dropdownId: string; // Receive the dropdownId from parent
	isOpen: boolean;
}

const defaultClasses =
	"px-fluid-2xs py-fluid-3xs text-content hover:bg-line hover:text-content-shout focus:bg-line block text-base outline-hidden transition-all duration-300";

export default function DropdownMenu({
	items,
	currentPath,
	dropdownId,
	isOpen,
}: DropdownMenuProps) {
	const dropdownElement = useRef<HTMLDivElement | null>(null);
	const [isHidden, setIsHidden] = useState(!isOpen);

	useEffect(() => {
		const animationProps = isOpen
			? { opacity: [0, 1], scale: [0.95, 1] }
			: { opacity: [1, 0], scale: [1, 0.95] };

		const handleAnimation = () => {
			if (dropdownElement.current) {
				animate(dropdownElement.current, animationProps, {
					duration: 0.3,
				}).then(() => {
					if (!isOpen) {
						setIsHidden(true);
						hideUnderlay(); // Hide underlay when dropdown closes
					}
				});
			}
		};

		if (isOpen) {
			showUnderlay(); // Show underlay when dropdown opens
			setIsHidden(false);
		}
		handleAnimation();
	}, [isOpen]);

	return (
		<div
			id={dropdownId} // Use the dropdownId passed from parent
			ref={dropdownElement}
			className={`mt-fluid-2xs absolute right-0 w-auto origin-top-right ${isHidden ? "hidden pointer-events-none" : ""}`}
			aria-hidden={!isOpen}
		>
			<ul className="bg-surface-overlay shadow-overlay max-h-[calc(100vh-var(--spacing-headerheight))] min-w-50 overflow-y-scroll rounded-md">
				{items.map((child) => {
					const isActive = currentPath === child.url;
					const linkClass = clsx(
						defaultClasses,
						isActive && "border-l-tight border-l-brand text-content-shout",
					);
					return (
						<li key={child.url}>
							<a
								href={child.url}
								className={linkClass}
								data-state={isActive ? "active" : undefined}
							>
								<span className="line-clamp-2">{child.label}</span>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
