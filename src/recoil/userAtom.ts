import { LoggedInUserType } from "@/types/general";
import { atom } from "recoil";

let localKey = import.meta.env.VITE_REACT_APP_LOCAL_KEY;

const exisitingUser = localStorage.getItem(localKey);
const parsedUser = JSON.parse(exisitingUser ?? "null");
export const userState = atom<LoggedInUserType | null>({
  key: "user",
  default: parsedUser ?? null,
});
