import { atom } from "nanostores";

// Header state

export const bannerPosition = atom("start");
export const setBannerPosition = (status) => bannerPosition.set(status);

// Overlay state
export const activeOverlays = atom(0);
export const showOverlay = () => activeOverlays.set(activeOverlays.get() + 1);
export const hideOverlay = () =>
	activeOverlays.set(Math.max(0, activeOverlays.get() - 1));

// Underlay state
export const activeUnderlays = atom(0);
export const showUnderlay = () =>
	activeUnderlays.set(activeUnderlays.get() + 1);
export const hideUnderlay = () =>
	activeUnderlays.set(Math.max(0, activeUnderlays.get() - 1));

export const isMenuOpen = atom(false);
export const toggleMenu = () => isMenuOpen.set(!isMenuOpen.get());
export const openMenu = () => isMenuOpen.set(true);
