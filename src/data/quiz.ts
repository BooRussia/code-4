export interface Question {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export const QUIZ: Question[] = [
  {
    q: "Does an officer have to tell you why you were stopped before asking for your license?",
    options: [
      "Yes, in every state",
      "Not under federal law, though a few states require it",
      "Only if you ask twice",
    ],
    answer: 1,
    why: "There's no federal requirement. A few states, like California, have added one, and you still have to hand over your license.",
  },
  {
    q: "During a routine stop, can the officer order you out of the car?",
    options: ["Only with probable cause", "Only if you're the driver", "Yes, driver and passengers"],
    answer: 2,
    why: "Pennsylvania v. Mimms covers drivers, and Maryland v. Wilson covers passengers.",
  },
  {
    q: "What does your state's implied consent law cover?",
    options: [
      "Showing your license on demand",
      "Breath, blood or urine tests after a DUI arrest",
      "Letting police search your car",
    ],
    answer: 1,
    why: "Implied consent is about chemical testing for impaired driving. The duty to show a license comes from a separate part of the vehicle code.",
  },
  {
    q: "Do officers have to read you Miranda rights during a traffic stop?",
    options: [
      "Yes, before any question",
      "Only if you ask for them",
      "Not for routine roadside questions",
    ],
    answer: 2,
    why: "Miranda applies to questioning in custody. A routine stop isn't custody (Berkemer v. McCarty).",
  },
  {
    q: "The officer asks, \"Mind if I search your car?\" You don't want a search. What's the best response?",
    options: [
      "\"I don't consent to searches,\" calmly, without blocking them",
      "Lock the doors",
      "Say nothing and shake your head",
    ],
    answer: 0,
    why: "A clear spoken refusal protects your rights. Never physically resist, even if you think the search is illegal.",
  },
  {
    q: "Your ticket is written. The officer wants you to wait 20 minutes for a drug dog, with no other reason. Is that allowed?",
    options: [
      "Yes, as long as it's under an hour",
      "No, not without reasonable suspicion",
      "Yes, dog sniffs aren't searches",
    ],
    answer: 1,
    why: "A sniff during the stop is fine (Illinois v. Caballes), but extending the stop for one needs reasonable suspicion (Rodriguez v. United States).",
  },
  {
    q: "After arresting you, can police look through your phone without a warrant?",
    options: ["Yes, incident to arrest", "Generally no", "Only if it's unlocked"],
    answer: 1,
    why: "Riley v. California: police generally need a warrant to search a phone's contents.",
  },
  {
    q: "Is it generally legal to openly record an officer during your traffic stop?",
    options: [
      "No, you need the officer's permission",
      "Yes, as long as you don't interfere",
      "Only from outside the car",
    ],
    answer: 1,
    why: "Every federal appeals court that has ruled on it says it's protected. Some states regulate secret audio or how close you can get.",
  },
  {
    q: "Can officers lie to you during questioning?",
    options: ["Yes, courts generally allow it", "No, never", "Only about the evidence"],
    answer: 0,
    why: "Frazier v. Cupp: deception doesn't automatically make a statement involuntary.",
  },
  {
    q: "Does signing a traffic ticket mean you admit guilt?",
    options: [
      "Yes, it's a plea",
      "No, it's usually a promise to appear or respond",
      "Only for speeding tickets",
    ],
    answer: 1,
    why: "Signing isn't an admission. In some states refusing to sign can get you arrested.",
  },
];

export interface Term {
  term: string;
  def: string;
}

export const GLOSSARY: Term[] = [
  { term: "Reasonable suspicion", def: "Specific facts that suggest a crime or violation is happening. Enough to stop you briefly, but not for a full search. If the officer reasonably believes you're armed and dangerous, it can allow a weapons pat-down and a check of the car's passenger area." },
  { term: "Probable cause", def: "A fair probability that evidence of a crime is present. Needed to arrest you or search your car without consent." },
  { term: "Automobile exception", def: "The rule that police can search a car without a warrant when they have probable cause, because cars can drive away." },
  { term: "Consent search", def: "A search you agree to. It needs no warrant or probable cause, which is why officers ask." },
  { term: "Implied consent", def: "By driving, you're treated as agreeing to chemical tests for alcohol or drugs after a lawful DUI arrest." },
  { term: "Stop-and-identify law", def: "A state law requiring a person detained on reasonable suspicion to give their name." },
  { term: "Custodial interrogation", def: "Questioning while you're under arrest or held like you are. This is when Miranda warnings apply." },
  { term: "Pretext stop", def: "A stop for a real violation when the officer's true interest is something else. Legal under federal law." },
  { term: "Plain view", def: "Police can seize illegal items they can see from a place they're lawfully allowed to be." },
  { term: "Citation", def: "A ticket. You're released after promising to pay or appear, instead of being taken to jail." },
  { term: "Code 4", def: "Police radio code in many agencies for \"situation under control, no further assistance needed.\"" },
];
