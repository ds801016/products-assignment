import { TooltipProvider } from "@/components/ui/tooltip";
import { routeConstants } from "@/lib/routeConstants";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

export default function RootLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== routeConstants.app.products) {
      navigate(routeConstants.app.products);
    }
  }, []);

  return (
    <RecoilRoot>
      {/* <TooltipProvider> */}
      <div className="p-[7px] py-[7px] bg-black h-screen flex">
        <div className="rounded-lg  flex-1  overflow-x-hidden">
          <Outlet />
        </div>
      </div>
      {/* </TooltipProvider> */}
    </RecoilRoot>
  );
}
