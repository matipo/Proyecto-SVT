import { useState } from "react";

import { Link } from "react-router-dom";

export default function PurchaseTickets({ event }) {
  const [count, setCount] = useState(1);

  const primerTicket =
    event.tickets && event.tickets.length > 0 ? event.tickets[0].type : "";

  const [ticketType, setTicketType] = useState(primerTicket);

  const selectedTicket = event.tickets.find(
    (ticket) => ticket.type === ticketType
  );
  const price = selectedTicket ? selectedTicket.price : 0;
  const subtotal = price * count;
  const iva = subtotal * 0.19;

  // Funcion para incrementar el contador
  const handleIncrease = () => {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  // Fuincion para decrecer el contador
  const handleDecrease = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="flex flex-col m-5 bg-white shadow-xl mx-auto px-4 py-4 max-w-1xl rounded-2xl">
      <h2 className="text-2xl font-black mb-4">Comprar Entradas</h2>

      <div className="flex flex-col">
        <label
          htmlFor="ticket"
          className="text-md text-(--terciary-text-color) font-semibold mb-1"
        >
          Tipo de entrada
        </label>
        <select
          id="ticket"
          name="ticket"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
          className="ml-2 bg-(--terciary-color) rounded-2xl py-2 px-2"
        >
          {event.tickets.map((ticket) => (
            <option key={ticket.type} value={ticket.type} className="">
              {ticket.type} -{" $"}
              {new Intl.NumberFormat("es-CL").format(ticket.price)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label
          htmlFor="quantity"
          className="text-md text-(--terciary-text-color) font-semibold mb-1"
        >
          Cantidad
        </label>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleDecrease}
            className="bg-(--terciary-color) text-gray-700 h-10 w-10 rounded-2xl flex items-center justify-center text-xl font-medium transition-colors hover:bg-slate-200"
          >
            -
          </button>
          <p className="bg-(--terciary-color) text-black h-10 w-15 rounded-2xl flex items-center justify-center text-xl font-medium">
            {count}
          </p>

          <button
            onClick={handleIncrease}
            className="bg-(--terciary-color) text-gray-700  h-10 w-10 rounded-2xl flex items-center justify-center text-xl font-medium transition-colors hover:bg-slate-200"
          >
            +
          </button>
        </div>

        <div className="mt-6 flex justify-between text-(--terciary-text-color) font-medium">
          <p>Subtotal</p>
          <p>${new Intl.NumberFormat("es-CL").format(subtotal)}</p>
        </div>

        <div className="flex justify-between text-(--terciary-text-color) font-medium">
          <p>IVA(19%)</p>
          <p>${new Intl.NumberFormat("es-CL").format(iva)}</p>
        </div>

        <div className="flex justify-between text-(--primary-text-color) text-2xl font-bold">
          <p>Total</p>
          <p>${new Intl.NumberFormat("es-CL").format(iva + subtotal)}</p>
        </div>

        <Link
          to={`/event/checkout/${event._id}?qty=${count}&type=${ticketType}`}
          state={{
            eventData: event,
          }}
          className="flex rounded-2xl bg-(--primary-color) mt-4 cursor-pointer px-4 py-2 justify-center text-white font-bold"
        >
          Comprar Entradas
        </Link>
      </div>
    </div>
  );
}
