import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  Link,
} from "react-router-dom";
import CountdownTimer from "../components/reservation/CountdownTimer";

const BASE = import.meta.env.VITE_API_URL;

export default function ReservationPage() {
  const [searchParams] = useSearchParams();
  const quantity = Number(searchParams.get("qty"));
  const ticketType = searchParams.get("type");

  const location = useLocation();
  const navigate = useNavigate();

  const url = `${BASE}reservations`;

  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!location.state?.eventData) {
    return <div>Error: Datos del evento no encontrados.</div>;
  }

  const event = location.state.eventData;

  // --- LÓGICA DE API ---
  useEffect(() => {
    const reservationKey = `reservation_${event._id}_${ticketType}_${quantity}`;

    const loadReservation = async () => {
      try {
        const storedReservation = sessionStorage.getItem(reservationKey);
        if (storedReservation) {
          setReservation(JSON.parse(storedReservation));
        } else {
          const reservationRequest = {
            event_id: event._id,
            items: [{ type: ticketType, quantity: quantity }],
          };
          const response = await fetch(url, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationRequest),
          });
          const data = await response.json();

          if (!response.ok) {
            console.error("Respuesta de error de la API:", data); // Muestra el error real
            throw new Error(
              data.message || data.detail || "Error al crear la reserva"
            );
          }

          setReservation(data);
          sessionStorage.setItem(reservationKey, JSON.stringify(data));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadReservation();
  }, [event._id, quantity, ticketType]);

  const handleTimeOut = async () => {
    const reservationKey = `reservation_${event._id}_${ticketType}_${quantity}`;
    sessionStorage.removeItem(reservationKey);
    if (reservation?.reservation_id) {
      try {
        await fetch(
          `https://tickets.grye.org/reservations/${reservation.reservation_id}`,
          {
            method: "DELETE",
          }
        );
      } catch (err) {
        console.error("Error al cancelar la reserva en el servidor:", err);
      }
    }
    alert("¡Tu tiempo se ha agotado! Tus asientos han sido liberados.");
    navigate(`/event/${event._id}`);
  };

  const handleCancelClick = async () => {
    const reservationKey = `reservation_${event._id}_${ticketType}_${quantity}`;
    sessionStorage.removeItem(reservationKey);
    if (reservation?.reservation_id) {
      try {
        await fetch(`${url}/${reservation.reservation_id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Error al cancelar la reserva en el servidor:", err);
      }
    }
    navigate(`/event/${event._id}`);
  };

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Cargando reserva...</h2>
        <p>Estamos confirmando el stock.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          ¡Ups! Hubo un problema
        </h2>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => navigate(`/event/${event._id}`)}
          className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
        >
          Volver a intentarlo
        </button>
      </div>
    );
  }

  const subtotal = reservation ? reservation.total_price : 0;
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const selectedTicket = event.tickets.find(
    (ticket) => ticket.type === ticketType
  );
  const price = selectedTicket ? selectedTicket.price : 0;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900 m-6 max-w-6xl mx-auto">
        Resumen de tu Compra
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-center">
            <CountdownTimer
              expirationTime={reservation.expires_at}
              onTimerEnd={handleTimeOut}
            />
          </div>
          <hr className="my-6" />
          <div>
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <p className="text-gray-600 mb-6">{event.location}</p>
            <fieldset className="border rounded-lg p-4 flex justify-between items-center">
              <legend className="text-lg font-semibold">Detalles</legend>
              <div>
                <h4 className="font-semibold">{ticketType}</h4>
                <p className="text-sm text-gray-600">
                  {quantity} x ${price.toLocaleString("es-CL")} c/u
                </p>
              </div>

              <span className="font-bold text-lg">
                ${subtotal.toLocaleString("es-CL")}
              </span>
            </fieldset>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Resumen de Costos
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span className="font-semibold">
                  ${subtotal.toLocaleString("es-CL")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>IVA(19%)</span>
                <span className="font-semibold">
                  ${iva.toLocaleString("es-CL")}
                </span>
              </div>
              <hr className="my-5" />
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="font-mono">
                  ${total.toLocaleString("es-CL")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 pt-2">
                <span>ID Reserva</span>
                <span className="font-mono">{reservation?.reservation_id}</span>
              </div>
              <div className="mt-6 flex flex-col gap-1 text-center">
                <Link
                  to={"/event/checkout/"}
                  state={{ reservationData: reservation, eventData: event }}
                  className="w-full bg-(--primary-color) text-white font-bold py-3 px-4 rounded-lg  hover:bg-red-700 transition-colors"
                >
                  Pagar
                </Link>
                <button
                  onClick={handleCancelClick}
                  className="cursor-pointer w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg  hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
