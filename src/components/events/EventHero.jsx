import "./EventHero.css";
export default function EventHero({ name, image }) {
  return (
    <div className="hero-container">
      <img src={image} alt={name} />
    </div>
  );
}
