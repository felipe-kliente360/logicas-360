// Gera a logo (SVG) e todos os ícones do PWA a partir de um mark vetorial próprio:
// um grid 3×3 com a diagonal "resolvida" (dedução), no clima petróleo+neon do app.
//   npx tsx scripts/icons.ts
import fs from "node:fs";
import sharp from "sharp";

const OUT = "public";
fs.mkdirSync(OUT, { recursive: true });

/** Constrói o SVG do ícone. rx=cantos arredondados; pad=respiro (safe zone p/ maskable). */
function iconSVG({ rx, pad }: { rx: number; pad: number }): string {
  const S = 512;
  const area = S - pad * 2;
  const gap = area * 0.085;
  const cell = (area - gap * 2) / 3;
  const r = cell * 0.26;
  let cells = "";
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 3; col++) {
      const x = pad + col * (cell + gap);
      const y = pad + row * (cell + gap);
      if (row === col) {
        cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${r}" fill="url(#g)" filter="url(#glow)"/>`;
      } else {
        cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${r}" fill="#11333a" stroke="#2c5f69" stroke-width="6"/>`;
      }
    }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#123a42"/><stop offset="1" stop-color="#081d22"/>
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8ef0dd"/><stop offset="1" stop-color="#44b6a2"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#7fe3d1" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="${S}" height="${S}" rx="${rx}" fill="url(#bg)"/>
  ${cells}
</svg>`;
}

const rounded = iconSVG({ rx: 116, pad: 84 }); // favicon / ícone "any"
const fullbleed = iconSVG({ rx: 0, pad: 84 }); // apple-touch (sem cantos transparentes)
const maskable = iconSVG({ rx: 0, pad: 120 }); // safe zone p/ máscara Android

// SVGs em disco (favicon vetorial moderno)
fs.writeFileSync(`${OUT}/favicon.svg`, rounded);
fs.writeFileSync(`${OUT}/icon.svg`, rounded);

const png = (svg: string, size: number, file: string) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(`${OUT}/${file}`);

await Promise.all([
  png(rounded, 192, "pwa-192x192.png"),
  png(rounded, 512, "pwa-512x512.png"),
  png(maskable, 512, "maskable-512x512.png"),
  png(fullbleed, 180, "apple-touch-icon.png"),
  png(rounded, 32, "favicon-32x32.png"),
]);

console.log("ícones gerados em public/:", fs.readdirSync(OUT).filter((f) => /icon|pwa|favicon|mask/.test(f)).join(", "));
