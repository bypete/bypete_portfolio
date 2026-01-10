import { type AnimationSequence, animate } from "motion";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export default function ThemeIcon() {
  const lightRef = useRef<HTMLButtonElement>(null);
  const darkRef = useRef<HTMLButtonElement>(null);
  const animationInProgress = useRef<boolean>(false);

  // script is:inline in BaseLayout handles the intial setting to avoid FOUC
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light"; // Default when server-side
    }
    return localStorage.getItem("theme") as "light" | "dark";
  });

  const updateMetaTags = useCallback((theme: "light" | "dark") => {
    const colorValue =
      theme === "light" ? "rgb(255, 255, 255)" : "rgb(42, 42, 54)";
    const metaTags = document.querySelectorAll('meta[name="theme-color"]');

    for (const metaTag of metaTags) {
      (metaTag as HTMLMetaElement).setAttribute("content", colorValue);
    }
  }, []);

  // Animation and theme switching
  useEffect(() => {
    if (!lightRef.current || !darkRef.current || animationInProgress.current)
      return;

    const easeOutQuart = [0.25, 1, 0.5, 1] as const;

    const sequenceLight: AnimationSequence = [
      [
        lightRef.current,
        {
          y: ["100%"],
          rotate: ["0deg", "-90deg"],
        },
        { duration: 0.25 },
      ],
      [
        darkRef.current,
        {
          y: ["100%", "0%"],
          rotate: ["0deg"],
        },
        { duration: 0.75, at: "<", delay: 0.15, ease: easeOutQuart },
      ],
    ];

    const sequenceDark: AnimationSequence = [
      [
        darkRef.current,
        {
          y: ["100%"],
          rotate: ["0deg", "-90deg"],
        },
        { duration: 0.25 },
      ],
      [
        lightRef.current,
        {
          y: ["100%", "0%"],
          rotate: ["0deg"],
        },
        { duration: 0.75, at: "<", delay: 0.15, ease: easeOutQuart },
      ],
    ];

    const sequence = theme === "light" ? sequenceLight : sequenceDark;
    animationInProgress.current = true;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateMetaTags(theme);
    animate(sequence).then(() => {
      animationInProgress.current = false;
    });
  }, [theme, updateMetaTags]); // Include theme and updateMetaTags as dependencies

  const changeTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <div className="grid-col-1 grid-row-1 relative inset-shadow-sm grid size-fluid-l justify-center overflow-hidden rounded-full bg-action text-center text-content-light leading-none transition-colors duration-[750ms]">
      <button
        id="setThemeLight"
        ref={lightRef}
        onClick={() => changeTheme("light")}
        type="button"
        aria-label="set light theme"
        aria-pressed={theme === "light"}
        className="col-start-1 row-start-1 flex size-fluid-l items-center justify-center rounded-full hover:cursor-pointer"
      >
        <span className="icon-[tabler--sun-high-filled] size-fluid-s" />
      </button>
      <button
        id="setThemeDark"
        ref={darkRef}
        onClick={() => changeTheme("dark")}
        type="button"
        aria-label="set dark theme"
        aria-pressed={theme === "dark"}
        className="col-start-1 row-start-1 flex size-fluid-l items-center justify-center rounded-full hover:cursor-pointer"
      >
        <span className="icon-[tabler--moon-filled] size-fluid-s" />
      </button>
    </div>
  );
}
