import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const BASE = import.meta.env.VITE_API_URL;
const url2 = `${BASE}reservations`;
function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        </div>
    );
}


// Recibe reservationId y reservationItems como props separadas
function PaymentForm({ reservationId, reservationItems, event, total }) {
    const navigate = useNavigate();
    const url = `${BASE}checkout`;

    // Estado para el formulario del comprador
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Estado para la llamada a la API
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setPaymentError(null);

        const checkoutRequest = {
            reservation_id: reservationId,
            buyer: {
                name: name,
                email: email,
            },
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkoutRequest)
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = "Ocurrió un error.";

                if (response.status === 400 && data.detail && typeof data.detail === 'string' && data.detail.includes("not active")) {
                    errorMessage = "Tu reserva ha expirado o ya fue confirmada. Por favor, inténtalo de nuevo desde la página del evento.";
                    const reservationKey = `reservation_${event._id}_${reservationItems[0].type}_${reservationItems[0].quantity}`;
                    sessionStorage.removeItem(reservationKey);

                } else if (data.detail) {
                    if (typeof data.detail === 'object') {
                        if (Array.isArray(data.detail) && data.detail[0] && data.detail[0].msg) {
                            errorMessage = `Error en el campo ${data.detail[0].loc.join(' > ')}: ${data.detail[0].msg}`;
                        } else if (data.detail.msg) {
                            errorMessage = data.detail.msg;
                        } else {
                            errorMessage = `Error: ${JSON.stringify(data.detail)}`;
                        }
                    } else {
                        errorMessage = data.detail;
                    }
                }

                throw new Error(errorMessage);
            }

            const reservationKey = `reservation_${event._id}_${reservationItems[0].type}_${reservationItems[0].quantity}`;
            sessionStorage.removeItem(reservationKey);

            // Navegamos a la página de compra realizada, pasando los datos de la compra
            navigate(`/event/purchase-success`, { state: { purchaseData: data, eventData: event } });

        } catch (err) {
            setPaymentError(err.message);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleCheckoutSubmit} className="space-y-4">

            {paymentError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-bold">Error al confirmar</p>
                    <p className="text-sm">{paymentError}</p>
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <hr className="my-6" />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Procesando..." : `Confirmar y Pagar $${total.toLocaleString('es-CL', { maximumFractionDigits: 0 })}`}
            </button>
        </form>
    );
}


export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Estados para la validación inicial
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validReservation, setValidReservation] = useState(null);

    // Obtenemos los datos pasados desde la página anterior
    const passedReservation = location.state?.reservationData;
    const event = location.state?.eventData;

    useEffect(() => {
        // Si no nos pasaron una reserva, no podemos continuar
        if (!passedReservation || !passedReservation.reservation_id) {
            setError("No se encontraron datos de la reserva.");
            setIsLoading(false);
            return;
        }

        // Función para Validar la reserva ANTES de mostrar el formulario
        const validateReservation = async () => {
            try {
                const response = await fetch(`${url2}/${passedReservation.reservation_id}`);

                if (response.status === 404) {
                    throw new Error("Tu reserva ha expirado o no fue encontrada. Por favor, inténtalo de nuevo.");
                }

                if (!response.ok) {
                    const data = await response.json();

                    if (data.status === 'expired' || (data.detail && data.detail.includes("expired"))) {
                        throw new Error("Tu reserva ha expirado. Por favor, inténtalo de nuevo.");
                    }
                    throw new Error("Hubo un problema al verificar tu reserva.");
                }

                const data = await response.json();


                setValidReservation(data);

            } catch (err) {
                setError(err.message);

                // Si la reserva es inválida, la borramos de sessionStorage
                if (event?._id && passedReservation?.items?.[0]?.type && passedReservation?.items?.[0]?.quantity) {
                    const reservationKey = `reservation_${event._id}_${passedReservation.items[0].type}_${passedReservation.items[0].quantity}`;
                    sessionStorage.removeItem(reservationKey);
                }
            } finally {
                setIsLoading(false);
            }
        };

        validateReservation();

    }, [passedReservation, navigate, event]);

    // ---- RENDERIZADO ----

    if (isLoading) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">Validando tu reserva...</h2>
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !validReservation) {
        return (
            <div className="p-10 text-center max-w-lg mx-auto bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-red-600">¡Ups! Hubo un problema</h2>
                <p className="text-gray-700 my-4">{error || "No se pudo cargar la reserva."}</p>
                <button
                    onClick={() => navigate(event ? `/event/${event._id}` : '/')}
                    className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                >
                    Volver al evento
                </button>
            </div>
        );
    }

    const subtotal = validReservation.total_price;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Completa tu Pago</h1>
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Columna Izquierda: Formulario de Pago */}
                <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Datos del Comprador</h2>
                    <PaymentForm
                        reservationId={passedReservation.reservation_id}
                        reservationItems={validReservation.items}
                        event={event}
                        total={total}
                    />
                </div>

                {/* Columna Derecha: Resumen */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Tu Pedido
                        </h3>
                        <div className="mb-4">
                            <h4 className="font-bold">{event.name}</h4>
                            <p className="text-sm text-gray-600">{validReservation.items[0].quantity} x {validReservation.items[0].type}</p>
                        </div>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold">${subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>IVA (19%)</span>
                                <span className="font-semibold">${iva.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</span>
                            </div>
                            <hr className="my-3" />
                            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span className="font-mono">${total.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>
                        <Link
                            to={`/event/${event._id}`}
                            className="text-center w-full inline-block mt-4 text-sm text-gray-600 hover:text-red-800 hover:underline"
                        >
                            Volver al evento
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}