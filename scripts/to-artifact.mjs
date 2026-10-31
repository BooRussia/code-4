// Turns the single-file Vite build into a claude.ai artifact page.
// The artifact host wraps the page in its own <html>/<head>/<body>, so this keeps
// the title, meta, font links, styles and scripts and drops the outer document tags.
// It walks the file block by block, because the inlined JS itself contains HTML
// (the pocket card template), which a plain regex over the file would trip on.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "dist-artifact/index.html"), "utf8");

const headTags = [];
const blocks = [];
let pos = html.indexOf("<head>") + "<head>".length;
const bodyStart = () => html.indexOf("<body>", pos);

for (;;) {
  const nextScript = html.indexOf("<script", pos);
  const nextStyle = html.indexOf("<style", pos);
  const candidates = [nextScript, nextStyle].filter((i) => i !== -1);
  const next = candidates.length ? Math.min(...candidates) : -1;
  const body = bodyStart();
  const textEnd = next !== -1 && (body === -1 || next < body) ? next : body;
  // Plain head markup between blocks: keep title, our meta tags and font links.
  const text = html.slice(pos, textEnd);
  headTags.push(
    ...(text.match(/<title>[\s\S]*?<\/title>|<meta name="(?:claude:viewport-fit-sides|description)"[^>]*>|<link [^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/gi) ?? []),
  );
  if (textEnd === body) break;
  const tag = next === nextScript ? "script" : "style";
  const end = html.indexOf(`</${tag}>`, next) + `</${tag}>`.length;
  blocks.push(html.slice(next, end));
  pos = end;
}

const bodyOpen = html.indexOf("<body>", pos) + "<body>".length;
const bodyClose = html.lastIndexOf("</body>");
const body = html.slice(bodyOpen, bodyClose).trim();

const styles = blocks.filter((b) => b.startsWith("<style"));
const scripts = blocks.filter((b) => b.startsWith("<script"));
const out = [...headTags, ...styles, body, ...scripts].join("\n");

mkdirSync(join(root, "artifact"), { recursive: true });
writeFileSync(join(root, "artifact/code-4.html"), out);
console.log(`artifact/code-4.html written (${(out.length / 1024).toFixed(0)} KB, ${scripts.length} script, ${styles.length} style)`);
