import { useEffect } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";

// |||||||||| Icono del check ||||||||||
function CheckIcon() {
  return (
    <svg
      className="w-16 h-16 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function PurchaseSuccessPage() {
  // Hook que permite acceder a la ubicación actual
  const location = useLocation();
  const navigate = useNavigate();

  const purchaseData = location.state?.purchaseData;
  const eventData = location.state?.eventData;

  // Si no hay datos de compra
  // lo redirigimos al inicio.
  if (!purchaseData || !eventData) {
    // Esta es la primera línea de defensa. Si el estado se pierde, redirige.
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    // Solo ejecuta si existen los datos
    if (purchaseData && eventData) {
      // Leemos el historial actual
      const historialExistente = localStorage.getItem("purchaseHistory");
      // Lo iniciamos como arreglo vacío
      const historialArray = historialExistente
        ? JSON.parse(historialExistente)
        : [];
      // Verificamos si esta compra ya fue guardada antes
      const yaExiste = historialArray.some(
        (compra) => compra.id === purchaseData._id
      );
      // Si no está guardada, la agregamos al historial
      if (!yaExiste) {
        const nuevaCompra = {
          id: purchaseData._id,
          eventName: eventData.name,
          buyerEmail: purchaseData.buyer?.email,
          total: purchaseData.total_price * 1.19,
          tickets: purchaseData.tickets,
          date: new Date().toISOString(),
        };
        // Se guarda en el localstorage
        historialArray.push(nuevaCompra);
        localStorage.setItem("purchaseHistory", JSON.stringify(historialArray));
      }
    }
  }, [purchaseData, eventData, location.state]);

  //Variables para mostrar en la interfaz
  const buyer = purchaseData?.buyer;
  const tickets = purchaseData?.tickets;
  const total_price = purchaseData?.total_price;
  const purchaseId = purchaseData?._id;
  const final_price = total_price * 1.19;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto my-10">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 text-center">
        <div className="flex justify-center mb-4">
          <CheckIcon />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          ¡Tu compra ha sido confirmada!
        </h1>

        <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
            {eventData?.name || "Nombre del Evento"}
          </h2>

          <div>
            <h3 className="font-semibold">Comprador:</h3>
            <p className="text-gray-700">{buyer?.name || "Comprador"}</p>
            <p className="text-gray-700">{buyer?.email || "Comprador"}</p>
          </div>

          <div>
            <h3 className="font-semibold">ID de Compra:</h3>
            <p className="text-gray-700 font-mono text-sm">
              {purchaseId || "---"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Total Pagado:</h3>
            <p className="text-gray-700 font-bold text-lg">
              ${final_price ? final_price.toLocaleString("es-CL") : "0"}
            </p>
          </div>

          <hr className="my-4" />

          {/* Lista de Tickets */}
          <div>
            <h3 className="text-xl font-bold mb-3">Tus Tickets</h3>
            {tickets && tickets.length > 0 ? (
              <ul className="space-y-3">
                {tickets.map((ticket, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold text-gray-800">
                        {ticket.type || "Ticket"}
                      </span>
                      <p className="text-sm text-gray-500">
                        Ticket #{index + 1}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-sm">
                        CÓDIGO:
                      </span>
                      <span className="font-mono text-blue-600 font-bold">
                        {ticket.code || "---"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">
                No se encontraron detalles de los tickets.
              </p>
            )}
          </div>
        </div>

        <Link
          to="/"
          className="inline-block mt-8 bg-(--primary-color) text-white font-bold py-3 px-6 rounded-lg hover:bg-red-800 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
