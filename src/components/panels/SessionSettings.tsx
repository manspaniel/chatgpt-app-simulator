import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { useValidateToken } from "../../hooks/useValidateToken";
import { cardStyle, styled } from "../../theme.css";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Heading } from "../ui/Heading";
import { VSpace } from "../ui/Spacer";
import { VStack } from "../ui/Stack";
import { TextArea } from "../ui/TextArea";

export function SessionSettings() {
  const currentSessionKey = useSettings((state) => state.sessionID);
  const updateSettings = useSettings((state) => state.set);

  const [isSet, setIsSet] = useState(!!currentSessionKey);
  const [enteredValue, setEnteredValue] = useState(currentSessionKey);

  const tokenValidator = useValidateToken();

  useEffect(() => {
    if (currentSessionKey) {
      tokenValidator.validate(currentSessionKey);
    }
  }, []);

  return (
    <Wrapper>
      <VStack gap="md">
        <Heading size="sm">Session Token</Heading>
        <>
          {tokenValidator.status === "invalid" ? (
            <ErrorMessage>Your token was invalid</ErrorMessage>
          ) : tokenValidator.status === "valid" ? (
            <p>Your token appears to be valid!</p>
          ) : tokenValidator.status === "validating" ? (
            <p>Please wait while your token is validated...</p>
          ) : null}
        </>
        {isSet ? (
          <>
            <Button onClick={() => setIsSet(false)}>Change Token</Button>
          </>
        ) : (
          <>
            <p>You'll need to paste in your ChatGPT session cookie.</p>
            <OrderedList>
              <li>In Chrome, Inspect Element</li>
              <li>Open the 'Application' tab</li>
              <li>Select 'Cookies' and 'https://chat.openai.com'</li>
              <li>Copy the '__Secure-next-auth.session-token' cookie value.</li>
            </OrderedList>
            <img src="/help.png" />
            <TextArea
              value={enteredValue}
              onChange={(e) => setEnteredValue(e.currentTarget.value)}
              placeholder="Paste your session cookie here"
            />
            <Button
              disabled={!enteredValue}
              onClick={() => {
                if (enteredValue) {
                  tokenValidator.validate(enteredValue).then((valid) => {
                    if (valid) {
                      setIsSet(true);
                      updateSettings({ sessionID: enteredValue });
                    }
                  });
                }
              }}
            >
              Save Token
            </Button>
          </>
        )}
      </VStack>
    </Wrapper>
  );
}

const Wrapper = styled("div", cardStyle, {});

const OrderedList = styled("ol", {
  listStyle: "decimal",
  paddingLeft: 40,
});
