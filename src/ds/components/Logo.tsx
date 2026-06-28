// Marca — lupa cuja lente revela a grade de dedução 3×3, com a célula do culpado
// carimbada em vermelho. Investigação (lupa, carimbo) + lógica (grade). Igual ao ícone.
export function Logo({ size = 44 }: { size?: number }) {
  const cells = [
    [111, 111],
    [178, 111],
    [245, 111],
    [111, 178],
    [245, 178],
    [111, 245],
    [178, 245],
    [245, 245],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden role="img" style={{ display: "block" }}>
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#241b11" />
          <stop offset="1" stopColor="#110c07" />
        </linearGradient>
        <linearGradient id="lg-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3e8cf" />
          <stop offset="1" stopColor="#d4bd92" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="116" fill="url(#lg-bg)" />
      <line x1="288" y1="288" x2="454" y2="454" stroke="#7e2419" strokeWidth="64" strokeLinecap="round" />
      <line x1="288" y1="288" x2="454" y2="454" stroke="#c0392b" strokeWidth="44" strokeLinecap="round" />
      <circle cx="206" cy="206" r="150" fill="#1b1610" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="56" height="56" rx="11" fill="#e6d6b4" />
      ))}
      <rect x="178" y="178" width="56" height="56" rx="11" fill="#c0392b" />
      <circle cx="206" cy="206" r="150" fill="none" stroke="url(#lg-ring)" strokeWidth="20" />
      <path d="M109 138 A118 118 0 0 1 175 92" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
