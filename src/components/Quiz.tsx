import { useState } from "react";
import { QUIZ } from "../data/quiz";
import { scrollToSection } from "../lib/StateContext";

function rating(score: number, total: number) {
  if (score === total) return { title: "Code 4: all clear", note: "Perfect score. You know the stop better than most drivers." };
  if (score >= total - 3) return { title: "Mostly clear", note: "Solid. Review the questions you missed and you're set." };
  return { title: "Request backup", note: "Run the crash course again, then come back and retake it." };
}

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ[idx];

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 < QUIZ.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  }
  function restart() {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  const r = rating(score, QUIZ.length);

  return (
    <section className="section" id="quiz" aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Quiz · {QUIZ.length} questions</span>
          <h2 id="quiz-title">Check yourself</h2>
          <p>Ten questions on the rules that apply in every state. Each answer explains the law behind it.</p>
        </div>
        <div className="quiz">
          {!finished ? (
            <div className="quiz-card">
              <div className="quiz-meta">
                <span>
                  Question {idx + 1} of {QUIZ.length}
                </span>
                <span>Score {score}</span>
              </div>
              <h3 className="quiz-q">{q.q}</h3>
              <div className="choices" role="group" aria-label="Answers">
                {q.options.map((o, i) => {
                  const state =
                    picked === null ? "" : i === q.answer ? " chosen verdict-good" : i === picked ? " chosen verdict-bad" : "";
                  return (
                    <button key={o} className={`choice${state}`} onClick={() => choose(i)} disabled={picked !== null && !state}>
                      <span className="key" aria-hidden="true">
                        {"ABC"[i]}
                      </span>
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <div className={`feedback verdict-${picked === q.answer ? "good" : "bad"}`} aria-live="polite">
                  <span className="verdict-tag">{picked === q.answer ? "Correct" : "Not quite"}</span>
                  <p>{q.why}</p>
                  <div className="feedback-actions">
                    <button className="btn btn-primary btn-small" onClick={next}>
                      {idx + 1 < QUIZ.length ? "Next question" : "See your score"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-card score" aria-live="polite">
              <span className="score-num">
                {score}
                <small> / {QUIZ.length}</small>
              </span>
              <span className="score-title">{r.title}</span>
              <p className="muted">{r.note}</p>
              <div className="feedback-actions">
                <button className="btn btn-small" onClick={restart}>
                  Retake the quiz
                </button>
                <button className="btn btn-primary btn-small" onClick={() => scrollToSection("card")}>
                  Get your pocket card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
