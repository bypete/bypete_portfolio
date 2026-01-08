import { forwardRef } from "preact/compat";
import Doodle from "~/assets/svg/doodle-arrow-up.svg?react";
import type { ComponentProps } from "preact";

type Props = ComponentProps<typeof Doodle> & {
  class?: string;
};

const DoodleArrow = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Doodle
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

export default DoodleArrow;