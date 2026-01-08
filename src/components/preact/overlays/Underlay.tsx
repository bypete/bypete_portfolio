import { useStore } from "@nanostores/preact";
import clsx from "clsx";
import { activeUnderlays } from "~/stores/layersStore";

interface Props {
  shade?: "dark" | "light";
}
export default function Overlay({ shade = "dark" }: Props) {
  const amount = useStore(activeUnderlays);
  const shadeColor =
    shade === "dark"
      ? "bg-surface-underlay-dark/90"
      : "bg-surface-underlay-light/90";

  return (
    <div
      id="underlay"
      className={clsx(
        shadeColor,
        "fixed inset-0 z-(--z-overlay) h-full min-h-screen bg-surface-overlay-dark/80 backdrop-blur-xs backdrop-grayscale transition-opacity duration-300",
        amount > 0 ? "" : "hidden",
      )}
    />
  );
}
