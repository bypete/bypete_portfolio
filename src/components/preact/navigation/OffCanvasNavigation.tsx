import { useStore } from '@nanostores/preact';
import { useEffect, useRef } from 'preact/hooks';
import { isMenuOpen, openMenu } from '~/stores/layersStore';
import { animate, type AnimationSequence } from 'motion';
import NavSmallScreen from '~/components/preact/navigation/NavSmallScreen';
import { navigation, footerNavigation } from '~/data/navigation';
import siteInfo from '~/data/site';

interface Props {
  currentPath?: string;
}

export default function OffCanvasNavigation({ currentPath = '' }: Props) {
  const year = new Date().getFullYear();
  const $MenuState = useStore(isMenuOpen);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const animationInProgress = useRef<boolean>(false);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if ($MenuState !== true && event.target === canvasRef.current) {
        openMenu(); // Open menu when #navigation (canvasRef) is focused
      }
    };
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  useEffect(() => {
    const wrapper = document.getElementById('wrapperContent');
    const html = document.documentElement;
    if (
      !navRef.current ||
      !canvasRef.current ||
      !wrapper ||
      animationInProgress.current ||
      typeof window === 'undefined'
    )
      return;
    const viewWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const sequenceIn: AnimationSequence = [
      [
        canvasRef.current,
        {
          transform:
            viewWidth <= 768 ? 'translateY(0%)' : 'translateX(0%)',
        },
        { duration: 0.75, ease: 'easeInOut' },
      ],
      [
        navRef.current,
        {
          opacity: [0, 1],
          transform:
            viewWidth <= 768
              ? [
                'translateY(calc(1 * var(--spacing-fluid-m)))',
                'translateY(0)',
              ]
              : [
                'translateX(calc(1 * var(--spacing-fluid-m)))',
                'translateX(0%)',
              ],
        },
        { at: '<', delay: 0.5, duration: 0.75, ease: 'easeInOut' },
      ],
    ];

    const sequenceOut: AnimationSequence = [
      [
        canvasRef.current,
        {
          transform:
            viewWidth <= 768
              ? 'translateY(-100%)'
              : 'translateX(-100%)',
        },
        { duration: 0.75, ease: 'easeInOut' },
      ],
    ];

    animationInProgress.current = true;
    if (typeof window === 'undefined') return; // Ensure client-side execution

    if ($MenuState) {
      animate(sequenceIn).then(() => {
        document.documentElement.style.overflow = $MenuState
          ? 'hidden'
          : '';
        animationInProgress.current = false;
      });
    } else {
      document.documentElement.style.overflow = $MenuState
        ? 'hidden'
        : '';
      animate(sequenceOut).then(() => {
        animationInProgress.current = false;
      });
    }
  }, [$MenuState]);

  return (
    <div id="navigation" tabIndex={-1}
      ref={canvasRef}
      className="transform-[translateY(-100%)] md:transform-[translateX(-100%)] z-(--z-nav) pt-headerheight px-safe-inline bg-surface not-dynamic:h-screen fixed inset-0 flex h-dvh w-full overflow-y-scroll"
    >
      <div

        ref={navRef}
        class="gap-fluid-m pt-fluid-l text-content grid w-full grid-rows-[1fr_auto]"
      >
        <nav>
          <NavSmallScreen
            items={navigation}
            currentPath={currentPath}
          />
        </nav>

        <div class="pb-fluid-l flex flex-row justify-between">
          {footerNavigation && (
            <ul class="gap-fluid-xs min-h-fluid-l flex flex-row items-center">
              {footerNavigation.map((item) => (
                <li key={item}>
                  <a
                    href={item.url}
                    class="link"
                    title={item.label}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>©{year}</li>
            </ul>
          )}
          <div class="gap-fluid-2xs min-h-fluid-l grid grid-flow-col items-center">
            {siteInfo.socials.map((channel) => (
              <a
                key={channel}
                href={`${channel.url}`}
                rel="nofollow"
                className="text-content hover:text-primary"
                title={channel.platform}
              >
                <span
                  className={`${channel.class} w-fluid-m h-fluid-m block fill-current`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
