'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

type MagnifyContextValue = {
  isMagnifyEnabled: boolean;
  toggleMagnify: () => void;
  setMagnifyEnabled: (enabled: boolean) => void;
  heroSlideIndex: number;
  setHeroSlideIndex: Dispatch<SetStateAction<number>>;
};

const MagnifyContext = createContext<MagnifyContextValue | null>(null);

export function MagnifyProvider({ children }: { children: ReactNode }) {
  const [isMagnifyEnabled, setIsMagnifyEnabled] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const toggleMagnify = useCallback(() => {
    setIsMagnifyEnabled((previousValue) => !previousValue);
  }, []);

  const setMagnifyEnabled = useCallback((enabled: boolean) => {
    setIsMagnifyEnabled(enabled);
  }, []);

  const contextValue = useMemo(
    () => ({
      isMagnifyEnabled,
      toggleMagnify,
      setMagnifyEnabled,
      heroSlideIndex,
      setHeroSlideIndex,
    }),
    [
      heroSlideIndex,
      isMagnifyEnabled,
      setHeroSlideIndex,
      setMagnifyEnabled,
      toggleMagnify,
    ],
  );

  return (
    <MagnifyContext.Provider value={contextValue}>
      {children}
    </MagnifyContext.Provider>
  );
}

export function useMagnify() {
  const context = useContext(MagnifyContext);

  if (!context) {
    throw new Error('useMagnify must be used within a MagnifyProvider');
  }

  return context;
}
