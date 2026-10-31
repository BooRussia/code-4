import { formatDate, lastVerified } from "../data/stateData";
import { TOPICS } from "../data/topics";

export default function Footer() {
  const checked = formatDate(lastVerified(TOPICS[0].id));
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <strong>Code 4 is general education, not legal advice.</strong>
        <p>
          Laws change, and courts in different places read them differently. For your own situation, talk to a lawyer
          licensed in your state. State entries were last checked {checked || "recently"}, and each links to its
          source so you can confirm it.
        </p>
        <p>
          Nothing here suggests resisting, fleeing or arguing with an officer. The safest way to protect your rights
          is to stay calm at the roadside and raise any problem afterward, in court or through a complaint.
        </p>
      </div>
    </footer>
  );
}
