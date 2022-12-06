import { styled } from "@stitches/react";
import { ComponentProps, useEffect, useRef } from "react";

type Props = ComponentProps<typeof Wrapper>;

export function AutoScroller(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    el.scrollTop += 1000;
  });

  return <Wrapper ref={ref} {...props} />;
}

const Wrapper = styled("div", {
  overflow: "auto",
});
