import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { cleanPrompt, EXAMPLES } from "../../prompts";
import { cardStyle, styled } from "../../theme.css";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Select } from "../ui/Select";
import { VSpace } from "../ui/Spacer";
import { VStack } from "../ui/Stack";
import { TextArea } from "../ui/TextArea";

type Props = {
  currentDescription?: string;
};

export function DefineApp(props: Props) {
  const router = useRouter();
  const hasSessionKey = useSettings((state) => !!state.sessionID);
  const [description, setDescription] = useState("");

  return (
    <Wrapper>
      <VStack gap="md">
        <Heading size="sm">Create Simulation</Heading>
        {!hasSessionKey ? (
          <>
            <p>Set up your session token before continuing</p>
          </>
        ) : (
          <>
            <p>
              Enter a verbose description for your app. You'll be able to
              further refine it as you go.
            </p>
            <Select
              onChange={(e) => {
                const exampleID = e.currentTarget
                  .value as keyof typeof EXAMPLES;
                if (exampleID in EXAMPLES) {
                  setDescription(cleanPrompt(EXAMPLES[exampleID] as string));
                }
              }}
            >
              <option value="">Choose an example</option>
              {Object.entries(EXAMPLES).map(([key, value]) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </Select>
            <TextArea
              rows={10}
              placeholder="Enter the description of your app, or choose one from the examples dropdown"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></TextArea>
            <Button
              onClick={(e) => {
                router.push(
                  "/simulation/?description=" + encodeURIComponent(description)
                );
              }}
            >
              Create App
            </Button>
          </>
        )}
      </VStack>
    </Wrapper>
  );
}

const Wrapper = styled("div", cardStyle, {});
