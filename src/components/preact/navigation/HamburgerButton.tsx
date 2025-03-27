import { useStore } from '@nanostores/preact';
import { isMenuOpen, toggleMenu } from '~/stores/layersStore';

interface Props {
  class?: string;
  id?: string;
}

export default function HamburgerButton({ class: className }: Props) {
  const open = useStore(isMenuOpen);
  return (
    <button
      name="menu"
      id="hamburger"
      aria-label={open ? 'Close main menu' : 'Mobile menu'}
      aria-expanded={open}
      onClick={toggleMenu}
      type="button"
      className="w-fluid-m relative grid cursor-pointer md:grid-rows-[var(--spacing-fluid-m)_var(--spacing-fluid-2xs)]"
    >
      <div class="grid w-full items-center justify-items-start gap-1 self-center">
        <span
          className={`bg-brand duration-750 h-1 w-full rounded-full  transition-all ${open ? 'translate-y-2 -rotate-45' : ''}`}
        />
        <span
          className={`bg-brand duration-750 h-1 w-3/4 rounded-full transition ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`bg-brand duration-750 h-1 w-3/4 rounded-full transition-all ${open ? 'w-full -translate-y-2 rotate-45' : ''}`}
        />
      </div>
      <span class="hidden text-center text-[8px] md:block leading-fluid-2xs">
        {open ? 'CLOSE' : 'MENU'}
      </span>
    </button>
  );
}
