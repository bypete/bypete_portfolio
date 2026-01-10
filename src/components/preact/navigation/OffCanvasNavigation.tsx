import { useStore } from "@nanostores/preact";
import clsx from "clsx";
import { type AnimationSequence, animate, easeInOut } from "motion";
import { useEffect, useRef } from "preact/hooks";
import NavSmallScreen from "~/components/preact/navigation/NavSmallScreen";
import type { NavItem } from "~/data/navigation.static";
import siteInfo from "~/data/site";
import { isMenuOpen, openMenu } from "~/stores/layersStore";

interface Props {
  items: NavItem[];
  footerItems: NavItem[];
  currentPath?: string;
}

export default function OffCanvasNavigation({
  items,
  footerItems,
  currentPath = "",
}: Props) {
  const year = new Date().getFullYear();
  const $isMenuOpen = useStore(isMenuOpen);
  const hasRevealed = useRef(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (!$isMenuOpen && event.target === canvasRef.current) {
        openMenu(); // Open menu when #navigation (canvasRef) is focused
      }
    };
    document.addEventListener("focusin", handleFocus);

    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, [$isMenuOpen]);

  useEffect(() => {
    if (!canvasRef.current || !navRef.current || typeof window === "undefined")
      return;

    // Skip the first mount when menu is closed by default
    if (!hasRevealed.current && !$isMenuOpen) {
      // First load, menu closed → just reveal silently, no animation
      requestAnimationFrame(() => {
        canvasRef.current?.removeAttribute("data-cloaked");
        hasRevealed.current = true;
      });
      return;
    }

    const html = document.documentElement;
    const easeGentle = [0.22, 1, 0.36, 1] as const;
    const isMobile = (window.innerWidth || html.clientWidth) <= 768;

    const sequenceIn: AnimationSequence = [
      [
        canvasRef.current,
        {
          visibility: ["visible"],
        },
        { duration: 0 },
      ],
      [
        canvasRef.current,
        {
          clipPath: ["circle(150% at 50% 50%)"],
        },
        { duration: 2.5, ease: easeGentle },
      ],
      [
        navRef.current,
        {
          opacity: [0, 100],
          x: isMobile ? ["0%", "0%"] : ["var(--spacing-fluid-m)", 0],
          y: isMobile ? ["var(--spacing-fluid-m)", 0] : ["0%", "0%"],
        },
        { duration: 1, delay: 0.25, ease: easeGentle, at: "<" },
      ],
    ];

    const sequenceOut: AnimationSequence = [
      [
        canvasRef.current,
        {
          clipPath: [
            "circle(0% at var(--hamburger-center) var(--hamburger-center))",
          ],
        },
        { duration: 1, ease: easeInOut },
      ],
      [
        canvasRef.current,
        {
          visibility: ["hidden"],
        },
        { duration: 0.1 },
      ],
    ];

    if ($isMenuOpen) {
      html.style.overflow = "hidden";
      animate(sequenceIn);
    } else {
      html.style.overflow = "";
      animate(sequenceOut);
    }
    // Only reveal once — on first meaningful render
    if (!hasRevealed.current && canvasRef.current) {
      requestAnimationFrame(() => {
        canvasRef.current?.removeAttribute("data-cloaked");
        hasRevealed.current = true;
      });
    }
    return () => {
      html.style.overflow = "";
    };
  }, [$isMenuOpen]);

  return (
    <div
      id="navigation"
      data-cloaked
      tabIndex={-1}
      ref={canvasRef}
      class="cloaked:invisible fixed inset-0 z-(--z-offscreen) flex h-dvh not-dynamic:h-screen w-full overflow-y-scroll bg-[image:var(--filter-noise)] bg-size-[960px] bg-surface-brand px-(--viewport-safe-inline) pt-headerheight text-content-dark"
      style={
        "clip-path: circle(0% at var(--hamburger-center) var(--hamburger-center));"
      }
    >
      <div ref={navRef} class="grid w-full grid-rows-[1fr_auto] gap-fluid-m">
        <NavSmallScreen
          items={items}
          currentPath={currentPath}
          className="self-end"
        />

        <div class="flex min-h-fluid-l flex-col justify-between gap-fluid-m pb-fluid-m md:flex-row">
          {footerItems && (
            <ul class="flex flex-row items-center gap-fluid-xs">
              {footerItems.map((item) => (
                <li key={item}>
                  <a
                    href={item.url}
                    class="text-content-dark hover:text-content-light"
                    title={item.label}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>©{year}</li>
            </ul>
          )}
          <div class="grid grid-flow-col items-center justify-start gap-fluid-xs">
            {siteInfo.socials.map((channel) => (
              <a
                key={channel}
                href={`${channel.url}`}
                rel="nofollow"
                className="text-content-dark hover:text-content-light"
                title={channel.platform}
              >
                <span
                  className={clsx([
                    channel.icon,
                    "block",
                    "h-fluid-m",
                    "w-fluid-m",
                    "fill-current",
                  ])}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
