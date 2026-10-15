import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authMember, setAuthMember] = useState<Member | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    let active = true;
    axios
      .get<Member>(`${serverApi}/member/detail`, { withCredentials: true })
      .then(({ data }) => {
        if (active) setAuthMember(data);
      })
      .catch(() => {
        if (active) {
          setAuthMember(null);
          try {
            localStorage.removeItem("memberData");
          } catch {
            /* Browser storage can be disabled. */
          }
        }
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  return (
    <GlobalContext.Provider
      value={{ authMember, authLoading, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default ContextProvider;
