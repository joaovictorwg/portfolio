export type CharacterMotion =
  | "idle"
  | "walking"
  | "running"
  | "jumping"
  | "interacting";

export type CharacterMotionRef = { current: CharacterMotion };
export type CharacterHeadingRef = { current: number };
