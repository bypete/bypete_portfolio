import { useStore } from "@nanostores/preact";
import { isMenuOpen, toggleMenu } from "~/stores/layersStore";

export default function WrapperOverlay() {
	const open = useStore(isMenuOpen);
	return (
		<button
			id="wrapperOverlay"
			name="closeMenu"
			aria-label="Close main menu"
			onClick={toggleMenu}
			type="button"
			className="w-full h-full opacity-0 hidden absolute inset-0 bg-surface-bedrock"
		/>
	);
}
