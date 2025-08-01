import { RULESET_VALUES } from "./rulesets";

export async function loadSoundSettings(): Promise<
  Record<string, number | undefined>
> {
  const values = await chrome.storage.local.get(Object.keys(RULESET_VALUES));
  return values;
}

export async function saveSoundSetting(rulesetId: string, value: string) {
  await chrome.storage.local.set({ [rulesetId]: value });
}
