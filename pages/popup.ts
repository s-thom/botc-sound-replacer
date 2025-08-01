import { RULESET_VALUES, setSound } from "../src/rulesets";

async function init() {
  const settings = await chrome.storage.local.get(Object.keys(RULESET_VALUES));
  for (const [rulesetId, value] of Object.entries(settings)) {
    setSound(rulesetId, value, false);
  }

  document.querySelectorAll("select").forEach((select) => {
    if (settings[select.name]) {
      select.value = settings[select.name];
    } else {
      select.value = "default";
    }

    select.addEventListener("change", () =>
      setSound(select.name, select.value, true)
    );
  });
}

init();
