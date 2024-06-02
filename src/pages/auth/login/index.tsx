import { login } from "@/api/auth/login";
import MyFormField from "@/components/form/Input";
import MyForm from "@/components/form/MyForm";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import useForm from "@/hooks/useForm";
import useUser from "@/hooks/useUser";
import { routeConstants } from "@/lib/routeConstants";
import { LoginSchema, LoginType } from "@/pages/auth/login/schema";
import { LoggedInUserType } from "@/types/general";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Eye, LogIn, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginType>({}, LoginSchema);
  const navigate = useNavigate();
  const { loading, execFun } = useApi();
  const { setUser } = useUser();

  const handleLogin = async () => {
    const values = await form.validate();

    const response = await execFun(() => login(values), "submit");

    console.log("login response", response);
    if (response.success) {
      setUser(response.data);
    }
    return response;
  };

  const goToRegister = () => {
    navigate(routeConstants.auth.register);
  };

  return (
    <div className=" h-full pb-6 px-10 2xl:px-20 flex-col w-full justify-center flex items-center gap-6 overflow-auto">
      <MyForm form={form}>
        <div className=" flex w-[500px]  flex-col gap-4 p-24  shadow-[xl] shadow-inner bg-opacity-50 backdrop-blur-sm bg-black  mb-4 rounded-[70px]">
          <div className="flex items-center justify-center gap-4 text-accent  border-b py-4">
            <h1 className="text-[36px] font-semibold text-primary">
              Log In To GTTCI
            </h1>
            <Users size={40} color="#3e97cd" />
          </div>
          <div className="w-full">
            <div className=" flex flex-col gap-2">
              <div>
                <MyFormField
                  control={form.control}
                  name="userName"
                  label="Username"
                />
              </div>
              <div>
                <MyFormField
                  type={!showPassword ? "password" : "text"}
                  suffix={
                    showPassword ? (
                      <EyeClosedIcon
                        size={15}
                        onClick={() => setShowPassword((curr) => !curr)}
                      />
                    ) : (
                      <Eye
                        size={15}
                        onClick={() => setShowPassword((curr) => !curr)}
                      />
                    )
                  }
                  control={form.control}
                  name="password"
                  label="Password"
                />
              </div>
            </div>
          </div>
          <div>
            <Button
              loading={loading("submit")}
              onClick={handleLogin}
              icon={<LogIn size={18} />}
              className="w-full"
              size="lg"
            >
              Log In
            </Button>
          </div>
          <div className="flex justify-center">
            <Button onClick={goToRegister} variant="link">
              Don't have an account? Sign Up
            </Button>
          </div>
        </div>
      </MyForm>
    </div>
  );
};

export default Login;
