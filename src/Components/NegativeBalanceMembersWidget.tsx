import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import sendApiRequest from "../Model/WebApi";
import { useAppDispatch } from "../hook";
import { User } from "../Model/types";
import { getUsers, setUsersList } from "../Model/UserSlice";

const NegativeBalanceUsersWidget = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(
    users
      ?.filter((usr) => usr.balance < 0)
      .sort((a, b) => b.balance - a.balance) || []
  );

  useEffect(() => {
    if (users !== undefined) {
      setFilteredUsers(
        users
          ?.filter((usr) => usr.balance < 0)
          .sort((a, b) => a.balance - b.balance) || []
      );
      return;
    }
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    const userRequest = await sendApiRequest({
      url: "/users/",
      method: "get",
    });
    dispatch(setUsersList(userRequest?.data.data));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "30vw",
        height: "300px",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6">Membres en négatif</Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxHeight: "90%" }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NegativeBalanceUsersWidget;
