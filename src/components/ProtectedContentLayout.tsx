import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserDataContextProvider from "../context/DataContext";
import CheckDataIsLoaded from "../routeProtection/CheckDataIsLoaded";
import ProtectedRoutes from "../routeProtection/ProtectedRoutes";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const username = user ? user.displayName : "Person With No Name";

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h1> {`${username}'s Workout Tracker💪`}</h1>
        <ProtectedRoutes>
          <UserDataContextProvider>
            <CheckDataIsLoaded>
              <Outlet />
            </CheckDataIsLoaded>
          </UserDataContextProvider>
        </ProtectedRoutes>
      </div>
    </>
  );
};

export default Layout;
