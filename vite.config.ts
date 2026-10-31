import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` makes a normal static site in dist/.
// `npm run build:artifact` makes one self-contained HTML file for a claude.ai artifact,
// where location access is blocked, so the "Use my location" button is turned off.
export default defineConfig(({ mode }) => {
  const artifact = mode === "artifact";
  return {
    base: "./",
    plugins: [react(), ...(artifact ? [viteSingleFile()] : [])],
    define: {
      __ARTIFACT__: JSON.stringify(artifact),
    },
    build: {
      outDir: artifact ? "dist-artifact" : "dist",
      emptyOutDir: true,
    },
  };
});
