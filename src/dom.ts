import { SOUND_DATA } from "./data";
import { h } from "./h";

export function onSoundAdded(callback: (audio: HTMLAudioElement) => void) {
  const soundsDivPromise = new Promise<HTMLDivElement>((resolve) => {
    const existing = document.querySelector<HTMLDivElement>("div#sounds");
    if (existing && existing instanceof HTMLDivElement) {
      resolve(existing);
      return;
    }
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector<HTMLDivElement>("div#sounds");
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });

  soundsDivPromise.then((soundsDiv) => {
    const observer = new MutationObserver((mutations, obs) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof HTMLAudioElement) {
            callback(node);
          }
        }
      }
    });
    observer.observe(soundsDiv, { childList: true });
  });
}

export function onSoundVolumeMenuOpen(
  callback: (settingsModal: HTMLDivElement) => void
) {
  // Wait for the #settings div to be added
  const settingsObserver = new MutationObserver((mutations, obs) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (node instanceof HTMLDivElement && node.id === "settings") {
          // Now observe #modal-title inside #settings for text changes
          const modalTitle = node.querySelector<HTMLDivElement>("#modal-title");
          if (modalTitle) {
            // In case the title is already set
            if (modalTitle.textContent?.trim() === "Sound Effects Volume") {
              callback(node);
            } else {
              let titleObserver: MutationObserver | null = null;
              titleObserver = new MutationObserver(
                (titleMutations, titleObs) => {
                  for (const titleMutation of titleMutations) {
                    if (
                      titleMutation.type === "characterData" ||
                      titleMutation.type === "childList"
                    ) {
                      if (
                        modalTitle.textContent?.trim() ===
                        "Sound Effects Volume"
                      ) {
                        callback(node);
                        break;
                      }
                    }
                  }
                }
              );
              titleObserver.observe(modalTitle, {
                characterData: true,
                childList: true,
                subtree: true,
              });
              // Observe removal of the settings div to clean up titleObserver
              const removalObserver = new MutationObserver(
                (removalMutations, removalObs) => {
                  for (const removalMutation of removalMutations) {
                    for (const removedNode of Array.from(
                      removalMutation.removedNodes
                    )) {
                      if (removedNode === node) {
                        if (titleObserver) {
                          titleObserver.disconnect();
                          titleObserver = null;
                        }
                        removalObs.disconnect();
                      }
                    }
                  }
                }
              );
              if (node.parentNode) {
                removalObserver.observe(node.parentNode, { childList: true });
              }
            }
          }
        }
      }
    }
  });

  settingsObserver.observe(document.body, { childList: true, subtree: true });
}

export function injectSoundSelectionOptions(
  modal: HTMLDivElement,
  currentValues: Record<string, string | undefined>,
  onValueChange: (soundId: string, value: string) => void
) {
  const list = modal.querySelector<HTMLUListElement>("#modal-description ul");
  if (!list) {
    console.warn("[BotC-SR]", "Unable to find sound settings list");
    return;
  }

  // The app uses data attributes for styling, so we need to copy these over too.
  let vKeys = [];
  for (const key of Object.keys(list.dataset)) {
    if (key.match(/v-[\w-]+/)) {
      vKeys.push(key);
      break;
    }
  }
  const vAttributes = Object.fromEntries(
    vKeys.map((key) => [`data-${key}`, ""])
  );

  for (const [soundId, data] of Object.entries(SOUND_DATA)) {
    const prevListItem = list.querySelector<HTMLLIElement>(
      `li:has(#${data.inputId})`
    );
    if (!prevListItem) {
      continue;
    }

    const prevLabelText = prevListItem.querySelector<HTMLSpanElement>(
      `#${data.inputId}`
    )!.textContent;

    const select = h(
      "select",
      {
        "aria-labelledby": `${data.inputId}-sound`,
        onchange: () => onValueChange(soundId, select.value),
        ...vAttributes,
      },
      [
        h("option", { value: "default", ...vAttributes }, "Default"),
        ...Object.entries(data.sounds).map(([value, sound]) =>
          h("option", { value, ...vAttributes }, sound.name)
        ),
      ]
    );

    // For some reason this isn't working when creating hte element. Oh well.
    select.value = currentValues[soundId] ?? "default";

    const li = h("li", vAttributes, [
      h(
        "span",
        { id: `${data.inputId}-sound`, ...vAttributes },
        `${prevLabelText} sound`
      ),
      select,
    ]);

    prevListItem.after(li);
  }
}

export function getSoundId(audio: HTMLAudioElement): string | undefined {
  const srcUrl = new URL(audio.src, window.location.href);
  // TODO: Figure out if there's a better way (that's synchronous) to do an origin check.
  // Right now, this limits the extension to only working on the production release, even if
  // the user adds host permissions manually.
  if (srcUrl.hostname !== "botc.app") {
    return undefined;
  }

  for (const [soundId, data] of Object.entries(SOUND_DATA)) {
    if (data.pathMatch.test(srcUrl.pathname)) {
      return soundId;
    }
  }

  return undefined;
}
