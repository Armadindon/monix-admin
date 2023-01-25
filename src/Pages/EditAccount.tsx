import React from "react";
import { Avatar, Button, Checkbox, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import {
  getEditedUser,
  setEditedUser,
  getUsers,
  setUsersList,
} from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";
import config from "../config";
import { User } from "../Model/types";

const EditAccount = () => {
  const user = useSelector(getEditedUser);
  const users = useSelector(getUsers);
  const dispatch = useAppDispatch();
  // Si l'id de l'utilisateur est égal à -1, c'est que l'on créée un nouvel utilisateur
  const [editedUser, setLocalEditedUser] = useState<
    Partial<User> & { password?: string }
  >(
    user ||
      ({
        id: -1,
        username: "",
        email: "",
        password: "",
        balance: 0,
        admin: false,
      } as Partial<User>)
  );

  const editUser = async () => {
    //On update le profil
    sendApiRequest({
      url: `/users/${editedUser?.id}`,
      method: "PUT",
      data: {
        username: editedUser?.username,
        email: editedUser?.email,
        balance: editedUser?.balance,
        admin: editedUser?.admin,
      },
    }).then((response) => {
      console.log(response);
      if (response) {
        dispatch(setEditedUser(undefined));
        const userIndex = users?.findIndex((user) => user.id === editedUser.id);
        const newUsers = users?.slice() || [];
        if (userIndex) newUsers[userIndex] = response?.data?.data;
        dispatch(setUsersList(newUsers as User[]));
      }
      dispatch(changePage("users"));
      dispatch(
        addSnackbarMessage({
          message: "Compte modifié ! ✍️",
          options: { variant: "success" },
        })
      );
    });
  };

  const createUser = async () => {
    //On update le profil
    sendApiRequest({
      url: `/users/`,
      method: "POST",
      data: {
        username: editedUser?.username,
        email: editedUser?.email,
        password: editedUser?.password,
        balance: editedUser?.balance,
        admin: editedUser?.admin,
      },
    }).then((response) => {
      console.log(response);
      if (response) {
        dispatch(setEditedUser(undefined));
        dispatch(setUsersList(users?.concat([response?.data?.data]) as User[]));
      }
      dispatch(changePage("users"));
      dispatch(
        addSnackbarMessage({
          message: "Compte Crée ! ✍️",
          options: { variant: "success" },
        })
      );
    });
  };

  return (
    <>
      {editedUser && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/** L'avatar est placé ici seulement pour le visuel */}
          <IconButton
            onClick={() =>
              dispatch(
                addSnackbarMessage({
                  message: "Seul l'utilisateur peut changer sa photo de profil",
                  options: { variant: "warning" },
                })
              )
            }
          >
            <Avatar
              sx={{ width: 128, height: 128 }}
              src={`${config.urlBackend}/images/${editedUser.avatar}`}
            />
          </IconButton>
          <TextField
            label={"Pseudonyme"}
            variant="standard"
            value={editedUser.username || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedUser({
                ...editedUser,
                username: evt.currentTarget.value,
              })
            }
          />
          <TextField
            label={"Email"}
            variant="standard"
            value={editedUser.email || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedUser({
                ...editedUser,
                email: evt.currentTarget.value,
              })
            }
          />
          {editedUser.id === -1 && (
            <TextField
              label={"Mot de Passe"}
              type={"password"}
              variant="standard"
              value={editedUser.password || ""}
              sx={{ marginTop: "10px", width: "30ch" }}
              onChange={(evt) =>
                setLocalEditedUser({
                  ...editedUser,
                  password: evt.currentTarget.value,
                })
              }
            />
          )}
          <TextField
            label={"Balance de l'utilisateur"}
            type={"number"}
            variant="standard"
            value={editedUser.balance || 0}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setLocalEditedUser({
                ...editedUser,
                balance: parseFloat(evt.currentTarget.value),
              })
            }
          />
          <span
            style={{ marginTop: "10px", width: "30ch", textAlign: "center" }}
          >
            <label htmlFor="checkbox-admin">Administrateur </label>
            <Checkbox
              id="checkbox-admin"
              checked={editedUser.admin || false}
              onChange={(evt) =>
                setLocalEditedUser({
                  ...editedUser,
                  admin: evt.currentTarget.checked,
                })
              }
            />
          </span>

          {editedUser.id !== -1 ? (
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "20px" }}
              onClick={editUser}
              color="warning"
            >
              Modifier le compte
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ margin: "20px" }}
              onClick={createUser}
            >
              Créer le compte
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default EditAccount;
