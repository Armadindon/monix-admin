export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  const token = window.localStorage.getItem("token") || undefined;
  if (token) {
    const expiration = JSON.parse(atob(token.split(".")[1])).exp;
    const now = new Date();
    if (!expiration || now.getTime() > expiration * 1000) {
      console.log("Le token a expiré ! Merci de vous reconnecter");
      clearTokenFromLocalStorage();
      return undefined;
    }
    return token;
  }
  return undefined;
};

export const clearTokenFromLocalStorage = () =>
  window.localStorage.removeItem("token");
