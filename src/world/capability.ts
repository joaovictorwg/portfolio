export type WorldCapability = {
  ok: boolean;
  reason?: "no-webgl" | "save-data" | "coarse-pointer";
};

export function detectWorldCapability(): WorldCapability {
  if (typeof window === "undefined") {
    return { ok: false, reason: "no-webgl" };
  }

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) {
    return { ok: false, reason: "no-webgl" };
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  if (connection?.saveData) {
    return { ok: false, reason: "save-data" };
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.matchMedia("(max-width: 700px)").matches;
  if (coarse && small) {
    return { ok: false, reason: "coarse-pointer" };
  }

  return { ok: true };
}
