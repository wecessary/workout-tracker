import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserDataContextProvider from "../context/DataContext";
import CheckDataIsLoaded from "../routeProtection/CheckDataIsLoaded";
import ProtectedRoutes from "../routeProtection/ProtectedRoutes";
import NavBar from "./Navbar";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const username = user ? user.displayName : "";

  return (
    <>
      <ProtectedRoutes>
        <UserDataContextProvider>
          <CheckDataIsLoaded>
            <Outlet />
          </CheckDataIsLoaded>
        </UserDataContextProvider>
      </ProtectedRoutes>
      <NavBar />
    </>
  );
};

export default Layout;
