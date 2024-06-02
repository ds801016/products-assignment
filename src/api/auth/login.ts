import { myAxios } from "@/lib/axiosInterceptor";
import { LoggedInUserType, ResponseType } from "@/types/general";

export const login = async (values: { userName: string; password: string }) => {
  const response: ResponseType = await myAxios.post("/auth/login", {
    username: values.userName,
    password: values.password,
  });

  if (response.success) {
    let obj: LoggedInUserType = {
      email: response.data.email,
      role: response.data.role,
      token: response.data.token,
      userName: response.data.username,
      name: response.data.full_name,
      // documentVerified:
    };
    response.data = obj;
  }

  return response;
};
