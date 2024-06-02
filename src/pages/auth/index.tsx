import { Toaster } from "@/components/ui/toaster";
import useUser from "@/hooks/useUser";
import { routeConstants } from "@/lib/routeConstants";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.token) {
  //     navigate(routeConstants.app.home);
  //   }
  // }, [user?.token]);
  return (
    <div className="flex-1 h-full  flex">
      <div className="w-full flex items-center gap-4 flex-col justify-center bg-cover  shadow-black shadow-2xl relative  h-full bg-[url('https://gttcindia.com/wp-content/uploads/2024/01/South_Block_Front-scaled.jpg')]">
        <div className="absolute left-0  top-0 z-[0] w-full h-full bg-black opacity-45" />
        <div className="z-[99] pt-10">
          <img
            className="w-[300px] mb-2 z-[99]"
            src="https://gttcindia.mscorpres.co.in//assets/GTTCI-LOGO.webp"
          />
        </div>
        <div className="h-full flex w-full pb-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
