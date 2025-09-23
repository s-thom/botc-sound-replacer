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
  ariftown: {
    id: "ariftown",
    name: "Back to town",
    path: "sounds/ARIF_comeonbacktotown.mp3",
  },
  nootnoot: {
    id: "nootnoot",
    name: "Noot noot",
    path: "sounds/noot-noot.mp3",
  },
  discordjoin: {
    id: "discordjoin",
    name: "Discord join",
    path: "sounds/discord-join.mp3",
  },
  discordleave: {
    id: "discordleave",
    name: "Discord leave",
    path: "sounds/discord-leave.mp3",
  },
  discordping: {
    id: "discordping",
    name: "Discord ping",
    path: "sounds/discord-ping.mp3",
  },
  xppop: {
    id: "xppop",
    name: "Pop",
    path: "sounds/pop.mp3",
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
    sounds: [SOUNDS.discordjoin],
  },
  chatLeave: {
    inputId: "sound-Publicchatexit",
    pathMatch: viteAsset("doorclose", ".mp3"),
    sounds: [SOUNDS.discordleave],
  },
  bell: {
    inputId: "sound-Privatechatrequest",
    pathMatch: viteAsset("bell", ".mp3"),
    sounds: [SOUNDS.discordping, SOUNDS.nootnoot, SOUNDS.xppop],
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
    sounds: [SOUNDS.ariftown, SOUNDS.honk, SOUNDS.quack],
  },
  timer: {
    inputId: "sound-Timerendgong",
    pathMatch: viteAsset("timer", ".mp3"),
    sounds: [SOUNDS.ariftown, SOUNDS.honk, SOUNDS.quack],
  },
};
