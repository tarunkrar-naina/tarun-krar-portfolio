import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-config";

interface PortfolioContextValue {
  content: PortfolioContent;
  refresh: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  content: defaultPortfolioContent,
  refresh: async () => undefined,
});

const apiUrl = `${import.meta.env.BASE_URL}api/portfolio`;

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultPortfolioContent);

  const refresh = async () => {
    try {
      const response = await fetch(apiUrl, { cache: "no-store" });
      if (!response.ok) return;
      const incoming = (await response.json()) as PortfolioContent;
      setContent(incoming);
    } catch {
      // The static defaults keep the portfolio readable if the API is temporarily unavailable.
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo(() => ({ content, refresh }), [content]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioContent() {
  return useContext(PortfolioContext);
}