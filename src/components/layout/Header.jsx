export default function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center mx-6 border-b border-gray-300">
      <div className="flex items-center gap-2 justify-self-start py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ea2831"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class=" flex"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 5l0 2" />
          <path d="M15 11l0 2" />
          <path d="M15 17l0 2" />
          <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
        </svg>
        <a href="/" className="text-black no-underline">
          <h1 className="text-2xl font-semibold">TicketApp</h1>
        </a>
      </div>

      <nav className="justify-self-center flex items-center">
        <a href="/cart" className="text-black mx-4 no-underline">
          Eventos
        </a>
        <a href="#" className="text-black mx-4 no-underline">
          Mis tickets
        </a>
      </nav>

      <div className="flex items-center gap-4 justify-self-end">
        <button className="bg-(--primary-color) text-white px-4 py-2 rounded-full text-base hover:opacity-90 transition">
          Crear Evento
        </button>
      </div>
    </header>
  );
}
