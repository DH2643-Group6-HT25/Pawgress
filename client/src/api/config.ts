export const INTERNAL_API_URL: string =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

export const EXTERNAL_API_URL: string =
  import.meta.env.VITE_API_URL ||
  "https://affirmations-api-by-apirobots.p.rapidapi.com/v1/affirmations";
