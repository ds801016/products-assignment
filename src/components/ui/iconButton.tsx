import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Loader, Loader2 } from "lucide-react";


interface PropTypes {
  icon: ReactNode;
  onClick?: () => void;
  background?: string;
  hoverBackground?: string;
  color?: string;
  hoverColor?: string;
  tooltip?: string | ReactNode;
  loading?: boolean;
  noSpace?: boolean;
  size?: "md" | "sm";
}
const IconButton = ({
  icon,
  onClick,
  background = "bg-transparent",
  hoverBackground = "hover:bg-iconButtonHover",
  color = "text-muted-foreground",
  hoverColor = "hover:text-primary",
  tooltip,
  loading,
  noSpace,
  size = "md",
}: PropTypes) => {
  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={onClick}
              className={`${
                noSpace
                  ? size === "md"
                    ? "p-3"
                    : "p-[6px]"
                  : !noSpace && size === "md"
                  ? "p-3"
                  : "p-[5px]"
              } rounded-full cursor-pointer ${
                !loading && hoverColor
              } ${color} ${!loading && hoverBackground} ${background} `}
            >
              {loading && <div className="animate-spin">{<Loader />}</div>}

              {!loading && icon}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`${
        noSpace ? "p-3" : !noSpace && size === "md" ? "p-3" : "p-[5px]"
      } rounded-full cursor-pointer ${
        !loading && color
      } ${hoverBackground} ${background} ${hoverColor}`}
    >
      {loading && <span>{<Loader />}</span>}

      {!loading && icon}
    </div>
  );
};

export default IconButton;
