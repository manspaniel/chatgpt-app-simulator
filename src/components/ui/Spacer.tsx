import { styled } from "../../theme.css";

export const VSpace = styled("div", {
  height: "$$size",
  variants: {
    size: {
      sm: {
        $$size: "$space$2",
      },
      md: {
        $$size: "$space$4",
      },
      lg: {
        $$size: "$space$5",
      },
    },
  },
});

export const HSpace = styled("div", {
  width: "$$size",
  variants: {
    size: {
      sm: {
        $$size: "$space$2",
      },
      md: {
        $$size: "$space$4",
      },
      lg: {
        $$size: "$space$5",
      },
    },
  },
});
