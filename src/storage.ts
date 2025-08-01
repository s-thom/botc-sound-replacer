import { SOUND_DATA } from "./data";

export async function loadSoundSettings(): Promise<
  Record<string, string | undefined>
> {
  const values = await chrome.storage.local.get(Object.keys(SOUND_DATA));
  return values;
}

export async function saveSoundSetting(rulesetId: string, value: string) {
  await chrome.storage.local.set({ [rulesetId]: value });
}
