import { styled } from "../../theme.css";

export const VStack = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    gap: {
      sm: {
        gap: "$2",
      },
      md: {
        gap: "$4",
      },
      lg: {
        gap: "$5",
      },
    },
  },
});

export const HStack = styled("div", {
  display: "flex",
  variants: {
    gap: {
      sm: {
        gap: "$2",
      },
      md: {
        gap: "$4",
      },
      lg: {
        gap: "$5",
      },
    },
  },
});
