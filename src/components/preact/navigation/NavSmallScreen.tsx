import clsx from "clsx";
import { useEffect, useRef, useState } from "preact/hooks";
import type { NavItem } from "~/data/navigation";
import AccordianMenu from "./AccordianMenu";

interface Props {
  items: NavItem[];
  currentPath?: string;
  className?: string;
}

export default function NavSmallScreen({
  items,
  currentPath = "/",
  className,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        openIndex !== null &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openIndex]);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between open and close
  };

  return (
    <nav className={clsx(className)}>
      <ul
        ref={menuRef}
        className="grid grid-flow-row grid-cols-1 gap-fluid-s self-end"
      >
        {items.map((item, index) => {
          const isActive =
            currentPath === item.url || currentPath.includes(item.url);
          const isOpen = openIndex === index;

          // Generate a stable ID for the dropdown based on the item's URL or index
          const dropdownId = `dropdown-menu-${item.url}`;

          return (
            <li key={item.url} className="relative">
              <div className="flex items-center justify-between gap-x-fluid-m lg:justify-start">
                <a
                  href={item.url}
                  className={`inline-block py-0 font-black font-display text-step-6/none uppercase tracking-tight hover:text-content-light focus:text-content-light ${isActive ? "text-content-dark" : "text-black"}`}
                >
                  {item.label}
                </a>

                {item.children?.length && (
                  <button
                    title="Toggle menu"
                    type="button"
                    onClick={() => toggleDropdown(index)}
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={dropdownId} // Set aria-controls to the generated dropdownId
                    className="flex items-center justify-center rounded-full p-0 text-content-dark hover:cursor-pointer hover:text-content-light focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-inset"
                  >
                    <span
                      className={`i-hugeicons-plus-sign-circle block size-fluid-m transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    />
                  </button>
                )}
              </div>
              {item.children?.length && (
                <AccordianMenu
                  items={item.children}
                  currentPath={currentPath}
                  isOpen={isOpen}
                  dropdownId={dropdownId} // Pass the stable ID down to DropdownMenu
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
