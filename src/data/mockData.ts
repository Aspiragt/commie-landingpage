import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Community, Post } from '../types/data';

// Mis Comunidades
export const myCommunities: Community[] = [
  {
    id: '1',
    name: 'Crypto Traders LATAM',
    description: 'Comunidad de traders en latinoamérica',
    members: 1500,
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    categories: ['Tecnología', 'Finanzas'],
    lastActivity: new Date().toISOString(),
    joined: '2024-11-01',
    posts: [
      {
        id: '1',
        title: 'Tips para optimizar el rendimiento',
        content: 'Aquí algunos consejos para mejorar el rendimiento de tu app...',
        author: 'Juan Dev',
        date: '2024-02-06T10:00:00Z',
        likes: 45,
        comments: 12
      }
    ]
  },
  {
    id: '2',
    name: 'Ciclistas Urbanos',
    description: 'Grupo de ciclistas urbanos',
    members: 800,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    categories: ['Deporte', 'Movilidad'],
    lastActivity: new Date().toISOString(),
    joined: '2024-12-15',
    posts: [
      {
        id: '1',
        title: 'Rutas seguras en la ciudad',
        content: 'Compartiendo las mejores rutas para ciclistas...',
        author: 'Ana Bike',
        date: '2024-02-05T15:00:00Z',
        likes: 32,
        comments: 8
      }
    ]
  }
];

// Comunidades Sugeridas
export const suggestedCommunities: Community[] = [
  {
    id: '3',
    name: 'Foodies CDMX',
    description: 'Amantes de la comida en la Ciudad de México',
    members: 2500,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    categories: ['Gastronomía', 'Cultura'],
    lastActivity: new Date().toISOString(),
    posts: []
  }
];

// Mis Eventos
export const myEvents: Event[] = [
  {
    id: '1',
    title: 'FinTech Summit Guatemala 2025',
    description: 'El evento más importante de tecnología financiera en Centroamérica.',
    date: addDays(new Date(), 15).toISOString(),
    location: 'Hotel Real InterContinental, Guatemala City',
    organizer: 'FinTech Guatemala',
    attendees: 300,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7',
    categories: ['Tecnología', 'Finanzas'],
    isJoined: true,
  },
  {
    id: '2',
    title: 'Bici Tour Antigua Guatemala',
    description: 'Recorrido en bicicleta por las calles coloniales de Antigua.',
    date: addDays(new Date(), 7).toISOString(),
    location: 'Parque Central, Antigua Guatemala',
    organizer: 'Ciclistas Urbanos GT',
    attendees: 150,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182',
    categories: ['Deporte', 'Cultura'],
    isJoined: true,
  },
  // ... Agregar 8 eventos más
];

// Eventos Destacados (40 más)
export const featuredEvents: Event[] = [
  {
    id: '11',
    title: 'Festival Gastronómico Guatemalteco',
    description: 'Celebrando la diversidad culinaria de Guatemala.',
    date: addDays(new Date(), 30).toISOString(),
    location: 'Paseo Cayalá, Guatemala City',
    organizer: 'Gastronomía Guatemalteca',
    attendees: 1000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    categories: ['Gastronomía', 'Cultura'],
  },
  // ... Agregar 39 eventos más
];

// Función helper para formatear fechas
export const formatEventDate = (date: string) => {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
};
