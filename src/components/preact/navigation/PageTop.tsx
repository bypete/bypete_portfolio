import { useEffect, useState, useRef, useCallback } from "preact/hooks";
import { scroll, animate } from "motion";
export default function PageTop() {
	const progressCircleRef = useRef<SVGCircleElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const pageTopRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		if (progressCircleRef.current) {
			scroll(
				animate(progressCircleRef.current, {
					strokeDasharray: ["0, 1", "1.1, 1.1"],
				}),
			);
		}
	}, []);

	const checkScroll = useCallback(() => {
		const scrollY = window.scrollY;
		const vH = window.innerHeight;
		const pH = document.documentElement.scrollHeight;
		const shouldBeVisible = pH > 1.25 * vH && scrollY > pH * 0.05;
		if (shouldBeVisible !== isVisible) {
			setIsVisible(shouldBeVisible);
		}
	}, [isVisible]);

	useEffect(() => {
		window.addEventListener("scroll", checkScroll);
		checkScroll();

		if (pageTopRef.current) {
			animate(
				pageTopRef.current,
				{
					opacity: isVisible ? 1 : 0,
					scale: isVisible ? [0.8, 1.2, 1] : 0.8,
				},
				{ duration: 0.3, ease: "easeOut" },
			);
		}

		return () => window.removeEventListener("scroll", checkScroll);
	}, [isVisible, checkScroll]); // Runs when `isVisible` changes

	return (
		<a
			href="#top"
			ref={pageTopRef}
			title={"jump to page top"}
			data-jump
			className="opacity-0 relative scroll h-fluid-m w-fluid-m flex items-center leading-[0] text-brand hover:bg-surface-raised focus:bg-surface-raised rounded-full stroke-2 p-0 backdrop-blur-xs focus:outline-hidden"
		>
			<div className="i-lucide-arrow-up m-fluid-3xs h-full w-full" />
			<svg
				viewBox="0 0 100 100"
				className="absolute inset-0 h-full w-full -rotate-90 stroke-[5px]"
			>
				<title>Progress</title>
				<circle
					cx="50"
					cy="50"
					r="45"
					pathLength="1"
					strokeLinecap="round"
					className="stroke-brand-dark/20 fill-transparent"
				/>
				<circle
					ref={progressCircleRef}
					cx="50"
					cy="50"
					r="45"
					pathLength="1"
					strokeLinecap="round"
					className="progress stroke-brand fill-transparent"
					strokeDasharray="0, 1"
				/>
			</svg>
		</a>
	);
}
