# Code 4

An interactive guide to U.S. traffic stops: a step-by-step crash course, myth-or-fact cards, a roadside simulator, a 50-state + DC law explorer with a map and side-by-side compare, a quiz, and a printable pocket card.

General education, not legal advice.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. "Use my location" works here and on any normal web host; the location is matched to a state in the browser and never sent anywhere.

## Where the content lives

| What | File |
|---|---|
| Crash course steps | `src/data/course.ts` |
| Myth / fact cards | `src/data/myths.ts` |
| Simulator scenarios | `src/data/scenarios.ts` |
| Quiz and glossary | `src/data/quiz.ts` |
| Supreme Court cases | `src/data/cases.ts` |
| State topics, statuses and map colors | `src/data/topics.ts` |
| State-by-state rules (one file per topic) | `src/data/states/*.json` |

Each state entry has a `status` (which colors the map), a plain-English `summary`, an `inPractice` note, optional `detail`, `sources`, and a `confidence` level. To update a law, edit that state's entry in the topic's JSON file and change `lastVerified` at the top.

Check the data after editing:

```bash
npm run validate
```

## Build

```bash
npm run build            # static site in dist/ (any host: Netlify, GitHub Pages, etc.)
npm run build:artifact   # one self-contained page in artifact/code-4.html for claude.ai
```

The claude.ai artifact sandbox blocks location access, so that build hides the "Use my location" button; the state dropdown works everywhere.
