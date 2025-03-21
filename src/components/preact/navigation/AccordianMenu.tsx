import { useEffect, useRef, useState } from "preact/hooks";
import { animate } from "motion";
import clsx from "clsx";

interface AccordianMenuProps {
	items: Array<{ url: string; label: string }>;
	currentPath: string;
	dropdownId: string; // Receive the dropdownId from parent
	isOpen: boolean;
}

const defaultClasses =
	"hover:text-primary focus:text-primary  px-fluid-2xs py-0 text-step-0 text-content block w-full focus:outline-hidden";

export default function AccordianMenu({
	items,
	currentPath,
	dropdownId,
	isOpen,
}: AccordianMenuProps) {
	const accordianElement = useRef<HTMLDivElement | null>(null);
	const [isHidden, setIsHidden] = useState(!isOpen);

	useEffect(() => {
		const dropdown = accordianElement.current;
		if (!dropdown) return;
		const animationProps = isOpen ? { height: "auto" } : { height: 0 };

		const handleAnimation = () => {
			if (dropdown) {
				animate(dropdown, animationProps, {
					duration: 0.3,
				}).then(() => {
					if (!isOpen) {
						setIsHidden(true);
					}
				});
			}
		};

		if (isOpen) {
			setIsHidden(false);
		}
		handleAnimation();
	}, [isOpen]);

	return (
		<div
			id={dropdownId} // Use the dropdownId passed from parent
			ref={accordianElement}
			className={` w-full overflow-y-scroll text-content ${isHidden ? "  pointer-events-none" : ""}`}
			aria-hidden={!isOpen}
		>
			<ul class="mt-fluid-s grid-cols-[repeat(auto-fit,minmax(40ch,1fr))] gap-y-fluid-xs gap-x-fluid-m grid">
				{items.map((child) => {
					const isActive = currentPath === child.url;
					const linkClass = clsx(
						defaultClasses,
						isActive &&
							"border-l-[3px] border-l-brand text-content font-semibold",
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
