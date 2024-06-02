import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary backdrop-blur-sm text-white  hover:bg-accent hover:bg-opacity-50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-white bg-opacity-30 hover:bg-muted hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md py-7 text-[16px]  px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean | null | undefined;
  icon?: React.ReactNode;
  tooltip?: string | React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              disabled={(props.loading || props.disabled) ?? false}
              {...props}
              children={
                <div className="flex  justify-center items-center h-full w-full gap-1">
                  {props.loading ? (
                    <div className="animate-spin-slow">
                      <Loader className="h-5" />
                    </div>
                  ) : (
                    props.icon
                  )}
                  {props.children}
                </div>
              }
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.tooltip ?? props.children}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
