import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalInterface {
  authMember: Member | null;
  authLoading: boolean;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}
export const GlobalContext = createContext<GlobalInterface | undefined>(undefined);
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error("useGlobal must be used inside ContextProvider");
  return context;
};
