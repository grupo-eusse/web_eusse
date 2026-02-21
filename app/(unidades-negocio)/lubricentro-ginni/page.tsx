import Image from "next/image";
import { montserrat, montserratBold } from "@/ui/fonts";
import ServiceContactForm from "@/ui/components/Companies/service_contact_form";
import ProductCarousel from "@/ui/components/Companies/product_carousel";

import heroLubri from "@/public/Heros/hero_lubri.jpg";

const SERVICES = [
  {
    title: "Cambio de aceite express",
    description: "Servicio completo con inspección de filtros, niveles y presión de llantas.",
    duration: "20 minutos",
    imageSrc: "/servicio_lubri/serv_lubri1.jpg",
  },
  {
    title: "Mantenimiento preventivo",
    description: "Chequeo de fluidos, batería, frenos y limpieza de inyectores según el kilometraje.",
    duration: "45 minutos",
    imageSrc: "/servicio_lubri/serv_lubri2.jpg",
  },
  {
    title: "Alineamiento y balanceo",
    description: "Tecnología laser para mantener la estabilidad y ahorro de combustible.",
    duration: "60 minutos",
    imageSrc: "/servicio_lubri/serv_lubri3.jpg",
  },
  {
    title: "Diagnóstico computarizado",
    description: "Escaneo de fallas electrónicas con equipos de última generación.",
    duration: "30 minutos",
    imageSrc: "/servicio_lubri/serv_lubri4.jpg",
  },
  {
    title: "Servicio de aire acondicionado",
    description: "Recarga de gas, revisión de fugas y limpieza del sistema.",
    duration: "50 minutos",
    imageSrc: "/servicio_lubri/serv_lubri5.jpg",
  },
  {
    title: "Detailing interior express",
    description: "Limpieza profunda de cabina con productos hipoalergénicos.",
    duration: "40 minutos",
    imageSrc: "/servicio_lubri/serv_lubri5.jpg",
  },
] as const;

const SCHEDULE = [
  { days: "Lunes a Viernes", hours: "7:00 a.m. – 6:00 p.m." },
  { days: "Sábado",          hours: "7:00 a.m. – 4:00 p.m." },
  { days: "Domingo",         hours: "Cerrado" },
] as const;

export default function LubricentroGinni() {
  return (
    <div className="bg-brand-50 text-brand-900">

      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={heroLubri}
          alt="Lubricentro Ginni - Cuidamos tu vehículo"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-900/70 via-brand-800/60 to-brand-600/50" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-6 px-4 text-center text-brand-50 md:items-start md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">Lubricentro Ginni</p>
          <h1 className={`${montserratBold.className} text-[clamp(2rem,4vw,4rem)] leading-tight`}>
            Cuidamos tu vehículo con precisión y productos certificados.
          </h1>
          <p className={`${montserrat.className} max-w-3xl text-[clamp(1rem,1.75vw,1.25rem)] text-brand-50/85`}>
            Servicios rápidos, asesoría especializada y marcas premium para mantener tu vehículo listo para cualquier ruta.
          </p>
          <a
            href="#contacto-ginni"
            className="rounded-md bg-brand-50 px-6 py-3 text-center text-sm font-semibold text-brand-900 transition hover:bg-brand-200"
          >
            Agenda tu servicio
          </a>
        </div>
      </section>

      {/* Ubicación */}
      <section className="bg-brand-50/60 py-16">
        <div className="mx-auto max-w-5xl rounded-md bg-white/90 p-8 text-center shadow-xl shadow-brand-900/10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Ubicación</p>
          <h2 className="mt-2 text-3xl font-bold">Encuéntranos en Naranjo de Alajuela</h2>
          <p className="mt-3 text-brand-700">
            75 m norte del Parque Central de Naranjo. Amplio estacionamiento y acceso inmediato desde la ruta 141.
          </p>
          <a
            href="tel:+50622571122"
            className="mt-6 mx-auto flex w-fit flex-col rounded-md bg-brand-50 px-6 py-3 shadow-sm shadow-brand-900/5 hover:bg-brand-100 transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">Teléfono</span>
            <span className="mt-1 font-semibold text-brand-900">+506 2257-1122</span>
          </a>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Servicios</p>
          <h2 className="mt-2 text-3xl font-bold">Todo lo que tu carro necesita</h2>
          <p className="mt-2 text-brand-700">
            Cada servicio se realiza en bahías dedicadas con herramientas calibradas y supervisión experta.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map(({ title, description, duration, imageSrc }) => (
            <div key={title} className="rounded-xl border border-brand-100/40 bg-white p-6 text-brand-900 shadow-lg shadow-brand-900/10">
              <div className="relative mb-4 h-36 w-full overflow-hidden rounded-lg bg-brand-100">
                <Image src={imageSrc} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-brand-800">{description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">Tiempo estimado</p>
              <p className="text-lg font-semibold text-brand-900">{duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section className="bg-brand-200/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">Productos destacados</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-900">Marcas con garantía</h2>
            <p className="mt-2 text-brand-700">
              Aceites, filtros y baterías con respaldo de fábrica para cualquier tipo de vehículo.
            </p>
          </div>
          <ProductCarousel />
        </div>
      </section>

      {/* Horarios */}
      <section className="bg-brand-50/70 py-16">
        <div className="mx-auto max-w-5xl rounded-md bg-white/90 p-8 shadow-xl shadow-brand-900/10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">Horario</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-900">Siempre a tiempo</h2>
          <ul className="mt-6 space-y-4">
            {SCHEDULE.map(({ days, hours }) => (
              <li key={days} className="flex flex-col rounded-md bg-brand-50 px-4 py-3 shadow-sm shadow-brand-900/5 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-brand-900">{days}</span>
                <span className="text-brand-700">{hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto-ginni" className="bg-linear-to-br from-brand-900 via-brand-800 to-brand-600 py-20 text-brand-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-2xl bg-white/5 p-8 shadow-2xl shadow-brand-900/30 sm:p-12">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-200">Agenda tu servicio</p>
            <h2 className="mt-2 text-3xl font-bold">Compartí tus datos y te contactamos</h2>
            <p className="mt-2 text-brand-100/80">
              Dejanos tu número telefónico, correo, tu nombre y el servicio que necesitás para asignarte un asesor.
            </p>
          </div>
          <ServiceContactForm
            variant="dark"
            apiPath="/api/lubricentro-contact"
            submitLabel="Enviar solicitud"
            successMessage="¡Gracias! Un asesor se pondrá en contacto muy pronto."
          />
        </div>
      </section>

    </div>
  );
}
