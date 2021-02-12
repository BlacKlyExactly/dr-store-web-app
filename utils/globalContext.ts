import { UserData } from "hooks/useUser";
import { createContext } from "react";

export const GlobalContext = createContext({
    userData: {} as UserData,
    isLoged: false,
})