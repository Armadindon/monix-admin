import React from "react";
import { Paper, Typography } from "@mui/material";
import LowStockProducts from "../Components/LowStockProducts";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        rowGap: "10px",
        margin: "20px",
      }}
    >
      <LowStockProducts />
    </div>
  );
};

export default Dashboard;
