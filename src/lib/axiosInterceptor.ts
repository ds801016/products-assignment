import { LoggedInUserType, ResponseType } from "@/types/general";
import axios from "axios";

const baseLink = import.meta.env.VITE_REACT_APP_BACKEND_URL; //for net

// const baseLink = "http://192.168.68.118:3001"; //for net

const localUser = localStorage.getItem(
  import.meta.env.VITE_REACT_APP_LOCAL_KEY
);
const parsed: LoggedInUserType | null = JSON.parse(localUser ?? "null");

const myAxios = axios.create({
  baseURL: baseLink,
  headers: {
    "x-csrf-token": parsed?.token,
  },
});

myAxios.interceptors.response.use(
  (response) => {
    const { data }: { data: null | ResponseType | undefined } = response;
    if (!data) {
      throw new Error("Error connecting to backend");
    }
    return response.data;
  },
  (error) => {
    console.log("some error is here", error);
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        data: null,
        message: "Some error occured while connecting backend",
      };
    }
  }
);

// myAxios.defaults.headers["Session"] = session;

export { myAxios };
