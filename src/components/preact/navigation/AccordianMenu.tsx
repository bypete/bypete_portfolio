import clsx from "clsx";
import { animate } from "motion";
import { useEffect, useRef, useState } from "preact/hooks";

interface AccordianMenuProps {
  items: Array<{ url: string; label: string }>;
  currentPath: string;
  dropdownId: string; // Receive the dropdownId from parent
  isOpen: boolean;
}

const defaultClasses =
  "hover:text-content-light focus:text-content-light px-fluid-2xs py-0 text-step-0 block w-full focus:outline-hidden";

export default function AccordianMenu({
  items,
  currentPath,
  dropdownId,
  isOpen,
}: AccordianMenuProps) {
  const accordianElement = useRef<HTMLDivElement | null>(null);
  const [isHidden, setIsHidden] = useState(!isOpen);

  useEffect(() => {
    const dropdown = accordianElement.current;
    if (!dropdown) return;
    const animationProps = isOpen ? { height: "auto" } : { height: 0 };

    const handleAnimation = () => {
      if (dropdown) {
        animate(dropdown, animationProps, {
          duration: 0.3,
        }).then(() => {
          if (!isOpen) {
            setIsHidden(true);
          }
        });
      }
    };

    if (isOpen) {
      setIsHidden(false);
    }
    handleAnimation();
  }, [isOpen]);

  return (
    <div
      id={dropdownId} // Use the dropdownId passed from parent
      ref={accordianElement}
      className={clsx(['w-full', 'overflow-y-scroll', 'text-content', isHidden ? "pointer-events-none" : ""])}
      aria-hidden={!isOpen}
    >
      <ul class="mt-fluid-s grid grid-cols-[repeat(auto-fit,minmax(min(40ch,100%),1fr))] gap-x-fluid-m gap-y-fluid-xs">
        {items.map((child) => {
          const isActive = currentPath === child.url;
          const linkClass = clsx(
            defaultClasses,
            isActive
              ? "border-l-[3px] border-l-secondary font-semibold text-content-dark"
              : "text-black",
          );
          return (
            <li key={child.url}>
              <a
                href={child.url}
                className={linkClass}
                data-state={isActive ? "active" : undefined}
              >
                <span className="line-clamp-2" dangerouslySetInnerHTML={{ __html: child.label }} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
