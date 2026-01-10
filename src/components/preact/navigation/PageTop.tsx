import { animate, scroll } from "motion";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
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
      className="scroll relative grid h-fluid-l w-fluid-l grid-cols-1 grid-rows-1 items-center justify-items-center rounded-full bg-action text-content-light leading-none opacity-0 focus:outline-hidden"
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
  );
}
