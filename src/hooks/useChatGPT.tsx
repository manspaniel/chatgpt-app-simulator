import { useEffect, useMemo, useState } from "react";
import { ChatGPTAPI } from "../chatgpt/chatgpt-api";
import { useSettings } from "./useSettings";
import { v4 as uuidv4 } from "uuid";

type LogEntry = {
  type: "prompt" | "action" | "input" | "output";
  text: string;
  id?: string;
  realID?: string;
  loading?: boolean;
};

export function useChatGPT(_conversationID?: string) {
  const token = useSettings((settings) => settings.sessionID);
  const chat = useMemo(
    () =>
      new ChatGPTAPI({
        sessionToken: token,
      }),
    []
  );

  const [status, setStatus] = useState<"ready" | "loading" | "error">();
  const [log, setLog] = useState<LogEntry[]>([]);
  const [lastMessage, setLastMessage] = useState("");
  const [conversationID, setConversationID] = useState(_conversationID);

  // Backup and restore
  const backupConvo = useSettings((settings) => settings.backupConvo);
  const getBackup = useSettings((settings) => settings.getBackup);

  // Restore a backup
  useEffect(() => {
    if (conversationID) {
      const backup = getBackup(conversationID);
      if (backup && backup.lastText) {
        setLog(backup.log);
        setLastMessage(backup.lastText);
      }
    }
  }, [conversationID]);

  useEffect(() => {
    // Save a backup
    if (lastMessage && conversationID) {
      backupConvo(conversationID, log, lastMessage);
    }
  }, [conversationID, log, lastMessage]);

  // Log management
  const addLogEntry = (entry: LogEntry) => {
    setLog((log) => [...log, entry]);
  };

  const updateLogEntry = (id: string, data: Partial<LogEntry>) => {
    setLog((log) =>
      log.map((entry) => {
        if (entry.id === id) {
          return {
            ...entry,
            ...data,
          };
        }
        return entry;
      })
    );
  };

  return {
    chat,
    status,
    log,
    lastMessage,
    conversationID,
    /** Send a new message */
    async sendMessage(type: "prompt" | "action" | "input", text: string) {
      setStatus("loading");
      const parentID = log[log.length - 1]?.realID;
      addLogEntry({ type, text, id: uuidv4() });
      try {
        const responseID = uuidv4();
        addLogEntry({
          type: "output",
          text: "",
          id: responseID,
          loading: true,
        });
        const result = await chat.sendMessage(text, {
          conversationId: conversationID || undefined,
          parentMessageId: parentID || conversationID,
          messageId: uuidv4(),
          onProgress(partialResponse) {
            updateLogEntry(responseID, {
              text: partialResponse.messageText,
              realID: partialResponse.messageId,
            });
          },
        });
        updateLogEntry(responseID, {
          text: result.messageText,
          realID: result.messageId,
          loading: false,
        });
        setLastMessage(result.messageText);
        setStatus("ready");
        if (result.conversationId) {
          setConversationID(result.conversationId);
        }
      } catch (err) {
        setStatus("error");
      }
    },
    /** Update a previously-sent message */
    async updateMessage(id: string, text: string) {
      const index = log.findIndex((entry) => entry.id === id);
      const prev = log[index - 1];
      const parentID = prev?.realID;
      setStatus("loading");
      setLog((log) => {
        const index = log.findIndex((entry) => entry.id === id);
        return log.slice(0, index + 1).map((entry) => {
          if (entry.id === id) {
            return {
              ...entry,
              text,
            };
          }
          return entry;
        });
      });
      try {
        const responseID = uuidv4();
        addLogEntry({
          type: "output",
          text: "",
          id: responseID,
          loading: true,
        });
        const result = await chat.sendMessage(text, {
          conversationId: conversationID,
          parentMessageId: parentID,
          messageId: id,
          onProgress(partialResponse) {
            updateLogEntry(responseID, {
              text: partialResponse.messageText,
              realID: partialResponse.messageId,
            });
          },
        });
        updateLogEntry(responseID, {
          text: result.messageText,
          realID: result.messageId,
          loading: false,
        });
        setLastMessage(result.messageText);
        setStatus("ready");
      } catch (err) {
        setStatus("error");
      }
    },
  };
}
