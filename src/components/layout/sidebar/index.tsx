import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useLogOutModal from "@/hooks/useLogOutModal";
import useUser from "@/hooks/useUser";
import { routeConstants } from "@/lib/routeConstants";
import { cn } from "@/lib/utils";
import { DialogPropType } from "@/types/general";
import {
  CalendarDays,
  ChevronDown,
  Clipboard,
  Construction,
  Globe2,
  LogOut,
  LogOutIcon,
  Newspaper,
  User,
  Users,
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ItemType {
  icon: ReactNode;
  label: string;
  to?: string;
  children?: ItemType[];
  adminRoute?: boolean;
  disabled?: boolean;
}

const Sidebar = () => {
  const [showSecondary, setShowSecondary] = useState(false);
  const ref = useRef();
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const { handleShow } = useLogOutModal();

  const { user } = useUser();
  const { pathname: pathName } = useLocation();
  const toggleSecondary = (state?: boolean) => {
    setShowSecondary((curr) => (state === undefined ? !curr : state));
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSecondary(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(ref);

  useEffect(() => {
    if (showSecondary) {
      setShowSecondary(false);
    }
  }, [pathName]);
  return (
    <div
      ref={ref}
      onBlur={() => toggleSecondary(false)}
      className="overflow-x-visible relative h-full"
    >
      <div className="h-full  flex flex-col gap-0 items-center overflow-y-auto  px-6 py-4 rounded-lg shadow-md min-w-[300px] bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-full flex-1 flex flex-col ">
          <div className="flex justify-center ">
            {/* <Link to={routeConstants.app.home}>
              <img
                className="w-[250px] mb-2"
                src="https://gttcindia.mscorpres.co.in//assets/GTTCI-LOGO.webp"
              />
            </Link> */}
          </div>
          <UserCard />
          <ul className="mt-4 border-t border-[#eee] flex-1 w-full">
            {items
              .filter((row) =>
                user?.role === "admin" ? true : !row.adminRoute
              )
              .map((row: ItemType) => (
                <div
                  onClick={() => {
                    if (row.children) {
                      toggleSecondary();
                      setSelectedItem(row);
                    } else {
                      if (showSecondary) {
                        setShowSecondary(false);
                        setSelectedItem(null);
                      }
                    }
                  }}
                  className={cn(
                    "justify-center rounded-lg w-full text-[rgb(56,55,55)]  gap-2 my-2 py-4  flex items-center hover:bg-muted cursor-pointer",
                    row.disabled && "pointer-events-none opacity-60"
                  )}
                >
                  <div className="flex  items-center gap-3 font-semibold  w-3/4 cursor-pointer justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{row.icon}</span>
                      <span className="text-[14px]">{row.label}</span>
                    </div>
                    {row.disabled && (
                      <Construction size={20} className="text-yellow-800" />
                    )}
                  </div>
                </div>
              ))}
          </ul>
        </div>
        <div className="px-2 w-full">
          <Button
            onClick={handleShow}
            icon={<LogOut size={20} className="mr-1" />}
            className="w-full py-6 text-lg bg-transparent font-semibold text-red-700 border border-red-700 hover:text-white"
            variant={"destructive"}
          >
            Logout
          </Button>
          <p className="text-center text-muted-foreground text-[13px] mt-1">
            All right reserved.
          </p>
        </div>
        {/* <div className="w-full px-2">
          <div className="border px-4 py-4 items-center border-red-800 text-red-800 rounded-lg flex justify-between">
            <p className="text-lg font-semibold">LOGOUT</p>
            <LogOut size={20} />
          </div>
        </div> */}
      </div>
      {showSecondary && selectedItem && (
        <SecondarySideBar pathName={pathName} selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default Sidebar;

const UserCard = () => {
  const { logout, user } = useUser();
  const navigate = useNavigate();
  console.log(user);

  const goToProfile = () => {
    navigate(routeConstants.app.profile);
  };
  return (
    <div className="rounded-lg w-full bg-primary text-white p-3 border flex justify-between items-center gap-2 z-[99]">
      <div className="flex gap-2 items-center z-[99]">
        <div className="bg-white text-accent rounded-full p-3 h-[50px] w-[50px] flex justify-center items-center">
          <p className="font-semibold text-xl">DS</p>
        </div>
        <div className="flex flex-col">
          <p className="text-[15px] font-semibold uppercase">Devesh Singh</p>

          <p className="text-sm text-blue-200">User</p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDown size={18} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-black">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            {user?.role === "user" && (
              <>
                <DropdownMenuItem
                  onClick={goToProfile}
                  className="flex gap-2 items-center text-black"
                >
                  <User size={14} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem
              className="flex gap-2 items-center text-black"
              onClick={logout}
            >
              <LogOutIcon size={14} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

interface SecondaryProps extends DialogPropType {
  selectedItem: ItemType;
  pathName: string;
}
const SecondarySideBar = (props: SecondaryProps) => {
  const { user } = useUser();
  return (
    <div className="bg-white bg-opacity-40 backdrop-blur-md py-4 px-2 h-full w-[250px] absolute top-0 left-[100%] shadow-md rounded-lg z-[99]">
      <div className="flex border-b mb-2 text-accent border-b-muted justify-center p-4 items-center gap-2 ">
        {props.selectedItem?.icon}

        <h2 className="text-2xl font-semibold text-accent">
          {props.selectedItem.label}
        </h2>
      </div>
      {props.selectedItem.children
        ?.filter((row) => (user?.role === "admin" ? true : !row.adminRoute))
        .map((row) => (
          <Link to={row.to} className="w-full m-0 mt-2">
            <div
              className={cn(
                "py-4 px-4 rounded-lg m-0 text-[rgb(56,55,55)]  mx-2 cursor-pointer  flex gap-2  ",
                props.pathName === row.to
                  ? "bg-primary text-white hover:bg-accent hover:text-white"
                  : "hover:bg-muted"
              )}
            >
              {props.selectedItem.icon}
              {row.label}
            </div>
          </Link>
        ))}
    </div>
  );
};

const items: ItemType[] = [
  {
    icon: <CalendarDays size={20} />,
    label: "Products",
    children: [
      {
        label: "List Products",

        to: routeConstants.app.products,
        icon: <CalendarDays size={20} />,
      },
    ],
  },
];
