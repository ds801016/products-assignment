import { myAxios } from "@/lib/axiosInterceptor";
import { userState } from "@/recoil/userAtom";
import { LoggedInUserType } from "@/types/general";
import { useRecoilState } from "recoil";

let localKey = import.meta.env.VITE_REACT_APP_LOCAL_KEY;

const useUser = () => {
  const [user, setAuthData] = useRecoilState(userState);

  const setUser = (userData: LoggedInUserType) => {
    setAuthData(userData);
    localStorage.setItem(localKey, JSON.stringify(userData));
    myAxios.defaults.headers["x-csrf-token"] = userData.token;
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem(localKey);
    myAxios.defaults.headers["x-csrf-token"] = "";
  };

  const getFromStorage = (set: boolean) => {
    const userData = localStorage.getItem(localKey);
    if (userData) {
      if (set) setAuthData(JSON.parse(userData));

      return JSON.parse(userData);
    } else {
      if (set) setAuthData(null);

      return null;
    }
  };

  const checkUser = () => {
    const fromStorage = getFromStorage(false);
    if (fromStorage || user) {
      return true;
    }
    return false;
  };

  return { user, logout, setUser, getFromStorage, checkUser };
};

export default useUser;
