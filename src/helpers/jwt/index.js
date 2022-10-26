export const getJwtToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`jwt_token=`);
  const token = parts.length === 2 ? parts.pop().split(";").shift() : null;

  return token;
};


export const setJwtToken = (token, expires_in) => {
  let expires = new Date();
  expires.setTime(expires.getTime() + expires_in * 1000);
  document.cookie = `jwt_token=${token}; expires=${expires.toUTCString()}; path=/`;
};