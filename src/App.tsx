import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AppDrawer from "./Components/AppDrawer";
import Navbar from "./Components/Navbar";
import PageNavigator from "./Components/PageNavigator";
import { getToken } from "./Model/UserSlice";
import LoginPage from "./Pages/LoginPage";
import MainPanel from "./Pages/MainPanel";
import UsersPage from "./Pages/UsersPage";
import EditAccount from "./Pages/EditAccount";
import ProductsPage from "./Pages/ProductPage";
import EditProduct from "./Pages/EditProduct";
import Dashboard from "./Pages/Dashboard";

// On crée plusieurs contexte afin de permettre de fournir ces informations à

function App() {
  const token = useSelector(getToken);

  return (
    <div className="App">
      {token && <Navbar />}
      <PageNavigator
        pages={{
          login: <LoginPage />,
          mainMenu: <MainPanel />,
          users: <UsersPage />,
          editUser: <EditAccount />,
          products: <ProductsPage />,
          editProduct: <EditProduct />,
          dashboard: <Dashboard />,
        }}
      >
        <AppDrawer />
      </PageNavigator>
    </div>
  );
}

export default App;
