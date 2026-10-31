import { scrollToSection, useSelectedState } from "../lib/StateContext";
import StateSelect from "./StateSelect";

const LINKS = [
  { id: "course", label: "Crash course" },
  { id: "myths", label: "Myth or fact" },
  { id: "simulator", label: "Simulator" },
  { id: "states", label: "State laws" },
  { id: "quiz", label: "Quiz" },
  { id: "card", label: "Pocket card" },
];

export default function Nav() {
  const { code, setCode } = useSelectedState();
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Code 4, back to top">
          <span className="brand-lights" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-word">CODE 4</span>
        </button>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollToSection(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-state">
          <StateSelect id="nav-state" value={code} onChange={setCode} label="Your state" short />
        </div>
      </div>
    </header>
  );
}
