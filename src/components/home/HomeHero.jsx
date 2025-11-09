import React, { useState, useEffect } from "react";

import "./HomeHero.css";

export default function HomeHero({
  searchQuery,
  onSearchQuery,
  selectedCategory,
  onCategoryChange,
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const categories = [
    { label: "🎵 Música", value: "music" },
    { label: "⚽ Deportes", value: "sports" },
    { label: "🎭 Teatro", value: "theater" },
    { label: "👨‍👩‍👧‍👦Conferencias", value: "conference" },
  ];

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchQuery(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Descubre Eventos Inolvidables</h1>
        <p>
          Encuentra conciertos, festivales, deportes y mas. Tu proxima gran
          experiencia esta a solo un click.
        </p>
      </div>

      <div className="search-bar-container">
        <svg className="search-icon-svg"></svg>

        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="input-icon"
            placeholder="Buscar eventos..."
            value={localQuery}
            onChange={handleInputChange} // <-- Se llama al escribir
          />
        </form>
      </div>

      <div className="hero-buttons">
        <button
          className={selectedCategory === "" ? "active" : ""}
          onClick={() => onCategoryChange("")}
        >
          Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat.value}
            className={selectedCategory === cat.value ? "active" : ""}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
