

"use client";

type StationKey = "NARANJO" | "BARRANCA" | "GUAPILES";

type DayKey = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo";

type DaySchedule =
  | { type: "open"; open: string; close: string }
  | { type: "24h" }
  | { type: "closed" };

type WeeklySchedule = Record<DayKey, DaySchedule>;

const SCHEDULES: Record<StationKey, WeeklySchedule> = {
  NARANJO: {
    Lunes:     { type: "open", open: "05:00", close: "23:00" },
    Martes:    { type: "open", open: "05:00", close: "23:00" },
    Miércoles: { type: "open", open: "05:00", close: "23:00" },
    Jueves:    { type: "open", open: "05:00", close: "23:00" },
    Viernes:   { type: "open", open: "05:00", close: "23:59" },
    Sábado:    { type: "24h" },
    Domingo:   { type: "open", open: "06:00", close: "22:00" },
  },
  BARRANCA: {
    Lunes: { type: "24h" }, Martes: { type: "24h" }, Miércoles: { type: "24h" },
    Jueves: { type: "24h" }, Viernes: { type: "24h" }, Sábado: { type: "24h" }, Domingo: { type: "24h" },
  },
  GUAPILES: {
    Lunes:     { type: "open", open: "06:00", close: "22:00" },
    Martes:    { type: "open", open: "06:00", close: "22:00" },
    Miércoles: { type: "open", open: "06:00", close: "22:00" },
    Jueves:    { type: "open", open: "06:00", close: "22:00" },
    Viernes:   { type: "open", open: "06:00", close: "23:00" },
    Sábado:    { type: "open", open: "07:00", close: "23:00" },
    Domingo:   { type: "open", open: "07:00", close: "22:00" },
  },
};

const DISPLAY_NAME: Record<StationKey, string> = {
  NARANJO:  "Eusse Naranjo",
  BARRANCA: "Eusse Barranca",
  GUAPILES: "Eusse Guápiles",
};

const DAYS: DayKey[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const JS_DAY_TO_KEY: DayKey[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function formatSlot(slot: DaySchedule): string {
  if (slot.type === "24h") return "Abierto 24h";
  if (slot.type === "closed") return "Cerrado";
  return `${slot.open} – ${slot.close}`;
}

export interface HorariosEstacionProps {
  estacion: StationKey;
  note?: string;
}

const COLUMNS: [DayKey[], string][] = [
  [DAYS.slice(0, 4), "Lunes a Jueves"],
  [DAYS.slice(4),    "Viernes a Domingo"],
];

export default function StationHours({
  estacion,
  note = "Feriados: horario regular salvo comunicación oficial.",
}: HorariosEstacionProps) {
  const schedule = SCHEDULES[estacion];
  const today = JS_DAY_TO_KEY[new Date().getDay()];

  return (
    <section
      aria-labelledby="horarios-title"
      className="mt-2 rounded-2xl bg-brand-50/90 p-4 shadow-sm backdrop-blur"
    >
      <div className="mb-3">
        <h2 id="horarios-title" className="text-lg font-semibold text-brand-900">
          Horarios – {DISPLAY_NAME[estacion]}
        </h2>
        <p className="text-xs text-brand-600">{note}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        {COLUMNS.map(([days, label]) => (
          <ul
            key={label}
            role="list"
            aria-label={`Horarios ${label} de ${DISPLAY_NAME[estacion]}`}
            className="flex-1 space-y-2"
          >
            {days.map((day) => {
              const isToday = day === today;
              return (
                <li
                  key={day}
                  aria-current={isToday ? "date" : undefined}
                  className={`flex items-center justify-between rounded-xl border p-3 transition ${
                    isToday ? "border-brand-500/60 bg-brand-200/60" : "border-brand-200 bg-brand-50"
                  }`}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-brand-900" : "text-brand-800"}`}>
                    {day}
                    {isToday && (
                      <span className="ml-2 rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-semibold text-brand-700">
                        Hoy
                      </span>
                    )}
                  </span>
                  <span className={`text-sm font-medium ${schedule[day].type === "closed" ? "text-brand-800" : "text-brand-900"}`}>
                    {formatSlot(schedule[day])}
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
