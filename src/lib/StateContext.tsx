import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { STATE_BY_CODE } from "../data/states";
import { TOPICS } from "../data/topics";
import { load, save } from "./storage";

interface StateChoice {
  code: string | null;
  setCode: (code: string | null) => void;
  // The topic shown on the State Explorer map. Other sections can jump to it.
  topic: string;
  setTopic: (topic: string) => void;
  showTopic: (topic: string) => void;
}

const Ctx = createContext<StateChoice>({
  code: null,
  setCode: () => {},
  topic: TOPICS[0].id,
  setTopic: () => {},
  showTopic: () => {},
});

const KEY = "code4.state";

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function StateProvider({ children }: { children: ReactNode }) {
  const [code, setCodeRaw] = useState<string | null>(() => {
    const saved = load<string | null>(KEY, null);
    return saved && STATE_BY_CODE[saved] ? saved : null;
  });
  const [topic, setTopic] = useState(TOPICS[0].id);

  const setCode = useCallback((next: string | null) => {
    setCodeRaw(next);
    save(KEY, next);
  }, []);

  const showTopic = useCallback((next: string) => {
    setTopic(next);
    scrollToSection("states");
  }, []);

  return <Ctx.Provider value={{ code, setCode, topic, setTopic, showTopic }}>{children}</Ctx.Provider>;
}

export function useSelectedState() {
  return useContext(Ctx);
}
