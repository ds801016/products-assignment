import { myAxios } from "@/lib/axiosInterceptor";

import { ResponseType } from "@/types/general";

export const getProducts = async () => {
  const response: ResponseType = await myAxios.get("/products");

  return response;
};
