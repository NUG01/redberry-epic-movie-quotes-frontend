import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/landing/login";
  }
}

export function isLoggedIn() {
  if (getJwtToken() && getJwtToken()!=undefined) {
    return `/news-feed/${localStorage.getItem('id')}`;
  }
}