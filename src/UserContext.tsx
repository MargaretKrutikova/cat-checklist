import { createContext, useContext } from "react";

export type UserContextValue = {
  userName: string | null;
};

const userContext = createContext<UserContextValue>({ userName: null });

export const useUserData = () => useContext(userContext);
export const UserContextProvider = userContext.Provider;
