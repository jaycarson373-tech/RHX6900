import { config } from "./config.js";

export function epochIdFor(date = new Date()) {
  const sizeMs = config.epochMinutes * 60_000;
  return new Date(Math.floor(date.getTime() / sizeMs) * sizeMs).toISOString();
}

export function msUntilNextEpoch(date = new Date()) {
  const sizeMs = config.epochMinutes * 60_000;
  return sizeMs - (date.getTime() % sizeMs);
}

export function assetForEpoch(date = new Date()) {
  const cycle = Math.floor(date.getTime() / (config.epochMinutes * 60_000));
  return config.assets[cycle % config.assets.length];
}

