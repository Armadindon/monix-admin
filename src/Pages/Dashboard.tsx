import React from "react";
import LowStockProductsWidget from "../Components/LowStockProductsWidget";
import NegativeBalanceUsersWidget from "../Components/NegativeBalanceMembersWidget";
import LastTransactionsWidget from "../Components/LastTransactionsWidget";

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
      <LastTransactionsWidget />
    </div>
  );
};

export default Dashboard;
