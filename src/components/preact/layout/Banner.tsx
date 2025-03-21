import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import { animate, type AnimationSequence } from "motion";
import { useStore } from "@nanostores/preact";
import { setBannerPosition, bannerPosition } from "~/stores/layersStore";
import BypeteBrand from "~/assets/svg/bypete__brand.svg?react";
import BypeteWhite from "~/assets/svg/bypete__white.svg?react";
import NavLargeScreen from "~/components/preact/navigation/NavLargeScreen";
import HamburgerButton from "~/components/preact/navigation/HamburgerButton";

import { navigation } from "~/data/navigation";

interface Props {
	isHeroDark: boolean;
	currentPath?: string;
}

type BannerPosition = "start" | "up" | "down";

export default function Banner({
	isHeroDark = true,
	currentPath = "/",
}: Props) {
	const $bannerPosition = useStore(bannerPosition);
	const bannerRef = useRef<HTMLDivElement>(null);
	const brandLogoRef = useRef<HTMLElement>(null);
	const whiteLogoRef = useRef<HTMLElement>(null);
	const lastScrollY = useRef<number>(0);
	const isAnimatingRef = useRef<boolean>(false);

	useEffect(() => {
		document.documentElement.setAttribute("data-banner", $bannerPosition);
	}, [$bannerPosition]);

	const animateBannerPosition = useCallback(
		(bannerPosition: BannerPosition) => {
			if (
				!bannerRef.current ||
				!whiteLogoRef.current ||
				!brandLogoRef.current ||
				isAnimatingRef.current
			)
				return;

			const sequenceMap: Record<BannerPosition, AnimationSequence> = {
				start: [
					[
						isHeroDark ? whiteLogoRef.current : brandLogoRef.current,
						{
							opacity: 1,
						},
					],
					[
						!isHeroDark ? whiteLogoRef.current : brandLogoRef.current,
						{
							opacity: 0,
						},
					],
					[
						bannerRef.current,
						{
							opacity: 1,
							background: "var(--banner)",
							filter: "drop-shadow(var(--drop-shadow-transparent))",
						},
						{ at: "<", duration: 0.25 },
					],
					[
						bannerRef.current,
						{
							transform: "translateY(0)",
						},
						{ duration: 0.25 },
					],
				],
				up: [
					[
						whiteLogoRef.current,
						{
							opacity: 0,
						},
					],
					[
						brandLogoRef.current,
						{
							opacity: 1,
						},
						{ at: "<" },
					],
					[
						bannerRef.current,
						{
							opacity: 1,
							transform: "translateY(0)",
							background: "var(--banner-up)",
							filter: "drop-shadow(var(--drop-shadow-banner))",
						},
						{ duration: 0.25 },
					],
				],
				down: [
					[
						bannerRef.current,
						{
							transform: "translateY(-100%)",
						},
						{ duration: 0.25 },
					],
					[
						bannerRef.current,
						{
							background: "var(--banner-up)",
							filter: "drop-shadow(var(--drop-shadow-banner))",
						},
						{ delay: 0.25 },
					],
				],
			};

			isAnimatingRef.current = true;
			setBannerPosition(bannerPosition);

			animate(sequenceMap[bannerPosition]).then(() => {
				isAnimatingRef.current = false;
				checkTopPosition(); // Ensure position is correct after animation
			});
		},
		[isHeroDark],
	);

	const checkTopPosition = useCallback(() => {
		if (document.documentElement.scrollTop <= 0) {
			animateBannerPosition("start");
		}
	}, [animateBannerPosition]);

	const handleScroll = useCallback(() => {
		const scrollTop = document.documentElement.scrollTop;

		if (scrollTop <= 0) {
			animateBannerPosition("start");
			return;
		}

		if (scrollTop > lastScrollY.current) {
			animateBannerPosition("down");
		} else {
			animateBannerPosition("up");
		}

		lastScrollY.current = scrollTop;
	}, [animateBannerPosition]);

	useEffect(() => {
		const handleScrollWithAnimation = () => {
			// Using requestAnimationFrame to avoid excessive reflows and optimize scroll handling
			requestAnimationFrame(handleScroll);
		};

		window.addEventListener("scroll", handleScrollWithAnimation, {
			passive: true,
		});

		const scrollTimeout = setTimeout(() => {
			checkTopPosition();
		}, 100);

		return () => {
			window.removeEventListener("scroll", handleScrollWithAnimation);
			clearTimeout(scrollTimeout);
		};
	}, [handleScroll, checkTopPosition]);

	return (
		<div
			id="banner"
			ref={bannerRef}
			class="group opacity-0 py-fluid-s fixed top-0 z-(--z-banner) translate-z-0 w-full backdrop-blur-[1px]"
		>
			<div className="gap-x-fluid-m container mx-auto grid grid-cols-[auto_1fr] items-center">
				<div class="logo justify-self-start">
					<a
						href="/"
						aria-label="byPete - home"
						class="h-fluid-l grid w-auto grid-cols-1 grid-rows-1"
					>
						<span ref={whiteLogoRef} class="col-start-1 opacity-0">
							<BypeteWhite class="h-fluid-l w-auto" />
						</span>
						<span ref={brandLogoRef} class="col-start-1 opacity-0">
							<BypeteBrand class="h-fluid-l w-auto" />
						</span>
					</a>
				</div>

				<nav
					id="navigation"
					aria-label="Main"
					class="hidden lg:inline-flex justify-self-end"
				>
					<NavLargeScreen
						items={navigation}
						currentPath={currentPath}
						isHeroDark={isHeroDark}
					/>
				</nav>

				<HamburgerButton class="justify-self-end lg:hidden" />
			</div>
		</div>
	);
}
