export interface CourseStep {
  id: string;
  title: string;
  lede: string;
  must: string[];
  may: string[];
  smart: string[];
  officer: string;
  cases: string[];
  topics: string[];
}

// The stop, in the order it happens. Each step separates what the law requires,
// what you're allowed to do, and what's safest.
export const COURSE: CourseStep[] = [
  {
    id: "lights",
    title: "Lights in the mirror",
    lede: "Red and blue lights behind you mean the officer wants you to stop. What you do in the next 30 seconds sets the tone.",
    must: [
      "Pull over to the right and stop as soon as it's safe. Failing to stop for police lights or a siren is an offense in every state.",
      "Signal, slow down gradually, and get fully out of traffic.",
    ],
    may: [
      "At night or on a road with no shoulder, you can turn on your hazard lights, slow down, and drive a short distance at a safe speed to a well-lit spot. Many police agencies say this is fine as long as you show you've seen them.",
    ],
    smart: [
      "Turn off the engine. At night, turn on the dome light.",
      "Roll your window down and put both hands on the wheel.",
      "Stay in the car unless you're told to get out.",
    ],
    officer:
      "The officer doesn't know who's in the car. Before walking up, they usually radio in your plate and location. A stop on a dark road is one of the most uncertain moments of their shift.",
    cases: ["prouse", "whren", "heien"],
    topics: [],
  },
  {
    id: "approach",
    title: "The walk-up",
    lede: "The officer approaches, usually from behind. Your hands and your first words matter most here.",
    must: [
      "Follow lawful orders to step out of the car or stay inside. Officers can order the driver out (Pennsylvania v. Mimms) and passengers too (Maryland v. Wilson).",
      "If your state requires it, tell the officer about a firearm in the car right away.",
    ],
    may: [
      "Calmly ask, \"Officer, why was I stopped?\"",
      "Passengers can stay quiet. They're part of the stop and can challenge it later in court (Brendlin v. California).",
    ],
    smart: [
      "Keep your hands where the officer can see them.",
      "Don't reach for anything until you've said what you're reaching for.",
    ],
    officer:
      "Officers often approach from behind the driver's door, or from the passenger side to stay out of traffic. Some touch the taillight as they pass, an old habit that leaves proof the officer was at that car.",
    cases: ["mimms", "wilson", "brendlin", "johnson"],
    topics: ["firearm-disclosure"],
  },
  {
    id: "documents",
    title: "License, registration, insurance",
    lede: "This is the part people get wrong most. You don't hand over your license because you signed something at the DMV. You do it because your state's vehicle code says drivers must.",
    must: [
      "Show your driver's license when asked. Every state requires it, nearly all require registration and proof of insurance too, and refusing can be its own offense.",
    ],
    may: [
      "Ask why you were stopped. In most states the officer doesn't have to answer before asking for your documents, and you still have to hand them over either way.",
      "Show proof of insurance on your phone in nearly every state.",
    ],
    smart: [
      "Say where your documents are before you reach: \"My license is in my wallet, in my back pocket.\"",
      "If the glove box holds something besides paperwork, mention it first.",
    ],
    officer:
      "The officer will usually run your license and plate for warrants and suspensions. Those checks are part of the stop's job (Rodriguez v. United States) and can take several minutes.",
    cases: ["rodriguez"],
    topics: ["reason-for-stop", "digital-proof"],
  },
  {
    id: "questions",
    title: "The questions",
    lede: "\"Do you know why I stopped you?\" \"Where are you headed?\" These are routine, and you don't have to answer them.",
    must: [
      "As the driver, identify yourself with your license.",
      "Passengers may have to give their name in some states if the officer reasonably suspects them of a crime.",
    ],
    may: [
      "Decline to answer questions beyond your documents: \"I'm going to remain silent. I'd rather not answer questions.\"",
      "To use your right to stay silent, say so out loud. Just staying quiet may not count (Salinas v. Texas).",
      "You won't hear Miranda warnings during routine roadside questions. They're only required once you're in custody (Berkemer v. McCarty).",
    ],
    smart: [
      "Be polite and brief. You don't have to admit the violation. \"No, officer\" is a complete answer.",
      "Never lie. Declining to answer is legal; giving false information often isn't.",
    ],
    officer:
      "Small talk is also an assessment: officers watch for nervousness, mismatched stories and odors. They're allowed to use deception in questioning (Frazier v. Cupp).",
    cases: ["berkemer", "salinas", "frazier", "hiibel"],
    topics: ["passenger-id"],
  },
  {
    id: "search",
    title: "\"Mind if I take a look?\"",
    lede: "A search request sounds casual. Saying yes gives up a constitutional right, and you're allowed to say no.",
    must: [
      "Don't physically resist or block a search, even one you think is illegal. Challenge it later in court.",
      "Step out if you're ordered to.",
    ],
    may: [
      "Say no: \"Officer, I don't consent to searches.\" Officers don't have to tell you that you can refuse (Schneckloth v. Bustamonte).",
      "Ask, \"Am I free to go?\" Officers don't have to volunteer it (Ohio v. Robinette).",
      "Refuse to unlock your phone for a search. Police generally need a warrant for its contents (Riley v. California).",
    ],
    smart: [
      "Say it once, clearly and calmly, then stay quiet.",
      "Don't open the trunk or a door yourself. That can look like consent.",
    ],
    officer:
      "With probable cause, officers can search without your consent or a warrant (the automobile exception). A dog sniff of the outside isn't a search (Illinois v. Caballes), but they can't hold you extra time to wait for one without reasonable suspicion (Rodriguez v. United States).",
    cases: ["carroll", "schneckloth", "robinette", "caballes", "rodriguez", "knowles", "riley", "gant"],
    topics: ["consent-search", "marijuana-odor"],
  },
  {
    id: "dui",
    title: "If they suspect DUI",
    lede: "DUI stops follow their own rules. The big one is implied consent, the agreement you do make by driving.",
    must: [
      "After a DUI arrest, your state's implied consent law applies. Refusing the official breath or blood test has penalties, usually an automatic license suspension.",
    ],
    may: [
      "In most states, declining roadside field sobriety tests like walking a line carries no penalty such as a license suspension. Some states let the refusal be used as evidence, and the officer can still arrest you based on other evidence.",
      "The roadside breath test (a preliminary test) and the official test after arrest are different, and the rules for refusing each vary by state.",
    ],
    smart: [
      "If you've been drinking at all, don't drive. It's the only option that always works.",
      "If you're arrested, say you want a lawyer, then stop talking. But asking for a lawyer doesn't pause a breath or blood test request: in many states, insisting on a lawyer first counts as refusing the test.",
    ],
    officer:
      "Officers look for clues like slurred speech, the smell of alcohol, and how you handle your documents. A breath test can be required after arrest without a warrant; a blood test generally needs a warrant or consent (Birchfield v. North Dakota), though a real emergency, like an unconscious driver, can be an exception (Mitchell v. Wisconsin).",
    cases: ["sitz", "birchfield"],
    topics: ["chemical-test-refusal", "dui-checkpoints"],
  },
  {
    id: "recording",
    title: "Recording the stop",
    lede: "Your phone can be your best witness, if you use it without getting in the way.",
    must: [
      "Don't interfere. Follow lawful orders and keep your hands visible.",
    ],
    may: [
      "Record openly. Every federal appeals court that has ruled on it says recording police doing their jobs in public is protected by the First Amendment. The Supreme Court hasn't ruled, and officers can set narrow limits if filming actually interferes.",
      "Passengers can record too.",
    ],
    smart: [
      "Mount your phone on the dash or set it down before the officer reaches the car.",
      "Tell the officer you're recording, calmly. Don't wave the phone near their face.",
    ],
    officer:
      "Many officers wear body cameras now, and dash cameras are common. You can often request that footage later through your state's public-records law.",
    cases: [],
    topics: ["recording"],
  },
  {
    id: "ending",
    title: "How it ends",
    lede: "A warning, a ticket, or an arrest. The officer decides, and the roadside is not where you win the argument.",
    must: [
      "If your state requires it, sign the ticket. Signing is usually a promise to appear or respond, not an admission of guilt.",
    ],
    may: [
      "Once your documents are back, ask, \"Am I free to go?\"",
      "Fight the ticket in court.",
    ],
    smart: [
      "Don't argue the ticket on the roadside.",
      "If you're arrested, say, \"I'm going to remain silent. I want a lawyer.\" Then stop talking.",
    ],
    officer:
      "The U.S. Constitution allows an arrest even for a minor offense (Atwater v. City of Lago Vista), but many states require a ticket instead for most traffic violations. A ticket alone doesn't let police search your car (Knowles v. Iowa).",
    cases: ["atwater", "knowles"],
    topics: ["cite-and-release"],
  },
  {
    id: "after",
    title: "Afterward",
    lede: "If something went wrong, this is when you deal with it, with notes, records and a lawyer.",
    must: [
      "Respond to the ticket by its deadline: pay it, or show up for court.",
    ],
    may: [
      "File a complaint with the officer's agency if you think the stop was handled wrong.",
      "Request body-camera or dash-camera footage through your state's public-records law.",
    ],
    smart: [
      "Write everything down right away: time, place, officer's name and badge number, and what was said.",
      "Talk to a lawyer if you were searched, arrested or hurt.",
    ],
    officer:
      "Stops are documented. Many states now require agencies to report traffic-stop data, including the reason for each stop and how it ended.",
    cases: [],
    topics: [],
  },
];
