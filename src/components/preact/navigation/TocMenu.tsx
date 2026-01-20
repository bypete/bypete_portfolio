import clsx from "clsx";
import { type AnimationSequence, animate, inView } from "motion";
import { useEffect, useRef, useState } from "preact/hooks";
import { buildToc } from "~/libs";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
  subheadings: Heading[];
}

interface Props {
  headings: Heading;
  class?: string;
}

export default function TocMenu({ headings, class: className }: Props) {
  const [activeTitle, setActiveTitle] = useState("On this page");
  const hasRevealed = useRef(false);
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
    if (!tocRef.current || hasRevealed.current) return;

    // Only reveal once — on first meaningful render
    if (!hasRevealed.current && tocRef.current) {
      requestAnimationFrame(() => {
        tocRef.current?.removeAttribute("data-cloaked");
        hasRevealed.current = true;
      });
    }

    inView(tocRef.current, (element) => {
      const animation = animate(
        element,
        { opacity: [0, 1], y: ["var(--spacing-fluid-m)", 0] },
        { duration: 0.5, delay: 0.5 },
      );
      return () => {
        animation.speed = -1;
      };
    });
  }, []);

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
            setActiveTitle(`${link.textContent}` || "On this page");
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
  const renderHeading = (heading: Heading) => (
    <li key={heading.slug}>
      <a
        href={`#${heading.slug}`}
        onClick={() => setIsOpen(false)}
        data-state
        className="link data-[state=active]:font-semibold data-[state=active]:text-content data-[state=active]:no-underline"
      >
        {heading.text}
      </a>
      {heading.subheadings && heading.subheadings.length > 0 && (
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
        "cloaked:invisible sticky top-(--safe-top) z-(--z-toc) mx-auto min-h-fluid-l w-full max-w-[40ch] opacity-0 md:top-fluid-m",
        className ? className : "not-first:mt-fluid-2xl mb-fluid-2xl",
      )}
    >
      <div
        ref={tocWrapperRef}
        id="tocWrapper"
        className="absolute mx-auto grid w-full grid-cols-1 grid-rows-(--gtr-toc) rounded-(--spacing-fluid-s) bg-surface-raised shadow-raised shadow-shadow-dark/25"
      >
        <button
          type="button"
          aria-controls="tocPanel"
          ref={tocButtonRef}
          aria-expanded={isOpen ? "true" : "false"}
          className={
            "group grid h-fluid-l w-full grid-cols-[1fr_auto] items-center gap-x-fluid-2xs whitespace-nowrap px-fluid-xs font-semibold text-step-0/[1] hover:cursor-pointer"
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
