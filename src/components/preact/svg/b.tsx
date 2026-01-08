import { forwardRef } from "preact/compat";
import Logo from "~/assets/svg/b.svg?react";
import type { ComponentProps } from "preact";

type Props = ComponentProps<typeof Logo> & {
  class?: string;
};

const Doodle = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Logo
      {...props}
      ref={ref}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"

      style={{
        ...props.style,
        opacity: 0, // start hidden → will be animated in
      }}
      aria-hidden="true"
    />
  );
});

export default Doodle;