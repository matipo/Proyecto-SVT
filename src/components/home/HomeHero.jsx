import "./HomeHero.css";

export default function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Descubre Eventos Inolvidables</h1>
        <p>
          Encuentra conciertos, festivales, deportes y mas. Tu proxima gran
          experiencia esta a solo un click.
        </p>
      </div>
      <div className="hero-buttons">
        <button>Musica</button>
        <button>Deportes</button>
        <button>Teatro</button>
        <button>Conferencias</button>
      </div>
    </section>
  );
}
