// Checks every state data file: all 51 jurisdictions present, valid statuses,
// at least one https source per entry. Run with `npm run validate`.
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/data/states");

const CODES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");

// Status ids per topic, read from topics.ts so there's one source of truth.
const topicsSrc = readFileSync(join(root, "src/data/topics.ts"), "utf8");
const STATUS = {};
for (const block of topicsSrc.split(/\n  \{\n    id: "/).slice(1)) {
  const id = block.slice(0, block.indexOf('"'));
  STATUS[id] = [...block.matchAll(/\{ id: "([a-z-]+)", label:/g)].map((m) => m[1]);
}

let problems = 0;
const warn = (msg) => {
  problems++;
  console.log("  ✗ " + msg);
};

const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
for (const topic of Object.keys(STATUS)) {
  const file = `${topic}.json`;
  if (!files.includes(file)) {
    console.log(`\n${topic}: MISSING FILE`);
    problems++;
    continue;
  }
  let data;
  try {
    data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  } catch (e) {
    console.log(`\n${topic}: INVALID JSON (${e.message})`);
    problems++;
    continue;
  }
  const counts = {};
  const conf = { high: 0, medium: 0, low: 0 };
  console.log(`\n${topic}`);
  if (data.topic !== topic) warn(`topic field is "${data.topic}"`);
  for (const code of CODES) {
    const e = data.entries?.[code];
    if (!e) {
      warn(`${code} missing`);
      continue;
    }
    if (!STATUS[topic].includes(e.status)) warn(`${code} has unknown status "${e.status}"`);
    counts[e.status] = (counts[e.status] ?? 0) + 1;
    if (!e.summary) warn(`${code} has no summary`);
    if (!Array.isArray(e.sources) || e.sources.length === 0) warn(`${code} has no sources`);
    else for (const s of e.sources) if (!/^https?:\/\//.test(s.url ?? "")) warn(`${code} source has bad url "${s.url}"`);
    if (!(e.confidence in conf)) warn(`${code} has bad confidence "${e.confidence}"`);
    else conf[e.confidence]++;
  }
  const extra = Object.keys(data.entries ?? {}).filter((k) => !CODES.includes(k));
  if (extra.length) warn(`extra keys: ${extra.join(", ")}`);
  console.log(`  statuses: ${JSON.stringify(counts)}  confidence: ${JSON.stringify(conf)}`);
}

console.log(problems ? `\n${problems} problem(s) found.` : "\nAll state data looks complete.");
process.exit(problems ? 1 : 0);
