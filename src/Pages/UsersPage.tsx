import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hook";
import { getUsers, setEditedUser, setUsersList } from "../Model/UserSlice";
import { useSelector } from "react-redux";
import sendApiRequest from "../Model/WebApi";
import config from "../config";
import Search from "@mui/icons-material/Search";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Done from "@mui/icons-material/Done";
import { User } from "../Model/types";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showedUsers, setShowedUsers] = useState<User[]>(users || []);
  const [search, setSearch] = useState("");

  const updateFilter = () => {
    if (users)
      setShowedUsers(
        users.filter(
          (user) =>
            user.username
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            user.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
  };

  const fetchUsers = async () => {
    const usersRequest = await sendApiRequest({
      url: "/users/",
      method: "get",
    });
    dispatch(setUsersList(usersRequest?.data.data));
    setShowedUsers(usersRequest?.data.data);
  };

  const deleteSelectedUsers = async () => {
    for (const userId of selectedUsers)
      sendApiRequest({ url: `/users/${userId}`, method: "DELETE" });

    dispatch(
      dispatch(
        setUsersList(
          showedUsers?.filter((usr) => !selectedUsers.includes(usr.id)) || []
        )
      )
    );
    setSelectedUsers([]);
    dispatch(
      addSnackbarMessage({
        message: "Le / Les utilisateur(s) ont bien été supprimés",
        options: { variant: "success" },
      })
    );
  };

  useEffect(() => {
    if (users !== undefined) {
      updateFilter();
      return;
    }
    fetchUsers();
  }, [users]);

  useEffect(() => {
    updateFilter();
  }, [search]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          width: "100%",
          height: "50px",
        }}
      >
        <Input
          sx={{ flexGrow: 1, margin: "10px" }}
          value={search}
          onChange={(evt) => {
            setSearch(evt.currentTarget.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
        />
        <ButtonGroup variant="contained" sx={{ margin: "10px" }}>
          <Button
            color="success"
            onClick={() => {
              dispatch(setEditedUser(undefined));
              dispatch(changePage("editUser"));
            }}
          >
            <Add />
          </Button>
          <Button
            color="warning"
            disabled={selectedUsers.length !== 1}
            onClick={() => {
              const editedUser = users?.find(
                (user) => user.id === selectedUsers[0]
              );
              dispatch(setEditedUser(editedUser));
              dispatch(changePage("editUser"));
            }}
          >
            <Edit />
          </Button>
          <Button
            color="error"
            disabled={selectedUsers.length === 0}
            onClick={deleteSelectedUsers}
          >
            <Delete />
          </Button>
        </ButtonGroup>
      </div>
      {users && (
        <TableContainer sx={{ height: "85vh" }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    onChange={() => {
                      selectedUsers.length !== showedUsers.length
                        ? setSelectedUsers(showedUsers.map((user) => user.id))
                        : setSelectedUsers([]);
                    }}
                    checked={showedUsers.length === selectedUsers.length}
                    indeterminate={
                      selectedUsers.length !== 0 &&
                      showedUsers.length !== selectedUsers.length
                    }
                  />
                </TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Administrateur</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        selectedUsers.includes(user.id)
                          ? setSelectedUsers(
                              selectedUsers.filter((elt) => elt !== user.id)
                            )
                          : setSelectedUsers(selectedUsers.concat([user.id]));
                        console.log(selectedUsers);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={`${config.urlBackend}/images/${user.avatar}`}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.balance}</TableCell>
                  <TableCell>{user.admin ? <Done /> : <Close />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UsersPage;
