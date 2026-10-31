import { useEffect, useRef, useState } from "react";
import { COURSE, type CourseStep } from "../data/course";
import { CASE_BY_ID } from "../data/cases";
import StateCallout from "./StateCallout";

function CaseChips({ ids, stepId }: { ids: string[]; stepId: string }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!ids.length) return null;
  const c = open ? CASE_BY_ID[open] : null;
  return (
    <div className="cases">
      <span className="cases-label">Key rulings</span>
      {ids.map((id) => {
        const k = CASE_BY_ID[id];
        return (
          <button
            key={id}
            className="case-chip"
            aria-expanded={open === id}
            aria-controls={`case-pop-${stepId}`}
            onClick={() => setOpen(open === id ? null : id)}
          >
            {k.short ?? k.name} ({k.year})
          </button>
        );
      })}
      {c && (
        <div className="case-pop" id={`case-pop-${stepId}`} role="region" aria-label={c.name}>
          <strong>{c.name}</strong>
          <span>{c.holding}</span>
          <span className="cite">
            {c.cite} ({c.year}) ·{" "}
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              Read the opinion
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

function Step({ step, n }: { step: CourseStep; n: number }) {
  return (
    <article className="step" id={`step-${step.id}`} aria-labelledby={`step-${step.id}-title`}>
      <div className="mile" aria-hidden="true">
        <small>MILE</small>
        <strong>{n}</strong>
      </div>
      <div className="step-body">
        <h3 id={`step-${step.id}-title`}>
          <span className="sr-only">Step {n}: </span>
          {step.title}
        </h3>
        <p className="step-lede">{step.lede}</p>
        <div className="rules">
          <div className="rule rule-must">
            <h4>You must</h4>
            <ul>{step.must.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="rule rule-may">
            <h4>You may</h4>
            <ul>{step.may.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="rule rule-smart">
            <h4>Smart move</h4>
            <ul>{step.smart.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <details className="officer">
          <summary>
            <span className="rec" aria-hidden="true" />
            Officer's view
            <span className="chev" aria-hidden="true">▾</span>
          </summary>
          <p className="officer-body">{step.officer}</p>
        </details>
        <CaseChips ids={step.cases} stepId={step.id} />
        {step.topics.length > 0 && (
          <div className="callouts">
            {step.topics.map((t) => (
              <StateCallout key={t} topicId={t} idSuffix={step.id} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function CrashCourse() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // The lane line fills as you scroll through the course.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      const p = (mid - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section" id="course" aria-labelledby="course-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Crash course · 9 stops along the way</span>
          <h2 id="course-title">The stop, step by step</h2>
          <p>
            Every stage of a traffic stop, in order. Each one separates what the law requires, what you're allowed to
            do, and what keeps things calm. Where states differ, your state's rule appears inline.
          </p>
        </div>
        <div className="course" ref={ref}>
          <div className="course-rail" aria-hidden="true">
            <div className="course-rail-fill" style={{ height: `${progress * 100}%` }} />
          </div>
          {COURSE.map((s, i) => (
            <Step key={s.id} step={s} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
