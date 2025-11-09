import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";

import "./App.css";
import CheckoutPage from "./pages/CheckoutPage";
import CreateEventPage from "./pages/CreateEventPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="event/:eventId" element={<EventsPage />} />
            <Route path="event/checkout/:eventId" element={<CheckoutPage />} />
            <Route path="createEvent" element={<CreateEventPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
