const mockEventsData = {
  data: [
    {
      _id: "68f7b9d771fbcc686dd144e8",
      name: "Rock en el Parque",
      category: "music",
      date: "2025-12-05T20:00:00Z",
      location: "Estadio Nacional",
      image:
        "https://placehold.co/600x400/E86F6F/FFFFFF?text=Rock+en+el+Parque",
      tickets: [
        { type: "General", price: 25000.0, available: 120 },
        { type: "VIP", price: 60000.0, available: 30 },
      ],
    },
    {
      _id: "a1b2c3d4e5f6a7b8c9d0e1f2",
      name: "Concierto de Jazz",
      category: "music",
      date: "2025-11-15T21:00:00Z",
      location: "Club de Jazz de medianoche",
      image:
        "https://placehold.co/600x400/6A8DEE/FFFFFF?text=Concierto+de+Jazz",
      tickets: [{ type: "General", price: 40000.0, available: 50 }],
    },
    {
      _id: "z9y8x7w6v5u4t3s2r1q0p9o8",
      name: "Feria Gastronómica 'Sabores'",
      category: "food",
      date: "2025-11-22T12:00:00Z",
      location: "Parque Central",
      image: "https://placehold.co/600x400/96DE73/FFFFFF?text=Feria+Sabores",
      tickets: [{ type: "Entrada Día", price: 10000.0, available: 500 }],
    },
    {
      _id: "t4h5e6a7t8r9o0p1q2",
      name: "Noche de Teatro Clásico",
      category: "theater",
      date: "2025-12-10T19:30:00Z",
      location: "Teatro Municipal",
      image: "https://placehold.co/600x400/BF73DE/FFFFFF?text=Teatro+Clásico",
      tickets: [
        { type: "Platea", price: 35000.0, available: 80 },
        { type: "Balcón", price: 20000.0, available: 100 },
      ],
    },
    {
      _id: "a7r8t9e0m1u2s3e4o5",
      name: "Exposición de Arte Moderno",
      category: "art",
      date: "2025-11-20T10:00:00Z",
      location: "Museo de Bellas Artes",
      image: "https://placehold.co/600x400/DEBF73/FFFFFF?text=Arte+Moderno",
      tickets: [{ type: "Entrada General", price: 15000.0, available: 300 }],
    },
    {
      _id: "c8o9n0f1e2r3e4n5c6",
      name: "Conferencia Tech Innovate 2025",
      category: "conference",
      date: "2025-11-28T09:00:00Z",
      location: "Centro de Convenciones",
      image:
        "https://placehold.co/600x400/73CEDE/FFFFFF?text=Tech+Innovate+2025",
      tickets: [
        { type: "Pase Completo", price: 150000.0, available: 200 },
        { type: "Pase Estudiante", price: 75000.0, available: 50 },
      ],
    },
    {
      _id: "s7p8o9r0t1e2",
      name: "Maratón de la Ciudad",
      category: "sports",
      date: "2025-11-30T07:00:00Z",
      location: "Avenida Principal",
      image: "https://placehold.co/600x400/73DEB1/FFFFFF?text=Maratón",
      tickets: [{ type: "Inscripción", price: 50000.0, available: 1000 }],
    },
    {
      _id: "f1a2m3i4l5i6a7",
      name: "Festival de Cometas",
      category: "family",
      date: "2025-11-23T14:00:00Z",
      location: "Playa Grande",
      image: "https://placehold.co/600x400/DE73B1/FFFFFF?text=Cometas",
      tickets: [{ type: "Entrada General", price: 5000.0, available: 500 }],
    },
    {
      _id: "e1l2e3c4t5r6o7",
      name: "Festival de Música Electrónica",
      category: "music",
      date: "2025-12-12T22:00:00Z",
      location: "Antiguo Aeropuerto",
      image: "https://placehold.co/600x400/A073DE/FFFFFF?text=Electrónica",
      tickets: [
        { type: "Preventa", price: 80000.0, available: 500 },
        { type: "Puerta", price: 120000.0, available: 100 },
      ],
    },
    {
      _id: "c1o2d3i4n5g6",
      name: "Taller de Programación React",
      category: "education",
      date: "2D/2025-12-01T18:00:00Z",
      location: "CoWork Digital",
      image: "https://placehold.co/600x400/333333/FFFFFF?text=React+Workshop",
      tickets: [{ type: "Inscripción", price: 20000.0, available: 30 }],
    },
  ],
  page: 1,
  limit: 20,
  total: 10,
};

export default mockEventsData;
