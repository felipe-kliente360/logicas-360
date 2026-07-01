// Retrato 3×4 paramétrico dos suspeitos — SVG puro e determinístico (semeado pelo
// nome). Genérico, mas varia pele, cabelo, barba, óculos e traços; distingue
// homem/mulher pelo título/nome. Zero assets, offline, coerente com o dossiê.

const SKIN = ["#f1d3b6", "#e7bf99", "#d59f74", "#bd8353", "#9c6a44", "#7d5334"];
const HAIR = ["#241d18", "#3c2a1d", "#5a3d27", "#7a5733", "#a5854d", "#8d8d8d", "#d8d0c4"];
const CLOTH = ["#3f4a52", "#5a3f3a", "#4a4a3a", "#42505c", "#5b4a5e", "#57402c"];

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(r: () => number, arr: T[]): T => arr[Math.floor(r() * arr.length)];

function isFeminine(name: string): boolean {
  const s = name.toLowerCase();
  if (/(dona|dna|srta|senhorita|madame|madama|vi[úu]va|condessa|baronesa|soprano|herdeira|astr[oô]noma|bibliotec[áa]ria|cenógrafa|dama|rainha|freira|madre)/.test(s))
    return true;
  if (/(coronel|\bseu\b|\bsr\b|senhor|doutor|\bdr\b|maestro|capit[ãa]o|mordomo|jardineiro|comandante|\bchef\b|bar[ãa]o|adido|tenor|bilheteiro|engenheiro|padre|frei|rei|duque)/.test(s))
    return false;
  const last = s.replace(/[^a-zà-ú ]/g, "").trim().split(/\s+/).pop() || "";
  return last.endsWith("a"); // heurística de fallback
}

export function SuspectAvatar({ name, size = 48 }: { name: string; size?: number }) {
  const r = mulberry32(hashStr(name));
  const fem = isFeminine(name);
  const skin = pick(r, SKIN);
  const hair = pick(r, HAIR);
  const cloth = pick(r, CLOTH);
  const style = fem ? pick(r, ["long", "bun", "ponytail", "bob", "curly"]) : pick(r, ["short", "sidePart", "bald", "buzz", "short"]);
  const beard = !fem && r() < 0.45 ? pick(r, ["mustache", "stubble", "full"]) : "none";
  const glasses = r() < 0.32 ? pick(r, ["round", "square"]) : "none";
  const ink = "#2a2018";
  const w = Math.round(size * 0.82);

  return (
    <svg width={w} height={size} viewBox="0 0 72 88" preserveAspectRatio="xMidYMid slice" aria-hidden role="img" style={{ display: "block" }}>
      {/* fundo da "foto" + faixas de mugshot bem sutis */}
      <rect width="72" height="88" fill="#cdbb96" />
      <rect width="72" height="88" fill="url(#av-vig)" opacity="0.35" />
      <defs>
        <radialGradient id="av-vig" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      {/* ombros / roupa */}
      <path d="M8 88 C10 72 22 64 36 64 C50 64 62 72 64 88 Z" fill={cloth} />
      <path d="M28 66 h16 v6 q-8 5 -16 0 Z" fill={skin} opacity="0.9" />
      {/* orelhas */}
      <circle cx="19" cy="42" r="4" fill={skin} />
      <circle cx="53" cy="42" r="4" fill={skin} />
      {/* cabeça */}
      <ellipse cx="36" cy="40" rx="17" ry="20" fill={skin} />
      {/* cabelo por estilo (desenhado sobre a cabeça) */}
      {style === "bald" && <path d="M20 34 Q36 20 52 34 Q46 26 36 25 Q26 26 20 34 Z" fill={hair} opacity="0.55" />}
      {style === "buzz" && <path d="M19 38 Q19 20 36 19 Q53 20 53 38 Q47 27 36 27 Q25 27 19 38 Z" fill={hair} />}
      {style === "short" && <path d="M18 40 Q17 18 36 18 Q55 18 54 40 Q52 26 36 25 Q20 26 18 40 Z" fill={hair} />}
      {style === "sidePart" && <path d="M18 40 Q17 18 36 18 Q55 18 54 38 Q52 27 40 25 L40 21 Q30 22 24 30 Q20 34 18 40 Z" fill={hair} />}
      {style === "bob" && <path d="M15 58 Q13 20 36 17 Q59 20 57 58 Q54 44 52 34 Q50 26 36 25 Q22 26 20 34 Q18 44 15 58 Z" fill={hair} />}
      {style === "long" && <path d="M13 68 Q11 20 36 16 Q61 20 59 68 Q56 46 54 34 Q52 25 36 24 Q20 25 18 34 Q16 46 13 68 Z" fill={hair} />}
      {style === "curly" && (
        <g fill={hair}>
          <path d="M18 40 Q14 18 36 16 Q58 18 54 40 Q52 27 36 26 Q20 27 18 40 Z" />
          <circle cx="19" cy="26" r="6" /><circle cx="30" cy="19" r="6" /><circle cx="42" cy="19" r="6" /><circle cx="53" cy="26" r="6" />
        </g>
      )}
      {style === "ponytail" && (
        <g fill={hair}>
          <path d="M18 40 Q17 17 36 17 Q55 17 54 40 Q52 26 36 25 Q20 26 18 40 Z" />
          <path d="M54 30 q10 4 8 20 q-1 8 -6 10 q4 -12 -4 -26 Z" />
        </g>
      )}
      {style === "bun" && (
        <g fill={hair}>
          <path d="M18 40 Q17 18 36 18 Q55 18 54 40 Q52 26 36 25 Q20 26 18 40 Z" />
          <circle cx="36" cy="15" r="6" />
        </g>
      )}
      {/* barba */}
      {beard === "full" && <path d="M20 44 Q22 62 36 64 Q50 62 52 44 Q48 54 36 55 Q24 54 20 44 Z" fill={hair} />}
      {beard === "stubble" && <path d="M22 48 Q24 60 36 62 Q48 60 50 48 Q46 56 36 56 Q26 56 22 48 Z" fill={hair} opacity="0.4" />}
      {(beard === "mustache" || beard === "full") && <path d="M28 50 Q36 53 44 50 Q40 52 36 52 Q32 52 28 50 Z" fill={hair} />}
      {/* sobrancelhas + olhos + nariz + boca */}
      <rect x="26" y="36" width="7" height="1.6" rx="0.8" fill={ink} />
      <rect x="39" y="36" width="7" height="1.6" rx="0.8" fill={ink} />
      <circle cx="29.5" cy="41" r="2" fill={ink} />
      <circle cx="42.5" cy="41" r="2" fill={ink} />
      <path d="M35 43 Q34 47 37 48" fill="none" stroke={ink} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M31 53 Q36 55 41 53" fill="none" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      {/* óculos */}
      {glasses !== "none" && (
        <g fill="none" stroke={ink} strokeWidth="1.4" opacity="0.9">
          {glasses === "round" ? (
            <>
              <circle cx="29.5" cy="41" r="4.5" /><circle cx="42.5" cy="41" r="4.5" />
            </>
          ) : (
            <>
              <rect x="25" y="37.5" width="9" height="7" rx="1.5" /><rect x="38" y="37.5" width="9" height="7" rx="1.5" />
            </>
          )}
          <path d="M34 41 h4" />
        </g>
      )}
    </svg>
  );
}
