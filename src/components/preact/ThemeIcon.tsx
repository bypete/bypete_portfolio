import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import { animate, type AnimationSequence } from "motion";

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

    const sequenceLight: AnimationSequence = [
      [
        lightRef.current,
        {
          x: ["0%", "100%"],
          y: ["0%", "15%"],
          rotate: ["0deg", "30deg"],
        },
      ],
      [
        darkRef.current,
        {
          x: ["-100%", "0%"],
          y: ["15%", "0%"],
          rotate: ["-30deg", "0deg"],
        },
        { at: "<" },
      ],
    ];

    const sequenceDark: AnimationSequence = [
      [
        darkRef.current,
        {
          x: ["0%", "100%"],
          y: ["0%", "15%"],
          rotate: ["0deg", "30deg"],
        },
        { duration: 0.75 },
      ],
      [
        lightRef.current,
        {
          x: ["-100%", "0%"],
          y: ["15%", "0%"],
          rotate: ["-30deg", "0deg"],
        },
        { at: "<", duration: 0.75 },
      ],
    ];

    const sequence = theme === "light" ? sequenceLight : sequenceDark;
    animationInProgress.current = true;
    animate(sequence).then(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      updateMetaTags(theme);
      animationInProgress.current = false;
    });
  }, [theme, updateMetaTags]); // Include theme and updateMetaTags as dependencies

  const changeTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <div className="grid-col-1 grid-row-1 relative grid size-fluid-l justify-center overflow-hidden rounded-full bg-surface-overlay text-center text-content leading-none shadow-inset transition-colors duration-[750ms]">
      <button
        id="setThemeLight"
        ref={lightRef}
        onClick={() => changeTheme("light")}
        type="button"
        aria-label="set light theme"
        aria-pressed={theme === "light"}
        className="size-fluid-l hover:cursor-pointer col-start-1 row-start-1 flex items-center justify-center rounded-full"
      >
        <span className="i-lucide-sun-moon s-m-s" />
      </button>
      <button
        id="setThemeDark"
        ref={darkRef}
        onClick={() => changeTheme("dark")}
        type="button"
        aria-label="set dark theme"
        aria-pressed={theme === "dark"}
        className="size-fluid-l  hover:cursor-pointer col-start-1 row-start-1 flex items-center justify-center rounded-full"
      >
        <span className="i-lucide-sun s-m-s" />
      </button>
    </div>
  );
}
