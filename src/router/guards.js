import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken() || getJwtToken()==undefined) {
    return "/landing/login";
  }
}

export function isLoggedIn() {
  if (getJwtToken()) {
    return `/news-feed`;
  }
}