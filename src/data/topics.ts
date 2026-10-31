// Tone tells the map which way a state's rule leans compared with the federal floor.
// protect: you get more protection than federal law gives
// middle:  partial, narrower, or unsettled
// baseline: the federal rule (or the most common rule) applies
// caution: more is required of you, or the penalty is heavier
export type Tone = "protect" | "middle" | "baseline" | "caution";

export const TONE_LABEL: Record<Tone, string> = {
  protect: "More protection for you",
  middle: "Partial or unsettled",
  baseline: "Federal baseline",
  caution: "More required of you",
};

export interface StatusDef {
  id: string;
  label: string;
  tone: Tone;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  short: string;
  question: string;
  federal: string;
  statuses: StatusDef[];
}

export const TOPICS: Topic[] = [
  {
    id: "reason-for-stop",
    title: "Officer must tell you why you were stopped",
    short: "Reason for stop",
    question: "Does the officer have to tell you why you were stopped before asking questions?",
    federal:
      "The U.S. Constitution doesn't require it. An officer can ask for your license before saying why. Some states have added the requirement by law.",
    statuses: [
      { id: "required", label: "Must state the reason", tone: "protect", description: "State law requires the officer to tell you the reason at the start of the stop." },
      { id: "partial", label: "Partly required", tone: "middle", description: "A narrower rule, such as only when you ask, or only for some agencies." },
      { id: "not-required", label: "Not required", tone: "baseline", description: "No state requirement. The officer doesn't have to explain first." },
    ],
  },
  {
    id: "passenger-id",
    title: "Passengers must give ID",
    short: "Passenger ID",
    question: "Does a passenger have to identify themselves when an officer asks?",
    federal:
      "There's no federal duty to carry or show ID as a passenger. States may require people who are reasonably suspected of a crime to give their name (Hiibel v. Nevada, 2004).",
    statuses: [
      { id: "stop-and-identify", label: "Stop-and-identify law", tone: "caution", description: "If the officer reasonably suspects you of a crime, you must give your name." },
      { id: "limited", label: "Limited duty", tone: "middle", description: "A narrower rule, such as only after arrest, or only lying about who you are is a crime." },
      { id: "no-duty", label: "No duty", tone: "baseline", description: "A passenger who isn't suspected of anything can politely decline." },
    ],
  },
  {
    id: "firearm-disclosure",
    title: "Telling the officer you have a gun",
    short: "Firearm disclosure",
    question: "If you're carrying a firearm, do you have to tell the officer?",
    federal:
      "There's no federal rule. Each state decides, and many rules changed as states adopted permitless carry.",
    statuses: [
      { id: "must-inform", label: "Must tell right away", tone: "caution", description: "You must tell the officer at first contact, without being asked." },
      { id: "if-asked", label: "Must tell if asked", tone: "middle", description: "You must answer truthfully or show your permit when asked." },
      { id: "no-duty", label: "No duty to bring it up", tone: "baseline", description: "No law requires you to mention it first. In many of these states, permit holders must still show the permit if an officer asks for it." },
    ],
  },
  {
    id: "recording",
    title: "Recording the stop",
    short: "Recording",
    question: "Can you record the officer during the stop, and what limits apply?",
    federal:
      "Every federal appeals court that has ruled on it says recording police doing their jobs in public is protected by the First Amendment. The Supreme Court hasn't ruled, and you still can't interfere.",
    statuses: [
      { id: "one-party", label: "One-party consent", tone: "baseline", description: "Open recording of police in public is generally lawful." },
      { id: "all-party", label: "All-party consent state", tone: "middle", description: "Open recording is generally fine; secret audio recording is riskier." },
      { id: "buffer-law", label: "Distance (buffer) law", tone: "caution", description: "A state law limits how close you can get to officers while they work." },
    ],
  },
  {
    id: "dui-checkpoints",
    title: "DUI checkpoints",
    short: "DUI checkpoints",
    question: "Can police stop every car at a sobriety checkpoint?",
    federal:
      "Yes. The Supreme Court allowed sobriety checkpoints in Michigan v. Sitz (1990). Some state constitutions or laws ban them.",
    statuses: [
      { id: "prohibited", label: "Banned", tone: "protect", description: "The state constitution or a state law prohibits checkpoints." },
      { id: "not-conducted", label: "Not used", tone: "middle", description: "Not explicitly banned, but police in the state don't run them." },
      { id: "conducted", label: "Legal and used", tone: "baseline", description: "Checkpoints are legal and police run them." },
    ],
  },
  {
    id: "marijuana-odor",
    title: "Marijuana smell as a reason to search",
    short: "Marijuana odor",
    question: "Can the smell of marijuana alone justify searching your car?",
    federal:
      "Courts traditionally treated the smell of marijuana as probable cause to search. Legal cannabis and hemp have led many states to rethink that.",
    statuses: [
      { id: "not-alone", label: "Smell alone isn't enough", tone: "protect", description: "A law or court ruling says odor by itself doesn't justify a search." },
      { id: "unsettled", label: "Unsettled", tone: "middle", description: "Courts disagree or haven't decided since legalization." },
      { id: "odor-alone-pc", label: "Smell can be enough", tone: "baseline", description: "Odor alone can still give probable cause to search." },
    ],
  },
  {
    id: "chemical-test-refusal",
    title: "Refusing a breath or blood test",
    short: "Test refusal",
    question: "What happens if you refuse the official breath or blood test after a DUI arrest?",
    federal:
      "Every state has an implied consent law. After arrest, a breath test can be required without a warrant, but a blood test generally needs a warrant or your consent (Birchfield v. North Dakota, 2016). A real emergency, like an unconscious driver, can be an exception.",
    statuses: [
      { id: "civil", label: "License penalty", tone: "baseline", description: "Your license is suspended, and the refusal can be used as evidence." },
      { id: "enhanced", label: "Heavier DUI penalty", tone: "middle", description: "Not its own crime, but it raises the penalty if you're convicted of DUI." },
      { id: "crime", label: "Refusal is a crime", tone: "caution", description: "Refusing can be charged as a separate crime." },
    ],
  },
  {
    id: "consent-search",
    title: "When they ask to search your car",
    short: "Consent searches",
    question: "Does your state protect you more than federal law when an officer asks to search?",
    federal:
      "Officers can ask to search and don't have to tell you that you can say no (Schneckloth v. Bustamonte, 1973) or that you're free to go (Ohio v. Robinette, 1996).",
    statuses: [
      { id: "extra-protection", label: "Extra protection", tone: "protect", description: "The state requires more, such as a reason to ask, or telling you that you can refuse." },
      { id: "federal-baseline", label: "Federal rules", tone: "baseline", description: "No added state protection." },
    ],
  },
  {
    id: "cite-and-release",
    title: "Ticket or jail for minor offenses",
    short: "Ticket vs. arrest",
    question: "Can you be taken to jail for a minor traffic offense?",
    federal:
      "The U.S. Constitution allows an arrest even for a fine-only offense like a seatbelt violation (Atwater v. City of Lago Vista, 2001). Many states limit it.",
    statuses: [
      { id: "cite-required", label: "Ticket required", tone: "protect", description: "State law generally requires a ticket, not an arrest, with narrow exceptions." },
      { id: "cite-default", label: "Ticket is the norm", tone: "middle", description: "Tickets are standard, but officers keep real discretion to arrest." },
      { id: "arrest-allowed", label: "Arrest allowed", tone: "baseline", description: "Officers may arrest for minor traffic offenses." },
    ],
  },
  {
    id: "digital-proof",
    title: "Insurance and license on your phone",
    short: "Digital proof",
    question: "Can you show your insurance or license on your phone?",
    federal:
      "There's no federal rule. States decide whether a digital card counts as proof at a traffic stop.",
    statuses: [
      { id: "both", label: "Insurance and license", tone: "protect", description: "Digital insurance is accepted, and so is the state's official mobile license." },
      { id: "insurance-only", label: "Insurance only", tone: "baseline", description: "Digital insurance is accepted. Carry your physical license." },
      { id: "physical-only", label: "Paper only", tone: "caution", description: "Bring physical documents." },
    ],
  },
];

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(TOPICS.map((t) => [t.id, t]));

export function statusDef(topicId: string, statusId: string | undefined): StatusDef | undefined {
  if (!statusId) return undefined;
  return TOPIC_BY_ID[topicId]?.statuses.find((s) => s.id === statusId);
}
