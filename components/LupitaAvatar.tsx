/** Decorative Lupita avatar — adapted from CobroLibre prototipo (PR #1). */
export function LupitaAvatar({
  size = 64,
  className = "",
  crop = false,
}: {
  size?: number;
  className?: string;
  crop?: boolean;
}) {
  const vb = crop ? "46 34 108 124" : "0 0 200 240";
  const hair = "#1d1420";
  const skin = "#E3A97C";
  const pink = "#E6007E";

  return (
    <svg
      className={className}
      width={size}
      height={crop ? Math.round(size * 1.15) : size}
      viewBox={vb}
      role="img"
      aria-label="Lupita"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="228" rx="54" ry="10" fill="#00000018" />
      <path
        d="M58 118c-8 28 6 70 42 78 36-8 50-50 42-78"
        fill="#0B6B4F"
      />
      <path
        d="M62 122c8 18 20 28 38 30 18-2 30-12 38-30"
        fill="#08523d"
        opacity="0.35"
      />
      <ellipse cx="100" cy="92" rx="48" ry="52" fill={skin} />
      <path
        d="M52 88c2-42 28-62 48-62s46 20 48 62c-10-18-28-28-48-28s-38 10-48 28z"
        fill={hair}
      />
      <path
        d="M54 78c-4 22-2 40 8 48M146 78c4 22 2 40-8 48"
        fill="none"
        stroke={hair}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="82" cy="96" r="4.5" fill="#2a1a12" />
      <circle cx="118" cy="96" r="4.5" fill="#2a1a12" />
      <path
        d="M88 118c6 8 18 8 24 0"
        fill="none"
        stroke="#b56a4a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="72" cy="108" r="7" fill="#F3A6A0" opacity="0.55" />
      <circle cx="128" cy="108" r="7" fill="#F3A6A0" opacity="0.55" />
      <circle cx="100" cy="54" r="9" fill={pink} />
      <circle cx="100" cy="54" r="4" fill="#fff" opacity="0.85" />
    </svg>
  );
}
