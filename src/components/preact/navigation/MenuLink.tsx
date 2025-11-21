import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import clsx from "clsx";

interface BaseProps {
  url: string;
  className?: string;
  title?: string;
  level?: number;
  currentPath?: string;
  isActive?: boolean;
  isHeroDark?: boolean;
}

const heroThemes = {
  dark: {
    text: [
      "text-content-light",
      "hover:text-link",
      "focus:text-link",
      "ring-transparent",
      // Scroll up banner state:
      "hover:group-data-[banner=up]/page:text-link",
      "focus:group-data-[banner=up]/page:text-link",
      "group-data-[banner=up]/page:text-content-shout",
    ],
    active: [
      "text-content-light",
      "ring-primary",
      "hover:text-content-shout",
      "hover:group-data-[banner=up]/page:text-link",
      "focus:group-data-[banner=up]/page:text-link",
      "group-data-[banner=up]/page:text-content-shout",
    ],
  },
  default: {
    text: [
      "text-content-shout",
      "ring-transparent",
      "hover:text-link",
      "focus:text-link",
    ],
    active: ["text-content-shout", "ring-primary", "hover:text-content-shout"],
  },
};

const defaultClasses =
  "px-fluid-2xs py-fluid-3xs text-step-0/fluid-m hover:bg-surface-raised focus:bg-surface-raised block flex h-full items-center rounded-full font-semibold ring-2 transition duration-150 focus:outline-hidden";

export default function NavLargeScreen({
  url,
  title,
  isHeroDark = false,
  isActive = false,
  className,
  currentPath = "/",
  ...rest
}: BaseProps) {
  const themeClasses = isHeroDark ? heroThemes.dark : heroThemes.default;

  const linkClass = clsx(
    defaultClasses,
    isActive ? themeClasses.active : themeClasses.text,
    className, // Include user-specified class names
  );

  return (
    <a
      href={url}
      className={linkClass}
      {...(isActive && { "data-state": "active" })}
    >
      {title}
    </a>
  );
}
