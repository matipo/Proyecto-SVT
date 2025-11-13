import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-6 border-b border-gray-300">
      <div className="flex items-center gap-2 justify-self-start py-4">
        <a href="/" className="text-black no-underline flex gap-1">
          <img src="./logo.svg" alt="logo" />
          <h1 className="text-2xl font-semibold">TicketApp</h1>
        </a>
      </div>

      <nav className="justify-self-center flex items-center">
        <Link to={"/"} className="text-black mx-4 no-underline">
          Eventos
        </Link>
        <Link to={"purchase-history"} className="text-black mx-4 no-underline">
          Historial de compras
        </Link>
      </nav>

      <div className="flex items-center gap-4 justify-self-end">
        <Link
          to={"create-event/"}
          className="bg-(--primary-color) text-white px-4 py-2 rounded-full text-base hover:opacity-90 transition"
        >
          Crear Evento
        </Link>
      </div>
    </header>
  );
}
