import { createContext, useContext } from "react";

export type UserContextValue = {
  userName: string | null;
  onUnautorizedAccess: () => void;
};

const userContext = createContext<UserContextValue>({
  userName: null,
  onUnautorizedAccess: () => {}
});

export const useUserData = () => useContext(userContext);
export const UserContextProvider = userContext.Provider;
