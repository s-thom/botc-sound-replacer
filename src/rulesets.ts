export const RULESET_VALUES: Record<string, string[]> = {
  gong: ["quack", "honk"],
};

function getAllRuleIds(rulesetId: string) {
  if (!RULESET_VALUES[rulesetId]) {
    throw new Error(`Unknown ruleset ID ${rulesetId}`);
  }

  return Array.from({ length: RULESET_VALUES[rulesetId].length }).map(
    (_, i) => i + 1
  );
}

export async function setSound(
  rulesetId: string,
  value: string,
  shouldSave: boolean
) {
  if (value === "default") {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: [rulesetId],
    });
  } else {
    const id = RULESET_VALUES[rulesetId].indexOf(value) + 1;
    if (id <= 0) {
      throw new Error(`Unknown value ${value} for ruleset ${rulesetId}`);
    }

    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [rulesetId],
    });
    await chrome.declarativeNetRequest.updateStaticRules({
      rulesetId,
      disableRuleIds: getAllRuleIds(rulesetId).filter(
        (ruleId) => ruleId !== id
      ),
      enableRuleIds: [id],
    });
  }

  if (shouldSave) {
    await chrome.storage.local.set({ [rulesetId]: value });
  }
  console.log(`Set ${rulesetId} sound to ${value}`);
}
