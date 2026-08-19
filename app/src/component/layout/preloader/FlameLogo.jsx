export default function FlameLogo() {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 120 150"
        className="w-14 h-16 animate-[flameFlicker_1.6s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb41f" />
            <stop offset="60%" stopColor="#ff8a00" />
            <stop offset="100%" stopColor="#e83b0c" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff7d6" />
            <stop offset="55%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="128" rx="34" ry="10" fill="#ff8a00" opacity="0.25" />

        <path
          d="
            M60 4
            C52 22 34 40 30 64
            C27 84 34 96 42 104
            C48 110 52 114 60 114
            C68 114 72 110 78 104
            C86 96 93 84 90 64
            C86 40 68 22 60 4 Z
          "
          fill="url(#flameOuter)"
        />

        <path
          d="
            M60 56
            C55 66 46 72 45 82
            C44 90 49 96 54 99
            C57 101 63 101 66 99
            C71 96 76 90 75 82
            C74 72 65 66 60 56 Z
          "
          fill="url(#flameInner)"
        />
      </svg>
    </div>
  );
}