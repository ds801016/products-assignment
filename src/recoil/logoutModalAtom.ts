import { atom } from "recoil";

export const logoutModalState = atom<Boolean | null>({
  key: "logoutModal",
  default: false,
});
