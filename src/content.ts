import { SOUND_DATA } from "./data";
import {
  onSoundAdded,
  onSoundVolumeMenuOpen,
  injectSoundSelectionOptions,
  getSoundId,
} from "./dom";
import { loadSoundSettings, saveSoundSetting } from "./storage";

// Since we'll be replacing the audio URL as soon as possible, we need to know the settings eagerly
// (i.e. no waiting to retrieve from settings).
const settings: Record<string, string | undefined> = {};
loadSoundSettings().then((savedSettings) => {
  // If an update was made before settings were loaded from storage (unlikely) then try keep the
  // new value rather than the saved one.
  for (const [key, savedValue] of Object.entries(savedSettings)) {
    settings[key] ??= savedValue;
  }
});

// Ensure changes on other tabs also apply here.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") {
    return;
  }

  for (const [key, newValue] of Object.entries(changes)) {
    settings[key] = newValue.newValue ?? settings[key];
  }
});

onSoundVolumeMenuOpen((modal) => {
  injectSoundSelectionOptions(modal, settings, (soundId, value) => {
    settings[soundId] = value;
    saveSoundSetting(soundId, value);
  });
});

onSoundAdded((audio) => {
  const soundId = getSoundId(audio);
  if (!soundId) {
    return;
  }

  const settingValue = settings[soundId];
  if (settings[soundId] == null || settings[soundId] === "default") {
    return;
  }

  const data = SOUND_DATA[soundId];
  if (data == null) {
    return;
  }

  const soundReplacement = data.sounds.find(
    (sound) => sound.id === settingValue
  );
  if (soundReplacement == null) {
    return;
  }

  audio.src = chrome.runtime.getURL(soundReplacement.path);
});
