export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
  const token = window.localStorage.getItem("token") || undefined;
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const now = new Date();
    if (!decodedToken.exp || now.getTime() > decodedToken.exp * 1000) {
      console.log("Le token a expiré ! Merci de vous reconnecter");
      clearTokenFromLocalStorage();
      return undefined;
    }
    if (!decodedToken.admin) {
      console.log(
        "Un accès administrateur est nécéssaire pour cette application ! Merci de vous reconnecter"
      );
      clearTokenFromLocalStorage();
      return undefined;
    }
    return token;
  }
  return undefined;
};

export const clearTokenFromLocalStorage = () =>
  window.localStorage.removeItem("token");
