import Sidebar from "@/components/layout/sidebar";
import useUser from "@/hooks/useUser";
import { routeConstants } from "@/lib/routeConstants";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import useLogOutModal from "@/hooks/useLogOutModal";
import LogoutModal from "@/components/shared/LogoutModal";
import ResponsiveSidebar from "@/components/layout/sidebar/Responsive";

const ProtectedLayout = () => {
  const { user } = useUser();
  const { showModal, handleHide } = useLogOutModal();

  // if (!user?.token) {
  //   console.log("user not found");
  //   return <Navigate to={routeConstants.auth.login} />;
  // }
  return (
    <div className="h-full bg-[url('/background-patter-1.svg')] bg-[#FAFAFA] bg-cover  bg-no-repeat overflow-x-hidden w-full lg:flex">
      <div className="h-full hidden lg:block">
        <Sidebar />
      </div>
      <div className="lg:hidden h-[30px]">
        <ResponsiveSidebar />
      </div>
      <LogoutModal show={showModal ?? false} hide={handleHide} />
      <div className="flex-1 mx-auto mt-[-50px] lg:mt-0 w-full h-full pb-4 p-6 overflow-y-auto overflow-x-hidden  bg-opacity-30">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default ProtectedLayout;
