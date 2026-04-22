import { Lang, locales } from './translations';

export const BOOKS_DATA = [
  {
    id: 1,
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    category: "Cuentos",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
    desc: "Un viaje por planetas lejanos."
  },
  {
    id: 2,
    title: "Secretos del Espacio",
    author: "Celia Espacio",
    category: "Ciencia",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
    desc: "Aprende sobre las estrellas."
  },
  {
    id: 3,
    title: "Héroes de la Historia",
    author: "Alejandro Dumas",
    category: "Historia",
    image: "https://images.unsplash.com/photo-1461360226052-72361dab9179?auto=format&fit=crop&w=300&q=80",
    desc: "Personas que cambiaron el mundo."
  },
  {
    id: 4,
    title: "Amigos de Verdad",
    author: "Ana Bondad",
    category: "Valores",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80",
    desc: "Cuentos sobre amistad."
  }
];

export const getCivicTracks = (lang: Lang) => [
  {
    id: 0,
    title: locales[lang].civic.tracks.himno,
    artist: locales[lang].civic.tracks.artist,
    src: '/audio/himno.mp3'
  },
  {
    id: 1,
    title: locales[lang].civic.tracks.marcha,
    artist: locales[lang].civic.tracks.artist,
    src: '/audio/marcha_banderas.mp3'
  },
  {
    id: 2,
    title: locales[lang].civic.tracks.desfile,
    artist: locales[lang].civic.tracks.artist,
    src: '/audio/desfile.mp3'
  }
];
