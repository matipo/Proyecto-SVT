import "./Hero.css";
export default function Hero({ name, image }) {
  return (
    <div className="hero-container">
      <img src={image} alt={name} />
    </div>
  );
}
