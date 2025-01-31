import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: (loggedIn: boolean) => void; // ✅ Added setter
  user: User | null;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const [isLogged, setIsLogged] = useState(!!user); // ✅ State to update login status

  useEffect(() => {
    setIsLogged(!!user); // ✅ Sync state with user data
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged, // ✅ Provide setter
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
