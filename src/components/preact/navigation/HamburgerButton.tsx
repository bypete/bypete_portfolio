// HamburgerButton.tsx
import { forwardRef } from "preact/compat";
import { useStore } from '@nanostores/preact';
import { isMenuOpen, toggleMenu } from '~/stores/layersStore';
import clsx from "clsx";

interface Props {
  class?: string;
  id?: string;
}

// Use forwardRef and explicitly type the ref as HTMLButtonElement
const HamburgerButton = forwardRef<HTMLButtonElement, Props>(
  ({ class: classProp, id }, ref) => {
    const open = useStore(isMenuOpen);

    const wrapperClasses = "relative justify-self-start";

    return (
      <button
        ref={ref}
        name="menu"
        id={id ?? "hamburger"}
        aria-label={open ? 'Close main menu' : 'Mobile menu'}
        aria-expanded={open}
        onClick={toggleMenu}
        type="button"
        className={clsx(
          classProp || wrapperClasses,
          "group mask-(--squircle) mask-contain mask-bottom flex items-center p-fluid-2xs justify-center cursor-pointer bg-action h-fluid-l w-fluid-l"
        )}
      >
        <div className="relative grid w-full h-full grid-cols-1 grid-rows-1 items-center justify-items-center gap-1">
          <span
            className={clsx(
              "absolute top-0 h-1 w-full rounded-px bg-white transition-all delay-300 duration-300",
              open && "-rotate-45 -translate-y-1/2 top-1/2"
            )}
          />
          <span
            className={clsx(
              "h-1 rounded-px bg-white transition-all delay-300 duration-300 origin-center",
              open ? "delay-0 w-0 opacity-0" : "w-full"
            )}
          />
          <span
            className={clsx(
              "absolute bottom-0 h-1 w-full rounded-px bg-white transition-all delay-300 duration-300",
              open && "bottom-1/2 translate-y-1/2 rotate-45"
            )}
          />
        </div>
      </button>
    );
  }
);

HamburgerButton.displayName = "HamburgerButton"; // Optional, for debugging

export default HamburgerButton;