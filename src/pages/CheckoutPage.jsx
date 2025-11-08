import { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const quantity = searchParams.get("qty");
  const ticketType = searchParams.get("type");

  useEffect(() => {
    const loadEventData = async () => {
      try {
        if (location.state && location.state.eventData) {
          setEvent(location.state.eventData);
        } else {
          const response = await fetch(`/event/checkout/${id}`);
          if (!response.ok) throw new Error("Evento no encontrado");
          const data = await response.json();
          setEvent(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [id, location.state]);

  let ticketPrice = 0;
  let total = 0;

  if (event) {
    const selectedTicket = event.tickets.find((t) => t.type === ticketType);

    if (selectedTicket) {
      ticketPrice = selectedTicket.price;

      total = ticketPrice * quantity;
    } else {
      setError("El tipo de ticket no es válido.");
    }
  }

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Resumen de tu Compra</h1>
      <h2>{event.name}</h2>
      <p>
        Entradas: {quantity} x {ticketType} (${ticketPrice} c/u)
      </p>

      <h3>Total a Pagar: ${total}</h3>
    </div>
  );
}
