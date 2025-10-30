import { Link } from "react-router-dom";

import "./EventCard.css";

export default function EventCard({
  _id,
  name,
  category,
  date,
  location,
  image,
}) {
  const formattedDate = new Date(date).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Link to={`/event/${_id}`} className="event-card-link">
      <article className="event-card-main">
        <img src={image} alt="event-image" className="image-content" />

        <h2>{name}</h2>
        <p>{formattedDate}</p>
        <p>{location}</p>
      </article>
    </Link>
  );
}
