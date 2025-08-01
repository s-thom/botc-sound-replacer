async function waitForSoundsDiv(): Promise<HTMLDivElement> {
  return new Promise((resolve) => {
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
}
