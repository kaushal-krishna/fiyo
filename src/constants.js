export const FIYOGQL_BASE_URI =
  import.meta.env.PRESENT_ENV === "prod"
    ? "https://fiyogql.onrender.com/graphql"
    : "http://localhost:8000/graphql";

export const FIYOSAAVN_BASE_URI = "https://fiyosaavn.vercel.app/api";
