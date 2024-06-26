import { myAxios } from "@/lib/axiosInterceptor";

import { ResponseType } from "@/types/general";

export const getProducts = async () => {
  const response: ResponseType = await myAxios.get("/products");
  console.log("this is the api response", response);
  if (!response?.length && typeof response !== "object") {
    return [];
  }
  return response;
};
