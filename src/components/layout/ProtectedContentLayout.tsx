import { Outlet } from "react-router-dom";
import UserDataContextProvider from "../../context/DataContext";
import CheckDataIsLoaded from "../../routeProtection/CheckDataIsLoaded";
import ProtectedRoutes from "../../routeProtection/ProtectedRoutes";
import NavBar from "./Navbar";

const Layout = () => {
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
