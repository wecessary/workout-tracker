import { ReactNode, useContext } from "react";
import { UserDataContext } from "../../context/DataContext";
import { AppIcon } from "../ui/Icons";

const CheckDataIsLoaded = ({ children }: { children: ReactNode }) => {
  const { dbLoading, dbError } = useContext(UserDataContext);

  if (dbLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <AppIcon />
      </div>
    );
  }
  if (dbError) {
    return <div>Something went wrong...</div>;
  }

  return <>{children}</>;
};

export default CheckDataIsLoaded;
