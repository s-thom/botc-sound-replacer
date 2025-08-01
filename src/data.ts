export interface SoundReplacement {
  name: string;
  path: string;
}

export interface SoundData {
  inputId: string;
  pathMatch: RegExp;
  sounds: Record<string, SoundReplacement>;
}

// "bell-Dl6tcyUb.mp3"
// "clocktick-short-CIEfFW_G.mp3"
// "clocktick-C0z0mAeb.mp3"
// "countdown-DRzblIRW.mp3"
// "doorclose-DJrIar29.mp3"
// "dooropen-DUW4cfah.mp3"
// "gong-DpHLo7G5.mp3"
// "lock-Cx7LT4DF.mp3"
// "timer-Ct7TV6TZ.mp3"
// "vote-BUbYUp00.mp3"

function viteAsset(assetName: string, extension: string): RegExp {
  return new RegExp(`^/assets/${assetName}-[A-Za-z0-9_-]+${extension}`);
}

export const SOUND_DATA: Record<string, SoundData> = {
  gong: {
    inputId: "sound-Attentiongong",
    pathMatch: viteAsset("gong", ".mp3"),
    sounds: {
      quack: { name: "Quack", path: "sounds/quack_5.mp3" },
      honk: { name: "Honk", path: "sounds/honk.mp3" },
    },
  },
};
