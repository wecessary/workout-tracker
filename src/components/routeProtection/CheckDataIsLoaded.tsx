import { ReactNode, useContext } from "react";
import { UserDataContext } from "../../context/DataContext";

const CheckDataIsLoaded = ({ children }: { children: ReactNode }) => {
  const { dbLoading, dbError } = useContext(UserDataContext);

  if (dbLoading) {
    return <div>Loading...</div>;
  }
  if (dbError) {
    return <div>Something went wrong...</div>;
  }

  return <>{children}</>;
};

export default CheckDataIsLoaded;
