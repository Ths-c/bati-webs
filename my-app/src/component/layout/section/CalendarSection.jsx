import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

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
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 id="Agendar" className="text-2xl font-bold text-gray-800 mb-4">
        Agenda tu cita
      </h2>
      <div className="w-90 h-screen">
        <Cal
          namespace="consulta"
          calLink="bati-webs-e5vznt/consulta"
          style={{
            width: "100%",
            height: "100%",
          }}
          config={{
            layout: "month_view",
            useSlotsViewOnSmallScreen: true,
            theme: "light",
          }}
        />
      </div>
    </div>
  );
}
