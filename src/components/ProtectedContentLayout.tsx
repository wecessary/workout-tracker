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
      <div className="flex flex-col justify-center items-center p-4 mb-10">
        <h1> {username && `Hi ${username}💪`}</h1>
        <ProtectedRoutes>
          <UserDataContextProvider>
            <CheckDataIsLoaded>
              <Outlet />
            </CheckDataIsLoaded>
          </UserDataContextProvider>
        </ProtectedRoutes>
        <NavBar />
      </div>
    </>
  );
};

export default Layout;
