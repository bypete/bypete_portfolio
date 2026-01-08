import { useStore } from "@nanostores/preact";
import { type AnimationSequence, animate, stagger } from "motion";
import { useCallback, useEffect, useRef } from "preact/hooks";
import HamburgerButton from "~/components/preact/navigation/HamburgerButton";
import ByPeteWire from "~/components/preact/svg/ByPeteWire";
import ThemeIcon from "~/components/preact/ThemeIcon";
import {
  bannerPosition,
  isMenuOpen,
  setBannerPosition,
} from "~/stores/layersStore";

interface Props {
  currentPath?: string;
}

type BannerState = "entrance" | "start" | "up" | "down";

export default function Banner({ currentPath = "/" }: Props) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const $bannerPosition = useStore(bannerPosition);
  const $MenuState = useStore(isMenuOpen);
  const hasRevealed = useRef(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const logoTypeRef = useRef<SVGSVGElement>(null);
  const logoBadgeRef = useRef<HTMLDivElement>(null);

  const lastScrollY = useRef(0);
  const isAnimating = useRef(false);
  const hasPlayedEntrance = useRef(false);

  const play = useCallback((target: BannerState) => {
    if (
      isAnimating.current ||
      !logoTypeRef.current ||
      !hamburgerRef.current ||
      !logoRef.current ||
      !logoBadgeRef.current
    )
      return;

    const easeOverShoot = [0.16, 1, 0.3, 1] as const;
    const easeGentle = [0.22, 1, 0.36, 1] as const;
    const isMobile = window.innerWidth <= 768;

    const logoTypePaths = Array.from(
      logoTypeRef.current.querySelectorAll("path"),
    );
    const LOGO_STROKE_FLASH = [0, 80, 64] as const;

    const sequences: Record<
      "mobile" | "desktop",
      Record<BannerState, AnimationSequence>
    > = {
      mobile: {
        entrance: [
          [logoBadgeRef.current, { opacity: 0 }, { duration: 0 }],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-l)",
              color: "var(--color-content-shout)",
            },
            { duration: 0.5, ease: easeOverShoot },
          ],
          [
            logoTypePaths,
            { pathLength: [0, 1], strokeWidth: LOGO_STROKE_FLASH },
            { duration: 1.75, ease: easeGentle, delay: stagger(0.25), at: "<" },
          ],
          [
            hamburgerRef.current,
            { x: [-300, 0], scale: [0.75, 1] },
            { duration: 0.75, ease: easeOverShoot, at: "-1.75" },
          ],
        ],
        start: [
          [logoBadgeRef.current, { opacity: 0 }, { duration: 0 }],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-l)",
              color: "var(--color-content-shout)",
            },
            { duration: 0 },
          ],
          [hamburgerRef.current, { x: 0, scale: 1 }, { duration: 0 }],
        ],
        up: [
          [logoBadgeRef.current, { opacity: 0 }, { duration: 0 }],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-l)",
              color: "var(--color-content-shout)",
            },
            { duration: 0.4, ease: easeOverShoot },
          ],
          [hamburgerRef.current, { scale: 1 }, { duration: 0.25 }],
        ],
        down: [
          [logoBadgeRef.current, { opacity: 0 }, { duration: 0 }],
          [
            logoTypeRef.current,
            { height: "var(--spacing-fluid-l)", color: "var(--color-content)" },
            { duration: 0.4, ease: easeOverShoot },
          ],
          [hamburgerRef.current, { scale: 1 }, { duration: 0.25 }],
        ],
      },
      desktop: {
        entrance: [
          [hamburgerRef.current, { x: -300 }, { duration: 0 }],
          [
            logoRef.current,
            { x: [-300, 0] },
            { duration: 0.5, ease: easeOverShoot },
          ],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-l)",
              margin: "var(--spacing-fluid-xs)",
              opacity: [0, 1],
            },
            { duration: 0.4, at: "<" },
          ],
          [
            logoBadgeRef.current,
            { opacity: [0, 1] },
            { duration: 0.4, ease: easeOverShoot, at: "<" },
          ],
          [
            logoTypePaths,
            { pathLength: [0, 1], strokeWidth: LOGO_STROKE_FLASH },
            { duration: 2.5, ease: easeGentle, delay: stagger(0.3) },
          ],
          [
            hamburgerRef.current,
            { x: [-300, 0], scale: [0.8, 1] },
            { duration: 0.8, ease: easeOverShoot, at: "<" },
          ],
        ],
        start: [
          [logoRef.current, { x: 0, y: 0 }, { duration: 0.32 }],
          [logoBadgeRef.current, { opacity: 1 }, { duration: 0, at: "<" }],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-l)",
              margin: "var(--spacing-fluid-xs)",
              opacity: 1,
            },
            { duration: 0.32, at: "<" },
          ],
          [logoTypePaths, { pathLength: 1, strokeWidth: 64 }, { duration: 0 }],
          [hamburgerRef.current, { x: 0, scale: 1 }, { duration: 0 }],
        ],
        up: [
          [
            logoRef.current,
            { x: 0, y: 0 },
            { duration: 0.75, ease: easeOverShoot },
          ],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-m)",
              margin: "var(--spacing-fluid-2xs)",
            },
            { duration: 0.4, at: "<" },
          ],
          [logoBadgeRef.current, { opacity: 1 }, { duration: 0.3 }],
          [hamburgerRef.current, { scale: 1 }, { duration: 0.3 }],
        ],
        down: [
          [
            logoRef.current,
            { x: 0, y: "-300%" },
            { duration: 0.75, ease: easeOverShoot },
          ],
          [
            logoTypeRef.current,
            {
              height: "var(--spacing-fluid-m)",
              margin: "var(--spacing-fluid-2xs)",
            },
            { duration: 0.4, at: "<" },
          ],
          [logoBadgeRef.current, { opacity: 1 }, { duration: 0 }],
          [hamburgerRef.current, { scale: 1 }, { duration: 0.3 }],
        ],
      },
    };

    const seq = sequences[isMobile ? "mobile" : "desktop"][target];
    if (!seq) return;

    isAnimating.current = true;
    setBannerPosition(target);

    if (target === "entrance") {
      hasPlayedEntrance.current = true;
    }

    const animation = animate(seq);

    animation.then(() => {
      isAnimating.current = false;
    });

    requestAnimationFrame(() => {
      if (!hasRevealed.current && bannerRef.current) {
        bannerRef.current.removeAttribute("data-cloaked");
        hasRevealed.current = true;
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (isAnimating.current) return;

    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY.current;
    const threshold = 12;

    if (scrollY < 10) {
      const target = hasPlayedEntrance.current ? "start" : "entrance";
      if (target !== $bannerPosition) play(target);
    } else if (delta > threshold && $bannerPosition !== "down") {
      play("down");
    } else if (delta < -threshold && $bannerPosition === "down") {
      play("up");
    }

    if (Math.abs(delta) > threshold) {
      lastScrollY.current = scrollY;
    }
  }, [play, $bannerPosition]);

  useEffect(() => {
    $MenuState && play("up");
  }, [$MenuState]);

  useEffect(() => {
    lastScrollY.current = window.pageYOffset;

    const applyInitialState = () => {
      const scrollY = window.scrollY;

      if (scrollY < 10) {
        if (!hasPlayedEntrance.current) {
          play("entrance");
        } else {
          play("start");
        }
      } else {
        hasPlayedEntrance.current = true;
        play("down");
      }
    };

    applyInitialState();

    const tick = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);

    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [handleScroll, play]);

  useEffect(() => {
    document.documentElement.setAttribute("data-banner", $bannerPosition);
  }, [$bannerPosition]);

  return (
    <div
      id="banner"
      ref={bannerRef}
      data-cloaked
      class="group pointer-events-none cloaked:invisible fixed top-0 z-(--z-banner) w-full bg-surface-raised px-(--viewport-safe-inline) py-fluid-xs drop-shadow-banner drop-shadow-shadow-dark/15 md:bg-transparent md:py-fluid-m"
    >
      <div className="pointer-events-auto grid grid-cols-(--gtc-banner) items-center gap-fluid-xs">
        <HamburgerButton ref={hamburgerRef} class="relative z-10 self-center" />
        <a
          ref={logoRef}
          href="/"
          aria-label="byPete - home"
          class="-my-[50%] relative"
        >
          <div
            ref={logoBadgeRef}
            class="mask-(--squircle) mask-[length:100%_100%] mask-bottom absolute inset-0 block h-full w-full origin-left bg-secondary drop-shadow-black/8 drop-shadow-squircle"
          />
          <ByPeteWire
            ref={logoTypeRef}
            class="relative h-fluid-l w-auto origin-left svgpath:stroke-[currentColor] text-white"
            title="byPete logo"
          />
        </a>
        <div class="justify-self-end">
          <ThemeIcon />
        </div>
      </div>
    </div>
  );
}
