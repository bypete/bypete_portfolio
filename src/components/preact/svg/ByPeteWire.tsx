import { forwardRef } from "preact/compat";
import Logo from "~/assets/svg/bypete--wire.svg?react";
import type { ComponentProps } from "preact";

type Props = ComponentProps<typeof Logo> & {
  class?: string;
};

const ByPeteWire = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Logo
      {...props}
      ref={ref}
      fill="none"
      stroke="currentColor"
      strokeWidth="64"
      strokeLinecap="butt"
      strokeLinejoin="butt"

      style={{
        ...props.style,
        // opacity: 0, // start hidden → will be animated in
      }}
      aria-hidden="true"
    />
  );
});

export default ByPeteWire;