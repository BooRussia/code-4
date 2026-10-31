export type Verdict = "good" | "risky" | "bad";

export interface Choice {
  text: string;
  verdict: Verdict;
  feedback: string;
}

export interface SceneNode {
  id: string;
  scene: string;
  officer?: string;
  prompt: string;
  choices: Choice[];
  // Show the reader's state rule for this topic after they answer.
  stateTopic?: string;
}

export interface Scenario {
  id: string;
  title: string;
  role: string;
  setup: string;
  nodes: SceneNode[];
  ending: string;
}

// A "bad" choice rewinds to the same moment; "good" and "risky" move on.
export const SCENARIOS: Scenario[] = [
  {
    id: "taillight",
    title: "Taillight on Route 9",
    role: "You're driving",
    setup: "11:40 p.m. on a dark two-lane road. Your left taillight is out, though you don't know it yet.",
    nodes: [
      {
        id: "pull-over",
        scene: "Red and blue lights fill your mirror. There's no shoulder here, but a lit gas station is half a mile ahead.",
        prompt: "What do you do?",
        choices: [
          {
            text: "Brake hard and stop right in the lane.",
            verdict: "risky",
            feedback: "Stopping in a live lane puts you and the officer at risk from passing traffic. Pull out of traffic when you can.",
          },
          {
            text: "Turn on your hazards, slow down, and pull into the gas station.",
            verdict: "good",
            feedback: "Showing that you've seen the officer and driving a short distance at a safe speed to a lit spot is widely accepted. Don't go far, and don't speed up.",
          },
          {
            text: "Keep driving. You're only three miles from home.",
            verdict: "bad",
            feedback: "Not stopping for police lights can be charged as failing to yield or fleeing, an offense in every state. Let's try that again.",
          },
        ],
      },
      {
        id: "documents",
        scene: "The officer walks up with a flashlight. Your registration is in the glove box.",
        officer: "Evening. License, registration and proof of insurance, please.",
        prompt: "How do you respond?",
        stateTopic: "reason-for-stop",
        choices: [
          {
            text: "Lean over and pop the glove box right away.",
            verdict: "risky",
            feedback: "Sudden reaching is exactly what officers are trained to worry about. Say where things are before you move.",
          },
          {
            text: "\"Sure. My license is in my wallet, back pocket, and the registration's in the glove box. OK if I reach for them?\"",
            verdict: "good",
            feedback: "You're complying with a lawful request and keeping the officer informed. This is the safest way to handle documents.",
          },
          {
            text: "\"Not until you tell me why you stopped me.\"",
            verdict: "bad",
            feedback: "In most states the officer doesn't have to explain first, and refusing to show your license can be its own offense. Ask the reason, but hand over the documents. Try again.",
          },
        ],
      },
      {
        id: "question",
        scene: "The officer looks over your license.",
        officer: "Do you know why I pulled you over?",
        prompt: "What do you say?",
        choices: [
          {
            text: "\"I was probably going a little fast. Sorry.\"",
            verdict: "risky",
            feedback: "Legal, but you've just admitted a violation the officer may not have been stopping you for. You don't have to.",
          },
          {
            text: "\"No, officer.\"",
            verdict: "good",
            feedback: "Polite and truthful, and it admits nothing. The officer will tell you.",
          },
          {
            text: "\"Because you've got a quota to fill.\"",
            verdict: "bad",
            feedback: "Arguing on the roadside never helps and can escalate things. Save disagreements for court. Try again.",
          },
        ],
      },
    ],
    ending: "\"Your left taillight's out. I'm giving you a written warning. Get it fixed this week.\" The stop took eight minutes.",
  },
  {
    id: "search",
    title: "Mind if I take a look?",
    role: "You're driving",
    setup: "Mid-afternoon on the interstate. You were doing 79 in a 70. The officer has just finished writing your ticket.",
    nodes: [
      {
        id: "ask",
        scene: "The officer hands you the ticket, then leans on the door.",
        officer: "Before you go, mind if I take a quick look in the car? You don't have anything illegal in there, right?",
        prompt: "How do you answer?",
        stateTopic: "consent-search",
        choices: [
          {
            text: "\"Go ahead. I've got nothing to hide.\"",
            verdict: "risky",
            feedback: "That's consent. The search can cover bags and containers, and anything found can be used against you, even if it belongs to someone else.",
          },
          {
            text: "\"Officer, I don't consent to searches. Am I free to go?\"",
            verdict: "good",
            feedback: "Clear, calm and legal. You're declining a request and asking whether the stop is over.",
          },
          {
            text: "Get out and stand in front of the door.",
            verdict: "bad",
            feedback: "Physically blocking an officer can lead to an obstruction charge. Say no with words, never with your body. Try again.",
          },
        ],
      },
      {
        id: "dog",
        scene: "The ticket is done, but the officer keeps your license.",
        officer: "Hang tight. I'm calling a K-9 unit. They're about 20 minutes out.",
        prompt: "What now?",
        choices: [
          {
            text: "\"Officer, am I being detained? My ticket's already written.\"",
            verdict: "good",
            feedback: "Under Rodriguez v. United States, once the stop's job is done, holding you for a dog needs reasonable suspicion. Ask calmly, and don't drive off.",
          },
          {
            text: "Start the car and leave. The ticket's done.",
            verdict: "bad",
            feedback: "Even if holding you is unlawful, driving away can lead to charges, and it's dangerous. Challenge it in court instead. Try again.",
          },
          {
            text: "\"Fine, just search it then.\"",
            verdict: "risky",
            feedback: "You've now given consent. Feeling pressured doesn't automatically make consent invalid in court.",
          },
        ],
      },
      {
        id: "odor",
        scene: "The officer steps back from the window.",
        officer: "I smell marijuana. Step out of the vehicle. I'm going to search it.",
        prompt: "How do you respond?",
        stateTopic: "marijuana-odor",
        choices: [
          {
            text: "Step out and say, \"I don't consent to this search, but I won't resist.\"",
            verdict: "good",
            feedback: "You've made your objection clear and kept yourself safe. Whether the odor was enough is a question for a judge.",
          },
          {
            text: "Argue about the smell and refuse to get out.",
            verdict: "bad",
            feedback: "Officers can order you out of the car during a lawful stop (Pennsylvania v. Mimms). Refusing can get you arrested. Try again.",
          },
        ],
      },
    ],
    ending: "The search turns up nothing. You leave with your speeding ticket and a note of the time, the officer's badge number and what was said.",
  },
  {
    id: "passenger",
    title: "Shotgun seat",
    role: "You're the passenger",
    setup: "Your friend is driving you home from work and rolls through a stop sign.",
    nodes: [
      {
        id: "id",
        scene: "The officer takes your friend's license, then shines the flashlight across the car at you.",
        officer: "And who are you? Let me see some ID.",
        prompt: "What do you do?",
        stateTopic: "passenger-id",
        choices: [
          {
            text: "Hand over your ID.",
            verdict: "good",
            feedback: "Cooperating is always legal. Many passengers choose this to keep the stop short.",
          },
          {
            text: "\"Am I suspected of anything, officer? If not, I'd prefer not to show ID.\"",
            verdict: "risky",
            feedback: "In many states a passenger who isn't suspected of anything can decline. In stop-and-identify states, if the officer says they suspect you of a crime, you must give your name. Check your state's rule below.",
          },
          {
            text: "Give a made-up name.",
            verdict: "bad",
            feedback: "Giving police a false name is a crime in many states. Declining is one thing; lying is another. Try again.",
          },
        ],
      },
      {
        id: "out",
        scene: "The officer comes back from the patrol car.",
        officer: "Both of you, step out of the car for me.",
        prompt: "How do you respond?",
        choices: [
          {
            text: "Step out slowly and keep your hands where they can be seen.",
            verdict: "good",
            feedback: "Officers can order passengers out during a lawful stop (Maryland v. Wilson). Complying keeps everyone safe.",
          },
          {
            text: "\"I'm just a passenger. You can't order me out.\"",
            verdict: "bad",
            feedback: "They can. Passengers can be ordered out of the car during any lawful stop. Try again.",
          },
        ],
      },
    ],
    ending: "Your friend gets a ticket for the stop sign. You're both back in the car in ten minutes.",
  },
  {
    id: "recording",
    title: "Rolling",
    role: "You're driving",
    setup: "You keep your phone on a dash mount. When the lights come on, you start recording before the officer reaches the car.",
    nodes: [
      {
        id: "turn-off",
        scene: "The officer sees the phone as they walk up.",
        officer: "Turn that off.",
        prompt: "What do you do?",
        stateTopic: "recording",
        choices: [
          {
            text: "\"Officer, I'm going to keep recording. My hands are on the wheel.\"",
            verdict: "good",
            feedback: "Recording openly without interfering is generally protected. You've stayed calm and told the officer where your hands are. If the officer insists, don't physically resist. Object, and challenge it later.",
          },
          {
            text: "Grab the phone and hold it out the window toward the officer.",
            verdict: "risky",
            feedback: "Sudden movements and a phone near the officer's face can look like interference, or a threat. Leave it mounted.",
          },
          {
            text: "Turn it off.",
            verdict: "good",
            feedback: "Also legal. Whether to keep recording is your choice.",
          },
        ],
      },
      {
        id: "phone",
        scene: "The officer points at the phone.",
        officer: "Hand me the phone.",
        prompt: "How do you respond?",
        choices: [
          {
            text: "\"I don't consent to a search of my phone.\"",
            verdict: "good",
            feedback: "Police generally need a warrant to search a phone's contents (Riley v. California). If they take it anyway, don't resist. Challenge it later.",
          },
          {
            text: "Unlock it and hand it over.",
            verdict: "risky",
            feedback: "Handing over an unlocked phone can be treated as consent to look through it.",
          },
          {
            text: "Pull the phone back and roll up the window.",
            verdict: "bad",
            feedback: "Physically resisting can lead to charges and make things dangerous. Say no with words. Try again.",
          },
        ],
      },
    ],
    ending: "You get a ticket for an expired registration. The full stop is on your phone, and you saved a copy to the cloud.",
  },
];
