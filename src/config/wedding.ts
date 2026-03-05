// Configurações do Casamento
export const WEDDING_CONFIG = {
  couple: {
    groom: "Alexandre",
    bride: "Lígia",
    fullNames: "Alexandre & Lígia",
  },
  date: {
    full: "11 de novembro de 2026",
    short: "11.11.2026",
    iso: "2026-11-11T16:00:00",
    day: "11",
    month: "11",
    year: "2026",
  },
  location: {
    name: "Espaço Villa Serena",
    address: "Av. das Flores, 1234 - Jardim das Acácias",
    city: "São Paulo",
    state: "SP",
    mapsUrl: "https://maps.google.com",
  },
  ceremony: {
    time: "16:00",
    endTime: "22:00",
  },
  dressCode: {
    style: "Esporte Fino",
    colors: "Cores claras e terrosas",
    notes: "Evitem branco e tons muito escuros",
  },
  pix: {
    key: "casamento.alexandre.ligia@email.com",
    name: "Alexandre e Lígia",
    city: "SAO PAULO",
  },
  contact: {
    whatsapp: "5543984933304",
    email: "casamento@alexandreeligia.com",
  },
} as const;

// Cores do tema
export const WEDDING_COLORS = {
  // Principais
  background: "#faf8f5",
  foreground: "#4a4a4a",

  // Destaques
  title: "#2c3e50", // Azul marinho elegante
  subtitle: "#c9a96e", // Dourado champagne
  accent: "#8b7355", // Bronze suave

  // UI
  infoBg: "#f5f0e8", // Bege claro
  border: "#e8ddd0", // Borda suave
  button: "#c9a96e", // Botão dourado
  buttonHover: "#b8985d", // Hover do botão
  footer: "#6b5b4f", // Texto footer

  // Destaque alternativo
  highlight: "#2c3e50", // Azul marinho
} as const;
