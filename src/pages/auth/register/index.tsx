import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import Stage1 from "@/pages/auth/register/stage1";
import Stage2 from "@/pages/auth/register/stage2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routeConstants } from "@/lib/routeConstants";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stage1Key = searchParams.get("stage1Key");

  const goToLogin = () => {
    navigate(routeConstants.auth.login);
  };
  return (
    <div className="flex flex-1  h-full overflow-hidden  w-full px-[50px] lg:px-[150px] 2xl:px-[400px] items-center ">
      <div className="w-full flex flex-col gap-4 p-14 pt-6 px-20  shadow-lg bg-opacity-50 backdrop-blur-sm bg-black overflow-hidden text-white h-full  rounded-[70px] flex-1 ">
        <div className="flex w-full pb-0 px-4 2xl:px-10 flex-col items-center gap-2  ">
          <div className="flex items-center gap-4 text-primary border-b py-4 pb-2">
            <h1 className="text-[28px] font-semibold text-primary">
              Sign Up To GTTCI
            </h1>
            <Users size={25} />
          </div>
          <div className="flex justify-center m-0 p-0 h-[5%]">
            <Button variant="link" onClick={goToLogin}>
              Already have an account? Sign In
            </Button>
          </div>
        </div>
        <Tabs
          defaultValue={stage1Key ? "stage2" : "stage1"}
          className="w-full overflow-hidden h-full"
        >
          <TabsList className=" w-full ">
            <TabsTrigger
              // disabled={true}
              value="stage1"
              className="data-[state=active]:bg-primary bg-transparent data-[state=active]:text-white"
            >
              Stage 1
            </TabsTrigger>
            <TabsTrigger
              // disabled={true}
              value="stage2"
              className="data-[state=active]:bg-primary bg-transparent data-[state=active]:text-white"
            >
              Stage 2
            </TabsTrigger>

            {/* <TabsTrigger
              disabled={true}
              value="stage3"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Stage 3
            </TabsTrigger> */}
          </TabsList>
          <TabsContent
            value="stage1"
            className="max-h-full px-5 overflow-auto pb-10"
          >
            <Stage1 />
          </TabsContent>
          <TabsContent value="stage2">
            <Stage2 />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Register;
