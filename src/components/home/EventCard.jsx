import "./EventCard.css";

export default function EventCard({ name, category, date, location, image }) {
  const formattedDate = new Date(date).toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <section className="event-card-main">
      <img src={image} alt="event-image" className="image-content" />

      <h2>{name}</h2>
      <p>{formattedDate}</p>
      <p>{location}</p>
    </section>
  );
}
