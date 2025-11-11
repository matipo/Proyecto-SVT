import React, { useState, useEffect } from 'react';

/**
 * Calcula los segundos restantes
 * @param {string} expirationISOString - La fecha en formato ISO ("2025-11-08T22:20:08.226Z")
 */
const getRemainingSeconds = expirationISOString => {
  // Si no hay fecha,no hay tiempo.
  if (!expirationISOString) return 0;

  // Convierte la fecha de expiracion (en UTC) a un objeto Date
  const expirationDate = new Date(expirationISOString);
  // Obtiene la hora actual
  const now = new Date();


  // (getTime() siempre es en UTC, así que la resta funciona
  //  independientemente de la zona horaria del usuario)
  const differenceInMs = expirationDate.getTime() - now.getTime();

  // Convierte a segundos y se asegura de que no sea negativo
  return Math.max(0, Math.floor(differenceInMs / 1000));
};

const CountdownTimer = ({ expirationTime, onTimerEnd }) => {

  const [totalSeconds, setTotalSeconds] = useState(() =>
    getRemainingSeconds(expirationTime)
  );


  useEffect(() => {
    setTotalSeconds(getRemainingSeconds(expirationTime));
  }, [expirationTime]);


  useEffect(() => {
    if (totalSeconds <= 0) {
      if (onTimerEnd) onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTotalSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [totalSeconds, onTimerEnd]);

  // --- Logica de Visualizacion ---
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');



  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">
        Tus asientos están reservados por:
      </p>
      <div className="flex items-center space-x-3">
        {/* Minutos box */}
        <div className="bg-gray-100 rounded-lg px-6 py-4 w-30 flex justify-center">
          <span className="text-4xl font-bold text-gray-800">
            {formattedMinutes}
          </span>
        </div>

        {/* Separador : */}
        <span className="text-4xl font-bold text-gray-800">:</span>

        {/* Segundos box */}
        <div className="bg-gray-100 rounded-lg px-6 py-4 w-30 flex justify-center">
          <span className="text-4xl font-bold text-gray-800">
            {formattedSeconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;