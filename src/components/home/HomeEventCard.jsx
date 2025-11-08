import { Link } from "react-router-dom";

export default function HomeEventCard({ event }) {
  const prices = event.tickets.map((ticket) => ticket.price);

  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  return (
    <article className="flex flex-col w-full max-w-380 overflow-hidden bg-white p-2 rounded-lg shadow-xl hover:bg-(--terciary-color) ">
      <Link to={`/event/${event._id}`}>
        <img
          src={event.image}
          alt={event.name}
          className="block w-full object-cover aspect-auto rounded-lg pointer-events-none"
        />
        <h2 className="mb-1 text-2xl w-auto font-bold">{event.name}</h2>

        <p className="text-(--terciary-text-color) text-m">
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
        <p className="text-(--terciary-text-color) text-m">{event.location}</p>
        {minPrice !== null && (
          <h3 className="font-bold text-xl m-auto">
            Desde{" $"}
            {minPrice.toLocaleString("es-ES", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0,
            })}
          </h3>
        )}
      </Link>
    </article>
  );
}
