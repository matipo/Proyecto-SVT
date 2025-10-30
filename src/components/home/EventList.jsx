import { useState } from "react";
import { useEffect } from "react";

import "./EventList.css";

import mockEventsData from "./mockEvents.js";

import EventCard from "./EventCard.jsx";

export default function EventList() {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  // Todo esto no es importante, solo es simulacion de que nos conectamos a la API
  useEffect(() => {
    try {
      setTimeout(() => {
        setApiData(mockEventsData);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="event-list-container">
      <h1>Próximos Eventos</h1>

      <div className="event-list-content">
        {apiData &&
          apiData.data.map((event) => <EventCard key={event._id} {...event} />)}
      </div>
    </div>
  );
}
