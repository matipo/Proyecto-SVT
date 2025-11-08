import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import EventHero from "../components/events/EventHero.jsx";
import EventBody from "../components/events/EventBody.jsx";

const BASE = import.meta.env.VITE_API_URL;

export default function EventsPage() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    fetch(BASE + "events/" + eventId, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response === 404) {
          throw new Error("Evento no encontrado");
        }

        if (!response.ok) {
          throw new Error("La respuesta de la red no fue 'ok'");
        }

        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setIsLoading(false);
      })
      .then((error) => {
        setIsError(error);
        setIsLoading(false);
      });
  }, [eventId, BASE]);

  if (isLoading) {
    return <h1>Cargando evento...</h1>;
  }

  if (isError) {
    return (
      <div>
        <h1>Error: {isError.message}</h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <p>El evento con ID "{eventId}" no existe.</p>
      </div>
    );
  }
  return (
    <div background-color="#f6f6f8">
      <EventHero name={event.name} image={event.image} />

      <EventBody event={event} />
    </div>
  );
}
