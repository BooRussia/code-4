import { useMemo, useState } from "react";
import { entryFor, formatDate, lastVerified, STATE_DATA } from "../data/stateData";
import { SMALL_STATES, STATE_BY_CODE, STATES } from "../data/states";
import { statusDef, TOPIC_BY_ID, TOPICS, TONE_LABEL } from "../data/topics";
import { useSelectedState } from "../lib/StateContext";
import UsMap, { type MapState } from "./UsMap";
import StateSelect from "./StateSelect";
import { ConfidenceNote, EntrySources, StatusPill } from "./StateCallout";

function CompareTable({ a, b }: { a: string; b: string }) {
  const A = STATE_BY_CODE[a];
  const B = STATE_BY_CODE[b];
  return (
    <div className="compare-scroll">
      <table className="compare">
        <caption className="sr-only">
          {A.name} compared with {B.name}
        </caption>
        <thead>
          <tr>
            <th scope="col">Topic</th>
            <th scope="col">{A.name}</th>
            <th scope="col">{B.name}</th>
          </tr>
        </thead>
        <tbody>
          {TOPICS.map((t) => {
            const ea = entryFor(t.id, a);
            const eb = entryFor(t.id, b);
            const differs = ea && eb && ea.status !== eb.status;
            return (
              <tr key={t.id} className={differs ? "diff" : ""}>
                <th scope="row">{t.short}</th>
                <td>
                  <StatusPill topicId={t.id} entry={ea} />
                  {ea && <p>{ea.summary}</p>}
                </td>
                <td>
                  <StatusPill topicId={t.id} entry={eb} />
                  {eb && <p>{eb.summary}</p>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Explorer() {
  const { code, setCode, topic: topicId, setTopic, showTopic } = useSelectedState();
  const [compare, setCompare] = useState<string | null>(null);
  const topic = TOPIC_BY_ID[topicId];
  const data = STATE_DATA[topicId];

  const values = useMemo(() => {
    const out: Record<string, MapState> = {};
    for (const s of STATES) {
      const def = statusDef(topicId, data?.entries[s.code]?.status);
      out[s.code] = def ? { tone: def.tone, label: def.label } : { tone: "none", label: "Not yet researched" };
    }
    return out;
  }, [topicId, data]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const s of STATES) {
      const st = data?.entries[s.code]?.status;
      if (st) c[st] = (c[st] ?? 0) + 1;
    }
    return c;
  }, [data]);

  const entry = entryFor(topicId, code);
  const state = code ? STATE_BY_CODE[code] : null;

  return (
    <section className="section" id="states" aria-labelledby="states-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">State explorer · 50 states + DC · 10 topics</span>
          <h2 id="states-title">Where your state differs</h2>
          <p>
            Federal law sets the floor everywhere. States can add protections, or add duties. Pick a topic to color the
            map, then tap a state for its rule, how it's applied, and the source.
          </p>
        </div>

        <div className="topic-rail" role="group" aria-label="Topic">
          {TOPICS.map((t) => (
            <button key={t.id} className="topic-chip" aria-pressed={t.id === topicId} onClick={() => setTopic(t.id)}>
              {t.short}
            </button>
          ))}
        </div>

        <div className="explorer">
          <div className="map-card">
            <UsMap values={values} selected={code} onSelect={setCode} />
            <div className="small-states" role="group" aria-label="Smaller states">
              {SMALL_STATES.map((c) => (
                <button key={c} aria-pressed={code === c} onClick={() => setCode(c)} aria-label={`${STATE_BY_CODE[c].name}: ${values[c].label}`}>
                  <span className={`sw bg-${values[c].tone}`} aria-hidden="true" />
                  {c}
                </button>
              ))}
            </div>
            <div className="legend" aria-label="Legend">
              {topic.statuses.map((s) => (
                <span className="legend-item" key={s.id} title={TONE_LABEL[s.tone]}>
                  <span className={`sw bg-${s.tone}`} aria-hidden="true" />
                  {s.label}
                  <span className="count">{counts[s.id] ?? 0}</span>
                </span>
              ))}
            </div>
          </div>

          <aside className="side" aria-live="polite">
            <h3>{topic.title}</h3>
            <p className="muted">{topic.question}</p>
            <div className="federal">
              <span className="eyebrow">Federal baseline</span>
              <span>{topic.federal}</span>
            </div>
            <ul className="sources" style={{ gap: 8 }}>
              {topic.statuses.map((s) => (
                <li key={s.id} className="legend-item">
                  <span className={`sw bg-${s.tone}`} aria-hidden="true" />
                  <span>
                    <strong>{s.label}.</strong> <span className="muted">{s.description}</span>
                  </span>
                </li>
              ))}
            </ul>
            {state ? (
              <div className="side-entry">
                <span className="eyebrow" style={{ color: "var(--fog)" }}>
                  {state.name}
                </span>
                {entry ? (
                  <>
                    <h4>{statusDef(topicId, entry.status)?.label}</h4>
                    <p>{entry.summary}</p>
                    {entry.inPractice && (
                      <p className="muted">
                        <strong style={{ color: "var(--paint)" }}>In practice: </strong>
                        {entry.inPractice}
                      </p>
                    )}
                    {entry.detail && <p className="mono" style={{ fontSize: "var(--step--2)" }}>{entry.detail}</p>}
                    <EntrySources entry={entry} />
                    <p className="muted" style={{ fontSize: "var(--step--2)" }}>
                      Checked {formatDate(lastVerified(topicId))} <ConfidenceNote entry={entry} />
                    </p>
                  </>
                ) : (
                  <p className="muted">Research for this topic is still being added.</p>
                )}
              </div>
            ) : (
              <div className="side-entry">
                <p className="muted">Tap a state on the map, or choose one:</p>
                <StateSelect id="explorer-state" value={null} onChange={setCode} label="Choose a state" />
              </div>
            )}
          </aside>
        </div>

        {state && (
          <div className="state-sheet">
            <div className="state-sheet-head">
              <div>
                <span className="eyebrow">All 10 topics</span>
                <h3>{compare ? `${state.name} vs. ${STATE_BY_CODE[compare].name}` : `Everything in ${state.name}`}</h3>
              </div>
              <div className="compare-pick">
                <label htmlFor="compare-state">Compare with</label>
                <StateSelect id="compare-state" value={compare} onChange={setCompare} placeholder="No comparison" exclude={code} />
              </div>
            </div>
            {compare && compare !== code ? (
              <CompareTable a={code!} b={compare} />
            ) : (
              <div className="sheet-grid">
                {TOPICS.map((t) => {
                  const e = entryFor(t.id, code);
                  return (
                    <button key={t.id} className="sheet-item" onClick={() => showTopic(t.id)}>
                      <h4>{t.title}</h4>
                      <StatusPill topicId={t.id} entry={e} />
                      {e && <p>{e.summary}</p>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
