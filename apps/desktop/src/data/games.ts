export interface GameMeta {
  name: string;
  short: string;
  platform: string;
  coverA: string;
  coverB: string;
}

export const GAMES: Record<string, GameMeta> = {
  "hollow-knight":      { name: "Hollow Knight",       short: "HK",    platform: "Steam",     coverA: "#1a3a4a", coverB: "#0a1a2a" },
  "silksong":           { name: "Silksong",            short: "SS",    platform: "Steam",     coverA: "#3a1a2a", coverB: "#1a0a1a" },
  "alttp":              { name: "A Link to the Past",  short: "ALTTP", platform: "SNES",      coverA: "#2a3a1a", coverB: "#1a2a0a" },
  "ocarina-of-time":    { name: "Ocarina of Time",     short: "OoT",   platform: "N64",       coverA: "#3a2a1a", coverB: "#2a1a0a" },
  "elden-ring":         { name: "Elden Ring",          short: "ER",    platform: "Steam",     coverA: "#3a3a1a", coverB: "#2a1a0a" },
  "dragon-age-origins": { name: "Dragon Age: Origins", short: "DA:O",  platform: "PC natif",  coverA: "#3a1a1a", coverB: "#1a0a0a" },
};
