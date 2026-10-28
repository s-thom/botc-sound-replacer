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
    name: "Windows XP Pop",
    path: "sounds/pop.mp3",
  },
  mcdooropen: {
    id: "mcdooropen",
    name: "Minecraft Door Open",
    path: "sounds/mc-open.ogg",
  },
  mcdoorclose: {
    id: "mcdoorclose",
    name: "Minecraft Door Close",
    path: "sounds/mc-close.ogg",
  },
  mcbell: {
    id: "mcbell",
    name: "Minecraft Bell",
    path: "sounds/mc-bell.ogg",
  },
  mcxporb: {
    id: "mcxporb",
    name: "Minecraft XP Orb",
    path: "sounds/mc-orb.ogg",
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

export type SoundId =
  | "chatJoin"
  | "chatLeave"
  | "bell"
  | "chatPrivate"
  | "clockTick"
  | "clockTickShort"
  | "vote"
  | "countdown"
  | "gong"
  | "timer";

export const SOUND_DATA: Record<SoundId, SoundData> = {
  chatJoin: {
    inputId: "sound-chatJoin",
    pathMatch: viteAsset("chatjoin", ".mp3"),
    sounds: [SOUNDS.discordjoin, SOUNDS.mcdooropen],
  },
  chatLeave: {
    inputId: "sound-chatLeave",
    pathMatch: viteAsset("chatleave", ".mp3"),
    sounds: [SOUNDS.discordleave, SOUNDS.mcdoorclose],
  },
  bell: {
    inputId: "sound-privateRequest",
    pathMatch: viteAsset("privaterequest", ".mp3"),
    sounds: [
      SOUNDS.discordping,
      SOUNDS.nootnoot,
      SOUNDS.xppop,
      SOUNDS.mcxporb,
      SOUNDS.mcbell,
    ],
  },
  chatPrivate: {
    inputId: "sound-privateJoin",
    pathMatch: viteAsset("privatejoin", ".mp3"),
    sounds: [],
  },
  clockTick: {
    inputId: "sound-voteTick",
    pathMatch: viteAsset("votetick", ".mp3"),
    sounds: [],
  },
  clockTickShort: {
    inputId: "sound-voteTickShort",
    pathMatch: viteAsset("votetickshort", ".mp3"),
    sounds: [],
  },
  vote: {
    inputId: "sound-voteCast",
    pathMatch: viteAsset("votecast", ".mp3"),
    sounds: [],
  },
  countdown: {
    inputId: "sound-countdown",
    pathMatch: viteAsset("countdown", ".mp3"),
    sounds: [],
  },
  gong: {
    inputId: "sound-attentionGong",
    pathMatch: viteAsset("attentiongong", ".mp3"),
    sounds: [SOUNDS.ariftown, SOUNDS.honk, SOUNDS.quack, SOUNDS.mcbell],
  },
  timer: {
    inputId: "sound-timerGong",
    pathMatch: viteAsset("timergong", ".mp3"),
    sounds: [SOUNDS.ariftown, SOUNDS.honk, SOUNDS.quack, SOUNDS.mcbell],
  },
};
