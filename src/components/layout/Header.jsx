import "./Header.css";

function Header() {
  return (
    <header className="main-header">
      <div className="logo-container">
        <i>
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-ticket"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 5l0 2" />
            <path d="M15 11l0 2" />
            <path d="M15 17l0 2" />
            <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
          </svg>
        </i>
        <h1>TicketApp</h1>
      </div>

      <nav className="nav-container">
        <a href="#">Eventos</a>
        <a href="#">Mis tickets</a>
      </nav>

      <div className="header-actions">
        <div className="search-bar">
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7280"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </i>
          <input type="text" placeholder="Buscar eventos..." />
        </div>

        <button className="create-event-button">Crear Evento</button>
      </div>
    </header>
  );
}
export default Header;
