import { Link } from "react-router-dom";
const IMAGEN_DEFECTO = "https://placehold.co/600x400?text=Imagen+no+disponible";
export default function HomeEventCard({ event }) {
  const prices = event.tickets.map((ticket) => ticket.price);

  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  return (
    <article className="flex flex-col h-115 w-full max-w-380 overflow-hidden bg-white p-2 rounded-lg shadow-xl duration-300 hover:scale-105 ">
      <Link to={`/event/${event._id}`}>
        <img
          // Funcionalidad para cuando no hay imagen
          src={event.image || IMAGEN_DEFECTO}
          alt={event.name}
          onError={(e) => {
            e.target.src = IMAGEN_DEFECTO;
            e.target.onerror = null;
          }}
          className="block h-full max-h-74 w-full min-w-9xs object-cover aspect-auto rounded-lg pointer-events-none"
        />
        <h2 className="text-2xl w-auto font-bold capitalize ">{event.name}</h2>
        <p className="mb-1">{event.category}</p>

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
