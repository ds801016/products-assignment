import { userState } from "@/recoil/userAtom";

import { useRecoilStateLoadable } from "recoil";
import useToaster from "./useToaster";

const useLogout = () => {
  const [_, setUser] = useRecoilStateLoadable(userState);
  const toaster = useToaster();
  const logoutHandler = () => {
    localStorage.removeItem("espUser");
    toaster("success", "Logged Out successfully");
    setUser(null);
  };
  return logoutHandler;
};

export default useLogout;
