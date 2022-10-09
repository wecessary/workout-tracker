import { ref } from "firebase/database";
import { createContext, ReactNode, useContext } from "react";
import { useList } from "react-firebase-hooks/database";
import { db } from "../firebae/firebase";
import { UserDataObject } from "../model/model";
import { AuthContext } from "./AuthContext";

interface IUserDataContext {
  datafromDB: UserDataObject[] | undefined;
  dbLoading: boolean;
  dbError: Error | undefined;
}

export const UserDataContext = createContext({} as IUserDataContext);

const UserDataContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const dbQuery = user && ref(db, user.uid);
  const [snapshots, dbLoading, dbError] = useList(dbQuery);
  const datafromDB =
    snapshots && snapshots.map((v) => v.val() as UserDataObject);
  return (
    <UserDataContext.Provider value={{ datafromDB, dbLoading, dbError }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
