import { Link } from "react-router-dom";

import "./HomeEventCard.css";

export default function HomeEventCard({ event }) {
  const prices = event.tickets.map((ticket) => ticket.price);

  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  return (
    <article className="event-card-main">
      <Link to={`/event/${event._id}`} className="event-card-link">
        <img src={event.image} alt={event.name} className="image-content" />
        <h2>{event.name}</h2>
      </Link>

      <p>
        {new Date(event.date).toLocaleDateString("es-CL", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {" - "}
        {new Date(event.date).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>{event.location}</p>
      {minPrice !== null && (
        <h3 className="event-card-price">
          Desde{" $"}
          {minPrice.toLocaleString("es-ES", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
          })}
        </h3>
      )}
    </article>
  );
}
