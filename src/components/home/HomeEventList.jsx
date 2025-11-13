import HomeEventCard from "./HomeEventCard.jsx";

/**
 * Un componente simple de Spinner que puedes mejorar
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-(--primary-color)"></div>
    </div>
  );
}

/**
 * Un componente simple para mostrar errores
 */
function ErrorDisplay({ message }) {
  return (
    <div className="p-10 text-center max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <h3 className="font-bold text-lg mb-2">¡Ocurrió un error!</h3>
      <p>{message}</p>
    </div>
  );
}

export default function HomeEventList({
  event,
  isError,
  isLoading,
  handleNextButton,
  handlePreviousButton,
  currentlyPage,
  totalPage,
}) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        message={isError.message || "No se pudieron cargar los datos."}
      />
    );
  }

  return (
    <div className="mx-10">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-4xl font-black">Eventos</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors"
            onClick={handlePreviousButton}
            disabled={currentlyPage === 1}
          >
            Anterior
          </button>

          <span className="font-semibold">
            Página {currentlyPage} de {totalPage}
          </span>

          <button
            className="bg-(--primary-color) text-white font-semibold py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
            onClick={handleNextButton}
            disabled={currentlyPage === totalPage}
          >
            Siguiente
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {event.map((e) => (
          <HomeEventCard key={e._id} event={e} />
        ))}
      </div>
    </div>
  );
}
