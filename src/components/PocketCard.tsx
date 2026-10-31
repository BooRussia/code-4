import { useEffect, useState } from "react";
import { entryFor, formatDate, lastVerified } from "../data/stateData";
import { STATE_BY_CODE } from "../data/states";
import { statusDef, TOPICS } from "../data/topics";
import { useSelectedState } from "../lib/StateContext";
import StateSelect from "./StateSelect";

const EVERYWHERE = [
  "Pull over safely, engine off, hands on the wheel.",
  "Show license, registration and insurance when asked.",
  "Say where things are before you reach for them.",
  "You can stay silent. Say it: \"I'm going to remain silent.\"",
  "You can refuse a search: \"I don't consent to searches.\"",
  "Never resist, argue or drive off. Challenge it later.",
  "When it seems over, ask: \"Am I free to go?\"",
  "Afterward, write down names, badge numbers and times.",
];

function rowsFor(code: string) {
  return TOPICS.map((t) => {
    const e = entryFor(t.id, code);
    return { topic: t.short, value: statusDef(t.id, e?.status)?.label ?? "Not yet researched", detail: e?.detail };
  });
}

function asText(code: string) {
  const name = STATE_BY_CODE[code].name;
  const lines = [
    `CODE 4 · ROADSIDE CARD · ${name.toUpperCase()}`,
    "",
    "EVERYWHERE",
    ...EVERYWHERE.map((l) => `- ${l}`),
    "",
    `IN ${name.toUpperCase()}`,
    ...rowsFor(code).map((r) => `- ${r.topic}: ${r.value}${r.detail ? ` (${r.detail})` : ""}`),
    "",
    "General education, not legal advice.",
  ];
  return lines.join("\n");
}

function escape(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

// A standalone page the viewer can open and print later.
function asHtml(code: string) {
  const name = escape(STATE_BY_CODE[code].name);
  const rows = rowsFor(code)
    .map((r) => `<tr><td>${escape(r.topic)}</td><td><b>${escape(r.value)}</b>${r.detail ? `<br><small>${escape(r.detail)}</small>` : ""}</td></tr>`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Code 4 roadside card: ${name}</title>
<style>body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px;margin:32px auto;padding:0 16px;color:#10131a;background:#fff}h1{font-size:28px;margin:0 0 4px}.k{font:600 12px ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#4b5466}.bar{height:8px;background:linear-gradient(90deg,#ff3b47 50%,#3a82ff 50%);border-radius:4px;margin-bottom:20px}ul{padding-left:18px;line-height:1.6}table{width:100%;border-collapse:collapse;font-size:14px}td{padding:8px 4px;border-bottom:1px dashed #b9c0cc;vertical-align:top}small{color:#4b5466}p{font-size:12px;color:#4b5466}</style></head>
<body><div class="bar"></div><div class="k">Code 4 · Roadside card</div><h1>${name}</h1>
<h2 class="k" style="margin-top:24px">Everywhere</h2><ul>${EVERYWHERE.map((l) => `<li>${escape(l)}</li>`).join("")}</ul>
<h2 class="k" style="margin-top:24px">In ${name}</h2><table>${rows}</table>
<p>State rules last checked ${escape(formatDate(lastVerified(TOPICS[0].id)))}. General education, not legal advice. Laws change; check the sources on the Code 4 site or ask a lawyer licensed in your state.</p></body></html>`;
}

export default function PocketCard() {
  const { code, setCode } = useSelectedState();
  const [msg, setMsg] = useState("");
  const [canSave, setCanSave] = useState(!__ARTIFACT__);

  useEffect(() => {
    if (!__ARTIFACT__) return;
    let live = true;
    window.claude?.use("downloads").then((d) => live && setCanSave(!!d), () => {});
    return () => {
      live = false;
    };
  }, []);

  async function copy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(asText(code));
      setMsg("Copied. Paste it into your notes app.");
    } catch {
      setMsg("Copying isn't allowed here. Select the card text and copy it yourself.");
    }
  }

  async function saveCard() {
    if (!code) return;
    const filename = `code-4-${code.toLowerCase()}-roadside-card.html`;
    const html = asHtml(code);
    try {
      if (__ARTIFACT__) {
        const dl = await window.claude?.use("downloads");
        if (!dl) throw { code: "unavailable" };
        await dl.save({ filename, data: html });
      } else {
        const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
      setMsg("Saved. Open the file any time to view or print it.");
    } catch (e) {
      const c = (e as { code?: string })?.code;
      setMsg(c === "declined" ? "Save cancelled." : "Saving isn't available here. Use Copy text instead.");
    }
  }

  const state = code ? STATE_BY_CODE[code] : null;

  return (
    <section className="section" id="card" aria-labelledby="card-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Pocket card</span>
          <h2 id="card-title">Keep it in the glove box</h2>
          <p>The rules that apply everywhere, plus your state's answers on all 10 topics, on one card.</p>
        </div>
        <div className="pocket">
          <div className="card-id">
            <div className="card-id-head">
              <div>
                <div className="kicker">Code 4 · Roadside card</div>
                <h3>{state ? state.name : "Pick your state"}</h3>
              </div>
              <span className="kicker">Checked {formatDate(lastVerified(TOPICS[0].id)) || "—"}</span>
            </div>
            <div className="card-cols">
              <div>
                <h4>Everywhere</h4>
                <ul>
                  {EVERYWHERE.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>{state ? `In ${state.name}` : "In your state"}</h4>
                {code ? (
                  <div className="card-rows">
                    {rowsFor(code).map((r) => (
                      <div className="card-row" key={r.topic}>
                        <span>{r.topic}</span>
                        <span>{r.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "var(--step--1)" }}>Choose a state to fill in its rules.</p>
                )}
              </div>
            </div>
            <div className="card-foot">General education, not legal advice.</div>
          </div>

          <div className="pocket-actions">
            {!code && <StateSelect id="card-state" value={null} onChange={setCode} label="Your state" />}
            {code && (
              <>
                <button className="btn btn-primary" onClick={copy}>
                  Copy text
                </button>
                {canSave && (
                  <button className="btn" onClick={saveCard}>
                    Save card as a file
                  </button>
                )}
              </>
            )}
            <p className="pocket-msg" role="status">
              {msg}
            </p>
            <p>Tip: a screenshot of the card works too. Laws change, so check back now and then.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
