import React, { useState, useEffect } from "react";

import "./HomeEventList.css";

import HomeEventCard from "./HomeEventCard.jsx";

export default function HomeEventList() {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(BASE + "events?limit=20&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEventData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }
  if (!eventData || eventData.length === 0) {
    return <div>No se encontaron eventos.</div>;
  }

  return (
    <div className="event-list-container">
      <h1>Próximos Eventos</h1>

      <div className="event-list-content">
        {eventData.map((event) => (
          <HomeEventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
