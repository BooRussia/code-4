export interface Myth {
  id: string;
  claim: string;
  verdict: "myth" | "fact";
  answer: string;
  source: string;
  caseId?: string;
  topicId?: string;
}

export const MYTHS: Myth[] = [
  {
    id: "reason-first",
    claim: "The officer has to tell you why you were pulled over before you hand over your license.",
    verdict: "myth",
    answer:
      "There's no federal rule requiring it. A few states, including California since 2024, require officers to state the reason early in the stop. Even there, you still hand over your license; if the officer skips the step, raise it later.",
    source: "Cal. Vehicle Code § 2806.5",
    topicId: "reason-for-stop",
  },
  {
    id: "dmv-paper",
    claim: "You agreed to show ID to police when you signed for your license at the DMV.",
    verdict: "myth",
    answer:
      "The duty to show your license comes from your state's vehicle code, not a form you signed. What you do agree to by driving is implied consent, and that covers breath and blood tests after a DUI arrest.",
    source: "State vehicle codes; implied consent laws",
    topicId: "chemical-test-refusal",
  },
  {
    id: "miranda",
    claim: "If the officer didn't read me my Miranda rights, my ticket gets thrown out.",
    verdict: "myth",
    answer:
      "Miranda warnings are only required for questioning while you're in custody. A routine traffic stop doesn't count, and even when Miranda applies, the remedy is excluding your statements, not dismissing the case.",
    source: "Berkemer v. McCarty (1984)",
    caseId: "berkemer",
  },
  {
    id: "out-of-car",
    claim: "An officer can order you out of the car, even for a minor violation.",
    verdict: "fact",
    answer:
      "During any lawful stop, the officer can order the driver out (Pennsylvania v. Mimms) and every passenger out (Maryland v. Wilson). No extra reason is needed.",
    source: "Pennsylvania v. Mimms (1977)",
    caseId: "mimms",
  },
  {
    id: "refuse-search",
    claim: "If you refuse a search, police can't search your car.",
    verdict: "myth",
    answer:
      "With probable cause, police can search a car without consent or a warrant. Refusing still matters: it means any search has to be justified in court, and your refusal can't be the reason for it.",
    source: "Carroll v. United States (1925)",
    caseId: "carroll",
    topicId: "consent-search",
  },
  {
    id: "lying",
    claim: "Police are allowed to lie to you during questioning.",
    verdict: "fact",
    answer:
      "Courts have long allowed deception in questioning, such as claiming a passenger already confessed. A growing number of states, including Illinois and California, now ban deception when police question minors in custody.",
    source: "Frazier v. Cupp (1969)",
    caseId: "frazier",
  },
  {
    id: "passenger-id",
    claim: "Passengers always have to show ID when the officer asks.",
    verdict: "myth",
    answer:
      "It depends on your state and on whether the officer reasonably suspects the passenger of a crime. In many states, a passenger who isn't suspected of anything can politely decline.",
    source: "Hiibel v. Nevada (2004); state laws",
    caseId: "hiibel",
    topicId: "passenger-id",
  },
  {
    id: "pretext",
    claim: "It's illegal to stop you for a broken taillight when the officer really wants to look for drugs.",
    verdict: "myth",
    answer:
      "Under the U.S. Constitution, a real traffic violation justifies the stop whatever the officer's motive. A few states limit pretext stops under their own constitutions.",
    source: "Whren v. United States (1996)",
    caseId: "whren",
  },
  {
    id: "traveling",
    claim: "\"I'm traveling, not driving,\" so I don't need a license.",
    verdict: "myth",
    answer:
      "Courts have rejected this \"sovereign citizen\" argument every time it's been raised. Trying it at a stop usually ends with a citation for driving without a license, or an arrest.",
    source: "Uniformly rejected by state and federal courts",
  },
  {
    id: "seatbelt-arrest",
    claim: "You can be arrested for not wearing a seatbelt.",
    verdict: "fact",
    answer:
      "The Supreme Court upheld a custodial arrest for a seatbelt violation. Whether it can happen to you depends on your state: many require a ticket instead.",
    source: "Atwater v. City of Lago Vista (2001)",
    caseId: "atwater",
    topicId: "cite-and-release",
  },
  {
    id: "dog-wait",
    claim: "An officer can keep you on the roadside as long as it takes for a drug dog to arrive.",
    verdict: "myth",
    answer:
      "Once the stop's job is done (the ticket and the routine checks), holding you longer for a dog needs reasonable suspicion of a crime.",
    source: "Rodriguez v. United States (2015)",
    caseId: "rodriguez",
  },
  {
    id: "filming",
    claim: "It's illegal to film police during a traffic stop.",
    verdict: "myth",
    answer:
      "Every federal appeals court that has ruled on it says recording police in public is protected. You can't interfere, and some states have rules on secret audio or how close you can get.",
    source: "Glik v. Cunniffe (1st Cir. 2011) and other circuits",
    topicId: "recording",
  },
  {
    id: "breathalyzer",
    claim: "If you refuse the breathalyzer, they can't prove a DUI.",
    verdict: "myth",
    answer:
      "Refusing usually means an automatic license suspension, the refusal can be used as evidence, and in some states it's a crime. Officers can also seek a warrant for a blood test.",
    source: "Birchfield v. North Dakota (2016)",
    caseId: "birchfield",
    topicId: "chemical-test-refusal",
  },
  {
    id: "phone-warrant",
    claim: "Police need a warrant to go through your phone, even after arresting you.",
    verdict: "fact",
    answer:
      "Phones hold too much private information to search on the spot. With narrow emergency exceptions, police need a warrant.",
    source: "Riley v. California (2014)",
    caseId: "riley",
  },
  {
    id: "sign-guilt",
    claim: "Signing the ticket means you're admitting guilt.",
    verdict: "myth",
    answer:
      "Where a signature is required, it's a promise to appear in court or respond to the ticket. In some states, refusing to sign can get you arrested.",
    source: "State traffic codes",
    topicId: "cite-and-release",
  },
  {
    id: "free-to-go",
    claim: "Officers have to tell you that you're free to go before they ask to search.",
    verdict: "myth",
    answer:
      "They don't. If you're unsure whether you're still being held, ask: \"Officer, am I free to go?\"",
    source: "Ohio v. Robinette (1996)",
    caseId: "robinette",
  },
];
