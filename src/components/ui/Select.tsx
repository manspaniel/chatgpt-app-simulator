import { inputStyles, styled } from "../../theme.css";

export const Select = styled("select", inputStyles, {
  cursor: "pointer",
  background: `no-repeat calc(100% - 10px) center url("data:image/svg+xml,%3Csvg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z'%3E%3C/path%3E%3C/svg%3E")`,
});
