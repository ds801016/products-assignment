import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const Standard = ({
  children,
  title,
  className,
  extra,
  showBackButton,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  extra?: React.ReactNode;
  showBackButton?: boolean;
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div
      className={cn(
        "px-4 flex-1  w-full flex item flex-col overflow-x-hidden  h-full md:px-[30px] lg:[px-80px] xl:px-[100px] 2xl:px-[200px]  pt-[20px]",
        className
      )}
    >
      {showBackButton && (
        <div>
          <Button
            onClick={handleBack}
            variant={"outline"}
            icon={<ArrowLeft size={20} />}
          >
            Back
          </Button>
        </div>
      )}
      {(title || extra) && (
        <div className="w-full mb-6 flex justify-between">
          <div className="flex flex-col lg:flex-row gap-2 w-full justify-between items-center">
            <h1 className="text-lg lg:text-2xl capitalize font-semibold">
              {title}
            </h1>

            {extra}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Standard;
