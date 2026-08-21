import FlameLogo from "../preloader/FlameLogo";

export default function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-b from-ember-surface to-ember-deep text-white pt-12 pb-8 mt-10">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-flame-orange/80 to-transparent" />

      <div className="container mx-auto text-center px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="animate-flicker drop-shadow-[0_0_18px_rgba(255,107,26,0.5)]">
            <FlameLogo />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Ignite<span className="text-fire">X</span>
            </h3>
            <p className="text-sm text-stone-400">Convertimos tus ideas en realidad.</p>
          </div>
        </div>

        <p className="mt-8 text-sm text-stone-500">
          &copy; {new Date().getFullYear()} IgniteX. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
