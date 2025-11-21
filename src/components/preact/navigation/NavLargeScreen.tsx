import { useState, useRef, useEffect } from "preact/hooks";
import type { NavItem } from "~/data/navigation";
import MenuLink from "~/components/preact/navigation/MenuLink";
import DropdownMenu from "./DropdownMenu";

interface Props {
  items: NavItem[];
  currentPath?: string;
  isHeroDark?: boolean;
}

export default function NavLargeScreen({
  items,
  currentPath = "/",
  isHeroDark = true,
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
    <ul ref={menuRef} className="space-x-fluid-2xs flex justify-end">
      {items.map((item, index) => {
        const isActive = currentPath.includes(item.url);
        const isOpen = openIndex === index;

        // Generate a stable ID for the dropdown based on the item's URL or index
        const dropdownId = `dropdown-menu-${item.url}`;

        return (
          <li key={item.url} className="relative">
            <div className="flex items-center">
              <MenuLink
                isActive={isActive}
                url={item.url}
                className={item.children?.length ? "pr-fluid-l" : ""}
                title={item.label}
                isHeroDark={isHeroDark}
              />
              {item.children?.length && (
                <button
                  title="Expand menu"
                  type="button"
                  onClick={() => toggleDropdown(index)}
                  aria-expanded={isOpen}
                  aria-controls={dropdownId}
                  className="right-fluid-3xs size-fluid-m bg-surface-raised text-content-shout absolute flex items-center justify-center rounded-full p-0 hover:cursor-pointer focus:ring-2 focus:outline-hidden focus:ring-inset"
                >
                  <span
                    className={`i-hugeicons-arrow-down-01 size-fluid-s duration-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              )}
            </div>
            {item.children?.length && (
              <DropdownMenu
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
