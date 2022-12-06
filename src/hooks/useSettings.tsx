import create from "zustand";
import { persist } from "zustand/middleware";

type Conversation = {
  id: string;
  log: any;
  lastText: any;
};

type Store = {
  sessionID: string;
  conversations: Conversation[];
  lastAppDescription?: string;
  set: (partial: Partial<Store>) => void;
  addConvo: (id: string) => void;
  backupConvo: (id: string, log: any, lastText: any) => void;
  getBackup: (id: string) => Conversation | undefined;
};

export const useSettings = create<Store>()(
  persist(
    (set, get) => ({
      sessionID: "",
      conversations: [] as Conversation[],
      lastAppDescription: "",
      addConvo: (id: string) => {
        set((state) => ({
          conversations: [
            ...state.conversations,
            { id, log: [], lastText: "" },
          ],
        }));
      },
      backupConvo(id: string, log: any, lastText: any) {
        console.log("Backing up", id, log, lastText);
        set((state) => ({
          conversations: [
            ...state.conversations.filter((convo) => convo.id !== id),
            { id, log, lastText },
          ],
        }));
      },
      getBackup(id) {
        const backup = get().conversations.find((convo) => convo.id === id);
        console.log("Getting backup for", id, backup);
        return backup;
      },
      set(partial) {
        set(partial);
      },
    }),
    {
      name: "settings",
    }
  )
);
