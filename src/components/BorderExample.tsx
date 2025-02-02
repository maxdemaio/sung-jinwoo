import type * as React from "react";

import { px } from "@/lib/units";
import { cn, cssVars } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  asChild?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}

export function GradientBorder({
  className,
  left,
  right,
  top,
  children,
  bottom,
  asChild,
  style,
  ref,
  width = 1,
  ...props
}: GradientBorderProps) {
  const all = [left, right, top, bottom].every((x) => !x);
  const Tag = asChild ? Slot : "div";

  return (
    <Tag
      ref={ref}
      className={cn(
        "relative rounded-[inherit]",
        "before:absolute before:inset-0 before:rounded-[inherit] before:border-solid before:border-[transparent]",
        "before:pointer-events-none",
        "before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)]",
        "before:[mask-clip:content-box,no-clip]",
        "before:[mask-composite:exclude]",
        { "before:[padding-left:var(--width)]": left || all },
        { "before:[padding-right:var(--width)]": right || all },
        { "before:[padding-top:var(--width)]": top || all },
        { "before:[padding-bottom:var(--width)]": bottom || all },
        className,
      )}
      style={{ ...cssVars({ width: px(width) }), ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}