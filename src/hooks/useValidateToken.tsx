import { useEffect, useState } from "react";
import { ChatGPTAPI } from "../chatgpt/chatgpt-api";
import { useSettings } from "./useSettings";

export function useValidateToken() {
  const [tokenValidationStatus, setTokenValidationStatus] = useState<
    "ready" | "validating" | "valid" | "invalid"
  >("ready");

  return {
    status: tokenValidationStatus,
    validate: async (token: string) => {
      return new Promise<boolean>((resolve) => {
        const chat = new ChatGPTAPI({
          sessionToken: token,
        });
        setTokenValidationStatus("validating");
        chat
          .refreshAccessToken()
          .then(() => {
            setTokenValidationStatus("valid");
            resolve(true);
          })
          .catch((err) => {
            console.error(err);
            setTokenValidationStatus("invalid");
            resolve(false);
          });
      });
    },
  };
}
