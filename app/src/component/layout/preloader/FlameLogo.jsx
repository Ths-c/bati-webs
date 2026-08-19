export default function FlameLogo() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 200 180" className="w-20 h-20">
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

        <ellipse cx="100" cy="156" rx="56" ry="12" fill="#ff8a00" opacity="0.25" />

        <circle
          cx="60"
          cy="52"
          r="3"
          fill="#ffb41f"
          className="animate-[sparkRise_1.8s_ease-out_infinite]"
          style={{ animationDelay: "0.2s" }}
        />
        <circle
          cx="150"
          cy="44"
          r="2.5"
          fill="#ffd166"
          className="animate-[sparkRise_2.2s_ease-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
        <circle
          cx="105"
          cy="30"
          r="2"
          fill="#ff8a00"
          className="animate-[sparkRise_1.5s_ease-out_infinite]"
          style={{ animationDelay: "0.7s" }}
        />

        <g
          className="origin-bottom animate-[flameFlicker_2.2s_ease-in-out_infinite]"
          style={{ animationDelay: "0.35s" }}
        >
          <path
            d="
              M55 62
              C48 82 36 96 34 110
              C32 122 39 130 47 135
              C53 139 57 142 60 142
              C64 142 67 139 72 135
              C80 130 85 122 83 110
              C81 96 62 82 55 62 Z
            "
            fill="url(#flameOuter)"
            opacity="0.85"
          />
          <path
            d="
              M55 100
              C51 108 45 113 44 120
              C43 126 47 130 51 133
              C53 134 57 134 59 133
              C63 130 67 126 66 120
              C66 113 59 108 55 100 Z
            "
            fill="url(#flameInner)"
          />
        </g>

        <g className="origin-bottom animate-[flameFlicker_1.6s_ease-in-out_infinite]">
          <path
            d="
              M100 18
              C90 48 70 68 66 90
              C63 108 72 120 82 128
              C90 134 95 138 100 138
              C105 138 110 134 118 128
              C128 120 137 108 134 90
              C130 68 110 48 100 18 Z
            "
            fill="url(#flameOuter)"
          />
          <path
            d="
              M100 76
              C94 88 84 95 83 105
              C82 114 88 121 94 125
              C97 127 103 127 106 125
              C112 121 118 114 117 105
              C116 95 106 88 100 76 Z
            "
            fill="url(#flameInner)"
          />
        </g>

        <g
          className="origin-bottom animate-[flameFlicker_2.6s_ease-in-out_infinite]"
          style={{ animationDelay: "0.6s" }}
        >
          <path
            d="
              M150 48
              C143 70 130 86 128 102
              C126 116 134 125 143 131
              C149 135 154 138 158 138
              C162 138 166 135 171 131
              C179 126 184 116 182 102
              C180 86 157 70 150 48 Z
            "
            fill="url(#flameOuter)"
            opacity="0.9"
          />
          <path
            d="
              M150 86
              C146 94 140 99 139 106
              C138 112 142 116 146 119
              C148 120 152 120 154 119
              C158 116 162 112 161 106
              C160 99 154 94 150 86 Z
            "
            fill="url(#flameInner)"
          />
        </g>
      </svg>
    </div>
  );
}