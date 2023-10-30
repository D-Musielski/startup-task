import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import mockData from "../mock.json";
import { StartupProgress } from "../types/dataTypes";

const StartupProgressContext = createContext<{
  startupProgress: StartupProgress;
  setStartupProgress: Dispatch<any>;
}>({
  startupProgress: { phases: [] },
  setStartupProgress: () => {},
});

export function useStartupProgressContext() {
  return useContext(StartupProgressContext);
}

export function StartupProgressProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [startupProgress, setStartupProgress] = useState(() => {
    const storedData = localStorage.getItem("startupProgress");
    return storedData ? JSON.parse(storedData) : mockData.startupProgress;
  });

  useEffect(() => {
    localStorage.setItem("startupProgress", JSON.stringify(startupProgress));
  }, [startupProgress]);

  return (
    <StartupProgressContext.Provider
      value={{ startupProgress, setStartupProgress }}
    >
      {children}
    </StartupProgressContext.Provider>
  );
}
