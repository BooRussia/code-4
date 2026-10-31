import { CASES } from "../data/cases";
import { GLOSSARY } from "../data/quiz";

export default function Refs() {
  return (
    <section className="section" id="refs" aria-labelledby="refs-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Reference</span>
          <h2 id="refs-title">Terms and sources</h2>
          <p>
            The vocabulary courts use, and the Supreme Court rulings this guide is built on. Each state entry cites its
            own statute, case or agency source.
          </p>
        </div>
        <div className="refs">
          <div>
            <h3>Glossary</h3>
            <dl className="glossary">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <dt>{g.term}</dt>
                  <dd>{g.def}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>U.S. Supreme Court rulings</h3>
            <ul className="case-list">
              {CASES.map((c) => (
                <li key={c.id}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.name}
                  </a>
                  <span>
                    {c.cite} ({c.year}). {c.holding}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
