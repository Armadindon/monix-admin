import React from "react";
import { Avatar, Button, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { getAuthenticatedUser, setAuthenticatedUser } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";
import config from "../config";
import { changePage } from "../Model/ApplicationSlice";

const MainPanel = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthenticatedUser);

  useEffect(() => {
    if (!user) {
      sendApiRequest({ url: "/users/me", method: "GET" }).then((response) => {
        if (response) dispatch(setAuthenticatedUser(response.data?.data));
      });
    }
    // On ignore, car on veut pas retrigger le useEffect en changement de dispatch (wtf)
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: "16px",
      }}
    >
      <Typography variant="h5">
        {!user ? <Skeleton width="40vw" /> : `Bienvenue ${user.username} !`}
      </Typography>
      {!user ? (
        <Skeleton variant="circular">
          <Avatar sx={{ width: 128, height: 128 }} />
        </Skeleton>
      ) : (
        <Avatar
          sx={{ width: 128, height: 128 }}
          src={`${config.urlBackend}/images/${user.avatar}`}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "50vh",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant="contained" size="large" onClick={() => null} disabled>
          Dashboard
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => dispatch(changePage("users"))}
        >
          Gérer les membres
        </Button>
        <Button variant="contained" size="large" onClick={() => null}>
          Gérer les produits
        </Button>
        <Button variant="contained" size="large" onClick={() => null}>
          Consulter l&apos;historique
        </Button>
      </Box>
    </Box>
  );
};

export default MainPanel;
