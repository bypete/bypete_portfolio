import { useEffect, useRef, useState } from "preact/hooks";
import { animate, type AnimationSequence } from "motion";
import clsx from "clsx";
import { buildToc } from "~/js/utils";

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
  const tocRef = useRef<HTMLElement | null>(null);
  const tocWrapperRef = useRef<HTMLDivElement | null>(null);
  const tocPanelRef = useRef<HTMLDivElement | null>(null);
  const animationInProgress = useRef<boolean>(false);
  const tocRefButton = useRef<HTMLButtonElement | null>(null);
  const toc = buildToc(headings);
  const [isOpen, setIsOpen] = useState(false);
  const panelHeight = useRef<number>(null);

  useEffect(() => {
    if (tocPanelRef.current) {
      panelHeight.current = tocPanelRef.current.getBoundingClientRect().height;
    }
  }, []);

  useEffect(() => {
    if (
      !tocWrapperRef.current ||
      !tocPanelRef.current ||
      animationInProgress.current
    )
      return;

    const sequenceOpen: AnimationSequence = [
      [
        tocPanelRef.current,
        { opacity: [0, 1], height: [0, `${panelHeight.current}px`] },
        { duration: 0.25 },
      ],
    ];

    const sequenceClose: AnimationSequence = [
      [
        tocPanelRef.current,
        { opacity: 0, height: 0 },
        { duration: 0.25 }],
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
    const setCurrent: IntersectionObserverCallback = (entries) => {
      if (!tocRef.current) return;

      const links = tocRef.current.querySelectorAll("a");

      for (const index in entries) {
        const entry = entries[index];
        const { id } = entry.target;
        const tocHeadingEl = tocRef.current.querySelector(`a[href="#${id}"]`);

        if (!tocHeadingEl) continue;

        if (entry.isIntersecting) {
          for (const linkIndex in links) {
            if (links[linkIndex] instanceof HTMLElement) {
              links[linkIndex].setAttribute("data-state", "");
            }
          }
          tocHeadingEl.setAttribute("data-state", "active");
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

  const toggleToc = (event?: Event) => {
    setIsOpen((prev) => !prev);
  };

  // Render the table of contents recursively
  const renderHeading = (heading: Heading) => (
    <li key={heading.slug}>
      <a
        href={`#${heading.slug}`}
        onClick={() => setIsOpen(false)}
        data-state
        className="data-[state=active]:font-semibold data-[state=active]:text-content data-[state=active]:no-underline"
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
      aria-label="Contents"
      className={clsx(
        "sticky-root  sticky top-[calc(var(--headerheight)-1px))] z-(--z-toc) flex w-full flex-row items-center justify-center",
        className ? className : "my-fluid-l",
      )}
    >
      <div
        ref={tocWrapperRef}
        id="tocWrapper"
        className="shadow-raised relative mx-auto w-full rounded-b"
      >
        <button
          type="button"
          aria-controls="tocPanel"
          ref={tocRefButton}
          aria-expanded={isOpen ? "true" : "false"}
          className={`${isOpen && "rounded-none"} group gap-x-fluid-2xs border-line bg-surface-raised px-fluid-s py-fluid-2xs flex w-full items-center justify-between rounded-xs border font-semibold whitespace-nowrap hover:cursor-pointer`}
          onClick={() => toggleToc()}
          aria-label="Toggle page links"
        >
          On this page{" "}
          <span
            className={`block h-5 w-5 group-focus:ring-2 ${isOpen ? "i-lucide-x-circle" : "i-lucide-file-text"}`}
          />
        </button>
        <div className="relative z-10">
          <div
            ref={tocPanelRef}
            id="tocPanel"
            className={`${isOpen ? "" : " pointer-events-none"} opacity-0 border-line bg-surface-overlay px-fluid-s py-fluid-2xs shadow-raised absolute top-0 left-0  max-h-[calc(100dvh-var(--spacing-headerheight))] w-full grow overflow-y-scroll rounded-b border border-t-0`}
          >
            <ol className="m-0">{toc.map(renderHeading)}</ol>
          </div>
        </div>
      </div>
    </nav>
  );
}
