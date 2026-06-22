import Bat from '../../layout/preloader/Bat';

export default function FooterSection() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex items-center">
          <Bat flying={false} />
          <div className="flex flex-col items-start ml-4">
            <h3 className="text-2xl font-bold">Bati Web</h3>
            <p className="text-sm mb-4">Convertimos tus ideas en realidad.</p>
          </div>
        </div>

        <p className="text-left ml-2">
          &copy; {new Date().getFullYear()} Bati Web. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}