export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL
    : "localhost:5000";

export const HTTP_PROTOCOL =
  process.env.NODE_ENV === "production" ? "https://" : "http://";

export const WS_PROTOCOL =
  process.env.NODE_ENV === "production" ? "wss://" : "ws://";
