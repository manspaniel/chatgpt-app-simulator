import { styled } from "../../theme.css";
import { DefineApp } from "../panels/DefineApp";
import { SessionSettings } from "../panels/SessionSettings";
import { Heading } from "../ui/Heading";
import { VStack } from "../ui/Stack";

export default function IntroScreen() {
  return (
    <Wrapper>
      <Inner>
        <VStack gap="md">
          <Heading size="lg" as="h1">
            Welcome!
          </Heading>
          <SessionSettings />
          <DefineApp />
        </VStack>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  width: "100vw",
  minHeight: "100vh",
  padding: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Inner = styled("div", {
  width: 500,
  maxWidth: "100%",
});
