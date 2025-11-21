import { useStore } from '@nanostores/preact';
import { activeOverlays } from '~/stores/layersStore';

export default function Overlay() {
  const amount = useStore(activeOverlays);

  return (
    <div
      id="overlay"
      className={`fixed inset-0 z-(--z-overlay) h-full min-h-screen bg-surface-overlay-dark/80 backdrop-blur-xs backdrop-grayscale transition-opacity duration-300 ${amount > 0 ? '' : 'hidden'}`}
    />
  );
}

