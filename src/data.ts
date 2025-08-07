export interface SoundReplacement {
  id: string;
  name: string;
  path: string;
}

const SOUNDS = {
  quack: {
    id: "quack",
    name: "Quack",
    path: "sounds/quack_5.mp3",
  },
  honk: {
    id: "honk",
    name: "Honk",
    path: "sounds/honk.mp3",
  },
};

export interface SoundData {
  inputId: string;
  pathMatch: RegExp;
  sounds: SoundReplacement[];
}

function viteAsset(assetName: string, extension: string): RegExp {
  return new RegExp(`^/assets/${assetName}-[A-Za-z0-9_-]{8}${extension}`);
}

export const SOUND_DATA: Record<string, SoundData> = {
  chatJoin: {
    inputId: "sound-Publicchatenter",
    pathMatch: viteAsset("dooropen", ".mp3"),
    sounds: [],
  },
  chatLeave: {
    inputId: "sound-Publicchatexit",
    pathMatch: viteAsset("doorclose", ".mp3"),
    sounds: [],
  },
  bell: {
    inputId: "sound-Privatechatrequest",
    pathMatch: viteAsset("bell", ".mp3"),
    sounds: [],
  },
  chatPrivate: {
    inputId: "sound-Privatechatenter",
    pathMatch: viteAsset("lock", ".mp3"),
    sounds: [],
  },
  clockTick: {
    inputId: "sound-Voteclocktick",
    pathMatch: viteAsset("clocktick", ".mp3"),
    sounds: [],
  },
  clockTickShort: {
    inputId: "sound-Voteclocktick1s",
    pathMatch: viteAsset("clocktick-short", ".mp3"),
    sounds: [],
  },
  vote: {
    inputId: "sound-Votecast",
    pathMatch: viteAsset("vote", ".mp3"),
    sounds: [],
  },
  countdown: {
    inputId: "sound-Countdown",
    pathMatch: viteAsset("countdown", ".mp3"),
    sounds: [],
  },
  gong: {
    inputId: "sound-Attentiongong",
    pathMatch: viteAsset("gong", ".mp3"),
    sounds: [SOUNDS.quack, SOUNDS.honk],
  },
  timer: {
    inputId: "sound-Timerendgong",
    pathMatch: viteAsset("timer", ".mp3"),
    sounds: [SOUNDS.quack, SOUNDS.honk],
  },
};
