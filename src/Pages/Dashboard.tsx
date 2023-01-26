import React from "react";
import LowStockProductsWidget from "../Components/LowStockProductsWidget";
import NegativeBalanceUsersWidget from "../Components/NegativeBalanceMembersWidget";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
        rowGap: "10px",
        margin: "20px",
      }}
    >
      <LowStockProductsWidget />
      <NegativeBalanceUsersWidget />
    </div>
  );
};

export default Dashboard;
