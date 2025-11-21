import { useState, useRef, useEffect } from "preact/hooks";
import type { NavItem } from "~/data/navigation";
import AccordianMenu from "./AccordianMenu";

interface Props {
  items: NavItem[];
  currentPath?: string;
}

export default function NavSmallScreen({ items, currentPath = "/" }: Props) {
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
    <ul
      ref={menuRef}
      className="grid grid-flow-row grid-cols-1 gap-fluid-m self-start"
    >
      {items.map((item, index) => {
        const isActive =
          currentPath === item.url || currentPath.includes(item.url);
        const isOpen = openIndex === index;

        // Generate a stable ID for the dropdown based on the item's URL or index
        const dropdownId = `dropdown-menu-${item.url}`;

        return (
          <li key={item.url} className="relative">
            <div className="gap-x-fluid-s flex items-center justify-between">
              <a
                href={item.url}
                className={`block w-full py-0 font-black font-display text-step-5 leading-none tracking-tight hover:text-link-hover focus:text-link-focus ${isActive ? "text-content" : "text-link"}`}
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
                  className="text-content flex items-center justify-center p-0 hover:cursor-pointer focus:ring-2 focus:ring-primary focus:outline-hidden rounded-full focus:ring-inset"
                >
                  <span
                    className={`i-hugeicons-plus-sign-circle block size-fluid-m duration-300 transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`}
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
  );
}
