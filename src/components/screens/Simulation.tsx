import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSearchParam } from "react-use";
import { useChatGPT } from "../../hooks/useChatGPT";
import { useSettings } from "../../hooks/useSettings";
import { MECHANICS_DESCRIPTION } from "../../prompts";
import { cardStyle, styled } from "../../theme.css";
import { AppDisplay } from "../app/AppDisplay";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { MarkdownRenderer } from "../ui/MarkdownRenderer";
import { VSpace } from "../ui/Spacer";
import { Spinner } from "../ui/Spinner";
import { VStack } from "../ui/Stack";
import { TextArea } from "../ui/TextArea";
import { v4 as uuidv4 } from "uuid";
import { AutoScroller } from "../ui/AutoScroller";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

const PROMPT_TYPE_LABEL = {
  prompt: "Initial Prompt",
  output: "ChatGPT Response",
  input: "You Said",
  action: "UI Action",
};

export default function Simulation() {
  const router = useRouter();
  const appDescription = useSearchParam("description");
  const conversationID = useSearchParam("convoID") ?? "";
  const chat = useChatGPT(conversationID);

  if (!appDescription) {
    router.push("/");
    return null;
  }

  const [message, setMessage] = useState("");

  const myConversations = useSettings((settings) => settings.conversations);
  const addConversationID = useSettings((settings) => settings.addConvo);

  useEffect(() => {
    const isMyConversation = myConversations.some(
      (convo) => convo.id === conversationID
    );
    if (!isMyConversation || !conversationID) {
      // Build the initial prompt
      const initialPrompt = MECHANICS_DESCRIPTION.replace(
        "[APP_DESCRIPTION]",
        appDescription!
      );
      // const initialPrompt = "What is 10 + 2?";

      chat.sendMessage("prompt", initialPrompt);
    } else if (conversationID) {
      // Continue conversation
    }
  }, [appDescription, conversationID]);

  useEffect(() => {
    if (conversationID !== chat.conversationID && chat.conversationID) {
      addConversationID(chat.conversationID);
      router.replace(
        `/simulation?description=${encodeURIComponent(
          appDescription!
        )}&convoID=${encodeURIComponent(chat.conversationID)}`,
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [conversationID, chat.conversationID]);

  const submit = () => {
    if (message) {
      chat.sendMessage("input", message);
      setMessage("");
    }
    setMessage("");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Wrapper>
      <MainDisplay>
        <Header>
          <HeaderLink href="/">
            <HiOutlineHome /> Home
          </HeaderLink>
          <HeaderLink mobileOnly onClick={(e) => setSidebarOpen(!sidebarOpen)}>
            <BsArrowLeft /> Console
          </HeaderLink>
        </Header>
        {chat.status === "loading" ? (
          <LoadingOverlay>
            <Spinner />
          </LoadingOverlay>
        ) : null}
        <AppDisplay
          jsxCode={chat.lastMessage}
          onAction={(action) => {
            chat.sendMessage("action", action);
          }}
        />
      </MainDisplay>
      <SidebarWrapper open={sidebarOpen}>
        <CloseSidebar
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <GrClose /> Close Console
        </CloseSidebar>
        <ChatLog>
          {chat.log.map((message, i) => (
            <ChatMessage type={message.type} key={i}>
              <ChatMessageHeader>
                <span>{PROMPT_TYPE_LABEL[message.type]}:</span>
                {message.type !== "output" && message.id ? (
                  <a
                    onClick={() => {
                      const newText = prompt("Enter new text", message.text);
                      if (newText) {
                        chat.updateMessage(message.id!, newText);
                      }
                    }}
                  >
                    Edit
                  </a>
                ) : null}
              </ChatMessageHeader>
              <VSpace />
              <MarkdownRenderer text={message.text} />
              <div>{message.loading ? <Spinner /> : null}</div>
            </ChatMessage>
          ))}
          <VSpace size="md" />
        </ChatLog>
        <ChatBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <VStack gap="sm">
              <ChatInput
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Enter additional instructions, eg. Make the buttons blue."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    submit();
                    e.preventDefault();
                  }
                }}
              />
              <Button>Send</Button>
            </VStack>
          </form>
        </ChatBox>
      </SidebarWrapper>
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  position: "fixed",
  inset: 0,
  $$sidebarWidth: "100vw",
  overflow: "hidden",
  "@tablet": {
    $$sidebarWidth: "30vw",
  },
  "@laptop": {
    $$sidebarWidth: "30vw",
  },
  "@desktop": {
    $$sidebarWidth: "500px",
  },
});

const SidebarWrapper = styled("div", {
  position: "fixed",
  top: 0,
  left: "100%",
  height: "100%",
  background: "$bg",
  $$padding: "$space$3",
  display: "flex",
  flexDirection: "column",
  borderLeft: "2px solid black",
  zIndex: 20,
  transition: "left 0.5s",
  width: "100vw",
  "@tablet": {
    top: 0,
    width: "$$sidebarWidth",
    right: 0,
    $$padding: "$space$3",
    left: "auto",
  },
  variants: {
    open: {
      true: {
        left: 0,
        "@tablet": {
          left: "auto",
        },
      },
    },
  },
});

const ChatLog = styled(AutoScroller, {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flex: "1 1 auto",
  overflow: "auto",
  padding: "$$padding",
});

const ChatMessage = styled("div", cardStyle, {
  fontSize: 12,
  borderWidth: 2,
  padding: "$3",
  variants: {
    type: {
      prompt: {},
      action: {},
      input: {
        borderColor: "#0B66FF",
      },
      output: {
        borderColor: "#ED0BFF",
      },
    },
  },
});

const ChatMessageHeader = styled("div", {
  textTransform: "uppercase",
  fontSize: "14px",
  display: "flex",
  justifyContent: "space-between",
});

const ChatBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$$padding",
  borderTop: "2px solid black",
});

const ChatInput = styled(TextArea, {
  width: "100%",
});

const MainDisplay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@tablet": {
    right: "$$sidebarWidth",
  },
});

const LoadingOverlay = styled("div", {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Header = styled("div", {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  zIndex: 10,
  padding: "$2 $4",
  display: "flex",
  justifyContent: "space-between",
});

const HeaderLink = styled("a", {
  color: "$buttonBG",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  svg: {
    display: "block",
    marginRight: "$2",
  },
  variants: {
    mobileOnly: {
      true: {
        "@tablet": {
          display: "none",
        },
      },
    },
  },
});

const CloseSidebar = styled("div", {
  display: "flex",
  alignItems: "center",
  color: "$buttonBG",
  padding: "$$padding",
  cursor: "pointer",
  svg: {
    display: "block",
    marginRight: "$2",
    path: {
      stroke: "$buttonBG !important",
    },
  },
});
