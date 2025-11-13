import React, { useState, useEffect } from "react";
import HomeHero from "../components/home/HomeHero";
import HomeEventList from "../components/home/HomeEventList";

const BASE = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentlyPage, setCurrentlyPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // Hook que obtiene datos de la API cuando se cambia de pagina
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
    params.append("page", currentlyPage.toString());

    const url = `${BASE}events?${params.toString()}`;

    // llamada de la API
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
        setTotalPage(data.total || 0);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
        setEvents([]);
        setTotalPage(1);
        setIsLoading(false);
      });
  }, [searchQuery, selectedCategory, currentlyPage, BASE]);

  //cambia las categorias y reinicia busquea y pagina
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentlyPage(1);
  };

  //logica para hacer que en cada pagina haya 20 eventos
  const handleTotalPages = (total) => {
    return Math.ceil(total / 20);
  };

  const handleNextPage = () => {
    setCurrentlyPage((page) => Math.min(page + 1, 3));
  };

  const handlePreviousPage = () => {
    setCurrentlyPage((page) => Math.max(page - 1, 1));
  };

  //componentes
  return (
    <div>
      <HomeHero
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <HomeEventList
        event={events}
        isLoading={isLoading}
        isError={isError}
        handleNextButton={handleNextPage}
        handlePreviousButton={handlePreviousPage}
        currentlyPage={currentlyPage}
        totalPage={handleTotalPages(totalPage)}
      />
    </div>
  );
}
