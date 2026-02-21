const OFFERINGS = [
  {
    title: "Despacho certificado",
    detail:
      "Entrega de diésel y gasolina autorizado por MINAE para abastecer flotillas sin visitar la estación.",
  },
  {
    title: "Inventario en tiempo real",
    detail:
      "Reportes digitales con firma electrónica para controlar consumo y facturación por centro de costo.",
  },
  {
    title: "Cobertura nacional",
    detail:
      "Unidades móviles equipadas con medidores calibrados que llegan directo a plantas, fincas o proyectos.",
  },
] as const;

export default function PeddlerOfferings() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">¿Qué incluye?</p>
        <h2 className="mt-2 text-3xl font-bold">Propuesta integral de suministro</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {OFFERINGS.map(({ title, detail }) => (
          <div key={title} className="rounded-md bg-white/90 p-6 shadow-lg shadow-brand-900/10">
            <h3 className="text-xl font-semibold text-brand-900">{title}</h3>
            <p className="mt-3 text-sm text-brand-700">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

