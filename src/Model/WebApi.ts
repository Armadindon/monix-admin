import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store";
import { addSnackbarMessage } from "./ApplicationSlice";
import config from "../config";

const sendApiRequest = async (request: AxiosRequestConfig) => {
  const token = store.getState().user.token;
  try {
    const result = await axios({
      ...request,
      baseURL: `${config.urlBackend}/`,
      headers: { ...request.headers, Authorization: `Bearer ${token}` },
    });
    return result;
    // eslint-disable-next-line
  } catch (error: any) {
    console.log(error);
    if (
      error?.response?.data?.message &&
      typeof error?.response?.data?.message == "string"
    ) {
      store.dispatch(
        addSnackbarMessage({
          message: error.response.data.message,
          options: {
            variant: "error",
          },
        })
      );
    } else {
      store.dispatch(
        addSnackbarMessage({
          message: "Erreur inconnue en contactant l'api",
          options: {
            variant: "error",
          },
        })
      );
    }
  }
};

export default sendApiRequest;
