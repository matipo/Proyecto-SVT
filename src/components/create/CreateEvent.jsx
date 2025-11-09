import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_URL;

export default function CreateEvent() {
  // --- Estados del Evento ---
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  // --- Estados para GESTIONAR LA LISTA de tickets ---
  const [tickets, setTickets] = useState([]);

  // --- Estados para el "mini-formulario" de añadir ticket ---
  const [currentTicketType, setCurrentTicketType] = useState("");
  const [currentTicketPrice, setCurrentTicketPrice] = useState(0);
  const [currentTicketAvailable, setCurrentTicketAvailable] = useState(50);

  // --- Estados de Carga/Error ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Para redirigir tras el éxito

  const handleAddTicket = () => {
    // Validamos que los campos del ticket tengan datos
    if (
      !currentTicketType ||
      currentTicketPrice <= 0 ||
      currentTicketAvailable <= 0
    ) {
      setError(
        "Por favor, completa tipo, precio (>0) y disponibles (>0) para el ticket."
      );
      return;
    }

    const newTicket = {
      type: currentTicketType,
      price: Number(currentTicketPrice),
      available: Number(currentTicketAvailable),
    };

    setTickets([...tickets, newTicket]);

    setCurrentTicketType("");
    setCurrentTicketPrice(0);
    setCurrentTicketAvailable(50);
    setError(null);
  };

  const handleRemoveTicket = (indexToRemove) => {
    setTickets(tickets.filter((_, index) => index !== indexToRemove));
  };

  /**
   * ENVÍA el formulario principal a la API
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación del formulario principal
    if (tickets.length === 0) {
      setError("Debes añadir al menos un tipo de ticket.");
      return; // Detiene la ejecución si no hay tickets
    }

    setIsLoading(true);
    setError(null);

    const eventData = {
      name: name,
      category: category,
      date: new Date(date).toISOString(),
      location: location,
      image: image,
      tickets: tickets,
    };

    try {
      const response = await fetch(`${BASE}events`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Evento creado:", result);
      alert("¡Evento creado con éxito!");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto p-4 max-w-6xl gap-6 bg-white shadow-2xl rounded-2xl mt-8"
    >
      <h2 className="text-2xl font-bold">Crear evento</h2>

      {/* --- CAMPOS DEL EVENTO --- */}
      <label className="flex flex-col">
        Nombre Evento
        <input
          className="ml-2 border-2 rounded-lg px-2 py-1"
          type="text"
          placeholder="Nombre del evento"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col">
        Categoria
        <input
          className="ml-2 border-2 rounded-lg px-2 py-1"
          type="text"
          placeholder="music"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col">
        Fecha y hora
        <input
          className="ml-2 border-2 rounded-lg px-2 py-1 w-46"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col">
        Ubicacion
        <input
          className="ml-2 border-2 rounded-lg px-2 py-1"
          type="text"
          placeholder="Claro Arena"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col">
        URL Imagen
        <input
          className="ml-2 border-2 rounded-lg px-2 py-1"
          type="url"
          placeholder="https://placehold.co/600x400?text=Hello+World"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>

      <hr />

      {/* --- MINI-FORMULARIO DE TICKETS --- */}
      <h3 className="text-xl font-semibold">Boletos</h3>
      <div className="flex flex-wrap gap-6 items-end">
        <label className="flex flex-col">
          Tipo
          <input
            type="text"
            className="ml-2 border-2 rounded-lg px-2"
            placeholder="General"
            value={currentTicketType}
            onChange={(e) => setCurrentTicketType(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Precio
          <input
            type="number"
            className="ml-2 border-2 rounded-lg px-2"
            placeholder="1000"
            min={0}
            value={currentTicketPrice}
            onChange={(e) => setCurrentTicketPrice(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Disponibles
          <input
            type="number"
            className="ml-2 border-2 rounded-lg px-2"
            min="0"
            value={currentTicketAvailable}
            onChange={(e) => setCurrentTicketAvailable(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={handleAddTicket}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          + Añadir Ticket
        </button>
      </div>

      {/* ---  LISTA DE TICKETS AÑADIDOS --- */}
      <div className="flex flex-col gap-2">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>
              {ticket.type} - ${ticket.price} - ({ticket.available} disp.)
            </span>
            <button
              type="button"
              onClick={() => handleRemoveTicket(index)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <hr />

      <button
        type="submit"
        className="bg-(--primary-color) text-white p-3 rounded font-bold"
        disabled={isLoading}
      >
        {isLoading ? "Creando evento..." : "Crear Evento"}
      </button>

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}
    </form>
  );
}
