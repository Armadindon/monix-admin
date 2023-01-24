import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import {
  getSnackbarMessages,
  removeFirstSnackbarMessage,
} from "../Model/ApplicationSlice";

/** Composant utilitaire pour gérer les snackbars */
const SnackBarManager = () => {
  const snackBar = useSnackbar();
  const dispatch = useAppDispatch();
  const snackbarMessages = useSelector(getSnackbarMessages);

  useEffect(() => {
    if (snackbarMessages.length > 0) {
      snackBar.enqueueSnackbar(snackbarMessages[0].message, {
        ...snackbarMessages[0].options,
      });
    }

    dispatch(removeFirstSnackbarMessage());
  }, [snackbarMessages]);

  return null;
};

export default SnackBarManager;
