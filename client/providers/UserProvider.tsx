import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export interface User {
  id: string;
  setId: (id: string) => void;
}

const UserContext = React.createContext<User | undefined>(undefined);

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const useActualUser = () => {
  const context = useUser();
  if (context.id === "") {
    throw new Error("useUser doesn't have a valid id");
  }
  return context;
};

const UserProvider = ({children}: {children: React.ReactElement}) => {
  const [userId, setUserId] = React.useState<string>("");

  const userContext = React.useMemo(
    () => ({
      id: userId,
      setId: (id: string) => {
        AsyncStorage.setItem("connectId", id);
        setUserId(id);
      },
    }),
    [userId],
  );

  React.useEffect(() => {
    AsyncStorage.getItem("connectId").then((id) => setUserId(id || ""));
  }, []);

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

export {UserProvider, UserContext, useUser, useActualUser};
