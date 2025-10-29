import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
