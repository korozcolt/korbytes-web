// oklch.ts
// Convierte oklch(L C H) a "#rrggbb" usando matrices de Björn Ottosson.
// Sin dependencias externas de three. Determinístico.

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

function oklchToHex(input: string): string {
  const m = input.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+(\d+(?:\.\d+)?)/);
  if (!m) return input;
  const L = parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const H = (parseFloat(m[3]) * Math.PI) / 180;

  const a = C * Math.cos(H);
  const b = C * Math.sin(H);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const lC = l_ ** 3;
  const mC = m_ ** 3;
  const sC = s_ ** 3;

  let r = 4.0767416621 * lC - 3.3077115913 * mC + 0.2309699292 * sC;
  let g = -1.2684380046 * lC + 2.6097574011 * mC - 0.3413193965 * sC;
  let bl = -0.0041960863 * lC - 0.7034186147 * mC + 1.7076147010 * sC;

  const toSrgb = (x: number): number => {
    x = clamp01(x);
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  };

  const toHexByte = (x: number): string =>
    Math.max(0, Math.min(255, Math.round(toSrgb(x) * 255)))
      .toString(16)
      .padStart(2, "0");

  return "#" + toHexByte(r) + toHexByte(g) + toHexByte(bl);
}

const OKLCH_TABLE: Record<string, string> = {
  "oklch(0.55 0.18 260)": oklchToHex("oklch(0.55 0.18 260)"),
  "oklch(0.30 0.20 265)": oklchToHex("oklch(0.30 0.20 265)"),
  "oklch(0.78 0.155 80)": oklchToHex("oklch(0.78 0.155 80)"),
  "oklch(0.65 0.190 265)": oklchToHex("oklch(0.65 0.190 265)"),
  "oklch(0.78 0.155 215)": oklchToHex("oklch(0.78 0.155 215)"),
  "oklch(0.74 0.140 160)": oklchToHex("oklch(0.74 0.140 160)"),
  "oklch(0.72 0.180 350)": oklchToHex("oklch(0.72 0.180 350)"),
  "oklch(0.85 0.110 215)": oklchToHex("oklch(0.85 0.110 215)"),
  "oklch(0.85 0.110 80)":  oklchToHex("oklch(0.85 0.110 80)"),
  "oklch(0.85 0.140 160)": oklchToHex("oklch(0.85 0.140 160)"),
};

export function toThreeColor(input: string, THREE: any): any {
  const hex = OKLCH_TABLE[input] ?? input;
  return new THREE.Color(hex);
}
