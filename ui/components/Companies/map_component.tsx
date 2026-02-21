"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { usePathname } from "next/navigation";
import { MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import StationHours from "@/ui/components/Companies/station_hours";

type LatLng = google.maps.LatLngLiteral;

type Place = {
  id: string;
  label: string;
  position: LatLng;
  zoom?: number;
};

const PLACES: Place[] = [
  { id: "eusse-naran",   label: "Eusse Naranjo",   position: { lat: 10.077661627131503, lng: -84.41365297404626 }, zoom: 16 },
  { id: "eusse-barranc", label: "Eusse Barranca",  position: { lat: 9.977690848443231,  lng: -84.72733399281478 }, zoom: 16 },
  { id: "eusse-guap",    label: "Eusse Guápiles",  position: { lat: 10.203632312312799, lng: -83.77426686929927 }, zoom: 16 },
];

const GENERAL_VIEW_ID = "map-general";
const VALID_SELECTIONS = new Set([GENERAL_VIEW_ID, ...PLACES.map((p) => p.id)]);

const ID_TO_STATION: Record<string, "NARANJO" | "BARRANCA" | "GUAPILES"> = {
  "eusse-naran":   "NARANJO",
  "eusse-barranc": "BARRANCA",
  "eusse-guap":    "GUAPILES",
};

const DEFAULT_CENTER: LatLng = { lat: 9.941, lng: -84.120 };
const DEFAULT_ZOOM = 9;

// Module-level pub/sub so both magnifier trees stay in sync per route.
const selectionByPath = new Map<string, string>();
const selectionListeners = new Set<() => void>();

function normalizeSelection(sel: string | undefined) {
  return sel && VALID_SELECTIONS.has(sel) ? sel : GENERAL_VIEW_ID;
}
function readSelection(pathname: string) {
  return normalizeSelection(selectionByPath.get(pathname));
}
function writeSelection(pathname: string, sel: string) {
  selectionByPath.set(pathname, normalizeSelection(sel));
  selectionListeners.forEach((fn) => fn());
}

type CopyConfig = {
  eyebrow: string;
  title: string;
  description: string;
  quickSelectLabel: string;
  activeHint: string;
  generalHint: string;
};

const DEFAULT_COPY: CopyConfig = {
  eyebrow: "Estaciones",
  title: "Encuentra tu estación más cercana",
  description: "Selecciona una estación para centrar el mapa y revisar sus horarios.",
  quickSelectLabel: "Selección rápida",
  activeHint: "Estación activa · ver horarios abajo",
  generalHint: "Explorá todas las estaciones en el mapa",
};

export default function MapComponent({ copy }: { copy?: Partial<CopyConfig> }) {
  const pathname = usePathname();
  const ct = { ...DEFAULT_COPY, ...copy };
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selected, setSelectedState] = useState<string>(() => readSelection(pathname));

  useEffect(() => {
    const sync = () => setSelectedState(readSelection(pathname));
    selectionListeners.add(sync);
    sync();
    return () => { selectionListeners.delete(sync); };
  }, [pathname]);

  const setSelected = useCallback(
    (sel: string) => writeSelection(pathname, sel),
    [pathname],
  );

  // Initialize map
  useEffect(() => {
    let active = true;

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        v: "weekly",
        mapIds: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ? [process.env.NEXT_PUBLIC_GOOGLE_MAP_ID] : undefined,
      });

      const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await importLibrary("marker")) as google.maps.MarkerLibrary;
      if (!active) return;

      mapRef.current = new Map(containerRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
      });

      PLACES.forEach((p) => {
        const marker = new AdvancedMarkerElement({ map: mapRef.current!, position: p.position, title: p.label });
        marker.addListener("gmp-click", () => setSelected(p.id));
      });
    }

    init();
    return () => { active = false; };
  }, [setSelected]);

  // Pan/zoom on selection change
  useEffect(() => {
    if (!mapRef.current) return;
    if (selected === GENERAL_VIEW_ID) {
      mapRef.current.setCenter(DEFAULT_CENTER);
      mapRef.current.setZoom(DEFAULT_ZOOM);
      return;
    }
    const place = PLACES.find((p) => p.id === selected);
    if (place) {
      mapRef.current.setCenter(place.position);
      mapRef.current.setZoom(place.zoom ?? 16);
    }
  }, [selected]);

  const activePlace = PLACES.find((p) => p.id === selected);
  const stationKey = activePlace ? ID_TO_STATION[activePlace.id] : undefined;

  return (
    <section id="mapa-estaciones" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex w-full flex-col gap-8">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* Panel de control */}
          <div className="m-4 flex-1 rounded-md border border-brand-50 bg-brand-50/90 p-6 shadow-md backdrop-blur-sm lg:basis-[40%] lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">{ct.eyebrow}</p>
            <h3 className="mt-2 text-3xl font-extrabold text-brand-900">{ct.title}</h3>
            <p className="mt-1 text-sm text-brand-600">{ct.description}</p>

            <div className="mt-6 flex flex-col gap-4">
              <label htmlFor="station-select" className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
                {ct.quickSelectLabel}
              </label>

              <div className="relative">
                <select
                  id="station-select"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full appearance-none rounded-md border border-brand-50 bg-brand-50/90 px-4 py-3 text-base font-semibold text-brand-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                >
                  <option value={GENERAL_VIEW_ID}>Mapa general</option>
                  {PLACES.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <MdKeyboardArrowDown size={24} className="pointer-events-none absolute inset-y-0 right-4 my-auto text-brand-700" />
              </div>

              {activePlace ? (
                <>
                  <div className="flex items-start gap-3 rounded-md border border-brand-50 bg-brand-200/70 p-4 shadow-inner">
                    <MdLocationOn size={24} className="mt-0.5 shrink-0 text-brand-700" />
                    <div>
                      <p className="text-sm font-semibold text-brand-900">{activePlace.label}</p>
                      <p className="text-xs uppercase tracking-wide text-brand-600">{ct.activeHint}</p>
                    </div>
                  </div>

                  <a
                    href={`https://www.waze.com/ul?ll=${activePlace.position.lat.toFixed(6)}%2C${activePlace.position.lng.toFixed(6)}&navigate=yes&zoom=${activePlace.zoom ?? 16}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#33ccff] px-4 py-3 text-sm font-semibold text-[#053b6b] shadow-md transition hover:bg-[#20b5ea] focus:outline-none focus:ring-2 focus:ring-[#33ccff] focus:ring-offset-2"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#33ccff]" fill="currentColor">
                        <path d="M12 3c4.97 0 9 3.582 9 8 0 3.71-2.804 6.916-6.694 7.733-.32.067-.553.34-.566.666l-.016.601a1 1 0 0 1-1.448.88l-1.482-.74-1.482.74a1 1 0 0 1-1.448-.88l-.016-.601c-.013-.326-.246-.599-.566-.666C5.804 17.916 3 14.71 3 11c0-4.418 4.03-8 9-8Zm-3.25 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm5.5 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
                      </svg>
                    </span>
                    Abrir en Waze
                  </a>
                </>
              ) : (
                <div className="flex items-start gap-3 rounded-md border border-brand-50 bg-brand-50/80 p-4 shadow-inner">
                  <MdLocationOn size={24} className="mt-0.5 shrink-0 text-brand-700" />
                  <div>
                    <p className="text-sm font-semibold text-brand-900">Vista general activa</p>
                    <p className="text-xs uppercase tracking-wide text-brand-600">{ct.generalHint}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mapa */}
          <div className="w-full px-4 pb-4 lg:my-4 lg:basis-[60%] lg:px-0 lg:pb-0">
            <div
              ref={containerRef}
              className="h-70 w-full overflow-hidden rounded-md border border-brand-200 bg-brand-200 shadow-lg sm:h-85 lg:h-105"
            />
          </div>
        </div>

        {stationKey && <StationHours estacion={stationKey} />}

      </div>
    </section>
  );
}
