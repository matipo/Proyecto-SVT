import HomeEventCard from "./HomeEventCard.jsx";

export default function HomeEventList({ event }) {
  return (
    <div className="m-4">
      <h1 className="text-4xl font-black">Próximos Eventos</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {event.map((e) => (
          <HomeEventCard key={e._id} event={e} />
        ))}
      </div>
    </div>
  );
}
