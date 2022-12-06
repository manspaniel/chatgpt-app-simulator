import { styled } from "../../theme.css";
import JsxParser from "react-jsx-parser";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  jsxCode: string;
  onAction: (action: string) => void;
};

const JSXDisplay = JsxParser as any;

function extractJSX(text: string) {
  return "<div>" + text.replace(/(^```|```$)/g, "") + "</div>";
}

export function AppDisplay({ onAction, jsxCode }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const el = ref.current;
  //   if (el) {
  //     const buttons = el.querySelectorAll("button");
  //     console.log("Buttons are", buttons);
  //     buttons?.forEach((button) => {
  //       button.addEventListener("click", () => {
  //         props.onAction(`User clicked button "${button.textContent}"`);
  //       });
  //     });
  //   }
  // }, [props.jsxCode]);

  const submitForm = (form: HTMLFormElement, buttonLabel?: string) => {
    const formData = new FormData(form);
    const formText = [];
    for (const [key, value] of formData.entries()) {
      formText.push(`${key} = ${value}`);
    }
    let prompt = buttonLabel
      ? `User submitted a form`
      : `User submitted a form by clicking the "${buttonLabel}" button`;
    if (formText.length) {
      prompt += ` with the following values:\n${formText.join("\n")}`;
    }
    onAction(prompt);
  };

  const button = useMemo(
    () => (props: any) => {
      return (
        <button
          {...props}
          onClick={(e) => {
            e.preventDefault();
            const form = e.currentTarget.closest("form");
            if (form) {
              submitForm(form, e.currentTarget.textContent?.trim()!);
            } else {
              onAction(
                `User clicked button "${e.currentTarget.textContent?.trim()}"`
              );
            }
          }}
        />
      );
    },
    [onAction]
  );

  const form = useMemo(
    () => (props: any) => {
      return (
        <form
          {...props}
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(e.currentTarget);
          }}
        />
      );
    },
    [onAction]
  );

  if (!jsxCode) return null;

  return (
    <Wrapper ref={ref} key={jsxCode}>
      <JSXDisplay
        jsx={extractJSX(jsxCode)}
        components={{
          button,
          form,
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled("div", {
  border: "1px dashed $fg",
  maxWidth: "95%",
});
