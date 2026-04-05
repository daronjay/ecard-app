"use client";

import { SessionProvider } from "next-auth/react";
import { DirtyProvider } from "@/lib/dirty-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DirtyProvider>{children}</DirtyProvider>
    </SessionProvider>
  );
}
