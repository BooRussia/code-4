import { useEffect, useRef, useState } from "react";
import { SCENARIOS, type Choice, type Verdict } from "../data/scenarios";
import { load, save } from "../lib/storage";
import StateCallout from "./StateCallout";

const VERDICT_LABEL: Record<Verdict, string> = {
  good: "Good move",
  risky: "Legal, but risky",
  bad: "Bad move",
};
const KEYS = ["A", "B", "C", "D"];
const DONE_KEY = "code4.sim.done";

interface Pick {
  prompt: string;
  choice: Choice;
}

export default function Simulator() {
  const [sIdx, setSIdx] = useState(0);
  const [nIdx, setNIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [ended, setEnded] = useState(false);
  const [done, setDone] = useState<string[]>(() => load(DONE_KEY, []));
  const feedbackRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[sIdx];
  const node = scenario.nodes[nIdx];
  const choice = chosen !== null ? node.choices[chosen] : null;

  useEffect(() => {
    if (choice) feedbackRef.current?.focus({ preventScroll: true });
  }, [choice]);

  function start(i: number) {
    setSIdx(i);
    setNIdx(0);
    setChosen(null);
    setPicks([]);
    setEnded(false);
  }

  function pick(i: number) {
    setChosen(i);
    setPicks((p) => [...p, { prompt: node.officer ?? node.scene, choice: node.choices[i] }]);
  }

  function next() {
    if (nIdx + 1 < scenario.nodes.length) {
      setNIdx(nIdx + 1);
      setChosen(null);
    } else {
      setEnded(true);
      if (!done.includes(scenario.id)) {
        const d = [...done, scenario.id];
        setDone(d);
        save(DONE_KEY, d);
      }
    }
  }

  const good = picks.filter((p) => p.choice.verdict === "good").length;

  return (
    <section className="section" id="simulator" aria-labelledby="sim-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Simulator · {SCENARIOS.length} roadside scenarios</span>
          <h2 id="sim-title">What would you say?</h2>
          <p>
            Practice the moments that trip people up. Pick a response and see whether it's legal, whether it's smart,
            and what happens next. A bad move rewinds the tape so you can try again.
          </p>
        </div>

        <div className="sim">
          <div className="sim-list" role="group" aria-label="Scenarios">
            {SCENARIOS.map((s, i) => (
              <button key={s.id} className="sim-pick" aria-pressed={i === sIdx} onClick={() => start(i)}>
                <strong>{s.title}</strong>
                <span>
                  {s.role}
                  {done.includes(s.id) && <span className="done"> · Done</span>}
                </span>
              </button>
            ))}
          </div>

          <div className="stage">
            <div className="windshield">
              <div className="windshield-meta">
                <span>{scenario.role}</span>
                <strong>{scenario.title}</strong>
              </div>
              <div className="mirror" aria-hidden="true" />
            </div>

            {!ended ? (
              <div className="stage-body">
                <div className="progress-dots" aria-label={`Moment ${nIdx + 1} of ${scenario.nodes.length}`}>
                  {scenario.nodes.map((n, i) => (
                    <span key={n.id} className={i <= nIdx ? "on" : ""} />
                  ))}
                </div>
                {nIdx === 0 && <p className="scene">{scenario.setup}</p>}
                <p className="scene">{node.scene}</p>
                {node.officer && (
                  <div className="officer-line">
                    <span className="who">OFFICER</span>
                    <q>{node.officer}</q>
                  </div>
                )}
                <span className="prompt">{node.prompt}</span>
                <div className="choices">
                  {node.choices.map((c, i) => (
                    <button
                      key={c.text}
                      className={`choice${chosen === i ? ` chosen verdict-${c.verdict}` : ""}`}
                      onClick={() => pick(i)}
                      disabled={chosen !== null}
                    >
                      <span className="key" aria-hidden="true">
                        {KEYS[i]}
                      </span>
                      <span>{c.text}</span>
                    </button>
                  ))}
                </div>

                {choice && (
                  <div
                    className={`feedback verdict-${choice.verdict}`}
                    ref={feedbackRef}
                    tabIndex={-1}
                    aria-live="polite"
                  >
                    <span className="verdict-tag">{VERDICT_LABEL[choice.verdict]}</span>
                    <p>{choice.feedback}</p>
                    {node.stateTopic && <StateCallout topicId={node.stateTopic} idSuffix={`sim-${node.id}`} />}
                    <div className="feedback-actions">
                      {choice.verdict === "bad" ? (
                        <button className="btn btn-primary btn-small" onClick={() => setChosen(null)}>
                          Rewind
                        </button>
                      ) : (
                        <button className="btn btn-primary btn-small" onClick={next}>
                          {nIdx + 1 < scenario.nodes.length ? "Next" : "See how it ends"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="stage-body ending">
                <span className="ending-title">Code 4</span>
                <p className="scene">{scenario.ending}</p>
                <p className="muted">
                  {good} of {picks.length} of your choices were the strongest option.
                </p>
                <ul className="recap">
                  {picks.map((p, i) => (
                    <li key={i} className={`verdict-${p.choice.verdict}`}>
                      <span className="dot" aria-hidden="true" />
                      <span>
                        <strong>{VERDICT_LABEL[p.choice.verdict]}:</strong> {p.choice.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="feedback-actions">
                  <button className="btn btn-small" onClick={() => start(sIdx)}>
                    Run it again
                  </button>
                  <button className="btn btn-primary btn-small" onClick={() => start((sIdx + 1) % SCENARIOS.length)}>
                    Next scenario
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
