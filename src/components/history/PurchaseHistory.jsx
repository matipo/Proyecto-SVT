import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PurchaseHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("purchaseHistory");

      if (savedHistory) {
        const historyParsed = JSON.parse(savedHistory);
        if (Array.isArray(historyParsed)) {
          setHistory(historyParsed.reverse());
        }
      }
    } catch (e) {
      console.error("Error al cargar el historial de compras:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="p-10 text-center">Cargando historial...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Mi Historial de Compras
      </h1>

      {history.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-lg shadow">
          <p className="text-gray-600">Aún no has realizado ninguna compra.</p>
          <Link
            to="/"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Ver eventos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((compra) => (
            <div key={compra.id} className="p-6 bg-white shadow-lg rounded-xl">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {compra.eventName}
                </h2>
                <span className="text-lg font-bold text-(--secondary-color)">
                  $
                  {compra.total.toLocaleString("es-CL", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Comprado el: {new Date(compra.date).toLocaleString("es-CL")}
              </p>
              <p className="text-sm text-gray-700 font-mono">
                ID Compra: {compra.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
