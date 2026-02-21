"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const PRODUCTS = [
  {
    name: "Castrol EDGE Pro",
    description: "Aceite sintético 5W-30 con certificación Dexos.",
    imageSrc: "/Aceites/aceite-1.jpg",
    imageAlt: "Bidones de aceite alineados en el lubricentro",
  },
  {
    name: "Motul 8100 X-clean",
    description: "Lubricante premium para motores europeos.",
    imageSrc: "/Aceites/aceite-2.jpg",
    imageAlt: "Vista del área de servicio con aceites Motul",
  },
  {
    name: "Shell Helix Ultra",
    description: "Desarrollado con tecnología PurePlus para alto rendimiento.",
    imageSrc: "/Aceites/aceite-3.jpg",
    imageAlt: "Detalle de productos Shell Helix en vitrina",
  },
  {
    name: "Filtros Mann-Filter",
    description: "Filtros de aceite y aire con garantía OEM.",
    imageSrc: "/Aceites/aceite-1.jpg",
    imageAlt: "Caja de filtros Mann-Filter en mostrador",
  },
  {
    name: "Baterías Bosch AGM",
    description: "Máxima potencia de arranque y vida útil extendida.",
    imageSrc: "/Aceites/aceite-2.jpg",
    imageAlt: "Batería Bosch AGM lista para instalación",
  },
] as const;

const COUNT = PRODUCTS.length;
const wrap = (n: number) => ((n % COUNT) + COUNT) % COUNT;

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => wrap(p + 1)), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="Producto anterior"
        onClick={() => setCurrent((p) => wrap(p - 1))}
        className="rounded-full bg-white/80 p-3 text-brand-700 shadow-md transition hover:bg-white"
      >
        <HiChevronLeft size={24} />
      </button>

      <div className="flex flex-1 items-center justify-center gap-4 overflow-hidden">
        {([-2, -1, 0, 1, 2] as const).map((offset) => {
          const product = PRODUCTS[wrap(current + offset)];
          const isActive = offset === 0;
          return (
            <div
              key={offset}
              className={`flex w-36 shrink-0 flex-col items-center rounded-xl bg-white/90 px-4 py-5 text-center shadow-lg shadow-brand-900/10 transition-all ${
                isActive ? "scale-105 opacity-100" : "scale-90 opacity-60"
              }`}
            >
              <div className="relative mb-4 h-24 w-full overflow-hidden rounded-md bg-brand-100">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 768px) 144px, 180px"
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-semibold text-brand-900">{product.name}</p>
              <p className="mt-2 text-xs text-brand-600">{product.description}</p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Producto siguiente"
        onClick={() => setCurrent((p) => wrap(p + 1))}
        className="rounded-full bg-white/80 p-3 text-brand-700 shadow-md transition hover:bg-white"
      >
        <HiChevronRight size={24} />
      </button>
    </div>
  );
}
