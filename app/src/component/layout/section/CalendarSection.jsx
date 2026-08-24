import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import SplitText from "../../effect/SplitText";

const CAL_OWNER_EMAIL = "ignitex.web@gmail.com";
// Evento Cal.com creado con la cuenta de CAL_OWNER_EMAIL. Si cambias de cuenta, actualiza calLink en Cal.com dashboard -> Event Types -> Copy link
const CAL_LINK = import.meta.env.VITE_CAL_LINK || "ignitex-e5vznt/consulta";

export default function CalendarSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "consulta",
      });

      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 section-glow">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px divider-fire w-[92vw] lg:w-[80vw]"
      />
      <div id="Agendar" className="scroll-mt-32">
        <SplitText
          text="Agenda tu cita"
          tag="h2"
          className="text-flame-pale text-3xl md:text-5xl inline-block font-extrabold uppercase tracking-tight mb-10 drop-shadow-[0_0_25px_rgba(255,107,26,0.35)]"
          delay={40}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 50, scale: 0.8 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>

      <div className="relative w-full max-w-4xl">
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(229,56,44,0.18),transparent_70%)] blur-2xl"
        />
        <div className="relative rounded-[1.75rem] border border-[rgba(255,107,26,0.28)] bg-ember-surface/70 backdrop-blur-xl p-4 md:p-6 shadow-[0_25px_80px_-30px_rgba(229,56,44,0.5)]">
          <div className="w-full h-[75vh] min-h-[520px]">
            <Cal
              namespace="consulta"
              calLink={CAL_LINK}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
              }}
              config={{
                layout: "month_view",
                useSlotsViewOnSmallScreen: true,
                theme: "dark",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
