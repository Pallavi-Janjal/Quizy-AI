"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convexUrl) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 m-4">
        <p className="font-bold">Convex URL Missing</p>
        <p className="text-sm">Please run <code>npx convex dev</code> or set <code>NEXT_PUBLIC_CONVEX_URL</code> in <code>.env.local</code></p>
        <div className="mt-4">{children}</div>
      </div>
    );
  }

  const convex = new ConvexReactClient(convexUrl);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
