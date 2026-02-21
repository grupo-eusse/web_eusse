"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const STEPS = [
  {
    headline: "¿Qué es Peddler?",
    description:
      "Es el servicio que permite a nuestras gasolineras llevar combustible hasta tu empresa. Cumplimos con las normas de transporte, sellos homologados y control volumétrico para que recibas el producto con la misma calidad de la estación.",
  },
  {
    headline: "¿Qué ofrece?",
    description:
      "Planificación semanal, unidades con GPS y choferes certificados. Además, podemos instalar tanques móviles temporales o alimentar maquinaria de forma directa en proyectos remotos.",
  },
  {
    headline: "¿Para quién es?",
    description:
      "Ideal para constructoras, empresas agrícolas, operaciones logísticas y cualquier negocio que requiera cargar decenas de vehículos sin detener su operación.",
  },
] as const;

const COUNT = STEPS.length;
const wrap = (n: number) => ((n % COUNT) + COUNT) % COUNT;

// Shared state — keeps Magnify duplicate panes in sync and prevents double-tick intervals.
const stepStore = new Map<string, number>();
const stepListeners = new Map<string, Set<() => void>>();
const intervals = new Map<string, { refCount: number; id: ReturnType<typeof setInterval> | null }>();

function getStep(key: string) { return stepStore.get(key) ?? 0; }

function setStep(key: string, n: number) {
  stepStore.set(key, wrap(n));
  stepListeners.get(key)?.forEach((fn) => fn());
}

function subscribe(key: string, fn: () => void) {
  if (!stepListeners.has(key)) stepListeners.set(key, new Set());
  stepListeners.get(key)!.add(fn);
  return () => stepListeners.get(key)?.delete(fn);
}

export default function PeddlerExplainer() {
  const pathname = usePathname();
  const [step, setLocalStep] = useState(() => getStep(pathname));

  useEffect(() => {
    const unsubscribe = subscribe(pathname, () => setLocalStep(getStep(pathname)));
    setLocalStep(getStep(pathname));

    if (!intervals.has(pathname)) intervals.set(pathname, { refCount: 0, id: null });
    const entry = intervals.get(pathname)!;
    entry.refCount++;
    if (!entry.id) entry.id = setInterval(() => setStep(pathname, getStep(pathname) + 1), 5500);

    return () => {
      unsubscribe();
      entry.refCount--;
      if (entry.refCount <= 0 && entry.id) {
        clearInterval(entry.id);
        intervals.delete(pathname);
      }
    };
  }, [pathname]);

  return (
    <section className="bg-brand-200/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">¿Cómo funciona?</p>
          <h2 className="mt-2 text-3xl font-bold">Servicio Peddler explicado</h2>
          <p className="mt-2 max-w-3xl text-sm text-brand-700">
            Abastecimiento móvil para flotillas, proyectos y operaciones que no pueden detenerse.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Paso anterior"
            onClick={() => setStep(pathname, step - 1)}
            className="rounded-full bg-white/80 p-3 text-brand-700 shadow-md transition hover:bg-white"
          >
            <HiChevronLeft size={24} />
          </button>

          <div className="flex flex-1 items-center justify-center gap-4 overflow-hidden">
            {([-1, 0, 1] as const).map((offset) => {
              const item = STEPS[wrap(step + offset)];
              const isActive = offset === 0;
              return (
                <div
                  key={offset}
                  className={`w-72 shrink-0 rounded-md bg-white/90 px-5 py-6 text-center shadow-lg shadow-brand-900/10 transition-all ${
                    isActive ? "scale-105 opacity-100" : "scale-95 opacity-60"
                  }`}
                >
                  <h3 className="mt-2 text-xl font-bold text-brand-900">{item.headline}</h3>
                  <p className="mt-3 text-sm text-brand-700">{item.description}</p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Paso siguiente"
            onClick={() => setStep(pathname, step + 1)}
            className="rounded-full bg-white/80 p-3 text-brand-700 shadow-md transition hover:bg-white"
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

