import { keyframes, styled } from "../../theme.css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const Spinner = styled("div", {
  $$size: "20px",
  width: "$$size",
  height: "$$size",
  borderRadius: "300px",
  border: "3px solid transparent",
  borderTopColor: "currentColor",
  animation: `${spin} 1s linear infinite`,
});
