import { createStitches } from "@stitches/react";

export const { css, styled, globalCss, keyframes } = createStitches({
  media: {
    tablet: "(min-width: 700px)",
    laptop: "(min-width: 1200px)",
    desktop: "(min-width: 1400px)",
  },
  theme: {
    fonts: {
      body: '"Roboto Mono"',
      mono: '"Roboto Mono"',
    },
    fontSizes: {
      h1: "32px",
      h2: "24px",
      h3: "20px",
      p: "16px",
      p2: "14px",
    },
    colors: {
      fg: "#111111",
      bg: "#e0e0e0",
      panelBorder: "#000000",
      panelBG: "#ffffff",
      panelFG: "#111111",
      buttonBG: "#0000ff",
      buttonFG: "#ffffff",
      link: "#0000ff",
    },
    space: {
      0: "0px",
      1: "2px",
      2: "4px",
      3: "8px",
      4: "16px",
      5: "24px",
      6: "32px",
    },
  },
});

globalCss({
  "@import": [
    "https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap",
  ],
  body: {
    margin: 0,
    fontFamily: "$body",
    backgroundColor: "$bg",
    color: "$fg",
  },
  "p, h1, h2, h3, h4, h5, h6, ul, ol": {
    // listStyle: "none",
    // margin: 0,
    // padding: 0,
  },
  "*": {
    boxSizing: "border-box",
  },
})();

export const inputStyles = css({
  appearance: "none",
  fontFamily: "$body",
  fontSize: "$p",
  backgroundColor: "white",
  border: "2px solid black",
  borderRadius: "8px",
  padding: "$2 $3",
  outline: "0",
  "&:focus, &:focus-within": {
    borderColor: "$buttonBG",
  },
});

export const buttonStyles = css(inputStyles, {
  backgroundColor: "$buttonBG",
  borderColor: "$buttonBG",
  color: "$buttonFG",
  padding: "$2 $3",
  cursor: "pointer",
  "&:focus, &:focus-within": {
    outline: "2px solid $buttonBG",
    outlineOffset: "2px",
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.3,
    filter: "grayscale(100%)",
  },
});

export const cardStyle = css({
  backgroundColor: "$panelBG",
  color: "$panelFG",
  border: "3px solid $panelBorder",
  borderRadius: "8px",
  padding: "$4",
});
