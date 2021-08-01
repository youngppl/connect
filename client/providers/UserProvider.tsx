import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export interface User {
  id: string | null;
  setId: (id: string) => void;
}

export const UserContext = React.createContext<User>({
  id: null,
  setId: (id: string) => {
    return;
  },
});

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [userId, setUserId] = React.useState<string | null>(null);

  const userContext = React.useMemo(
    () => ({
      id: userId,
      setId: (id: string) => {
        AsyncStorage.setItem("connectId", id);
        setUserId(id);
      },
    }),
    [userId]
  );

  React.useEffect(() => {
    AsyncStorage.getItem("connectId").then((id) => setUserId(id));
  }, []);

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};
export default UserProvider;
