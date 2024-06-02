import Sidebar from "@/components/layout/sidebar";
import IconButton from "@/components/ui/iconButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const ResponsiveSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton icon={<Menu />} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveSidebar;
