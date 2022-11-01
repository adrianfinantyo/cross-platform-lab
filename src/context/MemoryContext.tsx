import React, { createContext, useCallback, useEffect, useState } from "react";
import { Storage } from "@capacitor/storage";
import { Directory, Filesystem } from "@capacitor/filesystem";

type Memory = {
  id: string;
  imagePath: string;
  title: string;
  type: "good" | "bad";
  base64Url: string;
};

export const MemoryContext = createContext<{
  memories: Memory[];
  addMemory: (path: string, title: string, type: "good" | "bad", base64Data: string) => void;
  initContext: () => void;
}>({
  memories: [],
  addMemory: () => {},
  initContext: () => {},
});

export const MemoryProvider = (props: { children: React.ReactNode }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    Storage.set({ key: "memories", value: JSON.stringify(memories) });
  }, [memories]);

  const initContext = useCallback(async () => {
    const memoriesData = await Storage.get({ key: "memories" });
    const loadedMemories: Memory[] = [];
    if (memoriesData.value) {
      const parsedMemories = JSON.parse(memoriesData.value);
      for (const storedMemory of parsedMemories) {
        const file = await Filesystem.readFile({
          path: storedMemory.imagePath,
          directory: Directory.Data,
        });
        loadedMemories.push({
          id: storedMemory.id,
          imagePath: storedMemory.imagePath,
          title: storedMemory.title,
          type: storedMemory.type,
          base64Url: "data:image/jpeg;base64," + file.data,
        });
      }
      setMemories(loadedMemories);
    }
  }, []);

  const addMemory = (path: string, title: string, type: "good" | "bad", base64Data: string) => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      imagePath: path,
      title,
      type,
      base64Url: base64Data,
    };
    setMemories([...memories, newMemory]);
  };

  const memoryContextValue = {
    memories,
    addMemory,
    initContext,
  };

  return <MemoryContext.Provider value={memoryContextValue}>{props.children}</MemoryContext.Provider>;
};
