import { myAxios } from "@/lib/axiosInterceptor";

import { ResponseType } from "@/types/general";

export const getProducts = async () => {
  const response: ResponseType = await myAxios.get("/products");
  if (!response?.length && typeof response !== "object") {
    throw new Error("Response is not in valid format");
  }
  return response;
};
