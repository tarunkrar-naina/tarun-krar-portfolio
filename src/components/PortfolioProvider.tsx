import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-config";

interface PortfolioContextValue {
  content: PortfolioContent;
  refresh: () => Promise<void>;
  updateContent: (newContent: PortfolioContent) => void;
  setDraft: (draft: PortfolioContent) => void;
  draft: PortfolioContent | null;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  content: defaultPortfolioContent,
  refresh: async () => undefined,
  updateContent: () => {},
  setDraft: () => {},
  draft: null,
});

const DRAFT_STORAGE_KEY = 'portfolio_admin_draft';

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraftState] = useState<PortfolioContent | null>(null);

  const loadContent = async () => {
    try {
      const response = await fetch('/data/portfolio.json', { cache: 'no-store' });
      if (response.ok) {
        const data = (await response.json()) as PortfolioContent;
        setContent(data);
        // Load draft from localStorage if exists
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          try {
            setDraftState(JSON.parse(savedDraft));
          } catch {
            // Ignore parse errors
          }
        }
      }
    } catch {
      // Keep default content if fetch fails
    } finally {
      setLoaded(true);
    }
  };

  const refresh = async () => {
    await loadContent();
  };

  const updateContent = (newContent: PortfolioContent) => {
    setContent(newContent);
    // Clear draft after saving
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setDraftState(null);
  };

  const setDraft = (newDraft: PortfolioContent) => {
    setDraftState(newDraft);
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(newDraft));
  };

  // Load content on mount
  if (!loaded) {
    loadContent();
  }

  const value = useMemo(() => ({ content, refresh, updateContent, setDraft, draft }), [content, draft]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioContent() {
  return useContext(PortfolioContext);
}