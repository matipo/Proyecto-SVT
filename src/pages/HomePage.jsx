import React, { useState, useEffect } from "react";
import HomeHero from "../components/home/HomeHero";
import HomeEventList from "../components/home/HomeEventList";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);

    const params = new URLSearchParams();

    if (searchQuery) {
      params.append("q", searchQuery);
    }
    if (selectedCategory) {
      params.append("category", selectedCategory);
    }

    params.append("limit", "20");
    params.append("page", "1");

    const url = `${BASE}events?${params.toString()}`;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Evento no encontrado");
        }
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue 'ok'");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
        setEvents([]);
        setIsLoading(false);
      });
  }, [searchQuery, selectedCategory, BASE]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <div>
      <HomeHero
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange} // Pasa la nueva función
      />
      <HomeEventList event={events} isLoading={isLoading} isError={isError} />
    </div>
  );
}
