import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/landing/login";
  }
}
export function isLoggedIn() {
  if (getJwtToken()) {
    return "/news-feed";
  }
}