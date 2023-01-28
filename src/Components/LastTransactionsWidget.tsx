import React, { useEffect } from "react";
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
import { getHistory, setHistory } from "../Model/HistorySlice";

const LastTransactionsWidget = () => {
  const dispatch = useAppDispatch();
  const histories = useSelector(getHistory);

  useEffect(() => {
    if (histories !== undefined) return;
    fetchHistories();
  }, [histories]);

  const fetchHistories = async () => {
    const userRequest = await sendApiRequest({
      url: "/history/",
      method: "get",
    });
    dispatch(setHistory(userRequest?.data.data));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "60vw",
        height: "300px",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6">Historique Général</Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxHeight: "90%" }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date / Heure</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Produit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {histories?.map((history) => (
              <TableRow
                key={history.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{history.date}</TableCell>
                <TableCell>{history.description}</TableCell>
                <TableCell>{history.movement}</TableCell>
                <TableCell>{history.User.username}</TableCell>
                <TableCell>{history.Product.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LastTransactionsWidget;
