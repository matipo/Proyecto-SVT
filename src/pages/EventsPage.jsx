import { useParams, Link, useNavigate } from "react-router-dom";

import Hero from "../components/events/Hero";
import Body from "../components/events/Body.jsx";

import mockEventsData from "../components/home/mockEvents.js";

export default function EventsPage() {
  const { eventId } = useParams();

  const event = mockEventsData.data.find((e) => e._id === eventId);

  if (!event) {
    return (
      <div>
        <h2>Evento no encontrado</h2>
        <p>El evento con ID "{eventId}" no existe.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div>
      <Hero name={event.name} image={event.image} />
      <Body />

      <hr />
    </div>
  );
}
