import { styled } from "../../theme.css";

type Props = {
  text: string;
};

export function MarkdownRenderer(props: Props) {
  return <Display>{props.text}</Display>;
}

const Display = styled("div", {
  whiteSpace: "pre-wrap",
});
