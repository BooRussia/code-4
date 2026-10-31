import { useState } from "react";
import { MYTHS, type Myth } from "../data/myths";
import { useSelectedState } from "../lib/StateContext";
import { load, save } from "../lib/storage";

type Guess = "myth" | "fact" | "skip";
const KEY = "code4.myths";

function Tag({ myth, n, guess, onGuess }: { myth: Myth; n: number; guess?: Guess; onGuess: (g: Guess) => void }) {
  const { showTopic } = useSelectedState();
  const flipped = guess !== undefined;
  const right = guess === myth.verdict;
  return (
    <div className={`tag${flipped ? " flipped" : ""}`}>
      <div className="tag-inner">
        <div className="tag-face tag-front" aria-hidden={flipped}>
          <div className="tag-head">
            <span>Evidence</span>
            <span>No. {String(n).padStart(3, "0")}</span>
          </div>
          <p className="tag-claim">"{myth.claim}"</p>
          <div className="tag-actions">
            <button onClick={() => onGuess("myth")} tabIndex={flipped ? -1 : 0}>
              Myth
            </button>
            <button onClick={() => onGuess("fact")} tabIndex={flipped ? -1 : 0}>
              Fact
            </button>
          </div>
          <button className="tag-skip" onClick={() => onGuess("skip")} tabIndex={flipped ? -1 : 0}>
            Just show me
          </button>
        </div>
        <div className="tag-face tag-back" aria-hidden={!flipped} aria-live="polite">
          <span className={`stamp stamp-${myth.verdict}`}>{myth.verdict === "myth" ? "MYTH" : "FACT"}</span>
          {flipped && guess !== "skip" && (
            <span className={`tag-result ${right ? "right" : "wrong"}`}>
              {right ? "You called it." : `You said ${guess}.`}
            </span>
          )}
          <p className="tag-answer">{myth.answer}</p>
          <span className="tag-source">{myth.source}</span>
          {myth.topicId && (
            <button className="linkish" onClick={() => showTopic(myth.topicId!)} tabIndex={flipped ? 0 : -1}>
              See how each state handles this
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MythDeck() {
  const [guesses, setGuesses] = useState<Record<string, Guess>>(() => load(KEY, {}));

  function guess(id: string, g: Guess) {
    const next = { ...guesses, [id]: g };
    setGuesses(next);
    save(KEY, next);
  }
  function reset() {
    setGuesses({});
    save(KEY, {});
  }

  const answered = MYTHS.filter((m) => guesses[m.id] && guesses[m.id] !== "skip");
  const right = answered.filter((m) => guesses[m.id] === m.verdict).length;

  return (
    <section className="section" id="myths" aria-labelledby="myths-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Myth or fact · {MYTHS.length} pieces of evidence</span>
          <h2 id="myths-title">What people get wrong</h2>
          <p>
            Each tag holds something people commonly believe about traffic stops. Call it a myth or a fact, then flip
            it to see what courts and statutes actually say.
          </p>
        </div>
        <div className="deck-bar" role="status">
          <span>
            <strong>{right}</strong> right of <strong>{answered.length}</strong> called
          </span>
          <span>{MYTHS.length - Object.keys(guesses).length} left</span>
          {Object.keys(guesses).length > 0 && (
            <button className="btn btn-small btn-ghost" onClick={reset}>
              Reset the deck
            </button>
          )}
        </div>
        <div className="deck">
          {MYTHS.map((m, i) => (
            <Tag key={m.id} myth={m} n={i + 1} guess={guesses[m.id]} onGuess={(g) => guess(m.id, g)} />
          ))}
        </div>
      </div>
    </section>
  );
}
