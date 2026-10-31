import { useState } from "react";
import { GEO_AVAILABLE, LocateError, locateState } from "../lib/geo";
import { scrollToSection, useSelectedState } from "../lib/StateContext";
import { STATE_BY_CODE } from "../data/states";
import StateSelect from "./StateSelect";

export default function Hero() {
  const { code, setCode } = useSelectedState();
  const [locating, setLocating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function useLocation() {
    setLocating(true);
    setMsg(null);
    try {
      const found = await locateState();
      setCode(found);
      setMsg(`Found you in ${STATE_BY_CODE[found].name}.`);
    } catch (e) {
      setMsg(e instanceof LocateError ? e.message : "Couldn't get your location. Pick your state from the list instead.");
    } finally {
      setLocating(false);
    }
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div>
          <div className="lightbar" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <h1 id="hero-title">
            Code <span className="four">4</span>
          </h1>
          <p className="hero-tag">Know what the law actually says when the lights come on.</p>
          <p className="hero-copy">
            A crash course on U.S. traffic stops: what you must do, what you're allowed to do, and the myths that get
            people in trouble. Pick your state and its rules show up throughout the page.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => scrollToSection("course")}>
              Start the crash course
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("myths")}>
              Myth or fact?
            </button>
          </div>
        </div>

        <div className="hero-side">
          <div className="picker-card">
            <label htmlFor="hero-state">Your state</label>
            <div className="picker-row">
              <StateSelect id="hero-state" value={code} onChange={setCode} />
              {GEO_AVAILABLE && (
                <button className="btn" onClick={useLocation} disabled={locating}>
                  {locating ? "Locating…" : "Use my location"}
                </button>
              )}
            </div>
            {msg ? (
              <p className="picker-msg" role="status">
                {msg}
              </p>
            ) : (
              <p className="picker-note">
                {GEO_AVAILABLE
                  ? "Your location is matched to a state on this device and never sent anywhere."
                  : "Your choice is remembered on this device only."}
              </p>
            )}
          </div>
          <div className="radio-log mono" aria-label="Example dispatch log">
            <div>
              21:42 &nbsp;<b>UNIT 12</b> &nbsp;TRAFFIC STOP · RT 9 MILE 14
            </div>
            <div>21:44 &nbsp;<b>UNIT 12</b> &nbsp;PLATE RETURNS CLEAN</div>
            <div>
              21:50 &nbsp;<b>UNIT 12</b> &nbsp;<span className="clear">CODE 4</span> · WARNING ISSUED
            </div>
            <div className="muted" style={{ marginTop: 8 }}>
              Code 4 is police radio shorthand for "situation under control." That's how every stop should end.
            </div>
          </div>
        </div>
      </div>
      <div className="road" aria-hidden="true">
        <svg viewBox="0 0 1000 180" preserveAspectRatio="none">
          <polygon className="road-surface" points="40,180 960,180 540,0 460,0" />
          <line className="road-edge" x1="96" y1="180" x2="466" y2="0" vectorEffect="non-scaling-stroke" />
          <line className="road-edge" x1="904" y1="180" x2="534" y2="0" vectorEffect="non-scaling-stroke" />
          <line className="road-dash" x1="500" y1="0" x2="500" y2="180" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  );
}
