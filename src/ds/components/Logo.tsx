// Mark da marca — grade 3×3 com a diagonal "resolvida" (mesma do ícone do app).
export function Logo({ size = 44 }: { size?: number }) {
  const cells = [];
  const pad = 8;
  const area = 64 - pad * 2;
  const gap = area * 0.085;
  const cell = (area - gap * 2) / 3;
  const r = cell * 0.26;
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 3; col++) {
      const x = pad + col * (cell + gap);
      const y = pad + row * (cell + gap);
      cells.push(
        row === col ? (
          <rect key={`${row}${col}`} x={x} y={y} width={cell} height={cell} rx={r} fill="url(#lg-g)" />
        ) : (
          <rect
            key={`${row}${col}`}
            x={x}
            y={y}
            width={cell}
            height={cell}
            rx={r}
            fill="#11333a"
            stroke="#2c5f69"
            strokeWidth={1.2}
          />
        )
      );
    }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden role="img" style={{ display: "block" }}>
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#123a42" />
          <stop offset="1" stopColor="#081d22" />
        </linearGradient>
        <linearGradient id="lg-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ef0dd" />
          <stop offset="1" stopColor="#44b6a2" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#lg-bg)" />
      {cells}
    </svg>
  );
}
