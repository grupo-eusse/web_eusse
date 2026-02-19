'use client'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
interface LinkItem {
  href: string;
  label: string;
}

interface BurgerBtnProps {
  links: LinkItem[]; 
}

export default function Burgerbtn({ links }: BurgerBtnProps){
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname();
    const [companiesInView, setCompaniesInView] = useState(false);

    /*
    Esta función tiene el fin de remarcar en el navbar el enlace de "Compañías del Grupo" 
    cuando el usuario esté viendo esa sección en la página de inicio. Si el usuario no está 
    en la página de inicio, o si la sección no está visible, el enlace se mostrará como inactivo.
    */
    useEffect(() => {
      if (pathname !== '/') {
        setCompaniesInView(false);
        return;
      }

      const el = document.getElementById('companias-del-grupo');
      if (!el) {
        setCompaniesInView(false);
        return;
      }

      const obs = new IntersectionObserver(
        (entries) => setCompaniesInView(entries.some((e) => e.isIntersecting)),
        { threshold: 0.35 }
      );

      obs.observe(el);
      return () => obs.disconnect();
    }, [pathname]);

    const isActive = (href: string) => {
      const [base, frag] = href.split('#');
      const baseHref = base || '/';
      const hrefHash = frag ? `#${frag}` : '';

      if (baseHref === '/' && hrefHash === '#companias-del-grupo')
        return pathname === '/' && companiesInView;
      if (baseHref === '/') return pathname === '/' && !companiesInView;
      return pathname.startsWith(baseHref);
    };

  // Enfocar primer link al abrir
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  // Cerrar si hacen click fuera del panel
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);


    return(
    <div>
        <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(v => !v)}
        className="relative h-10 w-10 shrink-0 grid place-items-center rounded-lg
                    bg-transparent p-0 hover:bg-slate-100 transition
                    appearance-none focus:outline-none sm:hidden"
        >
            {/*Animación importada de otro proyecto personal, btn_burger -> btn_cerrar*/}
        <span className="relative block h-5 w-6 pointer-events-none subpixel-antialiased">
            <span
            className={`absolute left-1/2 top-[30%] h-0.5 w-6 -translate-x-1/2 -translate-y-1/2
                        rounded bg-brand-900 transform-gpu transition-transform duration-300 will-change-transform
                        ${open ? "top-[50%] rotate-45 " : "-translate-y-1.25"}`}
            />

            <span
            className={`absolute left-1/2 top-[53%] h-0.5 w-6 -translate-x-1/2 -translate-y-1/2
                        rounded bg-brand-900 transition-transform duration-200 transform-gp
                        ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2
                        rounded bg-brand-900 transition-transform duration-300 transform-gpu will-change-transform
                        ${open ? "-rotate-45" : "translate-y-1.25"}`}
            />
        </span>
        </button>
        <div className="absolute left-0 right-0 top-full md:hidden">
          <div
            className={`origin-top overflow-hidden bg-white/95 backdrop-blur border-b shadow-sm
                        transition-all duration-300
                        ${open ? "max-h-[60vh] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"}`}
          >
            <ul className="py-3 px-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-lg px-3 py-2 ${
                    isActive(l.href)
                        ? "text-accent font-semibold "
                        : "text-brand-900"}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
    );

}
