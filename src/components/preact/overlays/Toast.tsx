import clsx from "clsx";
import { animate } from "motion";
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { hideOverlay, showOverlay } from "~/stores/layersStore";

interface Props {
  id: string;
  isOpen: boolean;
  onClose?: () => void;
  bg?: string;
  theme?: "plain" | "settings" | "info" | "warning" | "success";
  size?: "sm" | "md" | "lg";
  children: ComponentChildren;
}

const sizeSet = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const themeSet = {
  plain: {
    container: "from-surface-raised to-surface bg-linear-to-b",
    icon: null,
  },
  settings: {
    container: "from-surface-raised to-surface bg-linear-to-b",
    icon: "icon-[tabler--settings-question]",
    iconPanel: "bg-secondary border-secondary-shade/20 text-content-light",
  },
  info: {
    container: "from-surface-raised to-surface bg-linear-to-b",
    icon: "icon-[tabler--info-square-rounded-filled]",
    iconPanel: ["border-r", "border-info-shade/20", "text-content-light"],
  },
};

export default function Toast({
  id,
  isOpen,
  onClose,
  bg,
  size = "sm",
  theme = "plain",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(isOpen);
  const hasShownOverlay = useRef(false);

  const currentTheme = themeSet[theme];
  const iconPanelClasses = currentTheme.iconPanel;
  const containerClasses = [bg ?? currentTheme.container, sizeSet[size]];

  useEffect(() => {
    if (isOpen && !hasShownOverlay.current) {
      showOverlay();
      hasShownOverlay.current = true;
      setMounted(true);
      requestAnimationFrame(() => {
        if (ref.current) {
          animate(
            ref.current,
            { opacity: [0, 1], scale: [0.9, 1] },
            { duration: 0.5 },
          );
        }
      });
    } else if (!isOpen && hasShownOverlay.current) {
      if (ref.current) {
        animate(
          ref.current,
          { opacity: 0, scale: 0.9 },
          { duration: 0.3 },
        ).then(() => {
          setMounted(false);
          hideOverlay();
          hasShownOverlay.current = false;
        });
      }
    }
  }, [isOpen]); // Run when `isOpen` changes

  if (!mounted) return null; // Don't render if it shouldn't be shown

  return (
    <div
      id={id}
      ref={ref}
      className={clsx(
        containerClasses,
        "pointer-events-auto relative mx-auto w-full rounded-tight text-step--1 shadow-overlay",
      )}
      style={{ opacity: 0 }}
    >
      {theme === "plain" ? (
        <div className="grid items-start gap-y-fluid-xs p-fluid-xs">
          {children}
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr]">
          <div
            className={clsx(
              iconPanelClasses,
              "overflow-hidden rounded-tl-tight rounded-bl-tight border-r",
            )}
          >
            <span
              className={clsx(
                currentTheme.icon,
                "m-fluid-2xs block h-fluid-m w-fluid-m",
              )}
            />
          </div>
          <div className="grid items-start gap-y-fluid-xs p-fluid-xs">
            {children}
          </div>
        </div>
      )}

      <button
        aria-label="hide notice"
        type="button"
        onClick={() => onClose?.()}
        className="-mt-2 -mr-2 absolute top-0 right-0 rounded-full bg-warning p-fluid-3xs text-white shadow-floated hover:cursor-pointer hover:bg-warning-shade"
      >
        <span className="icon-[tabler--eye-off] block h-4 w-4" />
      </button>
    </div>
  );
}
