import { useStore } from "@nanostores/preact";
import { activeUnderlays } from "~/stores/layersStore";
interface Props {
	isHeroDark?: boolean;
}
export default function Overlay({ isHeroDark = false }: Props) {
	const amount = useStore(activeUnderlays);
	const shade = isHeroDark ? "bg-underlay-dark/90" : "bg-underlay-light/90";

	return (
		<div
			id="underlay"
			className={`fixed inset-0 z-(--z-underlay) h-full min-h-screen backdrop-blur-xs backdrop-grayscale transition-opacity duration-300 ${shade} ${amount > 0 ? "" : "hidden"}`}
		/>
	);
}
