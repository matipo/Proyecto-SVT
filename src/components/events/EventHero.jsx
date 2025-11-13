// import "./EventHero.css";
export default function EventHero({ name, image }) {
  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <img
        className="rounded-lg object-center object-cover w-full h-90 pointer-events-none"
        src={image}
        alt={name}
      />
    </div>
  );
}
