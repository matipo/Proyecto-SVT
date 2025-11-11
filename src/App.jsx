import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";

import "./App.css";
import ReservationPage from "./pages/ReservationPage";
import CreateEventPage from "./pages/CreateEventPage";
import CheckoutPage from "./pages/CheckoutPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="event/:eventId" element={<EventsPage />} />
            <Route path="event/reservation/:eventId" element={<ReservationPage />} />
            <Route path="createEvent" element={<CreateEventPage />} />
            <Route path="event/checkout/" element={<CheckoutPage />} />
            <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
