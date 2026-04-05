"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface DirtyCtx {
  dirty: boolean;
  setDirty: (v: boolean) => void;
}

const Ctx = createContext<DirtyCtx>({ dirty: false, setDirty: () => {} });

export function DirtyProvider({ children }: { children: React.ReactNode }) {
  const [dirty, setDirtyState] = useState(false);
  const setDirty = useCallback((v: boolean) => setDirtyState(v), []);
  return <Ctx.Provider value={{ dirty, setDirty }}>{children}</Ctx.Provider>;
}

export function useDirty() {
  return useContext(Ctx);
}
