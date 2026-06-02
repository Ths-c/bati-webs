export default function Bat({ flying = true }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 200 120"
        className="w-32 h-32 animate-[batFloat_2.5s_ease-in-out_infinite]"
      >
        {/* Ala izquierda */}
        <g
          style={{ transformOrigin: "100px 60px" }}
          className={
            flying
              ? "animate-[batWingLeft_.25s_ease-in-out_infinite_alternate]"
              : ""
          }
        >
          <path
            d="
              M100 60
              C85 20,55 15,15 40
              C25 45,35 55,20 75
              C40 80,55 95,75 85
              C85 80,92 72,100 60
            "
            fill="#111111"
          />
        </g>

        {/* Ala derecha */}
        <g
          style={{ transformOrigin: "100px 60px" }}
          className={
            flying
              ? "animate-[batWingRight_.25s_ease-in-out_infinite_alternate]"
              : ""
          }
        >
          <path
            d="
              M100 60
              C115 20,145 15,185 40
              C175 45,165 55,180 75
              C160 80,145 95,125 85
              C115 80,108 72,100 60
            "
            fill="#111111"
          />
        </g>

        {/* Orejas */}
        <polygon points="85,30 95,10 100,35" fill="#111111" />
        <polygon points="115,30 105,10 100,35" fill="#111111" />

        {/* Cabeza */}
        <circle cx="100" cy="50" r="22" fill="#111111" />

        {/* Ojos */}
        <circle cx="92" cy="48" r="3" fill="#ffa31a" />
        <circle cx="108" cy="48" r="3" fill="#ffa31a" />

        {/* Brillo ojos */}
        <circle cx="93" cy="47" r="1" fill="#ffffff" />
        <circle cx="109" cy="47" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
}
