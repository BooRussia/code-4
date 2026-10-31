export interface Source {
  label: string;
  url: string;
}

export interface Entry {
  status: string;
  summary: string;
  inPractice?: string;
  detail?: string;
  sources: Source[];
  confidence: "high" | "medium" | "low";
}

export interface TopicData {
  topic: string;
  lastVerified: string;
  entries: Record<string, Entry>;
}

// One JSON file per topic in ./states/. Editing a state's rule means editing one entry there.
const files = import.meta.glob<TopicData>("./states/*.json", { eager: true, import: "default" });

export const STATE_DATA: Record<string, TopicData> = {};
for (const data of Object.values(files)) {
  if (data && data.topic) STATE_DATA[data.topic] = data;
}

export function entryFor(topicId: string, stateCode: string | null | undefined): Entry | undefined {
  if (!stateCode) return undefined;
  return STATE_DATA[topicId]?.entries[stateCode];
}

export function lastVerified(topicId: string): string | undefined {
  return STATE_DATA[topicId]?.lastVerified;
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
