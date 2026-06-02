

export default function FooterSection() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Bati Web. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}