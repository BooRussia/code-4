import type { CSSProperties } from "react";
import { entryFor, formatDate, lastVerified, type Entry } from "../data/stateData";
import { STATE_BY_CODE } from "../data/states";
import { statusDef, TOPIC_BY_ID, type Tone } from "../data/topics";
import { useSelectedState } from "../lib/StateContext";
import StateSelect from "./StateSelect";

export const TONE_VAR: Record<Tone, string> = {
  protect: "var(--tone-protect)",
  middle: "var(--tone-middle)",
  baseline: "var(--tone-baseline)",
  caution: "var(--tone-caution)",
};

export function StatusPill({ topicId, entry }: { topicId: string; entry: Entry | undefined }) {
  const def = statusDef(topicId, entry?.status);
  if (!def) return <span className="pill tone-baseline">Not yet researched</span>;
  return <span className={`pill tone-${def.tone}`}>{def.label}</span>;
}

export function EntrySources({ entry }: { entry: Entry }) {
  if (!entry.sources?.length) return null;
  return (
    <ul className="sources">
      {entry.sources.map((s) => (
        <li key={s.url + s.label}>
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ConfidenceNote({ entry }: { entry: Entry }) {
  if (entry.confidence === "high") return null;
  return (
    <span className="conf-low">
      {entry.confidence === "low" ? "Low confidence: check the source" : "Medium confidence"}
    </span>
  );
}

// Shows the reader's state rule for one topic, inline wherever it's relevant.
export default function StateCallout({ topicId, idSuffix }: { topicId: string; idSuffix: string }) {
  const { code, setCode, showTopic } = useSelectedState();
  const topic = TOPIC_BY_ID[topicId];
  const entry = entryFor(topicId, code);
  const def = statusDef(topicId, entry?.status);

  if (!code) {
    return (
      <div className="callout">
        <div className="callout-head">
          <span className="callout-state">Your state</span>
          <h4>{topic.title}</h4>
        </div>
        <div className="callout-empty">
          <p className="muted">This one varies by state. Pick yours to see its rule.</p>
          <StateSelect id={`callout-${topicId}-${idSuffix}`} value={null} onChange={setCode} label={`Your state for ${topic.short}`} />
        </div>
      </div>
    );
  }

  const style = def ? ({ "--callout-tone": TONE_VAR[def.tone] } as CSSProperties) : undefined;
  const state = STATE_BY_CODE[code];

  return (
    <div className="callout" style={style}>
      <div className="callout-head">
        <span className="callout-state">{state.name}</span>
        <h4>{topic.title}</h4>
        <StatusPill topicId={topicId} entry={entry} />
      </div>
      {entry ? (
        <>
          <p>{entry.summary}</p>
          {entry.inPractice && <p className="practice">{entry.inPractice}</p>}
          <div className="callout-foot">
            {entry.detail && <span className="mono">{entry.detail}</span>}
            <ConfidenceNote entry={entry} />
            {entry.sources?.[0] && (
              <a href={entry.sources[0].url} target="_blank" rel="noopener noreferrer">
                Source: {entry.sources[0].label}
              </a>
            )}
            <span>Checked {formatDate(lastVerified(topicId))}</span>
            <button className="linkish" onClick={() => showTopic(topicId)}>
              Compare all states
            </button>
          </div>
        </>
      ) : (
        <p className="muted">State research for this topic is still being added.</p>
      )}
    </div>
  );
}
