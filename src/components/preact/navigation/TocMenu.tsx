
import type { MarkdownHeading } from "astro";
import clsx from "clsx";
import { type AnimationSequence, animate, scroll } from "motion";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { NestedHeading } from "~/libs";
import { buildToc } from "~/libs";

interface Props {
  headings: MarkdownHeading[];
  class?: string;
  title: string;
}

export default function TocMenu({
  title = "On this page",
  headings,
  class: className,
}: Props) {
  const [activeTitle, setActiveTitle] = useState(`${title}`);
  const hasRevealed = useRef(false);
  const pageTopRef = useRef<HTMLAnchorElement | null>(null);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tocRef = useRef<HTMLElement | null>(null);
  const tocWrapperRef = useRef<HTMLDivElement | null>(null);
  const tocToggleRef = useRef<HTMLSpanElement | null>(null);
  const tocPanelRef = useRef<HTMLDivElement | null>(null);
  const animationInProgress = useRef<boolean>(false);
  const tocButtonRef = useRef<HTMLButtonElement | null>(null);
  const toc = buildToc(headings);
  const [isOpen, setIsOpen] = useState(false);
  const panelHeight = useRef<number>(null);

  useEffect(() => {
    if (!tocRef.current || !progressCircleRef.current || hasRevealed.current)
      return;

    // Only reveal once — on first meaningful render
    if (!hasRevealed.current && tocRef.current) {
      requestAnimationFrame(() => {
        tocRef.current?.removeAttribute("data-cloaked");
        hasRevealed.current = true;
      });
    }

    scroll(
      animate(progressCircleRef.current, {
        strokeDasharray: ["0, 1", "1.1, 1.1"],
      }),
    );
  }, []);

  const checkScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const vH = window.innerHeight;
    const shouldBeVisible = scrollY > vH * 0.75;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  }, [isVisible]);



  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll();

    if (pageTopRef.current && tocRef.current) {
      const sequenceAppear: AnimationSequence = [
        [
          tocRef.current,
          {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : "-200%",
          },
          { duration: 0.3, ease: "easeOut" },
        ],
      ];

      animate(sequenceAppear);
    }

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isVisible, checkScroll]); // Runs when `isVisible` changes

  useEffect(() => {
    if (tocPanelRef.current) {
      panelHeight.current = tocPanelRef.current.getBoundingClientRect().height;
    }
  }, []);

  useEffect(() => {
    if (
      !tocRef.current ||
      !tocToggleRef.current ||
      !tocWrapperRef.current ||
      !tocPanelRef.current ||
      animationInProgress.current
    )
      return;

    const sequenceOpen: AnimationSequence = [
      [
        tocPanelRef.current,
        { opacity: 1, height: [0, `${panelHeight.current}px`] },
        { duration: 0.25 },
      ],
      [tocToggleRef.current, { rotate: "180deg" }, { duration: 0.25, at: "<" }],
    ];

    const sequenceClose: AnimationSequence = [
      [tocPanelRef.current, { opacity: 0, height: 0 }, { duration: 0.25 }],

      [tocToggleRef.current, { rotate: "0deg" }, { duration: 0.25, at: "<" }],
    ];

    animationInProgress.current = true;

    if (isOpen) {
      animate(sequenceOpen).then(() => {
        animationInProgress.current = false;
      });
    } else {
      animate(sequenceClose).then(() => {
        animationInProgress.current = false;
      });
    }
    animationInProgress.current = false;
  }, [isOpen]);

  useEffect(() => {
    let lastActiveId = "";

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === lastActiveId) continue;

          const link = tocRef.current?.querySelector(
            `a[href="#${id}"]`,
          ) as HTMLAnchorElement | null;
          if (link) {
            setActiveTitle(
              `${link.textContent}` || `${title}` || "On this page",
            );
            const links = tocRef.current?.querySelectorAll("a");
            if (links) {
              for (const a of links) {
                a.setAttribute("data-state", "");
              }
            }

            link.setAttribute("data-state", "active");
            lastActiveId = id;
          }
          break; // only handle the first intersecting heading
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: "0px 0px -50%",
      threshold: 0.75,
    };
    const headingObserver = new IntersectionObserver(
      setCurrent,
      observerOptions,
    );

    const headings = document.querySelectorAll("main :is(h2,h3,h4)");
    for (const index in headings) {
      if (headings[index] instanceof HTMLElement) {
        headingObserver.observe(headings[index]);
      }
    }

    return () => headingObserver.disconnect();
  }, []);

  const toggleToc = (_event?: Event) => {
    setIsOpen((prev) => !prev);
  };

  // Render the table of contents recursively
  const renderHeading = (heading: NestedHeading) => (
    <li key={heading.slug}>
      <a
        href={`#${heading.slug}`}
        onClick={() => setIsOpen(false)}
        data-state
        className="link data-[state=active]:font-semibold data-[state=active]:text-content data-[state=active]:no-underline"
      >
        {heading.text}
      </a>
      {heading.subheadings.length > 0 && (
        <ol>{heading.subheadings.map(renderHeading)}</ol>
      )}
    </li>
  );

  return (
    <nav
      id="toc"
      ref={tocRef}
      data-cloaked
      aria-label="Contents"
      className={clsx(
        className,
        "-translate-x-1/2 cloaked:invisible fixed top-(--safe-top) left-1/2 z-(--z-toc) mx-auto min-h-fluid-l w-full max-w-[40ch] px-(--spacing-safe-inline) md:top-fluid-m",
      )}
      style={"opacity: 0;"}
    >
      <div
        ref={tocWrapperRef}
        id="tocWrapper"
        className="grid w-full grid-cols-(--gtc-toc) grid-rows-(--gtr-toc) rounded-(--spacing-fluid-s) bg-surface-raised shadow-raised shadow-shadow-dark/25"
      >
        <div class="grid grid-cols-[auto_1fr] gap-fluid-2xs">
          <a
            href="#top"
            ref={pageTopRef}
            title={"jump to page top"}
            data-jump
            className="scroll cloaked:invisible relative grid h-fluid-l w-fluid-l grid-cols-1 grid-rows-1 items-center justify-items-center rounded-full bg-action text-content-light leading-none focus:outline-hidden"
          >
            <div className="icon-[tabler--arrow-up-dashed] size-fluid-s" />
            <svg
              viewBox="0 0 100 100"
              className="-rotate-90 absolute inset-0 m-1 stroke-[6px]"
            >
              <title>Progress</title>
              <circle
                cx="50"
                cy="50"
                r="45"
                pathLength="1"
                strokeLinecap="round"
                className="fill-transparent stroke-white/25"
              />
              <circle
                ref={progressCircleRef}
                cx="50"
                cy="50"
                r="45"
                pathLength="1"
                strokeLinecap="round"
                className="progress fill-transparent stroke-white"
                strokeDasharray="0, 1"
              />
            </svg>
          </a>
          <button
            type="button"
            aria-controls="tocPanel"
            ref={tocButtonRef}
            aria-expanded={isOpen ? "true" : "false"}
            className={
              "group grid h-fluid-l w-full grid-cols-[1fr_auto] items-center gap-x-fluid-2xs whitespace-nowrap pr-fluid-2xs font-semibold text-step-0/[1] hover:cursor-pointer"
            }
            onClick={() => toggleToc()}
            aria-label="Toggle page links"
          >
            <span class="overflow-hidden text-ellipsis text-nowrap text-left">
              {activeTitle}
            </span>
            <span
              ref={tocToggleRef}
              className={clsx([
                "icon-[tabler--chevron-up] block size-fluid-m group-focus:ring-2",
              ])}
            />
          </button>
        </div>

        <div
          ref={tocPanelRef}
          id="tocPanel"
          className={`${isOpen ? "overflow-auto" : "pointer-events-none"} cloaked:invisible max-h-[calc(100dvh-var(--spacing-headerheight))] w-full overflow-y-scroll px-fluid-xs`}
          style={"opacity: 0;"}
        >
          <ol className="not-rte list m-0 list--counter space-y-fluid-2xs pb-fluid-xs">
            {toc.map(renderHeading)}
          </ol>
        </div>
      </div>
    </nav>
  );
}
