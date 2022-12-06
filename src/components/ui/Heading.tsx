import { styled } from "../../theme.css";

export const Heading = styled("h3", {
  margin: 0,
  variants: {
    size: {
      lg: {
        fontSize: "$h1",
      },
      md: {
        fontSize: "$h2",
      },
      sm: {
        fontSize: "$h3",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
