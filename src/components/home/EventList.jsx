import { useState } from "react";
import { useEffect } from "react";

import "./EventList.css";

//Importacion del API (En este caso un .js porque el api no funciona xd)
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
    <div className="main-container">
      <h1>Próximos Eventos</h1>

      <div className="event-list-container">
        {apiData &&
          apiData.data.map((event) => <EventCard key={event._id} {...event} />)}
      </div>
    </div>
  );
}
