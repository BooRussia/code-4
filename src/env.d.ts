/// <reference types="vite/client" />

// Set in vite.config.ts: true for the claude.ai artifact build.
declare const __ARTIFACT__: boolean;

interface ClaudeDownloads {
  save(request: { filename: string; data: string | Blob }): Promise<{ status: "saved" | "delivered" }>;
}

interface Window {
  claude?: { use(name: "downloads"): Promise<ClaudeDownloads | null> };
}
