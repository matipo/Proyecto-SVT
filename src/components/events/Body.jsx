import PurchaseTickets from "./PurchaseTickets";
import "./Body.css";

export default function Body() {
  return (
    <div className="body-container">
      <section className="info-container">
        <div>
          <h1>Titulo del concierto</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa nam
            neque eaque? Inventore perspiciatis consectetur blanditiis maiores
            ipsum, fugiat aut tempora tempore totam reprehenderit sunt sequi
            vero velit enim explicabo!
          </p>
        </div>
        <div>
          <p>CalendarioFecha</p>
          <p>Hora del concierto</p>
          <p>Localizacion del evento</p>
        </div>
      </section>

      <section className="two-container">
        <PurchaseTickets />
      </section>
    </div>
  );
}
