import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { setBannerPosition, bannerPosition } from "~/stores/layersStore";
import HamburgerButton from "~/components/preact/navigation/HamburgerButton";
import ThemeIcon from "~/components/preact/ThemeIcon";
import BypeteBrand from "~/assets/svg/bypete__header.svg?react";

interface Props {
  currentPath?: string;
}

type BannerPosition = "start" | "up" | "down";

export default function Header() {
  const $bannerPosition = useStore(bannerPosition);
  const bannerRef = useRef<HTMLDivElement>(null);
  const brandLogoRef = useRef<HTMLElement>(null);
  const whiteLogoRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-banner", $bannerPosition);
  }, [$bannerPosition]);

  return (
    <div
      ref={bannerRef}
      class="fixed top-0 left-0 z-(--z-banner) flex w-full flex-row items-center justify-between border-line border-b bg-surface-raised  px-fluid-m py-fluid-2xs backdrop-blur-[10px] md:bg-surface/10 md:h-full md:w-fluid-xl md:flex-col md:border-r md:border-b-0 md:px-0 md:pt-fluid-l md:pb-fluid-l"
    >
      <div class=" flex flex-row gap-fluid-s">
        <HamburgerButton />
        <a href="/" aria-label="byPete - home" class="h-fluid-m md:hidden">
          <BypeteBrand
            class="h-fluid-m w-auto"
            title="byPete logo in brand colour"
          />
        </a>
      </div>
      <ThemeIcon />
    </div>
  );
}
