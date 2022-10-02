import { User } from "firebase/auth";
import { createContext, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebae/firebase";

interface IAuthContext {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
